import 'dotenv/config';
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const db = new Database('models.db');

app.use(express.json({ limit: '10mb' }));

// Onemogući keširanje resursa tokom razvoja
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

app.use(express.static(join(__dirname, 'public')));

// ─── API Routes ─────────────────────────────────────────────────────

// 0. Specs route - fetches model specs from SQLite database
app.get('/api/specs', (req, res) => {
  try {
    const specs = db.prepare('SELECT * FROM models').all();
    const specsMap = {};
    specs.forEach(s => {
      specsMap[s.id] = {
        type: s.type,
        desc: s.desc,
        features: JSON.parse(s.features),
        usecases: JSON.parse(s.usecases),
        code: s.code,
        example_type: s.example_type,
        example_data: JSON.parse(s.example_data)
      };
    });
    res.json(specsMap);
  } catch (error) {
    res.status(500).json({ error: 'Greška pri čitanju baze podataka: ' + error.message });
  }
});

// 1. Status route - checks if the API key is configured
app.get('/api/status', (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({
      configured: false,
      message: 'GEMINI_API_KEY nije pronađen u vašem .env fajlu.',
    });
  }

  // Mask the key for safety (e.g., AIzaSy...xYz)
  const maskedKey = apiKey.length > 8 
    ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}` 
    : '***';

  res.json({
    configured: true,
    maskedKey,
    keyLength: apiKey.length,
    message: 'GEMINI_API_KEY je uspešno učitan iz .env fajla!'
  });
});

// 2. Models route - fetches available models from the Gemini API
app.get('/api/models', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(400).json({ error: 'GEMINI_API_KEY nije konfigurisan u .env fajlu.' });
  }

  const startTime = Date.now();
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const latency = Date.now() - startTime;
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || data.error || 'Greška pri komunikaciji sa Gemini API.',
        status: response.status,
        latency,
        rawResponse: data
      });
    }

    res.json({
      success: true,
      models: data.models || [],
      latency,
      rawRequest: {
        url: `https://generativelanguage.googleapis.com/v1beta/models?key=HIDDEN`,
        method: 'GET'
      },
      rawResponse: data
    });
  } catch (error) {
    const latency = Date.now() - startTime;
    res.status(500).json({
      error: `Sistemska greška: ${error.message}`,
      latency
    });
  }
});

// ─── Rate Limiter za Premium modele (Imagen, Veo, Lyria) ────────────
const PREMIUM_CATEGORIES = ['imagen', 'veo', 'lyria'];
const RATE_LIMIT_MAX = 2;          // maks. poziva po kategoriji
const RATE_LIMIT_WINDOW = 2 * 60 * 60 * 1000; // 2 sata u ms

// In-memory store: { "IP": { imagen: { count: 2, firstUse: timestamp }, veo: {...} } }
const rateLimitStore = {};

function getRateLimitKey(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || req.connection?.remoteAddress || 'unknown';
}

function checkRateLimit(ip, category, adminKey) {
  if (!PREMIUM_CATEGORIES.includes(category)) return { allowed: true };

  // Admin bypass — ako ADMIN_SECRET postoji u .env i poklapa se
  const adminSecret = process.env.ADMIN_SECRET;
  if (adminSecret && adminKey === adminSecret) {
    return { allowed: true, unlimited: true };
  }

  if (!rateLimitStore[ip]) rateLimitStore[ip] = {};
  if (!rateLimitStore[ip][category]) rateLimitStore[ip][category] = { count: 0, firstUse: Date.now() };

  const entry = rateLimitStore[ip][category];
  const elapsed = Date.now() - entry.firstUse;

  // Prozor istekao — resetuj
  if (elapsed >= RATE_LIMIT_WINDOW) {
    entry.count = 0;
    entry.firstUse = Date.now();
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const remainingMs = RATE_LIMIT_WINDOW - elapsed;
    const mins = Math.ceil(remainingMs / 60000);
    return {
      allowed: false,
      remaining: 0,
      resetInMinutes: mins,
      message: `Dostigli ste limit od ${RATE_LIMIT_MAX} poziva za ${category.toUpperCase()} modele. Pristup se resetuje za ${mins} minuta.`
    };
  }

  return { allowed: true, remaining: RATE_LIMIT_MAX - entry.count };
}

