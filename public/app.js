// ─── Aplikacija za Testiranje Gemini API ────────────────────────────

// Globalno stanje aplikacije
const state = {
  configured: false,
  models: [],
  selectedModel: '',
  lastRequest: null,
  lastResponse: null,
  activeTab: 'request', // 'request' ili 'response'
  droppedFile: null // { base64, mimeType, name, size }
};

// DOM Elementi
const dom = {
  statusBadge: document.getElementById('status-badge'),
  alertBanner: document.getElementById('alert-banner'),
  alertBannerIcon: document.getElementById('alert-banner-icon'),
  alertBannerTitle: document.getElementById('alert-banner-title'),
  alertBannerMessage: document.getElementById('alert-banner-message'),
  
  maskedKeyValue: document.getElementById('masked-key-value'),
  keyLengthIndicator: document.getElementById('key-length-indicator'),
  keyBadge: document.getElementById('key-badge'),
  latencyVal: document.getElementById('latency-val'),
  btnFetchModels: document.getElementById('btn-fetch-models'),
  
  modelsCount: document.getElementById('models-count'),
  searchModels: document.getElementById('search-models'),
  modelsListContainer: document.getElementById('models-list-container'),
  
  selectedModelBadge: document.getElementById('selected-model-badge'),
  selectActiveModel: document.getElementById('select-active-model'),
  rangeTemp: document.getElementById('range-temp'),
  valTemp: document.getElementById('val-temp'),
  inputTokens: document.getElementById('input-tokens'),
  textareaPrompt: document.getElementById('textarea-prompt'),
  btnSubmitPrompt: document.getElementById('btn-submit-prompt'),
  
  responseBlock: document.getElementById('response-block'),
  outputResponse: document.getElementById('output-response'),
  
  btnCopyLog: document.getElementById('btn-copy-log'),
  tabRequest: document.getElementById('tab-request'),
  tabResponse: document.getElementById('tab-response'),
  codeTerminalBlock: document.getElementById('code-terminal-block'),
  
  // Drag and Drop Elements
  dropzoneContainer: document.getElementById('dropzone-container'),
  dragOverlay: document.getElementById('drag-overlay'),
  attachmentPreview: document.getElementById('attachment-preview'),
  attachmentIcon: document.getElementById('attachment-icon'),
  attachmentName: document.getElementById('attachment-name'),
  attachmentSize: document.getElementById('attachment-size'),
  btnRemoveAttachment: document.getElementById('btn-remove-attachment'),

  // Modalni Elementi
  modelModal: document.getElementById('model-modal'),
  modalClose: document.getElementById('modal-close'),
  modalModelTitle: document.getElementById('modal-model-title'),
  modalModelId: document.getElementById('modal-model-id'),
  modalModelType: document.getElementById('modal-model-type'),
  modalModelInputLimit: document.getElementById('modal-model-input-limit'),
  modalModelOutputLimit: document.getElementById('modal-model-output-limit'),
  modalModelDesc: document.getElementById('modal-model-desc'),
  modalModelUsecases: document.getElementById('modal-model-usecases'),
  modalModelFeatures: document.getElementById('modal-model-features'),
  modalModelCode: document.getElementById('modal-model-code'),
  modalBtnCopyCode: document.getElementById('modal-btn-copy-code'),
  
  // Modal Tabs
  modalTabCode: document.getElementById('modal-tab-code'),
  modalTabVisual: document.getElementById('modal-tab-visual'),
  modalContentCode: document.getElementById('modal-content-code'),
  modalContentVisual: document.getElementById('modal-content-visual')
};

// Baza detaljnih specifikacija za popularne Google Gemini modele
let modelSpecs = {};

async function loadModelSpecs() {
  try {
    const res = await fetch('/api/specs');
    if (res.ok) {
      modelSpecs = await res.json();
    }
  } catch (err) {
    console.error('Greška pri preuzimanju specifikacija modela', err);
  }
}

// ─── API Ograničenja Detekcija ──────────────────────────────────────
// Vraća objekat sa detaljima o ograničenju, ili null ako model radi normalno
function getApiLimitation(shortName) {
  if (shortName.startsWith('imagen-')) {
    return {
      endpoint: ':predict',
      sdk: 'Vertex AI SDK',
      category: 'Generisanje Slika',
      models: 'Imagen 4.0 Generate / Ultra / Fast (3 modela)',
      note: 'Zahteva Google Cloud projekat sa aktiviranim billing nalogom. Ne funkcioniše sa standardnim Gemini API ključem iz AI Studija.'
    };
  }
  if (shortName.startsWith('veo-')) {
    return {
      endpoint: ':predictLongRunning',
      sdk: 'Vertex AI SDK',
      category: 'Generisanje Videa',
      models: 'Veo 2.0 / 3.0 / 3.1 i sve fast/lite varijante (6 modela)',
      note: 'Video generisanje je asinhrono — zahtev traje duže i vraća Operation ID koji se prati. Zahteva Google Cloud + billing.'
    };
  }
  if (shortName.startsWith('lyria-')) {
    return {
      endpoint: 'WebSocket Stream',
      sdk: 'Vertex AI SDK (Streaming)',
      category: 'Generisanje Muzike',
      models: 'Lyria 3 Clip / Pro (2 modela)',
      note: 'Muzički modeli koriste WebSocket streaming konekciju, a ne standardni HTTP POST. Zahteva Google Cloud + billing.'
    };
  }
  return null;
}

// Pomoćna funkcija za čitko formatiranje tokena
function formatTokenCount(count) {
  if (!count) return 'Nije definisano';
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(2)}M (${count.toLocaleString()})`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}k (${count.toLocaleString()})`;
  }
  return count.toLocaleString();
}

