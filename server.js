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

// 3. Generate route - sends prompt to selected Gemini model
app.post('/api/generate', async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(400).json({ error: 'GEMINI_API_KEY nije konfigurisan u .env fajlu.' });
  }

  let { model, prompt, temperature, maxOutputTokens, inlineData } = req.body;
  if (!prompt && !inlineData) {
    return res.status(400).json({ error: 'Prompt ili fajl su obavezni.' });
  }

  // Ensure default model if not provided
  if (!model) {
    model = 'models/gemini-2.5-flash';
  }

  // Handle case where model name might not start with 'models/'
  const formattedModel = model.startsWith('models/') ? model : `models/${model}`;
  
  const startTime = Date.now();
  const url = `https://generativelanguage.googleapis.com/v1beta/${formattedModel}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: []
      }
    ]
  };

  // Ako postoji zakačen fajl, dodaj ga kao prvi part
  if (inlineData) {
    payload.contents[0].parts.push({
      inlineData: {
        mimeType: inlineData.mimeType,
        data: inlineData.base64
      }
    });
  }

  // Zatim dodaj tekstualni prompt
  if (prompt) {
    payload.contents[0].parts.push({
      text: prompt
    });
  }

  // Add optional configurations if provided
  if (temperature !== undefined || maxOutputTokens !== undefined) {
    payload.generationConfig = {};
    if (temperature !== undefined) payload.generationConfig.temperature = parseFloat(temperature);
    if (maxOutputTokens !== undefined) payload.generationConfig.maxOutputTokens = parseInt(maxOutputTokens);
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const latency = Date.now() - startTime;
    const data = await response.json();

    if (!response.ok) {
      const errMsg = typeof data.error === 'object' ? (data.error.message || JSON.stringify(data.error)) : data.error;
      return res.status(response.status).json({
        error: errMsg || 'Greška pri generisanju sadržaja.',
        status: response.status,
        latency,
        rawRequest: {
          url: `https://generativelanguage.googleapis.com/v1beta/${formattedModel}:generateContent?key=HIDDEN`,
          method: 'POST',
          body: payload
        },
        rawResponse: data
      });
    }

    res.json({
      success: true,
      latency,
      rawRequest: {
        url: `https://generativelanguage.googleapis.com/v1beta/${formattedModel}:generateContent?key=HIDDEN`,
        method: 'POST',
        body: payload
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

// Start Server
app.listen(PORT, () => {
  console.log('');
  console.log('  🚀  ==================================================');
  console.log('  🚀  Gemini API Connection Tester — Pokrenut uspešno!');
  console.log(`  🌐  Lokalni URL: http://localhost:${PORT}`);
  console.log('  🚀  ==================================================');
  console.log('');
});