function recordUsage(ip, category) {
  if (!PREMIUM_CATEGORIES.includes(category)) return;
  if (!rateLimitStore[ip]) rateLimitStore[ip] = {};
  if (!rateLimitStore[ip][category]) rateLimitStore[ip][category] = { count: 0, firstUse: Date.now() };
  rateLimitStore[ip][category].count++;
}

// Čišćenje isteklih zapisa svakih 30 min
setInterval(() => {
  const now = Date.now();
  for (const ip of Object.keys(rateLimitStore)) {
    for (const cat of Object.keys(rateLimitStore[ip])) {
      if (now - rateLimitStore[ip][cat].firstUse >= RATE_LIMIT_WINDOW) {
        delete rateLimitStore[ip][cat];
      }
    }
    if (Object.keys(rateLimitStore[ip]).length === 0) delete rateLimitStore[ip];
  }
}, 30 * 60 * 1000);

// API ruta: status preostalih poziva za korisnika
app.get('/api/rate-status', (req, res) => {
  const ip = getRateLimitKey(req);
  const adminKey = req.headers['x-admin-key'] || '';
  const adminSecret = process.env.ADMIN_SECRET;
  const isAdmin = adminSecret && adminKey === adminSecret;

  const status = { unlimited: isAdmin };
  for (const cat of PREMIUM_CATEGORIES) {
    if (isAdmin) {
      status[cat] = { remaining: '∞', limit: '∞', locked: false, unlimited: true };
    } else {
      const check = checkRateLimit(ip, cat);
      if (check.allowed) {
        const entry = rateLimitStore[ip]?.[cat];
        status[cat] = { remaining: entry ? RATE_LIMIT_MAX - entry.count : RATE_LIMIT_MAX, limit: RATE_LIMIT_MAX, locked: false };
      } else {
        status[cat] = { remaining: 0, limit: RATE_LIMIT_MAX, locked: true, resetInMinutes: check.resetInMinutes };
      }
    }
  }
  res.json(status);
});

// API ruta: verifikuj admin ključ
app.post('/api/verify-admin', (req, res) => {
  const { key } = req.body;
  const adminSecret = process.env.ADMIN_SECRET;
  if (adminSecret && key === adminSecret) {
    res.json({ valid: true, message: '🔓 Admin pristup otključan! Nemate ograničenja.' });
  } else {
    res.status(401).json({ valid: false, message: 'Neispravan admin ključ.' });
  }
});

// ─── Pomoćna: Određuje tip modela i vraća endpoint + body builder ───
function getModelRouter(shortName) {
  if (shortName.startsWith('imagen-')) {
    return { method: 'predict', category: 'imagen' };
  }
  if (shortName.startsWith('veo-')) {
    return { method: 'predictLongRunning', category: 'veo' };
  }
  if (shortName.startsWith('lyria-')) {
    return { method: 'generateContent', category: 'lyria' };
  }
  if (shortName.includes('embedding')) {
    return { method: 'embedContent', category: 'embedding' };
  }
  if (shortName === 'aqa') {
    return { method: 'generateAnswer', category: 'aqa' };
  }
  return { method: 'generateContent', category: 'standard' };
}