// Otvaranje modalnog prozora sa detaljima o modelu
function openModelDetailsModal(model) {
  const modelId = model.name;
  const shortName = modelId.replace('models/', '');
  
  // 1. Potraži predefinisane bogate specifikacije, ili generiši dinamičke na osnovu metapodataka
  let spec = modelSpecs[shortName];
  if (!spec) {
    const isFlash = shortName.includes('flash');
    const isPro = shortName.includes('pro');
    const isEmbedding = shortName.includes('embedding');
    const isAqa = shortName.includes('aqa');
    const isImagen = shortName.includes('imagen') || shortName.includes('banana');

    if (isEmbedding) {
      spec = {
        type: 'Embedding (Tekstualni Vektori)',
        desc: model.description || 'Google model za kreiranje semantičkih vektora visoke dimenzionalnosti iz teksta. Koristi se za prevođenje rečenica i pasusa u matematičke nizove koji omogućavaju poređenje značenja.',
        features: [
          `Vektorska dimenzionalnost: ${shortName.includes('004') ? '768 dimenzija' : 'Zavisi od modela'}`,
          'Izuzetno brza konverzija i minimalna latencija',
          'Optimizovan za semantičko poređenje i kosinusnu sličnost',
          'Stabilna raspodela značenja u vektorskom prostoru'
        ],
        usecases: [
          'Pretraga i preuzimanje u RAG (Retrieval-Augmented Generation) sistemima',
          'Klasifikacija i automatska klasterizacija velikih baza dokumenata',
          'Detektovanje duplikata, sličnosti i plagijata u tekstualnim bazama',
          'Preporuka sličnog sadržaja na osnovu semantičkog značenja teksta'
        ],
        code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generisanje vektora (embeddings) za tekst
const response = await ai.models.embedContent({
  model: '${shortName}',
  contents: 'Gemini modeli su multimodalni i veoma moćni.',
});

console.log('Generisani vektor:', response.embedding.values);`
      };
    } else if (isAqa) {
      spec = {
        type: 'Attributed Question Answering (AQA)',
        desc: model.description || 'Specijalizovani Google model za pouzdano odgovaranje na pitanja na osnovu dostavljenog konteksta. Dizajniran da eliminiše halucinacije pružanjem izvora i citata za svaku izjavu.',
        features: [
          'Precizno odgovaranje zasnovano isključivo na dostavljenim izvorima',
          'Ugrađena detekcija poverenja i procena verovatnoće tačnosti',
          'Automatsko kreiranje citata i referenci za generisane odgovore',
          'Povećana otpornost na netačne i kontradiktorne podatke'
        ],
        usecases: [
          'Korisnički servisi koji zahtevaju 100% proverene i tačne odgovore',
          'Pretraga i analitika u osetljivim sektorima (pravo, medicina, bankarstvo)',
          'Automatsko generisanje dokumentovanih izveštaja sa referencama',
          'Verifikacija i provera činjenica (fact-checking) u bazama znanja'
        ],
        code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Attributed Question Answering poziv sa priloženim dokumentima
const response = await ai.models.generateContent({
  model: '${shortName}',
  contents: {
    role: 'user',
    parts: [
      { text: 'Na osnovu priloženog uputstva, kada treba čistiti filter klime?' }
    ]
  },
  // Ovde se prilaže groundingContext sa izvorima...
});

console.log(response.text);`
      };
    } else if (isImagen) {
      spec = {
        type: 'Generisanje Slika (Imagen)',
        desc: model.description || 'Google model za generisanje i kreativno manipulisanje slikama visoke definicije. Pretvara detaljne tekstualne opise u fotorealistične i stilizovane vizuelne sadržaje.',
        features: [
          'Generisanje slika visoke rezolucije iz tekstualnih opisa',
          'Visoka vernost boja, detalja i prepoznavanja umetničkih stilova',
          'Fleksibilna podrška za različite razmere (aspect ratios)',
          'Mogućnosti uređivanja slika (inpainting, outpainting i blending)'
        ],
        usecases: [
          'Brza izrada konceptualnih umetničkih ilustracija i storibordova',
          'Kreiranje grafičkih materijala za veb stranice i društvene mreže',
          'Dizajn logotipa, ikona i promotivnih banera u realnom vremenu',
          'Automatizovano kreiranje i testiranje marketinških vizuelnih varijacija'
        ],
        code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generisanje slike iz tekstualnog prompta
const response = await ai.models.generateImages({
  model: '${shortName}',
  prompt: 'A sleek minimal smart watch lying on a dark stone surface, soft neon orange accents, high-end commercial shot',
  config: {
    numberOfImages: 1,
    aspectRatio: '1:1'
  }
});

console.log('Slika je uspešno generisana!');`
      };
    } else {
      const supportsLargeContext = model.inputTokenLimit > 120000;
      spec = {
        type: isFlash ? 'Flash (Brzi multimodalni)' : isPro ? 'Pro (Napredno rezonovanje)' : 'Google AI Multimodal',
        desc: model.description || 'Google Gemini multimodalni model za obradu i sintezu širokog spektra informacija uključujući tekst, programski kod i datoteke.',
        features: [
          `Masivni ulazni prozor: ${formatTokenCount(model.inputTokenLimit)} tokena`,
          supportsLargeContext ? 'Izvrstan za duboku analizu dugih konteksta (knjige, repozitorijumi, dugi video zapisi)' : 'Optimizovan za brze pojedinačne upite i visoku reaktivnost',
          'Nativna multimodalnost i analitičko razumevanje podataka',
          'Fleksibilno strukturisanje odgovora i podrška za sistemska uputstva'
        ],
        usecases: [
          supportsLargeContext ? 'Analiza i refaktorisanje celih projektnih foldera sa kodom' : 'Brzo odgovaranje na korisnička pitanja u realnom vremenu',
          'Prevođenje, lokalizacija i sumiranje tekstualnog sadržaja',
          'Pisanje, testiranje i prevođenje programskog koda na druge jezike',
          'Izvlačenje strukturisanih podataka iz nestrukturisanih dokumenata'
        ],
        code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generisanje sadržaja sa Gemini modelom
const response = await ai.models.generateContent({
  model: '${shortName}',
  contents: 'Preporuči mi tri zdrava doručka sa ovsenim pahuljicama.',
});

console.log(response.text);`
      };
    }
    
    // Generički praktičan primer za sve potpuno nove modele koje API vrati
    spec.example_type = 'text';
    spec.example_data = {
      prompt: "Objasni kako svi ovi Gemini modeli rade zajedno.",
      response: "Ovo je potpuno novi Google Gemini model izvučen direktno preko API-ja! Njegova napredna specifikacija još uvek nije detaljno uneta u lokalnu bazu, ali u zavisnosti od svoje vrste, podržava pun spektar multimodalnih funkcionalnosti Gemini ekosistema (tekst, vizija, audio, kodiranje)."
    };
  }

  // 2. Popunjavanje polja u modalu
  dom.modalModelTitle.textContent = model.displayName || shortName;
  dom.modalModelId.textContent = modelId;
  dom.modalModelType.textContent = spec.type;
  
  dom.modalModelInputLimit.textContent = formatTokenCount(model.inputTokenLimit);
  dom.modalModelOutputLimit.textContent = formatTokenCount(model.outputTokenLimit);
  
  dom.modalModelDesc.textContent = spec.desc;
  
  // Popunjavanje primena (Use Cases)
  dom.modalModelUsecases.innerHTML = spec.usecases.map(uc => `
    <li class="flex items-start gap-2 text-zinc-400">
      <i class="fa-solid fa-circle-check text-purple-400 mt-1 flex-shrink-0 text-[10px]"></i>
      <span>${uc}</span>
    </li>
  `).join('');
  
  // Popunjavanje karakteristika (Features)
  dom.modalModelFeatures.innerHTML = spec.features.map(f => `
    <li class="flex items-start gap-2 text-zinc-400">
      <i class="fa-solid fa-arrow-right text-indigo-400 mt-1 flex-shrink-0 text-[10px]"></i>
      <span>${f}</span>
    </li>
  `).join('');
  
  // Popunjavanje koda
  dom.modalModelCode.textContent = spec.code;
  
  // Popunjavanje vizuelnog primera
  renderVisualExample(spec);

  // Reset tabova na "Primer Koda" podrazumevano
  dom.modalTabCode.className = 'py-2.5 px-4 text-emerald-400 border-b-2 border-emerald-500 -mb-px focus:outline-none transition-colors';
  dom.modalTabVisual.className = 'py-2.5 px-4 text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent -mb-px focus:outline-none transition-colors';
  dom.modalContentCode.classList.remove('hidden');
  dom.modalContentVisual.classList.add('hidden');
  
  // 3. Prikazivanje modala sa glatkim efektom
  dom.modelModal.classList.remove('hidden');
}

