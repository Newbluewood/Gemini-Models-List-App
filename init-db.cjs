const Database = require('better-sqlite3');
const modelSpecs = require('./temp_specs.cjs');

const db = new Database('models.db');

db.exec(`
  DROP TABLE IF EXISTS models;
  CREATE TABLE models (
    id TEXT PRIMARY KEY,
    type TEXT,
    desc TEXT,
    features TEXT,
    usecases TEXT,
    code TEXT,
    example_type TEXT,
    example_data TEXT
  )
`);

const insert = db.prepare(`
  INSERT INTO models (id, type, desc, features, usecases, code, example_type, example_data)
  VALUES (@id, @type, @desc, @features, @usecases, @code, @example_type, @example_data)
`);

db.transaction(() => {
  for (const [key, spec] of Object.entries(modelSpecs)) {
    let example_type = 'text';
    let example_data = {};

    // ─── Povezana Priča 1: Podaci i Analitika (Flash -> Pro -> Embedding) ───
    if (key === 'gemini-2.5-flash' || key === 'gemini-1.5-flash' || key.includes('flash-lite')) {
      example_type = 'text';
      example_data = {
        prompt: "Generiši mock JSON dataset sa prodajom 3 modela telefona u decembru.",
        response: '```json\n{\n  "decembar": [\n    {"model": "Pixel 8", "prodato": 1200, "profit": 360000},\n    {"model": "Pixel 8 Pro", "prodato": 800, "profit": 320000},\n    {"model": "Pixel 7a", "prodato": 2100, "profit": 315000}\n  ]\n}\n```'
      };
    } 
    else if (key === 'gemini-2.5-pro' || key === 'gemini-1.5-pro' || key === 'gemini-3-pro-preview' || key.includes('pro-latest')) {
      example_type = 'text';
      example_data = {
        prompt: "Analiziraj Excel tabelu sa priloženog screenshot-a radne površine i izračunaj koji model telefona donosi najveći ukupan profit.",
        inputMediaUrl: "examples/desktop-sample.png",
        response: "Na osnovu prikazane tabele u Excel-u, iako je **Pixel 7a** najprodavaniji, najveći ukupni profit doneo je **Pixel 8** (360.000$) zahvaljujući boljoj marži."
      };
    }
    else if (key.includes('embedding')) {
      example_type = 'text';
      example_data = {
        prompt: "Pretvori priloženu sliku robota u multimodalni semantički vektor (Image Embedding) za vizuelnu pretragu.",
        inputMediaUrl: "examples/image-sample.png",
        response: "[0.0142, -0.2215, 0.4451, 0.8812, -0.0054, 0.1129, 0.5532, -0.9912, 0.3341, ...]\n\n*Napomena: Ovi brojevi sada omogućavaju sistemu da pronađe ovu sliku kada korisnik u pretragu ukuca 'futuristički robot u neonskoj šumi'.*"
      };
    }

    // ─── Povezana Priča 2: Kreiranje Sadržaja i Audio (Pro/Flash -> TTS) ───
    else if (key === 'gemini-3.1-pro-preview' || key === 'gemini-3.5-flash') {
      example_type = 'text';
      example_data = {
        prompt: "Napiši kratku, energičnu uvodnu rečenicu za podkast gde ćemo testirati nove Gemini modele.",
        response: "Zdravo svima! Dobrodošli u novu epizodu gde otključavamo budućnost i uživo testiramo šta sve najnoviji Gemini modeli zapravo mogu!"
      };
    }
    else if (key.includes('tts')) {
      example_type = 'audio';
      example_data = {
        prompt: "Sintetiši sledeći tekst u prirodan ljudski govor: 'Zdravo svima! Dobrodošli u novu epizodu gde otključavamo budućnost i uživo testiramo šta sve najnoviji Gemini modeli zapravo mogu!'",
        mediaUrl: "examples/voice-sample.mp3"
      };
    }

    // ─── Povezana Priča 3: Slike i Editovanje (Imagen -> Vision/Inpainting) ───
    else if (key.startsWith('imagen-4.0') && !key.includes('fast')) {
      example_type = 'image';
      example_data = {
        prompt: "A highly detailed, cinematic shot of a futuristic robot exploring a glowing neon forest, 4k resolution, photorealistic.",
        mediaUrl: "examples/image-sample.png"
      };
    }
    else if (key.includes('image-preview') || key.includes('flash-image')) {
      example_type = 'image';
      example_data = {
        prompt: "Analiziraj sliku u prilogu i ukloni robota !",
        inputMediaUrl: "examples/image-sample.png",
        mediaUrl: "examples/image-sample-edited.png" 
      };
    }
    else if (key.includes('banana')) {
      example_type = 'image';
      example_data = {
        prompt: "Detaljno analiziraj osvetljenje na slici robota i napravi masku dubine (Depth Map) za integraciju u 3D softver.",
        inputMediaUrl: "examples/image-sample.png",
        mediaUrl: "examples/depth-map-sample.png"
      };
    }

    // ─── Povezana Priča 4: Kod, Agenti i Akcije (Gemma -> Computer Use) ───
    else if (key.includes('gemma')) {
      example_type = 'text';
      example_data = {
        prompt: "Napiši Python skriptu koristeći BeautifulSoup koja skuplja cene telefona sa e-commerce sajta (kako bismo napunili onaj JSON dataset iz prvog primera).",
        response: "```python\nimport requests\nfrom bs4 import BeautifulSoup\n\nurl = 'https://example-shop.com/phones'\nres = requests.get(url)\nsoup = BeautifulSoup(res.text, 'html.parser')\n\nfor product in soup.find_all('div', class_='product'):\n    name = product.find('h2').text\n    price = product.find('span', class_='price').text\n    print(f'{name}: {price}')\n```"
      };
    }
    else if (key.includes('computer-use') || key.includes('robotics') || key.includes('antigravity')) {
      example_type = 'image'; 
      example_data = {
        prompt: "Otvori VS Code, zalepi prethodnu Python skriptu, pokreni je u terminalu, sačuvaj rezultate u Excel fajl i pošalji mi ga na mail.",
        mediaUrl: "examples/desktop-sample.png" // Screenshot sa VS Code i Excel-om
      };
    }

    // ─── Povezana Priča 5: Muzika i Video (Lyria -> Veo) ───
    else if (key.includes('lyria')) {
      example_type = 'audio';
      example_data = {
        prompt: "Kreiraj 30-sekundni lo-fi hip hop beat sa sintisajzerima koji bi savršeno odgovarao uz sliku futurističkog robota u neonskoj šumi.",
        mediaUrl: "examples/audio_generated_by_lyria.m4a"
      };
    }
    else if (key.includes('veo')) {
      example_type = 'video';
      example_data = {
        prompt: "Koristeći sliku robota kao početni frejm i lo-fi beat kao muziku, animiraj scenu: robot polako podiže glavu, a neonske lampice na drveću pulsiraju u ritmu muzike.",
        inputMediaUrl: "examples/image-sample.png",
        mediaUrl: "examples/video_generated_by_veo31.mp4"
      };
    }
    
    // ─── Povezana Priča 6: Ekstrakcija iz Medija (Audio/Video Transkripcija) ───
    else if (key.includes('gemini-2.0-flash') && !key.includes('lite')) {
      example_type = 'text';
      example_data = {
        prompt: "Preslušaj priloženi 'voice-sample.mp3' fajl i izvuci tačan tekst (Audio-to-Text Transcription).",
        inputMediaUrl: "examples/voice-sample.mp3",
        response: "> Zdravo svima! Dobrodošli u novu epizodu gde otključavamo budućnost i uživo testiramo šta sve najnoviji Gemini modeli zapravo mogu!\n\n*Napomena:* Analiza je završena za 0.2s. Prepoznat je srpski jezik, a ton glasa je detektovan kao entuzijastičan."
      };
    }
    else if (key === 'gemini-3-flash-preview' || key === 'gemini-flash-latest') {
      example_type = 'text';
      example_data = {
        prompt: "Pogledaj 'video_generated_by_veo31.mp4' i ukratko opiši šta se dešava u sceni (Video-to-Text Analysis).",
        inputMediaUrl: "examples/video_generated_by_veo31.mp4",
        response: "Na video snimku se vidi detaljan kadar futurističkog robota koji polako podiže glavu dok stoji u mračnoj šumi. Šuma je osvetljena snažnim neonskim svetlima koja pulsiraju u ritmu lo-fi hip-hop muzike koja svira u pozadini. Video je generisan pomoću Veo 3.1 Fast modela."
      };
    }
    
    // ─── Fallback za ostale modele ───
    else {
      example_type = 'text';
      example_data = {
        prompt: "Objasni kako svi ovi Gemini modeli rade zajedno.",
        response: "Gemini ekosistem je dizajniran za glatku multimodalnu saradnju. Tekstualni modeli kreiraju instrukcije i podatke, Imagen i Veo vizuelizuju koncepte, TTS i Lyria dodaju zvuk, Flash modeli transkribuju video i audio nazad u tekst, dok Agenti (Computer Use) te podatke direktno pretvaraju u akcije na vašem računaru."
      };
    }

    insert.run({
      id: key,
      type: spec.type || '',
      desc: spec.desc || '',
      features: JSON.stringify(spec.features || []),
      usecases: JSON.stringify(spec.usecases || []),
      code: spec.code || '',
      example_type,
      example_data: JSON.stringify(example_data)
    });
  }
})();

console.log('Database seeded successfully with ' + Object.keys(modelSpecs).length + ' meta-connected models.');