// 3. Generate route — Smart Router za sve Gemini API endpoint varijante
app.post('/api/generate', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(400).json({ error: 'GEMINI_API_KEY nije konfigurisan u .env fajlu.' });
  }

  let { model, prompt, temperature, maxOutputTokens, inlineData,
        // Imagen/Veo parametri
        aspectRatio, numberOfImages, numberOfVideos, videoDuration, personGeneration,
        // TTS parametri
        voiceName, responseModalities,
        // AQA parametri
        answerStyle } = req.body;

  if (!prompt && !inlineData) {
    return res.status(400).json({ error: 'Prompt ili fajl su obavezni.' });
  }

  if (!model) model = 'models/gemini-2.5-flash';

  const formattedModel = model.startsWith('models/') ? model : `models/${model}`;
  const shortName = formattedModel.replace('models/', '');
  const { method, category } = getModelRouter(shortName);

  // ─── Rate Limit provera za premium modele ───
  const userIp = getRateLimitKey(req);
  const adminKey = req.headers['x-admin-key'] || '';
  const rateCheck = checkRateLimit(userIp, category, adminKey);
  if (!rateCheck.allowed) {
    return res.status(429).json({
      error: rateCheck.message,
      rateLimited: true,
      category,
      resetInMinutes: rateCheck.resetInMinutes
    });
  }

  const BASE = 'https://generativelanguage.googleapis.com/v1beta';
  const url = `${BASE}/${formattedModel}:${method}?key=${apiKey}`;
  const startTime = Date.now();

  let payload = {};

  // ── Imagen: :predict ──────────────────────────────────────────────
  if (category === 'imagen') {
    payload = {
      instances: [{ prompt: prompt || '' }],
      parameters: {
        sampleCount: numberOfImages || 1,
        aspectRatio: aspectRatio || '1:1',
        ...(personGeneration && { personGeneration })
      }
    };
  }

  // ── Veo: :predictLongRunning ──────────────────────────────────────
  else if (category === 'veo') {
    payload = {
      instances: [{ prompt: prompt || '' }],
      parameters: {
        aspectRatio: aspectRatio || '16:9',
        sampleCount: numberOfVideos || 1,
        ...(videoDuration && { durationSeconds: videoDuration })
      }
    };
  }

  // ── Embedding: :embedContent ──────────────────────────────────────
  else if (category === 'embedding') {
    payload = {
      content: { parts: [{ text: prompt || '' }] }
    };
  }

  // ── AQA: :generateAnswer ──────────────────────────────────────────
  else if (category === 'aqa') {
    payload = {
      contents: [{ parts: [{ text: prompt || '' }] }],
      answerStyle: answerStyle || 'ABSTRACTIVE',
      safetySettings: []
    };
  }

  // ── Lyria / TTS: :generateContent sa audio modalitetom ────────────
  else if (category === 'lyria') {
    const parts = [];
    if (inlineData) parts.push({ inlineData: { mimeType: inlineData.mimeType, data: inlineData.base64 } });
    if (prompt) parts.push({ text: prompt });
    payload = {
      contents: [{ parts }],
      generationConfig: { responseModalities: responseModalities || ['AUDIO'] }
    };
  }

  // ── Standard / TTS Gemini: :generateContent ───────────────────────
  else {
    const parts = [];
    if (inlineData) parts.push({ inlineData: { mimeType: inlineData.mimeType, data: inlineData.base64 } });
    if (prompt) parts.push({ text: prompt });
    payload = { contents: [{ parts }] };

    // TTS konfiguracija
    if (voiceName || (responseModalities && responseModalities.includes('AUDIO'))) {
      payload.generationConfig = {
        responseModalities: responseModalities || ['AUDIO'],
        ...(voiceName && {
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName } }
          }
        })
      };
    } else {
      // Standardna generacija
      if (temperature !== undefined || maxOutputTokens !== undefined) {
        payload.generationConfig = {};
        if (temperature !== undefined) payload.generationConfig.temperature = parseFloat(temperature);
        if (maxOutputTokens !== undefined) payload.generationConfig.maxOutputTokens = parseInt(maxOutputTokens);
      }
    }
  }

  const safeUrl = url.replace(apiKey, 'HIDDEN');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const latency = Date.now() - startTime;
    const data = await response.json();

    if (!response.ok) {
      const errMsg = typeof data.error === 'object'
        ? (data.error.message || JSON.stringify(data.error))
        : data.error;
      return res.status(response.status).json({
        error: errMsg || 'Greška pri generisanju sadržaja.',
        status: response.status, latency,
        rawRequest: { url: safeUrl, method: 'POST', body: payload },
        rawResponse: data
      });
    }

    // Za Veo: odmah vraćamo operation objekat klijentu — on sam polla
    // Zabeleži upotrebu za premium modele (samo posle uspešnog poziva, ne za admine)
    if (!rateCheck.unlimited) {
      recordUsage(userIp, category);
    }

    res.json({
      success: true,
      category,
      latency,
      rawRequest: { url: safeUrl, method: 'POST', body: payload },
      rawResponse: data
    });

  } catch (error) {
    const latency = Date.now() - startTime;
    res.status(500).json({ error: `Sistemska greška: ${error.message}`, latency });
  }
});

// 4. Operation polling route — za Veo :predictLongRunning
app.get('/api/operation', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const { name } = req.query; // npr. "operations/xyz123"
  if (!name) return res.status(400).json({ error: 'Operation name je obavezan.' });

  const url = `https://generativelanguage.googleapis.com/v1beta/${name}?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log('');
  console.log('  🚀  ==================================================');
  console.log('  🚀  Gemini API Connection Tester — Pokrenut uspešno!');
  console.log(`  🌐  Lokalni URL: http://localhost:${PORT}`);
  console.log('  🚀  ==================================================');
  console.log('');
});