// Renderovanje vizuelnog primera u zavisnosti od tipa
function renderVisualExample(spec) {
  if (!spec.example_type || !spec.example_data) {
    dom.modalContentVisual.innerHTML = '<p class="text-zinc-500 text-xs italic">Nema dostupnog praktičnog primera za ovaj model.</p>';
    return;
  }
  
  const data = spec.example_data;
  let mediaHtml = '';
  
  if (spec.example_type === 'image') {
    mediaHtml = `<img src="${data.mediaUrl}" alt="Generated example" class="w-full h-auto rounded-xl border border-zinc-800 shadow-md">`;
  } else if (spec.example_type === 'audio') {
    mediaHtml = `
      <div class="bg-zinc-950/80 p-5 rounded-xl border border-zinc-800 flex items-center justify-center w-full">
        <audio controls class="w-full">
          <source src="${data.mediaUrl}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>`;
  } else if (spec.example_type === 'video') {
    mediaHtml = `
      <video controls class="w-full h-auto rounded-xl border border-zinc-800 shadow-md bg-black">
        <source src="${data.mediaUrl}" type="video/mp4">
        Your browser does not support the video element.
      </video>`;
  } else if (spec.example_type === 'text') {
    // Formatiramo Markdown u pravi HTML kako bi izgledao lepo
    const formattedHtml = typeof formatMarkdown === 'function' ? formatMarkdown(data.response) : data.response;
    mediaHtml = `
      <div class="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-zinc-200 text-sm leading-relaxed shadow-inner font-sans">${formattedHtml}</div>
    `;
  }
  
  // Prikaz priloga u promptu (ako postoji)
  let inputMediaHtml = '';
  if (data.inputMediaUrl) {
    if (data.inputMediaUrl.endsWith('.mp3') || data.inputMediaUrl.endsWith('.wav')) {
      inputMediaHtml = `
        <div class="mt-3 p-3 bg-zinc-950/50 rounded-lg border border-indigo-500/30">
          <span class="text-[10px] text-zinc-400 block mb-2 uppercase font-bold tracking-wider"><i class="fa-solid fa-paperclip mr-1"></i> Priloženi Audio Fajl</span>
          <audio controls class="w-full h-8"><source src="${data.inputMediaUrl}" type="audio/mpeg"></audio>
        </div>`;
    } else if (data.inputMediaUrl.endsWith('.mp4')) {
      inputMediaHtml = `
        <div class="mt-3 p-3 bg-zinc-950/50 rounded-lg border border-indigo-500/30">
          <span class="text-[10px] text-zinc-400 block mb-2 uppercase font-bold tracking-wider"><i class="fa-solid fa-paperclip mr-1"></i> Priloženi Video Fajl</span>
          <video controls class="w-full h-auto rounded shadow-sm bg-black"><source src="${data.inputMediaUrl}" type="video/mp4"></video>
        </div>`;
    } else if (data.inputMediaUrl.match(/\.(png|jpg|jpeg)$/i)) {
      inputMediaHtml = `
        <div class="mt-3 p-3 bg-zinc-950/50 rounded-lg border border-indigo-500/30">
          <span class="text-[10px] text-zinc-400 block mb-2 uppercase font-bold tracking-wider"><i class="fa-solid fa-image mr-1"></i> Priložena Slika</span>
          <img src="${data.inputMediaUrl}" class="w-full h-auto rounded shadow-sm">
        </div>`;
    }
  }
  
  dom.modalContentVisual.innerHTML = `
    <div class="space-y-4">
      <div class="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl flex flex-col gap-2">
        <span class="text-[10px] text-indigo-400 font-bold uppercase tracking-wider"><i class="fa-solid fa-user text-indigo-400 mr-1"></i> Korisnički Prompt</span>
        <span class="text-zinc-200 text-sm italic font-medium">"${data.prompt}"</span>
        ${inputMediaHtml}
      </div>
      <div class="flex flex-col gap-2 mt-2">
        <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5"><i class="fa-solid fa-wand-magic-sparkles"></i> Rezultat Modela</span>
        ${mediaHtml}
      </div>
    </div>
  `;
}

// ─── Inicijalizacija i Provera Statusa ──────────────────────────────
async function init() {
  await loadModelSpecs();
  setupEventListeners();
  await checkAPIStatus();
}

// 1. Provera statusa .env ključa sa servera
async function checkAPIStatus() {
  try {
    updateStatusBadge('checking');
    const res = await fetch('/api/status');
    const data = await res.json();
    
    state.configured = data.configured;
    
    if (data.configured) {
      dom.maskedKeyValue.textContent = data.maskedKey;
      dom.keyLengthIndicator.textContent = `${data.keyLength} karaktera`;
      
      dom.keyBadge.textContent = 'Učitan';
      dom.keyBadge.className = 'px-2 py-0.5 rounded-md text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
      
      updateStatusBadge('connected');
      showAlert('success', 'Uspešno povezivanje!', data.message);
      
      // Proaktivno učitaj modele po pokretanju
      await fetchModels();
    } else {
      dom.maskedKeyValue.textContent = 'Nema ključa';
      dom.keyLengthIndicator.textContent = '0 karaktera';
      
      dom.keyBadge.textContent = 'Nije učitan';
      dom.keyBadge.className = 'px-2 py-0.5 rounded-md text-[10px] uppercase font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20';
      
      updateStatusBadge('disconnected');
      showAlert('warning', 'API Ključ nedostaje', data.message);
    }
  } catch (err) {
    updateStatusBadge('error');
    showAlert('danger', 'Greška u komunikaciji sa serverom', err.message);
  }
}

// Pomoćna funkcija za promenu status badge-a u zaglavlju
function updateStatusBadge(status) {
  const badge = dom.statusBadge;
  const indicator = badge.querySelector('span');
  const text = badge.querySelector('span + span');
  
  if (status === 'checking') {
    badge.className = 'px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 bg-zinc-900 border border-zinc-800 text-zinc-400';
    indicator.className = 'w-2.5 h-2.5 rounded-full bg-zinc-500 inline-block animate-pulse';
    text.textContent = 'Provera statusa...';
  } else if (status === 'connected') {
    badge.className = 'px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 active-glow';
    indicator.className = 'w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block';
    text.textContent = 'Veza Aktivna';
  } else if (status === 'disconnected') {
    badge.className = 'px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 text-amber-400';
    indicator.className = 'w-2.5 h-2.5 rounded-full bg-amber-500 inline-block animate-pulse';
    text.textContent = 'Ključ nedostaje';
  } else if (status === 'error') {
    badge.className = 'px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 text-rose-400';
    indicator.className = 'w-2.5 h-2.5 rounded-full bg-rose-500 inline-block';
    text.textContent = 'Greška veze';
  }
}

// Pomoćna funkcija za alert banner
function showAlert(type, title, message) {
  dom.alertBanner.classList.remove('hidden', 'bg-emerald-950/30', 'border-emerald-800/40', 'text-emerald-400', 'bg-amber-950/30', 'border-amber-800/40', 'text-amber-400', 'bg-rose-950/30', 'border-rose-800/40', 'text-rose-400');
  
  if (type === 'success') {
    dom.alertBanner.classList.add('bg-emerald-950/20', 'border-emerald-800/40', 'text-emerald-400');
    dom.alertBannerIcon.className = 'fa-solid fa-circle-check text-emerald-400 mt-0.5 text-lg';
  } else if (type === 'warning') {
    dom.alertBanner.classList.add('bg-amber-950/20', 'border-amber-800/40', 'text-amber-400');
    dom.alertBannerIcon.className = 'fa-solid fa-circle-exclamation text-amber-400 mt-0.5 text-lg';
  } else if (type === 'danger') {
    dom.alertBanner.classList.add('bg-rose-950/20', 'border-rose-800/40', 'text-rose-400');
    dom.alertBannerIcon.className = 'fa-solid fa-circle-xmark text-rose-400 mt-0.5 text-lg';
  }
  
  dom.alertBannerTitle.textContent = title;
  dom.alertBannerMessage.textContent = message;
  dom.alertBanner.classList.remove('hidden');
}

// ─── Preuzimanje i Prikaz Modela ────────────────────────────────────
async function fetchModels() {
  if (!state.configured) return;
  
  try {
    dom.btnFetchModels.disabled = true;
    dom.btnFetchModels.innerHTML = '<i class="fa-solid fa-rotate animate-spin mr-2"></i> Preuzimam modele...';
    
    // Priprema loader-a u listi
    dom.modelsListContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center py-16 text-zinc-500">
        <i class="fa-solid fa-spinner animate-spin text-3xl text-indigo-500 mb-4"></i>
        <p class="text-sm">Učitavanje Gemini modela sa servera...</p>
      </div>
    `;
    
    const res = await fetch('/api/models');
    const data = await res.json();
    
    // Upis u JSON terminal
    updateJSONConsole(data.rawRequest, data.rawResponse || data);
    
    if (res.ok && data.success) {
      // Dedupliciraj modele po jedinstvenom nazivu (name) kako bismo sprečili duplikate
      const uniqueModels = [];
      const seenNames = new Set();
      (data.models || []).forEach(model => {
        if (!seenNames.has(model.name)) {
          seenNames.add(model.name);
          uniqueModels.push(model);
        }
      });
      
      state.models = uniqueModels;
      dom.modelsCount.textContent = `${state.models.length} modela`;
      dom.latencyVal.textContent = `${data.latency} ms`;
      
      renderModelsList(state.models);
      populateModelDropdown(state.models);
      
      // Auto-odaberi popularan model (npr. gemini-2.5-flash ili prvi u listi)
      const defaultModel = state.models.find(m => m.name.includes('gemini-2.5-flash') || m.name.includes('gemini-1.5-flash')) || state.models[0];
      if (defaultModel) {
        selectModel(defaultModel.name);
      }
      
      showAlert('success', 'Modeli su uspešno učitani!', `Pronađeno je ${state.models.length} dostupnih modela na vašem Gemini nalogu. Latencija API rute: ${data.latency}ms.`);
    } else {
      dom.modelsCount.textContent = '0 modela';
      dom.modelsListContainer.innerHTML = `
        <div class="text-center py-10 text-rose-400 border border-rose-900/30 rounded-2xl bg-rose-950/10 flex flex-col items-center justify-center p-4">
          <i class="fa-solid fa-triangle-exclamation text-3xl mb-3"></i>
          <p class="text-sm font-semibold">Greška pri učitavanju modela</p>
          <p class="text-xs text-zinc-500 mt-1">${typeof data.error === 'object' ? (data.error.message || JSON.stringify(data.error)) : (data.error || 'Server je vratio neispravan odgovor.')}</p>
        </div>
      `;
      const errMsg = typeof data.error === 'object' ? (data.error.message || JSON.stringify(data.error)) : data.error;
      showAlert('danger', 'Greška u preuzimanju modela', errMsg || 'Nije moguće učitati modele.');
    }
  } catch (err) {
    showAlert('danger', 'Mrežna greška', err.message);
  } finally {
    dom.btnFetchModels.disabled = false;
    dom.btnFetchModels.innerHTML = '<i class="fa-solid fa-rotate"></i> Preuzmi i Testiraj Modele';
  }
}

// Popunjavanje padajućeg menija za prompt tester
function populateModelDropdown(models) {
  dom.selectActiveModel.innerHTML = '';
  
  if (models.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = 'Nema dostupnih modela';
    opt.disabled = true;
    dom.selectActiveModel.appendChild(opt);
    return;
  }
  
  models.forEach(model => {
    const opt = document.createElement('option');
    opt.value = model.name;
    // Prikazujemo čitko ime
    const displayName = model.displayName || model.name.replace('models/', '');
    opt.textContent = `${displayName} (${model.name.split('/').pop()})`;
    dom.selectActiveModel.appendChild(opt);
  });
}

// Renderovanje kartica modela u levoj koloni
function renderModelsList(modelsToRender) {
  dom.modelsListContainer.innerHTML = '';
  
  if (modelsToRender.length === 0) {
    dom.modelsListContainer.innerHTML = `
      <div class="text-center py-10 text-zinc-500 border border-zinc-800 rounded-2xl bg-zinc-950/20 flex flex-col items-center justify-center">
        <i class="fa-solid fa-magnifying-glass text-2xl mb-2 text-zinc-700"></i>
        <p class="text-xs">Nema modela koji odgovaraju pretrazi.</p>
      </div>
    `;
    return;
  }
  
  modelsToRender.forEach(model => {
    const modelId = model.name;
    const shortName = modelId.replace('models/', '');
    const isFlash = shortName.includes('flash');
    const isPro = shortName.includes('pro');
    
    // Klasa za badge boje
    let badgeClass = 'bg-zinc-800 text-zinc-400';
    if (isFlash) badgeClass = 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20';
    else if (isPro) badgeClass = 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
    
    const isSelected = state.selectedModel === modelId;
    const activeBorderClass = isSelected 
      ? 'border-indigo-500 bg-indigo-500/5 ring-1 ring-indigo-500' 
      : 'border-zinc-800/80 hover:border-zinc-700 bg-zinc-950/30';

    const card = document.createElement('div');
    card.className = `p-4 rounded-2xl border ${activeBorderClass} transition-all duration-300 cursor-pointer flex flex-col space-y-2 group relative overflow-hidden`;
    card.dataset.modelId = modelId;
    
    const limitation = getApiLimitation(shortName);
    const limitationBadge = limitation
      ? `<span class="mt-1.5 inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] px-1.5 py-0.5 rounded font-bold w-fit"><i class="fa-solid fa-triangle-exclamation"></i> Vertex AI Endpoint</span>`
      : '';

    card.innerHTML = `
      <div class="flex items-start justify-between">
        <div class="flex-grow pr-2">
          <h3 class="font-semibold text-sm text-zinc-200 group-hover:text-indigo-400 transition-colors flex items-center">
            ${model.displayName || shortName}
            ${!modelSpecs[shortName] ? '<span class="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] px-1.5 py-0.5 rounded ml-2 font-bold animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]">NOVO</span>' : ''}
          </h3>
          <code class="text-[10px] text-zinc-500 font-mono-custom break-all block mt-1">${modelId}</code>
          ${limitationBadge}
        </div>
        <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${badgeClass}">
          ${isFlash ? 'Flash' : isPro ? 'Pro' : 'Model'}
        </span>
      </div>
      
      <p class="text-xs text-zinc-400/80 line-clamp-2">${model.description || 'Nema opisa za ovaj model.'}</p>
      
      <div class="flex items-center justify-between text-[10px] text-zinc-500 pt-1 border-t border-zinc-800/50">
        <div class="flex items-center gap-4">
          <span title="Maksimalni broj ulaznih tokena"><i class="fa-solid fa-arrow-right-to-bracket mr-1 text-zinc-600"></i> In: ${(model.inputTokenLimit / 1000).toFixed(0)}k</span>
          <span title="Maksimalni broj izlaznih tokena"><i class="fa-solid fa-arrow-right-from-bracket mr-1 text-zinc-600"></i> Out: ${(model.outputTokenLimit / 1000).toFixed(0)}k</span>
        </div>
        <button class="info-btn px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 hover:bg-zinc-800 transition-all flex items-center gap-1 cursor-pointer" title="Pogledaj specifikaciju modela">
          <i class="fa-solid fa-circle-info text-[9px]"></i>
          <span>Detalji</span>
        </button>
      </div>
    `;
    
    // Bind info button click to open modal
    const infoBtn = card.querySelector('.info-btn');
    infoBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Sprečava selektovanje modela pri kliku na info dugme
      openModelDetailsModal(model);
    });

    card.addEventListener('click', () => {
      selectModel(modelId);
    });
    
    dom.modelsListContainer.appendChild(card);
  });
}

// Biranje konkretnog modela
function selectModel(modelId) {
  state.selectedModel = modelId;
  
  // Ažuriraj selektovan badge u interfejsu
  const shortName = modelId.replace('models/', '');
  dom.selectedModelBadge.textContent = shortName;
  dom.selectedModelBadge.className = 'px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 active-glow';
  
  // Ažuriraj padajući meni
  dom.selectActiveModel.value = modelId;
  
  // Dinamičko ažuriranje placeholder-a na osnovu tipa modela i naših novih primera iz baze
  const spec = modelSpecs[shortName];
  if (spec && spec.example_data && spec.example_data.prompt) {
    dom.textareaPrompt.placeholder = `Probajte: "${spec.example_data.prompt}"`;
  } else {
    dom.textareaPrompt.placeholder = "Napišite nešto za Gemini (npr. 'Objasni kvantnu fiziku')...";
  }

  // Proveri da li model ima API ograničenje i prikaži objašnjenje u output oblasti
  const limitation = getApiLimitation(shortName);
  if (limitation) {
    dom.responseBlock.classList.remove('hidden');
    dom.outputResponse.innerHTML = `
      <div class="p-4 bg-amber-950/20 border border-amber-700/40 rounded-xl text-sm flex flex-col gap-3">
        <div class="flex items-center gap-2 text-amber-400 font-bold">
          <i class="fa-solid fa-triangle-exclamation text-base"></i>
          <span>Ovaj model nije dostupan putem standardnog Gemini API Testera</span>
        </div>
        <p class="text-zinc-300 text-xs leading-relaxed">
          <strong class="text-amber-300">${limitation.category} → ${limitation.models}</strong> koriste poseban 
          <code class="bg-zinc-900 px-1 py-0.5 rounded text-amber-300 font-mono">${limitation.endpoint}</code> endpoint 
          koji je deo <strong class="text-amber-300">${limitation.sdk}</strong>-a, a ne standardnog 
          <code class="bg-zinc-900 px-1 py-0.5 rounded text-zinc-400 font-mono">:generateContent</code> endpointa koji ovaj tester koristi.
        </p>
        <div class="grid grid-cols-2 gap-2 text-[11px]">
          <div class="bg-zinc-900/60 rounded-lg p-2.5 border border-zinc-800">
            <span class="text-zinc-500 block mb-1 uppercase tracking-wider font-bold text-[9px]">Potreban Endpoint</span>
            <code class="text-amber-400 font-mono">${limitation.endpoint}</code>
          </div>
          <div class="bg-zinc-900/60 rounded-lg p-2.5 border border-zinc-800">
            <span class="text-zinc-500 block mb-1 uppercase tracking-wider font-bold text-[9px]">Potreban SDK</span>
            <code class="text-amber-400 font-mono">${limitation.sdk}</code>
          </div>
        </div>
        <p class="text-zinc-500 text-[11px] leading-relaxed border-t border-zinc-800 pt-3">
          <i class="fa-solid fa-circle-info mr-1 text-zinc-600"></i>
          ${limitation.note}
          Pogledajte <strong class="text-zinc-300">Kod</strong> tab u kartici ovog modela za tačan primer implementacije.
        </p>
      </div>
    `;
    dom.btnSubmitPrompt.disabled = true;
  } else {
    // Sakrij staro objašnjenje ako postoji i model je normalan
    if (dom.outputResponse.innerHTML.includes('Vertex AI SDK')) {
      dom.responseBlock.classList.add('hidden');
      dom.outputResponse.innerHTML = '';
    }
  }
  
  // Renderuj ponovo listu da se ažuriraju vizuelni borderi kartica
  const filtered = filterModelsList(dom.searchModels.value);
  renderModelsList(filtered);
  
  // Omogući slanje prompta ako imamo prompt unet (samo za modele bez ograničenja)
  if (!limitation) validatePromptSubmission();
}

// ─── Filtriranje Modela ─────────────────────────────────────────────
function filterModelsList(query) {
  if (!query) return state.models;
  const q = query.toLowerCase();
  return state.models.filter(m => 
    (m.displayName && m.displayName.toLowerCase().includes(q)) || 
    m.name.toLowerCase().includes(q) ||
    (m.description && m.description.toLowerCase().includes(q))
  );
}

// ─── Slanje Promptova i Generisanje Odgovora ───────────────────────
async function submitPrompt() {
  const prompt = dom.textareaPrompt.value.trim();
  const model = state.selectedModel;
  
  if (!prompt || !model) return;
  
  try {
    // UI Loading state
    dom.btnSubmitPrompt.disabled = true;
    dom.btnSubmitPrompt.innerHTML = '<i class="fa-solid fa-spinner animate-spin mr-2"></i> Generišem odgovor sa Gemini...';
    
    dom.responseBlock.classList.remove('hidden');
    dom.outputResponse.innerHTML = `
      <div class="flex items-center space-x-3 py-3 text-zinc-400">
        <i class="fa-solid fa-gear animate-spin text-lg text-indigo-500"></i>
        <span>Gemini razmišlja i kreira odgovor...</span>
      </div>
    `;
    
    const requestBody = {
      model,
      prompt,
      temperature: parseFloat(dom.rangeTemp.value)
    };
    
    // Dodaj zakačeni fajl ako postoji
    if (state.droppedFile) {
      requestBody.inlineData = {
        mimeType: state.droppedFile.mimeType,
        base64: state.droppedFile.base64
      };
    }
    
    // Dodaj maxOutputTokens ako je unet
    const maxTokensVal = dom.inputTokens.value.trim();
    if (maxTokensVal) {
      requestBody.maxOutputTokens = parseInt(maxTokensVal);
    }
    
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });
    
    let data;
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      data = await res.json();
    } else {
      const textResponse = await res.text();
      throw new Error(`Server je vratio neispravan format (nije JSON). Moguće je da je fajl prevelik ili da je server pao.`);
    }
    
    // Ažuriraj JSON terminal
    updateJSONConsole(data.rawRequest || requestBody, data.rawResponse || data);
    
    if (res.ok && data.success) {
      dom.latencyVal.textContent = `${data.latency} ms`;
      
      // Parsiranje i prikaz odgovora
      const responseHtml = parseGeminiResponse(data.rawResponse);
      if (responseHtml) {
        dom.outputResponse.innerHTML = responseHtml;
      } else {
        dom.outputResponse.innerHTML = `<span class="text-zinc-500 italic">API je vratio uspešan status, ali bez vizuelnog ili tekstualnog sadržaja. Proverite JSON odgovor.</span>`;
      }
    } else {
      dom.outputResponse.innerHTML = `
        <div class="p-3 bg-rose-950/20 border border-rose-900/30 rounded-xl text-rose-400 text-xs flex items-start gap-2">
          <i class="fa-solid fa-circle-exclamation mt-0.5 text-base"></i>
          <div>
            <span class="font-semibold block">Greška pri generisanju</span>
            <span>${data.error?.message || data.error || 'Server je vratio statusnu grešku.'}</span>
          </div>
        </div>
      `;
    }
  } catch (err) {
    dom.outputResponse.innerHTML = `<span class="text-rose-400">Mrežna greška: ${err.message}</span>`;
  } finally {
    dom.btnSubmitPrompt.disabled = false;
    dom.btnSubmitPrompt.innerHTML = '<i class="fa-solid fa-bolt text-xs"></i> Pošalji Zahtev Modelu';
  }
}

// Parsiranje odgovora iz standardnog Gemini API JSON payload-a
function parseGeminiResponse(json) {
  try {
    const parts = json.candidates[0].content.parts;
    let htmlResult = '';
    
    parts.forEach(part => {
      if (part.text) {
        htmlResult += formatMarkdown(part.text);
      } 
      if (part.inlineData) {
        const mime = part.inlineData.mimeType;
        const b64 = part.inlineData.data;
        
        let ext = mime.split('/')[1] || 'bin';
        if (mime.includes('jpeg')) ext = 'jpg';
        if (mime.includes('mpeg')) ext = 'mp3';
        
        const downloadBtn = `<a href="data:${mime};base64,${b64}" download="gemini_generated.${ext}" class="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-xs text-zinc-300 transition-colors cursor-pointer w-fit"><i class="fa-solid fa-download"></i> Sačuvaj Fajl</a>`;

        if (mime.startsWith('image/')) {
          htmlResult += `<div class="mt-4 mb-2 flex flex-col"><img src="data:${mime};base64,${b64}" class="max-w-full h-auto rounded-xl border border-zinc-700 shadow-lg">${downloadBtn}</div>`;
        } else if (mime.startsWith('audio/')) {
          htmlResult += `<div class="mt-4 mb-2 p-3 bg-zinc-900 rounded-lg border border-zinc-700 flex flex-col"><span class="text-[10px] text-zinc-400 block mb-2 uppercase font-bold tracking-wider"><i class="fa-solid fa-music mr-1"></i> Generisani Audio</span><audio controls class="w-full"><source src="data:${mime};base64,${b64}" type="${mime}"></audio>${downloadBtn}</div>`;
        } else if (mime.startsWith('video/')) {
          htmlResult += `<div class="mt-4 mb-2 flex flex-col"><video controls class="max-w-full h-auto rounded-xl border border-zinc-700 shadow-lg"><source src="data:${mime};base64,${b64}" type="${mime}"></video>${downloadBtn}</div>`;
        } else {
          htmlResult += `<div class="mt-4 mb-2 p-3 bg-zinc-900 rounded-lg border border-zinc-700 flex flex-col items-start gap-2"><span class="text-xs text-zinc-400"><i class="fa-solid fa-file mr-1"></i> Generisan fajl tipa: ${mime}</span>${downloadBtn}</div>`;
        }
      }
    });
    
    return htmlResult || null;
  } catch (e) {
    return null;
  }
}

// Provera da li dugme za prompt treba biti aktivno
function validatePromptSubmission() {
  const promptText = dom.textareaPrompt.value.trim();
  const hasModel = !!state.selectedModel;
  const hasFile = !!state.droppedFile;
  dom.btnSubmitPrompt.disabled = !((promptText || hasFile) && hasModel);
}

// ─── Markdown Parser i Formatiranje ────────────────────────────────
// Jednostavan i brz parser za ulepšavanje Gemini markdown odgovora
function formatMarkdown(text) {
  if (!text) return '';
  
  let html = text
    // Zaštita od HTML injekcija
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Naslovi
    .replace(/^### (.*$)/gim, '<h4 class="text-sm font-bold text-white mt-3 mb-1">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 class="text-base font-bold text-indigo-300 mt-4 mb-2">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 class="text-lg font-extrabold text-white mt-5 mb-2 border-b border-zinc-800 pb-1">$1</h2>')
    // Podebljan tekst
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white bg-indigo-500/10 px-1 rounded">$1</strong>')
    // Kurziv
    .replace(/\*(.*?)\*/g, '<em class="italic text-zinc-300">$1</em>')
    // Code block-ovi (fenced ```code```)
    .replace(/```([\s\S]*?)```/g, '<pre class="my-3 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-mono-custom text-indigo-300 overflow-x-auto whitespace-pre">$1</pre>')
    // Inline code (inline `code`)
    .replace(/`(.*?)`/g, '<code class="bg-zinc-900 border border-zinc-800 text-purple-400 font-mono-custom px-1.5 py-0.5 rounded text-xs">$1</code>')
    // Liste
    .replace(/^\s*-\s+(.*$)/gim, '<li class="ml-4 list-disc text-zinc-300 my-1">$1</li>')
    .replace(/^\s*\*\s+(.*$)/gim, '<li class="ml-4 list-disc text-zinc-300 my-1">$1</li>')
    .replace(/^\s*\d+\.\s+(.*$)/gim, '<li class="ml-4 list-decimal text-zinc-300 my-1">$1</li>')
    // Novi redovi (paragrafi)
    .replace(/\n/g, '<br>');

  return html;
}

// ─── JSON Konzola (Debugging Terminal) ──────────────────────────────
function updateJSONConsole(request, response) {
  state.lastRequest = request;
  state.lastResponse = response;
  
  renderJSONTab();
}

function renderJSONTab() {
  const targetData = state.activeTab === 'request' ? state.lastRequest : state.lastResponse;
  
  if (!targetData) {
    dom.codeTerminalBlock.textContent = '// Nema zabeleženih podataka za ovu tab karticu.';
    dom.codeTerminalBlock.parentElement.className = 'bg-black/90 p-4 rounded-2xl text-xs font-mono-custom text-zinc-500 overflow-x-auto overflow-y-auto max-h-[250px] border border-zinc-800 min-h-[140px] leading-normal whitespace-pre-wrap break-words';
    dom.codeTerminalBlock.className = '';
    return;
  }
  
  dom.codeTerminalBlock.textContent = JSON.stringify(targetData, null, 2);
  dom.codeTerminalBlock.parentElement.className = 'bg-black/90 p-4 rounded-2xl text-xs font-mono-custom text-emerald-400 overflow-x-auto overflow-y-auto max-h-[250px] border border-zinc-800 min-h-[140px] leading-normal whitespace-pre-wrap break-words';
  dom.codeTerminalBlock.className = '';
}

// Kopiranje sadržaja terminala
function copyConsoleToClipboard() {
  const codeText = dom.codeTerminalBlock.textContent;
  if (!codeText || codeText.startsWith('//')) return;
  
  navigator.clipboard.writeText(codeText)
    .then(() => {
      const originalText = dom.btnCopyLog.innerHTML;
      dom.btnCopyLog.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i> Kopirano!';
      dom.btnCopyLog.classList.add('border-emerald-800', 'text-emerald-400');
      
      setTimeout(() => {
        dom.btnCopyLog.innerHTML = originalText;
        dom.btnCopyLog.classList.remove('border-emerald-800', 'text-emerald-400');
      }, 2000);
    })
    .catch(err => {
      console.error('Kopiranje nije uspelo', err);
    });
}

// ─── Event Listener-i ───────────────────────────────────────────────
function setupEventListeners() {
  // Drag and Drop Logika
  const container = dom.dropzoneContainer;
  
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    container.addEventListener(eventName, preventDefaults, false);
  });
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    container.addEventListener(eventName, () => {
      dom.dragOverlay.classList.remove('hidden', 'opacity-0');
      dom.dragOverlay.classList.add('opacity-100');
    }, false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    container.addEventListener(eventName, () => {
      dom.dragOverlay.classList.add('hidden', 'opacity-0');
      dom.dragOverlay.classList.remove('opacity-100');
    }, false);
  });

  container.addEventListener('drop', (e) => {
    let dt = e.dataTransfer;
    let files = dt.files;
    if (files && files.length > 0) {
      handleDroppedFile(files[0]);
    }
  }, false);

  dom.btnRemoveAttachment.addEventListener('click', () => {
    state.droppedFile = null;
    dom.attachmentPreview.classList.add('hidden');
    validatePromptSubmission();
  });
  
  function handleDroppedFile(file) {
    // 5MB limit
    if (file.size > 5 * 1024 * 1024) {
      showAlert('danger', 'Fajl je prevelik', 'Maksimalna dozvoljena veličina fajla je 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function() {
      const base64data = reader.result.split(',')[1];
      state.droppedFile = {
        base64: base64data,
        mimeType: file.type,
        name: file.name,
        size: file.size
      };
      
      // Update UI
      dom.attachmentName.textContent = file.name;
      const kb = file.size / 1024;
      dom.attachmentSize.textContent = kb > 1024 ? (kb / 1024).toFixed(2) + ' MB' : kb.toFixed(1) + ' KB';
      
      // Set icon based on type
      if (file.type.startsWith('image/')) {
        dom.attachmentIcon.innerHTML = '<i class="fa-regular fa-image text-emerald-400 text-lg"></i>';
      } else if (file.type.startsWith('audio/')) {
        dom.attachmentIcon.innerHTML = '<i class="fa-solid fa-music text-purple-400 text-lg"></i>';
      } else if (file.type.startsWith('video/')) {
        dom.attachmentIcon.innerHTML = '<i class="fa-solid fa-video text-rose-400 text-lg"></i>';
      } else {
        dom.attachmentIcon.innerHTML = '<i class="fa-regular fa-file text-indigo-400 text-lg"></i>';
      }
      
      dom.attachmentPreview.classList.remove('hidden');
      validatePromptSubmission();
    }
  }

  // Dugme za preuzimanje modela
  dom.btnFetchModels.addEventListener('click', fetchModels);
  
  // Pretraga modela u realnom vremenu
  dom.searchModels.addEventListener('input', (e) => {
    const filtered = filterModelsList(e.target.value);
    renderModelsList(filtered);
  });
  
  // Promena padajuće liste modela
  dom.selectActiveModel.addEventListener('change', (e) => {
    selectModel(e.target.value);
  });
  
  // Slanje prompta
  dom.btnSubmitPrompt.addEventListener('click', submitPrompt);
  
  // Validacija textarea pri kucanju
  dom.textareaPrompt.addEventListener('input', validatePromptSubmission);
  
  // Temperatura slider
  dom.rangeTemp.addEventListener('input', (e) => {
    dom.valTemp.textContent = parseFloat(e.target.value).toFixed(1);
  });
  
  // Kopiranje logova
  dom.btnCopyLog.addEventListener('click', copyConsoleToClipboard);
  
  // Tabovi konzole
  dom.tabRequest.addEventListener('click', () => {
    state.activeTab = 'request';
    dom.tabRequest.className = 'py-2.5 px-4 text-indigo-400 border-b-2 border-indigo-500 -mb-px focus:outline-none';
    dom.tabResponse.className = 'py-2.5 px-4 text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent -mb-px focus:outline-none';
    renderJSONTab();
  });
  
  dom.tabResponse.addEventListener('click', () => {
    state.activeTab = 'response';
    dom.tabResponse.className = 'py-2.5 px-4 text-indigo-400 border-b-2 border-indigo-500 -mb-px focus:outline-none';
    dom.tabRequest.className = 'py-2.5 px-4 text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent -mb-px focus:outline-none';
    renderJSONTab();
  });

  // Tabovi u Modalu
  dom.modalTabCode.addEventListener('click', () => {
    dom.modalTabCode.className = 'py-2.5 px-4 text-emerald-400 border-b-2 border-emerald-500 -mb-px focus:outline-none transition-colors';
    dom.modalTabVisual.className = 'py-2.5 px-4 text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent -mb-px focus:outline-none transition-colors';
    dom.modalContentCode.classList.remove('hidden');
    dom.modalContentVisual.classList.add('hidden');
  });

  dom.modalTabVisual.addEventListener('click', () => {
    dom.modalTabVisual.className = 'py-2.5 px-4 text-emerald-400 border-b-2 border-emerald-500 -mb-px focus:outline-none transition-colors';
    dom.modalTabCode.className = 'py-2.5 px-4 text-zinc-500 hover:text-zinc-300 border-b-2 border-transparent -mb-px focus:outline-none transition-colors';
    dom.modalContentVisual.classList.remove('hidden');
    dom.modalContentCode.classList.add('hidden');
  });

  // Zatvaranje modala na dugme (x)
  dom.modalClose.addEventListener('click', () => {
    dom.modelModal.classList.add('hidden');
  });

  // Zatvaranje modala klikom van sadržaja (na pozadinu)
  dom.modelModal.addEventListener('click', (e) => {
    if (e.target === dom.modelModal) {
      dom.modelModal.classList.add('hidden');
    }
  });

  // Kopiranje koda iz modala
  dom.modalBtnCopyCode.addEventListener('click', () => {
    const codeText = dom.modalModelCode.textContent;
    navigator.clipboard.writeText(codeText)
      .then(() => {
        const originalText = dom.modalBtnCopyCode.innerHTML;
        dom.modalBtnCopyCode.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i> Kopirano!';
        dom.modalBtnCopyCode.classList.add('border-emerald-800', 'text-emerald-400');
        
        setTimeout(() => {
          dom.modalBtnCopyCode.innerHTML = originalText;
          dom.modalBtnCopyCode.classList.remove('border-emerald-800', 'text-emerald-400');
        }, 2000);
      })
      .catch(err => {
        console.error('Kopiranje koda nije uspelo', err);
      });
  });
}

// Pokreni aplikaciju
document.addEventListener('DOMContentLoaded', init);
