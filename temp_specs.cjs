module.exports = {
  'gemini-2.5-flash': {
    type: 'Flash (Brz i Efikasan — Najnovija Generacija)',
    desc: 'Zlatni standard za produkciju: izuzetno brz, visokopropusan i cenovno najekonomičniji u klasi, ali sa neverovatnim skokom inteligencije. Donosi napredne "thinking" sposobnosti i vrhunsku spretnost u pisanju koda.',
    features: [
      'Izuzetno brze performanse (ultra-niska latencija)',
      'Native chain-of-thought (rezonovanje kroz korake)',
      'Izvrsne sposobnosti programiranja i struktuiranja podataka',
      'Nativna multimodalnost (slike, audio, video, PDF, kod)'
    ],
    usecases: [
      'Visokopropusni četbotovi i agenti za korisničku podršku u realnom vremenu',
      'Skeniranje i sumiranje ekstremno dugih dokumenata i PDF-ova',
      'Strukturisana ekstrakcija podataka (npr. popunjavanje JSON-a)',
      'Brza klasifikacija i obrada velike količine podataka'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

// Inicijalizacija klijenta sa API ključem
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generisanje sadržaja pomoću Gemini 2.5 Flash modela
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: 'Objasni kvantno računarstvo u tri rečenice.',
});

console.log(response.text);`
  },
  'gemini-2.5-pro': {
    type: 'Pro ( Flagship Inteligencija za Složene Zadatke )',
    desc: 'Najinteligentniji Gemini model u klasi za duboko rezonovanje, napredno logičko zaključivanje i kompleksno kodiranje. Koristi napredne lance razmišljanja kako bi rešio teške, višeslojne softverske i naučne probleme.',
    features: [
      'Vrhunske sposobnosti logičkog zaključivanja i rezonovanja',
      'Izvanredno rešavanje složenih programerskih bagova i refaktoringa',
      'Visoka preciznost i doslednost kod dugačkih instrukcija',
      'Najviša tačnost u analitičkim RAG sistemima'
    ],
    usecases: [
      'Nadzor koda, arhitektonsko planiranje i pisanje kompleksnih skripti',
      'Dubinska finansijska, pravna i naučna istraživanja',
      'Kombinovana analiza složenih grafikona, dokumenata i audio/video zapisa',
      'Automatizovani agenti sa visokim stepenom samostalnosti'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

// Inicijalizacija klijenta sa API ključem
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generisanje složenog rezonovanja sa Gemini 2.5 Pro modelom
const response = await ai.models.generateContent({
  model: 'gemini-2.5-pro',
  contents: 'Evo mog koda. Analiziraj sve kritične tačke i napiši testove.',
  config: {
    temperature: 0.2 // Niska temperatura za preciznije odgovore
  }
});

console.log(response.text);`
  },
  'gemini-1.5-flash': {
    type: 'Flash (Efikasna Klasika)',
    desc: 'Prethodna generacija "radnog konja" Gemini porodice. Revolucionarni model koji je uveo masivne kontekstne prozore od milion tokena. I dalje je odličan, stabilan i dokazan izbor za obradu velikih količina multimedijalnih podataka.',
    features: [
      'Stabilne i brze performanse u svim opštim namenama',
      'Masivni kontekstni prozor od 1.000.000 tokena',
      'Multimodalni unos (slike, audio, video snimci)',
      'Dokazano rešenje u stotinama miliona produkcionih upita'
    ],
    usecases: [
      'Grupna obrada i tagovanje slika, dokumenata i audio snimaka',
      'Sumiranje dugih transkripata sa sastanaka ili vebinara',
      'Lokalni prevodi i pretvaranje nestrukturisanog teksta u strukturisan',
      'Pomoćni alati u svakodnevnim kancelarijskim tokovima rada'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateContent({
  model: 'gemini-1.5-flash',
  contents: 'Prevedi sledeći tekst na nemački jezik...',
});

console.log(response.text);`
  },
  'gemini-1.5-pro': {
    type: 'Pro (Klasik sa Masivnim Kontekstom)',
    desc: 'Klasični flagship model sa gigantskim prozorom od 2 miliona tokena. Njegova najveća prednost je mogućnost analize izuzetno dugih niti podataka, poput čitavih repozitorijuma koda ili višečasovnih video snimaka.',
    features: [
      'Ekstremni kontekstni prozor od 2.000.000 tokena',
      'Nalazi podatke u sekundi unutar masivne biblioteke (Needle in a Haystack)',
      'Odlična multimodalna sinteza i interpretacija video/audio sadržaja',
      'Napredno logičko programiranje'
    ],
    usecases: [
      'Analiza čitavog projektnog koda odjednom radi refaktorisanja',
      'Analiza celih video filmova radi automatskog pravljenja trejlera ili analize scena',
      'Ekstrakcija podataka iz ogromnih arhiva dokumenata (pravne, medicinske baze)',
      'Prevođenje i analitika knjiga i dugačkih naučnih radova'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateContent({
  model: 'gemini-1.5-pro',
  contents: 'Evo svih 50 fajlova iz mog repozitorijuma. Objasni kako se rute povezuju.',
});

console.log(response.text);`
  },
  'nano-banana-pro-preview': {
    type: 'Generisanje Slika i Kreativa (Flagship Image Generation)',
    desc: 'Najnoviji flagship model za fotorealistično generisanje slika i visoko-precizno uređivanje (zasnovan na naprednoj Gemini 3 Pro Image arhitekturi). Interno nazvan "Nano Banana Pro" u Google DeepMind timu, ovaj model spaja kreativno crtanje sa dubokim prostornim razumevanjem, omogućavajući kreiranje grafika sa savršeno čitljivim tekstom.',
    features: [
      'Izvanredno precizno renderovanje teksta na slikama (reči na natpisima, majicama, brendovima)',
      'Napredno prostorno razumevanje i sleđenje kompleksnih instrukcija rasporeda',
      'Konzistentnost likova (Character Consistency) kroz više generisanih scena',
      'Podrška za blending (spajanje stilova) do 14 referentnih slika'
    ],
    usecases: [
      'UI/UX dizajn: kreiranje prototipa interfejsa sa realističnim copy tekstom',
      'Brendiranje i marketing: brza izrada reklamnih banera, plakata i logotipa',
      'Edukacija i ilustracije: pretvaranje tekstualnih opisa u tehničke skice i dijagrame',
      'Napredno editovanje: dodavanje novih objekata na slike ili izmena pozadina'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Generisanje slike visoke rezolucije pomoću Nano Banana Pro modela
const response = await ai.models.generateImages({
  model: 'nano-banana-pro-preview',
  prompt: 'A futuristic home office, glassmorphic floating screen with line charts, cozy warm lighting, photorealistic, 8k resolution',
  config: {
    numberOfImages: 1,
    aspectRatio: '16:9',
    outputMimeType: 'image/jpeg'
  }
});

const base64Bytes = response.generatedImages[0].image.imageBytes;
console.log('Slika uspešno generisana u Base64 formatu!');`
  },
  // Alijasi za Nano Banana Pro (isti model, različiti API nazivi)
  'gemini-3-pro-image-preview': {
    type: 'Nano Banana Pro — Preview (Gemini 3 Pro Image)',
    desc: 'Preview verzija Nano Banana Pro modela za generisanje i uređivanje slika. Zasnovan na Gemini 3 Pro Image arhitekturi sa naprednim "thinking" sposobnostima za prostorno rezonovanje. Ovo je eksperimentalna varijanta koja može sadržati najnovije funkcionalnosti pre zvaničnog stabilnog izdanja.',
    features: [
      'Napredno "thinking" rezonovanje za složene vizuelne kompozicije',
      'Precizno renderovanje teksta na slikama (brendovi, natpisi, UI elementi)',
      'Konzistentnost likova i stilova kroz više generisanih scena',
      'Preview pristup najnovijim eksperimentalnim funkcionalnostima'
    ],
    usecases: [
      'Testiranje najnovijih mogućnosti generisanja slika pre stabilnog izdanja',
      'Profesionalna izrada marketinških vizuala sa preciznim tekstom',
      'Kreiranje sekvenci storiborda sa konzistentnim karakterima',
      'Eksperimentisanje sa složenim promptovima za napredne vizualne kompozicije'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Nano Banana Pro (Preview) — generisanje slike sa thinking rezonovanjem
const response = await ai.models.generateContent({
  model: 'gemini-3-pro-image-preview',
  contents: 'Napravi fotorealistični poster za tech konferenciju sa naslovom "AI Summit 2026"',
});

// Odgovor sadrži generisanu sliku u multimodalnom formatu
console.log(response);`
  },
  'gemini-3-pro-image': {
    type: 'Nano Banana Pro — Stabilna Verzija (Gemini 3 Pro Image)',
    desc: 'Stabilna produkciona verzija Nano Banana Pro modela. Flagship model za profesionalno generisanje i uređivanje slika visoke rezolucije sa naprednim prostornim razumevanjem, "thinking" sposobnostima i savršenim renderovanjem teksta na slikama.',
    features: [
      'Stabilna verzija optimizovana za produkcione radne tokove',
      'Izvanredno precizno renderovanje teksta na slikama na više jezika',
      'Napredno prostorno razumevanje i sleđenje kompleksnih instrukcija rasporeda',
      '"Thinking" model — razmišlja pre crtanja za bolju kompoziciju'
    ],
    usecases: [
      'Produkciona izrada komercijalnih vizuala i reklamnih materijala',
      'UI/UX dizajn sa realističnim labelama, dugmićima i copy tekstom',
      'Automatizovana izrada brendiranih sadržaja za društvene mreže',
      'Napredno editovanje fotografija: zamena pozadina, dodavanje objekata, stilizacija'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Nano Banana Pro (Stabilan) — generisanje profesionalne slike
const response = await ai.models.generateContent({
  model: 'gemini-3-pro-image',
  contents: 'Kreiraj moderan minimalistički logo za fintech startup koji se zove "PayFlow", koristi indigo i belu boju',
});

console.log(response);`
  },
  'gemini-2.5-flash-image': {
    type: 'Nano Banana — Originalni Flash (Gemini 2.5 Flash Image)',
    desc: 'Originalni Nano Banana model zasnovan na Gemini 2.5 Flash Image arhitekturi. Specijalizovan za brzo generisanje i editovanje slika sa niskom latencijom. Manji kontekstni prozor (32k tokena) ali izuzetno brz — idealan za interaktivne aplikacije i brze iteracije.',
    features: [
      'Ultra-brzo generisanje slika zahvaljujući Flash arhitekturi',
      'Nizak kontekstni prozor (32k) optimizovan za kratke, fokusirane promptove',
      'Odlično editovanje postojećih slika (inpainting, izmene pozadine)',
      'Ekonomičan za masovnu obradu i automatizovane vizuelne pipeline-ove'
    ],
    usecases: [
      'Brzo generisanje vizuelnih predloga tokom brejnstorming sesija',
      'Automatizovano kreiranje thumbnailova i vizuala za e-commerce proizvode',
      'Interaktivno editovanje slika u realnom vremenu sa korisničkim uputstvima',
      'Masovna obrada i stilizacija fotografija za kataloge i galerije'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Nano Banana (Flash) — brzo generisanje slike
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-image',
  contents: 'Uredi ovu fotografiju: zameni pozadinu sa plažom pri zalasku sunca, zadrži osobu netaknutom',
});

console.log(response);`
  },
  'gemini-3.1-flash-image-preview': {
    type: 'Nano Banana 2 — Preview (Gemini 3.1 Flash Image)',
    desc: 'Preview verzija Nano Banana 2 modela (Gemini 3.1 Flash Image). Kombinuje visokokvalitetno rezonovanje Nano Banana Pro modela sa brzinom Flash arhitekture. Veći kontekstni prozor (65k tokena), "thinking" sposobnosti i podrška za video-to-image generisanje.',
    features: [
      'Hibrid: kvalitet Pro modela + brzina Flash arhitekture',
      '"Thinking" sposobnosti za napredne vizuelne kompozicije',
      'Poboljšano praćenje instrukcija i renderovanje teksta na slikama',
      'Video-to-image: generisanje slika na osnovu video klipova'
    ],
    usecases: [
      'Brzo generisanje visokokvalitetnih slika za produkcione aplikacije',
      'Kreiranje vizuala iz video klipova (izdvajanje ključnih kadrova sa stilizacijom)',
      'Lokalizacija marketinških materijala sa renderovanim tekstom na raznim jezicima',
      'Interaktivno dizajniranje i iteracija UI mockupova u realnom vremenu'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Nano Banana 2 (Preview) — napredna brza generacija slika
const response = await ai.models.generateContent({
  model: 'gemini-3.1-flash-image-preview',
  contents: 'Iz ovog video klipa napravi dramatičan filmski poster sa naslovom "The Last Signal"',
});

console.log(response);`
  },
  'gemini-3.1-flash-image': {
    type: 'Nano Banana 2 — Stabilna Verzija (Gemini 3.1 Flash Image)',
    desc: 'Stabilna produkciona verzija Nano Banana 2 modela. Najnovija generacija brze Image Flash arhitekture sa "thinking" sposobnostima, poboljšanim renderovanjem teksta i video-to-image konverzijom. Kontekstni prozor od 65k tokena i optimizovan za visokopropusne produkcione radne tokove.',
    features: [
      'Stabilna verzija za pouzdane produkcione radne tokove',
      'Napredno "thinking" rezonovanje za precizno pozicioniranje elemenata',
      'Video-to-image konverzija sa kreativnom stilizacijom',
      'Konzistentnost likova i stilova kroz serije generisanih slika'
    ],
    usecases: [
      'Produkciono generisanje brendiranih vizuala za marketing timove',
      'Automatizovana izrada Instagram/TikTok vizuala iz video sadržaja',
      'Masovna lokalizacija postera i reklama sa tekstom na raznim jezicima',
      'Kreiranje konzistentnih sekvenci za strip, storibordove i prezentacije'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Nano Banana 2 (Stabilan) — produkciona generacija slika
const response = await ai.models.generateContent({
  model: 'gemini-3.1-flash-image',
  contents: 'Kreiraj seriju od 3 konzistentne ilustracije za dečju priču o malom robotu koji uči da crta',
});

console.log(response);`
  },
  'imagen-4.0-generate-001': {
    type: 'Generisanje Slika (Standardna Efikasnost)',
    desc: 'Zvanični Google Imagen 4 model za brzo i kvalitetno generisanje slika iz tekstualnih opisa. Nudi odlične performanse, visoku vernost boja i detalja, i veoma brzu obradu upita za svakodnevne potrebe.',
    features: [
      'Visoka vernost detalja i prirodne teksture',
      'Brzo generisanje slika (niska latencija)',
      'Odlična interpretacija složenih tekstualnih opisa (promptova)',
      'Podrška za različite formate i dimenzije slika'
    ],
    usecases: [
      'Generisanje konceptualnih art ilustracija za blogove i članke',
      'Brzo kreiranje vizuelnih sadržaja za društvene mreže',
      'Kreiranje skica i vizuelnih ideja tokom brejnstorminga',
      'Automatsko generisanje pozadina za sajtove i aplikacije'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateImages({
  model: 'imagen-4.0-generate-001',
  prompt: 'A cute small red panda sitting on a tree branch, soft watercolor illustration style',
  config: {
    numberOfImages: 1,
    aspectRatio: '1:1'
  }
});`
  },
  'imagen-4.0-ultra-generate-001': {
    type: 'Generisanje Slika (Flagship Ultra Kvalitet)',
    desc: 'Najmoćnija verzija Imagen 4 modela dizajnirana za komercijalnu upotrebu i profesionalne fotografe. Fokusira se na ekstremno visoku vernost detalja, fotorealizam i napredne efekte osvetljenja.',
    features: [
      'Ekstremno visok nivo detalja, idealan za štampu i 4K prikaze',
      'Fotorealistični kvalitet kože, metala, stakla i prirodnih tekstura',
      'Napredni studijski efekti osvetljenja, dubine polja (bokeh) i uglova kamere',
      'Vrhunska konzistentnost i vernost zadatom stilu'
    ],
    usecases: [
      'Kreiranje komercijalnih oglasa i visoko-kvalitetnih marketinških kampanja',
      'Izrada umetničkih dela, ilustracija za knjige i filmskih storibordova',
      'Generisanje profesionalnih portreta i studijskih fotografija proizvoda',
      'Izrada hiper-realističnih 3D rendera za enterijere'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateImages({
  model: 'imagen-4.0-ultra-generate-001',
  prompt: 'Macro shot of water droplets on a green leaf, morning sunlight refracting through droplets, highly detailed, depth of field',
  config: {
    numberOfImages: 1,
    aspectRatio: '4:3'
  }
});`
  },
  'imagen-4.0-fast-generate-001': {
    type: 'Generisanje Slika (Ekspresna Brzina)',
    desc: 'Specijalno optimizovana verzija Imagen 4 modela koja se fokusira na najnižu latenciju i trenutno generisanje slika. Savršen za interaktivne aplikacije u realnom vremenu i sisteme sa visokom frekvencijom upita.',
    features: [
      'Munjevito brzo vreme generisanja slike (ispod 2 sekunde)',
      'Ekstremno niska potrošnja resursa i visoka ekonomičnost',
      'Dobar kvalitet slika za brze preglede i interakcije',
      'Podrška za brzu iteraciju promptova u realnom vremenu'
    ],
    usecases: [
      'Generisanje slika u realnom vremenu tokom kucanja prompta (real-time generation)',
      'Interaktivne zabavne aplikacije i igre sa dinamičkim sadržajem',
      'Brzo generisanje sličica (thumbnails) i avatara za korisnike',
      'Ekonomično A/B testiranje različitih vizuelnih ideja'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const response = await ai.models.generateImages({
  model: 'imagen-4.0-fast-generate-001',
  prompt: 'Minimalist vector icon of a lightbulb, flat design, indigo background',
  config: {
    numberOfImages: 1
  }
});`
  },

  // ═══════════════════════════════════════════════════════════
  // GEMINI TEXT MODELI — Starije generacije i alijasi
  // ═══════════════════════════════════════════════════════════

  'gemini-2.0-flash': {
    type: 'Tekst / Multimodalni (Gemini 2.0 Flash)',
    desc: 'Gemini 2.0 Flash je prethodna generacija brzog multimodalnog modela koji je postavio temelje za Flash arhitekturu. Odličan balans između brzine i kvaliteta — pogodan za produkcione aplikacije koje zahtevaju brze odgovore uz solidne analitičke sposobnosti.',
    features: [
      'Multimodalni ulaz: tekst, slike, audio i video',
      'Niska latencija — prosečno vreme odgovora ispod 1 sekunde',
      'Podrška za strukturirani JSON izlaz i function calling',
      'Kontekstni prozor od 1 milion tokena za obradu dugačkih dokumenata'
    ],
    usecases: [
      'Chatbot servisi za korisničku podršku sa brzim odgovorima',
      'Klasifikacija i tagovanje velikih skupova podataka u realnom vremenu',
      'Sumarizacija dokumenata i automatsko izvlačenje ključnih informacija',
      'Multimodalna analiza: opis slika, transkripcija audio zapisa'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gemini 2.0 Flash — brza multimodalna analiza
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash',
  contents: 'Objasni razliku između supervised i unsupervised učenja u 3 rečenice.',
});

console.log(response.text);`
  },
  'gemini-2.0-flash-001': {
    type: 'Tekst / Multimodalni (Gemini 2.0 Flash — Pinned)',
    desc: 'Fiksirana (pinned) verzija Gemini 2.0 Flash modela sa tačno definisanim ponašanjem. Garantuje identične odgovore bez obzira na buduće ažuriranja — idealan za produkcione pipeline-ove gde je ponovljivost rezultata kritična.',
    features: [
      'Fiksirana verzija — ponašanje se nikad ne menja nakon izdanja',
      'Identične performanse kao gemini-2.0-flash ali sa garantovanom stabilnošću',
      'Pogodan za CI/CD pipeline-ove i automatizovane testove',
      'Potpuna podrška za function calling i strukturirani izlaz'
    ],
    usecases: [
      'Produkcioni sistemi gde je konzistentnost odgovora obavezna',
      'Automatizovani QA i regresioni testovi nad AI outputima',
      'Finansijski i medicinski sistemi sa regulatornim zahtevima za ponovljivost',
      'Benchmark testiranje i poređenje performansi između verzija'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Pinned verzija — garantovana konzistentnost
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash-001',
  contents: 'Klasifikuj sledeći tekst kao pozitivan, negativan ili neutralan sentiment: "Proizvod je solidan ali dostava kasni."',
});

console.log(response.text);`
  },
  'gemini-2.0-flash-lite': {
    type: 'Tekst / Ultralagani (Gemini 2.0 Flash Lite)',
    desc: 'Najlakši i najjeftiniji model u Gemini 2.0 porodici. Optimizovan za jednostavne zadatke poput klasifikacije, ekstrakcije entiteta i kratkih odgovora gde je cena po tokenu ključni faktor. Ultra-niska latencija.',
    features: [
      'Najniža cena po tokenu u celoj Gemini porodici',
      'Ultra-niska latencija — idealan za real-time aplikacije',
      'Efikasan za klasifikaciju, tagovanje i ekstrakciju podataka',
      'Mali memorijski otisak pogodan za edge deployment scenarija'
    ],
    usecases: [
      'Masovna klasifikacija hiljada dokumenata dnevno po minimalnoj ceni',
      'Real-time ekstrakcija entiteta iz korisničkih poruka u chatu',
      'Automatsko tagovanje proizvoda u e-commerce katalozima',
      'Brza trijaža email-ova i tiketa korisničke podrške'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Flash Lite — ultra-jeftina klasifikacija
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash-lite',
  contents: 'Klasifikuj: "Laptop se pregrejava nakon 2 sata korišćenja" → kategorija: [hardver, softver, dostava, ostalo]',
});

console.log(response.text);`
  },
  'gemini-2.0-flash-lite-001': {
    type: 'Tekst / Ultralagani (Gemini 2.0 Flash Lite — Pinned)',
    desc: 'Fiksirana verzija Gemini 2.0 Flash Lite modela. Kombinuje ultra-nisku cenu sa garantovanom ponovljivošću — savršen za visokofrekventne automatizovane pipeline-ove u produkciji.',
    features: [
      'Fiksirana verzija sa nepromenjivim ponašanjem',
      'Najniža cena u kombinaciji sa garantovanom stabilnošću',
      'Idealan za batch procesiranje miliona zahteva',
      'Deterministički izlaz za automatizovane radne tokove'
    ],
    usecases: [
      'Automatizovani ETL pipeline-ovi za čišćenje i klasifikaciju podataka',
      'A/B testiranje AI modela sa konzistentnom baznom linijom',
      'Visokofrekventna obrada log fajlova i sistema za alerting',
      'Edge AI aplikacije sa fiksnim budžetom po zahtevu'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Flash Lite Pinned — deterministička batch obrada
const response = await ai.models.generateContent({
  model: 'gemini-2.0-flash-lite-001',
  contents: 'Izvuci sve datume i novčane iznose iz teksta: "Faktura br. 1234, iznos 15.500 RSD, rok plaćanja 15.06.2026."',
});

console.log(response.text);`
  },
  'gemini-2.5-flash-lite': {
    type: 'Tekst / Efikasni (Gemini 2.5 Flash-Lite)',
    desc: 'Gemini 2.5 Flash-Lite donosi značajno poboljšanje nad 2.0 Lite verzijom — bolji kvalitet odgovora uz zadržanu nisku cenu. Idealan za visokoprometne aplikacije gde je potreban dobar kvalitet bez visokih troškova.',
    features: [
      'Značajno bolji kvalitet od 2.0 Lite uz sličnu cenu',
      'Unapređena sposobnost praćenja instrukcija i formatiranja izlaza',
      'Poboljšano razumevanje konteksta i dugačkih promptova',
      'Optimizovan za serviranje velikog broja istovremenih korisnika'
    ],
    usecases: [
      'Chatbot za komercijalnu korisničku podršku sa visokim prometom',
      'Sumarizacija članaka i vesti za agregator platforme',
      'Generisanje opisa proizvoda za online prodavnice',
      'Automatsko odgovaranje na FAQ pitanja sa kontekstualnom preciznošću'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Flash-Lite 2.5 — cost-efficient uz dobar kvalitet
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-lite',
  contents: 'Napiši kratak opis proizvoda za bežične slušalice sa aktivnim poništavanjem buke, u 2 rečenice.',
});

console.log(response.text);`
  },
  'gemini-3-flash-preview': {
    type: 'Tekst / Multimodalni (Gemini 3 Flash Preview)',
    desc: 'Preview verzija Gemini 3 Flash modela — nova generacija Flash arhitekture sa značajno poboljšanim rezonovanjem, boljim praćenjem instrukcija i "thinking" sposobnostima. Brži i pametniji od prethodnih Flash modela.',
    features: [
      'Nova Gemini 3 arhitektura sa poboljšanim rezonovanjem',
      '"Thinking" sposobnosti za složenije logičke zadatke',
      'Poboljšano praćenje složenih višekoračnih instrukcija',
      'Brži odgovori uz značajno bolji kvalitet od 2.5 Flash'
    ],
    usecases: [
      'Napredno kodiranje: generisanje i refaktorisanje kompleksnog koda',
      'Analiza pravnih i tehničkih dokumenata sa logičkim zaključivanjem',
      'Matematičko rezonovanje i rešavanje problema korak po korak',
      'Kreativno pisanje sa boljim razumevanjem nijansiranog konteksta'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gemini 3 Flash Preview — napredno rezonovanje
const response = await ai.models.generateContent({
  model: 'gemini-3-flash-preview',
  contents: 'Reši sledeći logički problem korak po korak: Ako svaki programer piše 200 linija koda dnevno, a tim od 5 programera radi 22 dana mesečno, koliko linija koda tim napiše za 3 meseca?',
});

console.log(response.text);`
  },
  'gemini-3-pro-preview': {
    type: 'Tekst / Napredni (Gemini 3 Pro Preview)',
    desc: 'Preview verzija Gemini 3 Pro modela — najsposobniji model za kompleksne zadatke koji zahtevaju duboko rezonovanje, naučnu analizu i višekorační problem-solving. Značajan skok u kvalitetu nad Gemini 2.5 Pro.',
    features: [
      'Vrhunsko "thinking" rezonovanje za složene naučne i tehničke probleme',
      'Značajno poboljšano razumevanje dugačkih dokumenata (1M+ tokena)',
      'Napredno kodiranje u više programskih jezika istovremeno',
      'Sposobnost za višekoračnu analizu sa međukoraka verifikacijom'
    ],
    usecases: [
      'Naučna istraživanja: analiza radova, hipoteze i eksperimentalni dizajn',
      'Arhitekturalne odluke u softverskim projektima velikih razmera',
      'Pravna analiza ugovora sa identifikacijom rizika i sugestijama',
      'Kompleksna finansijska modeliranja i scenario analize'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gemini 3 Pro Preview — duboka analiza
const response = await ai.models.generateContent({
  model: 'gemini-3-pro-preview',
  contents: 'Analiziraj prednosti i mane microservices vs monolithic arhitekture za startup sa 3 developera koji pravi SaaS platformu. Daj preporuku sa obrazloženjem.',
});

console.log(response.text);`
  },
  'gemini-3.1-pro-preview': {
    type: 'Tekst / Najnapredniji (Gemini 3.1 Pro Preview)',
    desc: 'Najnovija iteracija Gemini Pro linije — Gemini 3.1 Pro sa unapređenim agentic sposobnostima, boljom upotrebom alata i poboljšanim "thinking" rezonovanjem. Dizajniran za najkompleksnije zadatke koji zahtevaju autonomno planiranje i izvršavanje.',
    features: [
      'Unapređene agentic sposobnosti za autonomno izvršavanje zadataka',
      'Poboljšana upotreba alata i function calling sa višestrukim pozivima',
      'Najdublje "thinking" rezonovanje u celoj Gemini porodici',
      'Sposobnost za planiranje i izvršavanje kompleksnih višekoračnih planova'
    ],
    usecases: [
      'Autonomni AI agenti koji planiraju i izvršavaju složene radne tokove',
      'Napredna analiza podataka sa automatskim generisanjem vizualizacija',
      'Code review i refaktorisanje celih kodnih baza sa detaljnim predlozima',
      'Istraživački asistenti koji sintetizuju informacije iz stotina izvora'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gemini 3.1 Pro — agentic planiranje
const response = await ai.models.generateContent({
  model: 'gemini-3.1-pro-preview',
  contents: 'Napravi detaljan plan migracije Node.js Express aplikacije na NestJS framework. Uključi korake, rizike i vremenski okvir.',
});

console.log(response.text);`
  },
  'gemini-3.1-pro-preview-customtools': {
    type: 'Tekst / Custom Tools Specialist (Gemini 3.1 Pro)',
    desc: 'Specijalizovana varijanta Gemini 3.1 Pro modela optimizovana za korišćenje prilagođenih alata (custom tools) i function calling. Izuzetno precizna u pozivanju eksternih API-ja, baza podataka i sistema na osnovu korisničkih instrukcija.',
    features: [
      'Optimizovan za precizno function calling sa prilagođenim alatima',
      'Poboljšano razumevanje JSON Schema definicija alata',
      'Sposobnost za paralelno pozivanje više alata u jednom koraku',
      'Napredna interpretacija rezultata alata i adaptivno planiranje'
    ],
    usecases: [
      'Izgradnja AI agenata koji upravljaju eksternim API servisima',
      'Chatbotovi sa pristupom bazama podataka, CRM-ovima i ERP sistemima',
      'Automatizovani radni tokovi koji povezuju više SaaS platformi',
      'Inteligentni asistenti za DevOps koji pokreću deploy, monitoring i alerting'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Custom Tools — pozivanje eksternih alata
const tools = [{
  functionDeclarations: [{
    name: 'pretraziProizvode',
    description: 'Pretražuje katalog proizvoda po imenu ili kategoriji',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Termin za pretragu' },
        kategorija: { type: 'string', enum: ['elektronika', 'odeća', 'hrana'] }
      },
      required: ['query']
    }
  }]
}];

const response = await ai.models.generateContent({
  model: 'gemini-3.1-pro-preview-customtools',
  contents: 'Pronađi sve bežične slušalice ispod 5000 dinara',
  config: { tools }
});

console.log(response);`
  },
  'gemini-3.1-flash-lite-preview': {
    type: 'Tekst / Ultralagani Next-Gen (Gemini 3.1 Flash Lite Preview)',
    desc: 'Preview najnovijeg ultralaganog modela u Gemini porodici. Gemini 3.1 Flash Lite donosi "thinking" sposobnosti čak i u najjeftiniju klasu modela — pametniji odgovori za bagatelnu cenu.',
    features: [
      'Najnovija 3.1 arhitektura čak i u Lite klasi',
      '"Thinking" sposobnosti koje poboljšavaju kvalitet odgovora za 30%+',
      'Ultra-niska cena sa značajno boljim kvalitetom od prethodnih Lite verzija',
      'Preview pristup najnovijim optimizacijama za lagane modele'
    ],
    usecases: [
      'Visokoprometni chatbotovi sa boljim kvalitetom odgovora po niskoj ceni',
      'Masovna analiza sentimenta na društvenim mrežama',
      'Automatsko generisanje kratkih odgovora za FAQ sisteme',
      'Edge AI aplikacije sa ograničenim budžetom i zahtevom za kvalitetom'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Flash Lite 3.1 Preview — pametniji ultralagani model
const response = await ai.models.generateContent({
  model: 'gemini-3.1-flash-lite-preview',
  contents: 'Klasifikuj sentiment i izvuci ključne reči: "Aplikacija je sjajna ali se ponekad ruši pri učitavanju fotografija"',
});

console.log(response.text);`
  },
  'gemini-3.1-flash-lite': {
    type: 'Tekst / Ultralagani Next-Gen Stabilan (Gemini 3.1 Flash Lite)',
    desc: 'Stabilna produkciona verzija Gemini 3.1 Flash Lite modela. Svi benefiti najnovije Flash Lite arhitekture u pouzdanom paketu za produkcione radne tokove — bez iznenađenja u ponašanju.',
    features: [
      'Stabilna verzija optimizovana za produkcione primene',
      'Konzistentan kvalitet odgovora bez preview nestabilnosti',
      'Potpuna podrška za JSON izlaz i strukturirane formate',
      'Optimizovan throughput za istovremeno serviranje hiljada korisnika'
    ],
    usecases: [
      'Produkcioni pipeline za automatsko moderisanje korisničkog sadržaja',
      'Real-time preporučivanje proizvoda na osnovu korisničkih upita',
      'Automatska kategorizacija tiketa korisničke podrške po prioritetu',
      'Integracija u mikroservisne arhitekture kao lagani AI sloj'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Flash Lite 3.1 Stabilan — produkciona klasifikacija
const response = await ai.models.generateContent({
  model: 'gemini-3.1-flash-lite',
  contents: 'Kategorizuj tiket: "Ne mogu da se ulogujem, dobijam grešku 403 pri pristupu dashboard-u" → [auth, UI, API, baza, ostalo]',
});

console.log(response.text);`
  },
  'gemini-3.5-flash': {
    type: 'Tekst / Frontier Flash (Gemini 3.5 Flash)',
    desc: 'Gemini 3.5 Flash je trenutno NAJSPOSOBNIJI Flash model — spaja brzinu Flash arhitekture sa kvalitetom koji se približava Pro modelima. Frontier-class performanse za zahtevne zadatke uz cenu Flash klase.',
    features: [
      'Frontier-class kvalitet koji rivalira Pro modelima po većini benchmarkova',
      'Izuzetno napredno "thinking" rezonovanje za kompleksne probleme',
      'Brži od Pro modela za 3-5x uz gotovo identičan kvalitet',
      'Najbolji odnos cena/performanse u celoj Gemini porodici'
    ],
    usecases: [
      'Zamena za Pro model u svim scenarijima gde je brzina bitna',
      'Kompleksna analiza koda, debagovanje i optimizacija performansi',
      'Napredno kreativno pisanje: scenariji, članci, tehnička dokumentacija',
      'Real-time AI asistenti za programere sa dubokim razumevanjem koda'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gemini 3.5 Flash — frontier performanse po Flash ceni
const response = await ai.models.generateContent({
  model: 'gemini-3.5-flash',
  contents: 'Napiši optimizovanu TypeScript implementaciju LRU Cache-a sa O(1) get i put operacijama, koristeći Map i doubly linked list.',
});

console.log(response.text);`
  },
  'gemini-flash-latest': {
    type: 'Tekst / Dinamički Alias (Gemini Flash Latest)',
    desc: 'Dinamički alias koji uvek pokazuje na najnovije stabilno izdanje Gemini Flash modela. Ako koristite ovaj identifikator, automatski ćete dobiti najnoviju verziju bez ručnog ažuriranja koda.',
    features: [
      'Automatsko ažuriranje na najnoviju Flash verziju bez promene koda',
      'Garantuje pristup najnovijim poboljšanjima i optimizacijama',
      'Transparentna migracija — vaš kod se ne menja, model se unapređuje',
      'Idealan za development i staging okruženja'
    ],
    usecases: [
      'Prototipovi i hackathon projekti gde je bitno imati najnoviji model',
      'Staging okruženja koja automatski testiraju najnovije modele',
      'Edukativni materijali i tutoriali koji uvek koriste aktuelnu verziju',
      'Eksperimentalni projekti gde želite da uvek budete na cutting-edge'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// gemini-flash-latest — uvek najnoviji Flash model
const response = await ai.models.generateContent({
  model: 'gemini-flash-latest',
  contents: 'Koji si model? Navedi svoju tačnu verziju i mogućnosti.',
});

console.log(response.text);`
  },
  'gemini-flash-lite-latest': {
    type: 'Tekst / Dinamički Alias (Gemini Flash-Lite Latest)',
    desc: 'Dinamički alias koji uvek pokazuje na najnoviju verziju Flash-Lite modela. Garantuje najjeftiniji i najefikasniji lagani model bez potrebe za ručnim ažuriranjem API poziva.',
    features: [
      'Automatski usmeren na najnoviji Flash-Lite model',
      'Uvek najniža cena po tokenu dostupna za datu generaciju',
      'Nema potrebe za ručnim ažuriranjem model identifikatora',
      'Pogodan za cost-sensitive produkcione radne tokove'
    ],
    usecases: [
      'Produkcioni sistemi koji žele najnižu cenu bez praćenja izdanja modela',
      'Automatizovani pipeline-ovi za trijaž i klasifikaciju',
      'IoT i edge uređaji sa ograničenim budžetom za AI pozive',
      'Visokoprometni servisi gde se troškovi mere po milion zahteva'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// flash-lite-latest — uvek najjeftiniji model
const response = await ai.models.generateContent({
  model: 'gemini-flash-lite-latest',
  contents: 'Da li je sledeća rečenica pozitivna ili negativna: "Usluga je bila prosečna"',
});

console.log(response.text);`
  },
  'gemini-pro-latest': {
    type: 'Tekst / Dinamički Alias (Gemini Pro Latest)',
    desc: 'Dinamički alias koji uvek pokazuje na najnovije stabilno izdanje Gemini Pro modela. Garantuje pristup najmoćnijem Pro modelu za najtežje zadatke bez praćenja verzija.',
    features: [
      'Automatski pokazuje na najnoviji Pro model',
      'Pristup najnaprednijim "thinking" i rezonovanje sposobnostima',
      'Transparentna nadogradnja bez promene koda',
      'Idealan za projekte koji uvek zahtevaju vrh kvaliteta'
    ],
    usecases: [
      'Istraživački projekti koji zahtevaju najpametniji dostupni model',
      'AI asistenti za rukovodioce sa zahtevom za vrhunskim kvalitetom',
      'Automatizovana izrada izveštaja i strateških analiza',
      'Kompleksni kreativni projekti: scenariji, romani, tehničke knjige'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// pro-latest — uvek najmoćniji Pro model
const response = await ai.models.generateContent({
  model: 'gemini-pro-latest',
  contents: 'Napiši detaljnu strategiju za lansiranje AI startupa u Srbiji, uključujući tržišnu analizu, ciljnu grupu, marketing plan i finansijske projekcije za prvu godinu.',
});

console.log(response.text);`
  },

  // ═══════════════════════════════════════════════════════════
  // TTS (TEXT-TO-SPEECH) MODELI
  // ═══════════════════════════════════════════════════════════

  'gemini-2.5-flash-preview-tts': {
    type: 'Tekst-u-Govor (Gemini 2.5 Flash TTS)',
    desc: 'Gemini 2.5 Flash baziran Text-to-Speech model koji pretvara tekst u prirodan govor. Koristi Flash arhitekturu za brzu sintezu govora sa niskom latencijom — idealan za interaktivne glasovne aplikacije i čitanje sadržaja naglas.',
    features: [
      'Brza sinteza govora zahvaljujući Flash arhitekturi',
      'Podrška za više jezika i akcenata uključujući srpski',
      'Kontrola tona, brzine i emocionalnog izraza govora',
      'Streaming audio izlaz za real-time glasovne aplikacije'
    ],
    usecases: [
      'Glasovni asistenti i IVR sistemi za korisničku podršku',
      'Automatsko čitanje vesti, blogova i edukativnog sadržaja',
      'Kreiranje audio verzija pisanog sadržaja za podcast platforme',
      'Pristupačnost: čitanje interfejsa za korisnike sa oštećenim vidom'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// TTS — pretvaranje teksta u govor
const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-preview-tts',
  contents: 'Pročitaj sledeći tekst prirodnim glasom: Dobrodošli u naš podcast o veštačkoj inteligenciji.',
  config: {
    responseModalities: ['AUDIO'],
    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } }
  }
});

// Audio podaci su u response.candidates[0].content.parts[0].inlineData
console.log('Audio generisan uspešno!');`
  },
  'gemini-2.5-pro-preview-tts': {
    type: 'Tekst-u-Govor Premium (Gemini 2.5 Pro TTS)',
    desc: 'Premium verzija Text-to-Speech modela zasnovana na Gemini 2.5 Pro arhitekturi. Nudi superiorni kvalitet glasa, naturalnije pauze, bogatiju intonaciju i dublje razumevanje konteksta za ekspresivno čitanje teksta.',
    features: [
      'Premium kvalitet glasa sa bogatom intonacijom i naturalnim pauzama',
      'Dublje razumevanje konteksta — prilagođava ton sadržaju',
      'Podrška za višeglasno čitanje dijaloga (različiti glasovi za likove)',
      'Visoka rezolucija audio izlaza za profesionalnu produkciju'
    ],
    usecases: [
      'Profesionalna produkcija audiokniga i narativnog sadržaja',
      'Premium glasovni asistenti za luksuzne brendove',
      'Kreiranje višeglasnih podkasta iz pisanog sadržaja',
      'Filmska i gaming industrija: glasovni prototipovi za likove'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Pro TTS — premium kvalitet glasa
const response = await ai.models.generateContent({
  model: 'gemini-2.5-pro-preview-tts',
  contents: 'Pročitaj ovu priču ekspresivno, sa pauzama i emocijama: "Sunce je zalazilo iza planina dok je Mali princ tiho sedeo na svojoj planeti, razmišljajući o ruži."',
  config: {
    responseModalities: ['AUDIO'],
    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Aoede' } } }
  }
});

console.log('Premium audio generisan!');`
  },
  'gemini-3.1-flash-tts-preview': {
    type: 'Tekst-u-Govor Next-Gen (Gemini 3.1 Flash TTS)',
    desc: 'Najnoviji Text-to-Speech model zasnovan na Gemini 3.1 Flash arhitekturi. Donosi najprirodniji govor u celoj Gemini TTS porodici, sa "thinking" sposobnostima koje mu omogućavaju da bolje razume kontekst pre govora.',
    features: [
      'Najprirodniji govor — gotovo nerazlučiv od ljudskog',
      '"Thinking" sposobnosti za bolje razumevanje konteksta i intonacije',
      'Adaptivna brzina govora prema složenosti sadržaja',
      'Podrška za emocionalni spektar: radost, tuga, uzbuđenje, ozbiljnost'
    ],
    usecases: [
      'Next-gen glasovni asistenti sa prirodnom konverzacijom',
      'Medicinski i edukativni sadržaj gde je jasnoća i tačnost kritična',
      'Automatsko naratiranje video sadržaja za društvene mreže',
      'Pristupačne aplikacije sa vrhunskim korisničkim iskustvom'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// 3.1 Flash TTS — najprirodniji govor
const response = await ai.models.generateContent({
  model: 'gemini-3.1-flash-tts-preview',
  contents: 'Objasni veštačku inteligenciju petogodišnjem detetu, toplim i prijateljskim tonom.',
  config: {
    responseModalities: ['AUDIO'],
    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } }
  }
});

console.log('Next-gen audio generisan!');`
  },

  // ═══════════════════════════════════════════════════════════
  // SPECIJALIZOVANI MODELI (Computer Use, Robotics, Agents)
  // ═══════════════════════════════════════════════════════════

  'gemini-2.5-computer-use-preview-10-2025': {
    type: 'Computer Use Agent (Gemini 2.5)',
    desc: 'Specijalizovani model za interakciju sa desktop i web interfejsima. Može da "vidi" ekran, klikće na dugmad, popunjava forme, navigira menije i izvršava kompleksne radne tokove na korisnikovom računaru — kao virtualni asistent sa očima i rukama.',
    features: [
      'Vizuelno razumevanje desktop i web interfejsa u realnom vremenu',
      'Precizno klikanje, kucanje i navigacija kroz UI elemente',
      'Sposobnost za izvršavanje višekoračnih radnih tokova',
      'Razumevanje konteksta ekrana i adaptivno planiranje sledeeg koraka'
    ],
    usecases: [
      'RPA automatizacija — zamena za repetitivne manuelne radne tokove',
      'Automatsko testiranje web i desktop aplikacija bez pisanja test skripti',
      'Asistivna tehnologija za osobe sa motoričkim poteškoćama',
      'Automatizovano popunjavanje formi, izveštaja i administrativnih zadataka'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Computer Use — upravljanje desktop interfejsom
const response = await ai.models.generateContent({
  model: 'gemini-2.5-computer-use-preview-10-2025',
  contents: [
    { role: 'user', parts: [
      { text: 'Otvori Chrome, idi na google.com i pretraži "vremenska prognoza Beograd"' },
      { inlineData: { mimeType: 'image/png', data: screenshotBase64 } }
    ]}
  ]
});

// Odgovor sadrži koordinate za klik i akcije
console.log(response);`
  },
  'gemini-robotics-er-1.5-preview': {
    type: 'Robotika — Embodied Reasoning (v1.5)',
    desc: 'Gemini Robotics ER (Embodied Reasoning) 1.5 je specijalizovani model za upravljanje robota i prostorno rezonovanje. Razume 3D okruženja, planira pokrete robota i interpretira senzorske podatke.',
    features: [
      'Prostorno rezonovanje u 3D okruženjima iz kamera i senzora',
      'Planiranje robotskih pokreta za manipulaciju objekata',
      'Razumevanje fizičkih svojstava objekata (težina, krhkost, oblik)',
      'Adaptivno ponašanje na osnovu vizuelnog feedback-a iz okruženja'
    ],
    usecases: [
      'Upravljanje industrijskim robotskim rukama za sortiranje i pakovanje',
      'Navigacija autonomnih robota u nepoznatim prostorima',
      'Robotska manipulacija u skladištima i logističkim centrima',
      'Istraživačka robotika: interakcija sa složenim okruženjima'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Robotics ER 1.5 — prostorno rezonovanje za robote
const response = await ai.models.generateContent({
  model: 'gemini-robotics-er-1.5-preview',
  contents: [
    { role: 'user', parts: [
      { text: 'Na osnovu slike, planiraj pokrete robotske ruke da podigne crvenu kocku i stavi je na plavi sto.' },
      { inlineData: { mimeType: 'image/jpeg', data: robotCameraBase64 } }
    ]}
  ]
});

console.log(response);`
  },
  'gemini-robotics-er-1.6-preview': {
    type: 'Robotika — Embodied Reasoning (v1.6)',
    desc: 'Najnovija verzija Gemini Robotics ER modela sa poboljšanim razumevanjem fizičkog sveta i preciznijim planiranjem pokreta. Verzija 1.6 donosi bolje ocene na benchmarkovima za manipulaciju objekata i navigaciju.',
    features: [
      'Poboljšano razumevanje fizike: gravitacija, trenje, kolizija',
      'Precizniji proračun trajektorija za robotske ruke (sub-milimetarska tačnost)',
      'Multi-step planiranje sa verifikacijom svake faze pokreta',
      'Bolja generalizacija na nove objekte i okruženja bez retreninaga'
    ],
    usecases: [
      'Precizna montaža elektronskih komponenti u proizvodnim pogonima',
      'Hirurška robotika — planiranje pokreta za minimalno invazivne procedure',
      'Autonomna vožnja — razumevanje 3D okoline i planiranje putanja',
      'Servisna robotika u domaćinstvu: čišćenje, serviranje, organizacija'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Robotics ER 1.6 — naprednija fizička interakcija
const response = await ai.models.generateContent({
  model: 'gemini-robotics-er-1.6-preview',
  contents: [
    { role: 'user', parts: [
      { text: 'Analiziraj scenu i predloži sekvencu pokreta za pažljivo polaganje staklene čaše na policu. Uzmi u obzir krhkost objekta.' },
      { inlineData: { mimeType: 'image/jpeg', data: sceneImageBase64 } }
    ]}
  ]
});

console.log(response);`
  },
  'antigravity-preview-05-2026': {
    type: 'Autonomni Agent za Kodiranje (Antigravity)',
    desc: 'Antigravity Agent je napredni autonomni model za kodiranje dizajniran od Google DeepMind tima. Sposoban je za samostalno istraživanje kodnih baza, planiranje implementacija, pisanje i testiranje koda, i izvršavanje kompleksnih softverskih zadataka.',
    features: [
      'Autonomno istraživanje i razumevanje celih kodnih baza',
      'Planiranje i izvršavanje višekoračnih implementacija',
      'Automatsko pisanje testova, debagovanje i refaktorisanje',
      'Sposobnost za korišćenje alata: terminal, pretraživač, file system'
    ],
    usecases: [
      'Autonomna implementacija kompletnih feature-a od specifikacije do koda',
      'Automatsko debagovanje složenih problema u velikim kodnim bazama',
      'Migracija projekata između framework-ova i tehnologija',
      'Code review sa automatskim predlozima i primenom popravki'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Antigravity Agent — autonomno kodiranje
const response = await ai.models.generateContent({
  model: 'antigravity-preview-05-2026',
  contents: 'Analiziraj moju Node.js aplikaciju, identifikuj sve potencijalne bezbednosne propuste i predloži popravke sa kodom.',
});

console.log(response.text);`
  },

  // ═══════════════════════════════════════════════════════════
  // DEEP RESEARCH MODELI
  // ═══════════════════════════════════════════════════════════

  'deep-research-max-preview-04-2026': {
    type: 'Dubinsko Istraživanje Maksimalno (Deep Research Max)',
    desc: 'Najmoćniji model za dubinsko istraživanje koji izvršava iscrpne višekoračne pretrage interneta sa maksimalnom dubinom analize. Autonomno istražuje desetine izvora, sintetizuje nalaze i generiše detaljne izveštaje sa citatima.',
    features: [
      'Maksimalna dubina istraživanja — do 100+ izvora po upitu',
      'Višekoračno pretraživanje sa automatskim postavljanjem potpitanja',
      'Generisanje strukturiranih izveštaja sa citatima i referencama',
      'Sposobnost za identifikaciju kontradikcija između izvora'
    ],
    usecases: [
      'Akademska istraživanja: sistematski pregledi literature',
      'Due diligence analiza kompanija i tržišta za investitore',
      'Konkurentska analiza sa iscrpnim poređenjem proizvoda i cena',
      'Pravna istraživanja: pregled sudske prakse i regulativa'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Deep Research Max — iscrpno istraživanje
const response = await ai.models.generateContent({
  model: 'deep-research-max-preview-04-2026',
  contents: 'Napravi detaljan izveštaj o stanju AI industrije u Srbiji 2026: ključni igrači, investicije, talenti, regulativa i predviđanja.',
});

console.log(response.text);`
  },
  'deep-research-preview-04-2026': {
    type: 'Dubinsko Istraživanje (Deep Research)',
    desc: 'Automatizovani istraživački agent koji pretražuje internet u više koraka, sakuplja informacije iz raznih izvora i kompilira ih u koherentan izveštaj. Balans između dubine istraživanja i brzine — pogodan za svakodnevne istraživačke zadatke.',
    features: [
      'Automatsko višekorako pretraživanje interneta',
      'Inteligentno sintetizovanje informacija iz 20-50 izvora',
      'Generisanje strukturiranih izveštaja sa inline citatima',
      'Brži od Max verzije uz solidnu dubinu analize'
    ],
    usecases: [
      'Dnevna istraživanja tržišta i kompetitivne analize',
      'Priprema briefinga za sastanke i prezentacije',
      'Istraživanje novih tehnologija i trendova za R&D timove',
      'Generisanje sadržaja baziranog na aktuelnim izvorima'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Deep Research — standardno istraživanje
const response = await ai.models.generateContent({
  model: 'deep-research-preview-04-2026',
  contents: 'Istraži najnovije trendove u generativnoj AI za 2026. godinu i sumiraj top 5 najvažnijih razvoja.',
});

console.log(response.text);`
  },
  'deep-research-pro-preview-12-2025': {
    type: 'Dubinsko Istraživanje Pro (Deep Research Pro)',
    desc: 'Profesionalna verzija Deep Research modela iz decembra 2025. Fokusirana na kvalitet analize i dubinu rezonovanja — koristi Pro-class model za interpretaciju pronađenih informacija, što rezultira kvalitetnijim zaključcima i preporukama.',
    features: [
      'Pro-class rezonovanje za dublje razumevanje pronađenih informacija',
      'Bolja identifikacija relevantnih izvora i filtriranje šuma',
      'Napredna sinteza: prepoznavanje obrazaca i trendova među izvorima',
      'Generisanje akcionih preporuka na osnovu istraživanja'
    ],
    usecases: [
      'Strateško planiranje na osnovu dubinskih tržišnih analiza',
      'Priprema investicionih memoranduma sa detaljnom analizom',
      'Policy istraživanja za vladine i nevladine organizacije',
      'Naučna meta-analiza sa kritičkim osvrtom na metodologiju izvora'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Deep Research Pro — profesionalna analiza
const response = await ai.models.generateContent({
  model: 'deep-research-pro-preview-12-2025',
  contents: 'Istraži regulatorni okvir za AI u EU i Srbiji. Uporedi pristupe, identifikuj gapove i predloži akcioni plan za srpske tech kompanije.',
});

console.log(response.text);`
  },

  // ═══════════════════════════════════════════════════════════
  // EMBEDDING MODELI
  // ═══════════════════════════════════════════════════════════

  'gemini-embedding-001': {
    type: 'Embedding — Tekst (768 dimenzija)',
    desc: 'Gemini Embedding 001 je model za kreiranje vektorskih reprezentacija teksta u 768-dimenzionalnom prostoru. Koristi se za semantičku pretragu, sisteme preporuka i RAG (Retrieval-Augmented Generation) pipeline-ove.',
    features: [
      'Vektorske reprezentacije teksta u 768 dimenzija',
      'Podrška za semantičku sličnost i clustering dokumenata',
      'Optimizovan za RAG pipeline-ove i sisteme preporuka',
      'Efikasan za indeksiranje velikih kolekcija dokumenata'
    ],
    usecases: [
      'Semantička pretraga dokumenata po smislu umesto ključnih reči',
      'RAG sistemi: pronalaženje relevantnog konteksta za LLM odgovore',
      'Detekcija duplikata i sličnih sadržaja u velikim bazama',
      'Sistemi preporuka baziran na sličnosti sadržaja'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Embedding 001 — vektorska reprezentacija teksta
const result = await ai.models.embedContent({
  model: 'gemini-embedding-001',
  contents: 'Veštačka inteligencija menja način na koji radimo i živimo.',
});

console.log('Dimenzije:', result.embedding.values.length); // 768
console.log('Prvih 5 vrednosti:', result.embedding.values.slice(0, 5));`
  },
  'gemini-embedding-2-preview': {
    type: 'Embedding — Multimodalni Preview (Tekst + Slike)',
    desc: 'Preview verzija multimodalnog embedding modela koji podržava i tekst i slike. Omogućava kreiranje vektorskih reprezentacija u zajedničkom prostoru — možete pretraživati slike po tekstu i obrnuto.',
    features: [
      'Multimodalni embedinzi: tekst i slike u istom vektorskom prostoru',
      'Cross-modal pretraga: pronađite slike po tekstu i obrnuto',
      'Poboljšana semantička preciznost nad Embedding 001',
      'Preview pristup najnovijim mogućnostima pre stabilnog izdanja'
    ],
    usecases: [
      'Pretraga galerija slika po opisnim upitima na prirodnom jeziku',
      'Multimodalni RAG: pronalaženje relevantnih slika i teksta za LLM',
      'E-commerce: vizuelna pretraga proizvoda po opisima ili sličnim slikama',
      'Organizacija medijske biblioteke po semantičkom sadržaju'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Embedding 2 Preview — multimodalni embedding
const textEmbed = await ai.models.embedContent({
  model: 'gemini-embedding-2-preview',
  contents: 'Zalazak sunca nad morem sa narandžastim i ljubičastim tonovima',
});

// Može i za slike
const imageEmbed = await ai.models.embedContent({
  model: 'gemini-embedding-2-preview',
  contents: [{ inlineData: { mimeType: 'image/jpeg', data: imageBase64 } }],
});

console.log('Text embedding dimenzije:', textEmbed.embedding.values.length);`
  },
  'gemini-embedding-2': {
    type: 'Embedding — Multimodalni Stabilan (Tekst + Slike)',
    desc: 'Stabilna produkciona verzija multimodalnog embedding modela. Isti kvalitet kao preview verzija ali sa garantovanom stabilnošću i konzistentnošću — pogodan za produkcione sisteme preporuka i pretrage.',
    features: [
      'Stabilna verzija za pouzdane produkcione sisteme',
      'Konzistentni multimodalni embedinzi bez preview varijacija',
      'Optimizovan throughput za masovnu obradu dokumenata i slika',
      'Potpuna podrška za batch embedding više stavki odjednom'
    ],
    usecases: [
      'Produkcioni sistemi za semantičku pretragu velikih dokument baza',
      'Preporučivači sadržaja u medijskim platformama',
      'Detekcija plagijata i sličnosti u akademskim radovima',
      'Automatska kategorizacija i organizacija multimedijalnog sadržaja'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Embedding 2 Stabilan — produkcioni embedinzi
const result = await ai.models.embedContent({
  model: 'gemini-embedding-2',
  contents: 'Kako implementirati mikroservisnu arhitekturu u Node.js',
});

console.log('Embedding vektor (prvih 10):', result.embedding.values.slice(0, 10));`
  },
  'aqa': {
    type: 'Odgovori sa Atribucijom (Attributed QA)',
    desc: 'Model za odgovaranje na pitanja sa automatskim citatima izvora. AQA (Attributed Question Answering) ne samo da daje odgovor, već i precizno pokazuje odakle je informacija preuzeta — idealan za sisteme gde je proverljivost informacija kritična.',
    features: [
      'Automatsko citiranje izvora za svaki deo odgovora',
      'Procena pouzdanosti odgovora (confidence score)',
      'Podrška za grounded odgovore nad korisničkim dokumentima',
      'Identifikacija pitanja na koja ne može da se odgovori iz datog konteksta'
    ],
    usecases: [
      'Pravni sistemi: odgovori na pitanja sa citatima relevantnih zakona',
      'Korporativni knowledge base sa proverljivim odgovorima',
      'Medicinska informacijska služba sa obaveznim navođenjem izvora',
      'Edukativne platforme gde studenti moraju da verifikuju informacije'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// AQA — odgovor sa citatom izvora
const response = await ai.models.generateAnswer({
  model: 'aqa',
  contents: 'Koji su osnovni principi GDPR regulacije?',
  answerStyle: 'VERBOSE',
  safetySettings: [],
  inlinePassages: {
    passages: [
      { id: '1', content: 'GDPR (General Data Protection Regulation) je evropska uredba usvojena 2016. godine koja štiti lične podatke...' },
      { id: '2', content: 'Osnovni principi GDPR-a uključuju: zakonitost obrade, minimizaciju podataka, tačnost, ograničenje čuvanja...' }
    ]
  }
});

console.log('Odgovor:', response.answer);
console.log('Citati:', response.answerableProbability);`
  },

  // ═══════════════════════════════════════════════════════════
  // GEMMA OPEN-WEIGHT MODELI
  // ═══════════════════════════════════════════════════════════

  'gemma-4-26b-a4b-it': {
    type: 'Open-Weight MoE (Gemma 4 — 26B parametara, 4B aktivnih)',
    desc: 'Gemma 4 26B je open-weight model sa Mixture-of-Experts (MoE) arhitekturom — 26 milijardi ukupnih parametara ali samo 4 milijarde aktivnih pri svakoj inferenciji. Rezultat: performanse velikog modela uz brzinu i efikasnost malog.',
    features: [
      'MoE arhitektura: 26B ukupno, samo 4B aktivnih za ultra-efikasnu inferenciju',
      'Open-weight: potpuno besplatan za preuzimanje i lokalno pokretanje',
      'Instruction-tuned za praćenje korisničkih instrukcija',
      'Pogodan za fine-tuning na prilagođenim datasetovima'
    ],
    usecases: [
      'Lokalno pokretanje AI modela bez cloud zavisnosti',
      'Fine-tuning na domenski specifičnim podacima (medicina, pravo, finansije)',
      'On-premise AI za organizacije sa strogim zahtevima za privatnošću',
      'Edge deployment na uređajima sa GPU-om (NVIDIA RTX 4090+)'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gemma 4 26B MoE — efikasan open-weight model
const response = await ai.models.generateContent({
  model: 'gemma-4-26b-a4b-it',
  contents: 'Objasni razliku između MoE i dense transformer arhitektura. Zašto je MoE efikasniji?',
});

console.log(response.text);

// Za lokalno pokretanje: download sa HuggingFace
// pip install transformers accelerate
// model = AutoModelForCausalLM.from_pretrained("google/gemma-4-26b-a4b-it")`
  },
  'gemma-4-31b-it': {
    type: 'Open-Weight Dense (Gemma 4 — 31B parametara)',
    desc: 'Gemma 4 31B je dense (puni) open-weight model sa 31 milijardu parametara. Za razliku od MoE varijante, svi parametri su aktivni pri inferenciji — što rezultira boljim kvalitetom za najsloženije zadatke, uz veće hardverske zahteve.',
    features: [
      'Dense arhitektura: svih 31B parametara aktivno za maksimalni kvalitet',
      'Open-weight: besplatan za preuzimanje, pokretanje i modifikaciju',
      'Bolji kvalitet od MoE varijante za najsloženije reasoning zadatke',
      'Instruction-tuned sa podrškom za multi-turn konverzacije'
    ],
    usecases: [
      'Istraživački projekti koji zahtevaju maksimalan kvalitet bez cloud-a',
      'On-premise deployment u bankama, bolnicama i vladinom sektoru',
      'Fine-tuning za specijalizovane domene sa punom kontrolom nad modelom',
      'Benchmark testiranje i akademska istraživanja nad LLM arhitekturama'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Gemma 4 31B Dense — maksimalan kvalitet
const response = await ai.models.generateContent({
  model: 'gemma-4-31b-it',
  contents: 'Napiši Python implementaciju Red-Black stabla sa operacijama insert, delete i search. Dodaj komentare za svaki korak rotacije.',
});

console.log(response.text);

// Hardverski zahtevi za lokalno pokretanje:
// GPU: NVIDIA A100 80GB ili 2x RTX 4090
// RAM: 64GB+`
  },

  // ═══════════════════════════════════════════════════════════
  // VEO VIDEO GENERISANJE
  // ═══════════════════════════════════════════════════════════

  'veo-2.0-generate-001': {
    type: 'Video Generisanje (Veo 2)',
    desc: 'Google Veo 2 model za generisanje realističnog videa iz tekstualnih opisa. Kreira kratke video klipove sa razumevanjem fizike, pokreta i svetlosti — pogodan za koncept video produkciju i vizuelni storytelling.',
    features: [
      'Generisanje realističnih video klipova iz tekst promptova',
      'Razumevanje fizike: gravitacija, refleksija svetlosti, pokret fluida',
      'Podrška za različite stilove: fotorealistično, animacija, apstraktno',
      'Kontrola kamere: panorama, zum, praćenje objekta'
    ],
    usecases: [
      'Koncept video produkcija za filmske i reklamne pitch prezentacije',
      'Kreiranje kratkih promo video klipova za društvene mreže',
      'Vizualizacija arhitektonskih i dizajnerskih koncepata u pokretu',
      'Edukativni video sadržaj: animirane ilustracije naučnih procesa'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Veo 2 — generisanje videa
const response = await ai.models.generateVideos({
  model: 'veo-2.0-generate-001',
  prompt: 'Drone snimak moderne vile na obali Jadranskog mora pri zalasku sunca, cinematski stil, 4K',
  config: {
    aspectRatio: '16:9',
    numberOfVideos: 1
  }
});

// Video se generise asinhrono
const operation = response.operation;
console.log('Video generisanje pokrenuto, ID:', operation.name);`
  },
  'veo-3.0-generate-001': {
    type: 'Video Generisanje Cinematski (Veo 3)',
    desc: 'Veo 3 donosi cinematski kvalitet video generisanja — poboljšano razumevanje svetlosti, senki, dubine polja i realističnih pokreta. Sposoban za generisanje videa sa zvukom i naratora, što ga čini idealnim za profesionalnu produkciju.',
    features: [
      'Cinematski kvalitet sa realističnom dubinom polja i osvetljenjem',
      'Generisanje videa SA ZVUKOM i ambient audio efektima',
      'Poboljšano razumevanje ljudskih pokreta i izraza lica',
      'Duži klipovi sa konzistentnom vizuelnom koherentnošću'
    ],
    usecases: [
      'Profesionalna video produkcija za filmove i serije (pre-vizualizacija)',
      'Reklamni spotovi sa cinematskim kvalitetom po niskoj ceni',
      'Generisanje muzičkih spotova iz tekstualnih opisa',
      'Virtualna produkcija: generisanje pozadina i efekata za filmove'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Veo 3 — cinematski video sa zvukom
const response = await ai.models.generateVideos({
  model: 'veo-3.0-generate-001',
  prompt: 'Žena šeta kroz bambusovu šumu u Kjotu, jesen, lišće opada, zvuk vetra i ptičijeg pojanja, cinematski slow motion, filmski color grading',
  config: {
    aspectRatio: '16:9',
    numberOfVideos: 1
  }
});

console.log('Cinematski video u procesu:', response.operation.name);`
  },
  'veo-3.0-fast-generate-001': {
    type: 'Video Generisanje Brzo (Veo 3 Fast)',
    desc: 'Brža varijanta Veo 3 modela sa smanjenom latencijom — idealna za iterativno kreiranje sadržaja gde je brzina bitnija od maksimalnog kvaliteta. Generiše video 3-5x brže od standardnog Veo 3.',
    features: [
      'Brzo generisanje videa — 3-5x brže od standardnog Veo 3',
      'Dobar kvalitet za social media i draft video sadržaj',
      'Niska latencija za brze iteracije i eksperimentisanje',
      'Podrška za zvuk i ambient audio efekte'
    ],
    usecases: [
      'Brzo kreiranje draft video sadržaja za odobrenje pre finalne produkcije',
      'Social media sadržaj gde je brzina objavljivanja kritična',
      'A/B testiranje različitih video koncepata za reklamne kampanje',
      'Real-time generisanje video odgovora u interaktivnim aplikacijama'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Veo 3 Fast — brzo generisanje
const response = await ai.models.generateVideos({
  model: 'veo-3.0-fast-generate-001',
  prompt: 'Animirani logo reveal za tech startup, tamna pozadina, neonski indigo svetla, particles efekat',
  config: {
    aspectRatio: '1:1',
    numberOfVideos: 1
  }
});

console.log('Brzi video u procesu:', response.operation.name);`
  },
  'veo-3.1-generate-preview': {
    type: 'Video Generisanje Najnoviji (Veo 3.1)',
    desc: 'Najnovija generacija Veo modela — Veo 3.1 donosi još realisticniji video sa boljim vremenskim konzistencijama, prirodnijim pokretima i poboljšanom kontrolom kamere. Preview pristup cutting-edge video AI tehnologiji.',
    features: [
      'Najbolji kvalitet video generisanja u celoj Veo porodici',
      'Unapređena vremenska koherentnost — manje flickeringa i artifakta',
      'Precizna kontrola kamere: specifični uglovi, pokreti i tranzicije',
      'Najrealističniji ljudski pokreti i izrazi lica do sada'
    ],
    usecases: [
      'Flagship video produkcija za velike brendove i kampanje',
      'Film pre-vizualizacija sa skoro finalnim kvalitetom',
      'Kreiranje videoigara cinematic trailer-a i cutscena',
      'Virtualni influenseri i avatar video sadržaj'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Veo 3.1 — najkvalitetniji video
const response = await ai.models.generateVideos({
  model: 'veo-3.1-generate-preview',
  prompt: 'Epski kadar: zmaj leti iznad srednjovekovnog zamka u planinama, oblačno nebo, filmski wide shot, fantasy stil, zlatno svetlo probija kroz oblake',
  config: {
    aspectRatio: '21:9',
    numberOfVideos: 1
  }
});

console.log('Premium video u procesu:', response.operation.name);`
  },
  'veo-3.1-fast-generate-preview': {
    type: 'Video Generisanje Brzo Next-Gen (Veo 3.1 Fast)',
    desc: 'Brza varijanta Veo 3.1 modela — kombinuje poboljšani kvalitet 3.1 generacije sa niskom latencijom. Optimalan za produkcione radne tokove gde je potreban dobar kvalitet uz prihvatljivo vreme generisanja.',
    features: [
      'Kvalitet Veo 3.1 uz brzinu Fast varijante',
      'Poboljšana vremenska koherentnost čak i u brzom režimu',
      'Optimizovan za masovnu obradu većeg broja video zahteva',
      'Podrška za sve aspektne odnose i rezolucije'
    ],
    usecases: [
      'Masovna izrada personalizovanih video oglasa za remarketing',
      'Automatizovana izrada video thumbnailova sa pokretom',
      'Dinamički video sadržaj za web stranice i landing page-ove',
      'Produkcioni pipeline za generisanje serija video klipova'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Veo 3.1 Fast — brz kvalitetan video
const response = await ai.models.generateVideos({
  model: 'veo-3.1-fast-generate-preview',
  prompt: 'Proizvod shot: bežične slušalice na mramornom stolu, soft ambient svetlo, slow rotation, minimalistički stil',
  config: {
    aspectRatio: '9:16',
    numberOfVideos: 1
  }
});

console.log('Fast video u procesu:', response.operation.name);`
  },
  'veo-3.1-lite-generate-preview': {
    type: 'Video Generisanje Lagano (Veo 3.1 Lite)',
    desc: 'Najlakša i najjeftinija verzija Veo 3.1 modela. Dizajnirana za jednostavne video zadatke gde je potreban osnovni kvalitet po minimalnoj ceni — logo animacije, jednostavni B-roll klipovi i social media shorts.',
    features: [
      'Najniža cena u Veo porodici za budget-friendly video produkciju',
      'Brza obrada za jednostavnije video koncepte',
      'Dovoljno dobar kvalitet za social media i web sadržaj',
      'Optimizovan za kratke klipove (3-5 sekundi)'
    ],
    usecases: [
      'Budget-friendly video sadržaj za male biznise i startup-ove',
      'Animirani pozadinski video za web stranice i prezentacije',
      'Jednostavni B-roll klipovi za YouTube i blogove',
      'Generisanje GIF-like kratkih looping video klipova'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Veo 3.1 Lite — budget video
const response = await ai.models.generateVideos({
  model: 'veo-3.1-lite-generate-preview',
  prompt: 'Jednostavan looping video: padanje kiše na prozor, zamućena svetla grada u pozadini, cozy atmosfera',
  config: {
    aspectRatio: '1:1',
    numberOfVideos: 1
  }
});

console.log('Lite video u procesu:', response.operation.name);`
  },

  // ═══════════════════════════════════════════════════════════
  // LYRIA MUZIKA GENERISANJE
  // ═══════════════════════════════════════════════════════════

  'lyria-3-clip-preview': {
    type: 'Muzika Generisanje — Kratki Klipovi (Lyria 3 Clip)',
    desc: 'Google Lyria 3 Clip model za generisanje muzičkih klipova u trajanju do 30 sekundi iz tekstualnih opisa. Kreira muziku u raznim žanrovima sa instrumentima, vokalom i studijskim kvalitetom zvuka.',
    features: [
      'Generisanje muzike do 30 sekundi iz tekst promptova',
      'Podrška za širok spektar žanrova: pop, rok, elektronika, klasika, jazz',
      'Razumevanje muzičke teorije: tempo, tonalitet, dinamika',
      'Studijski kvalitet audio izlaza (44.1kHz stereo)'
    ],
    usecases: [
      'Kreiranje džinglova i audio brendiranja za kompanije',
      'Muzička pozadina za kratke video klipove i reklame',
      'Prototipiranje muzičkih ideja za kompozitore i producente',
      'Sound design za video igre i mobilne aplikacije'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Lyria 3 Clip — kratki muzički klipovi
const response = await ai.models.generateContent({
  model: 'lyria-3-clip-preview',
  contents: 'Napravi 30-sekundni lo-fi hip hop beat sa soft klavirskim melodijama, sporim bubnjačkim patternima i chill atmosferom za studiranje.',
  config: {
    responseModalities: ['AUDIO']
  }
});

// Audio podaci u response
console.log('Muzički klip generisan!');`
  },
  'lyria-3-pro-preview': {
    type: 'Muzika Generisanje — Profesionalno (Lyria 3 Pro)',
    desc: 'Profesionalna verzija Lyria muzičkog modela za kreiranje dužih kompozicija sa punim aranžmanima. Podržava kompleksne muzičke strukture sa uvodom, strofom, refrenom i drugim elementima profesionalne produkcije.',
    features: [
      'Generisanje dužih muzičkih kompozicija sa kompletnom strukturom',
      'Puni aranžmani: uvod, strofa, refren, bridge, outro',
      'Napredno razumevanje instrumentacije i orkestracije',
      'Podrška za specifične BPM, tonalitet i tempo promene'
    ],
    usecases: [
      'Profesionalna produkcija podloga za filmove i serije',
      'Kreiranje kompletnih demo pesama za muzičare i bendove',
      'Generisanje ambient muzike za restorane, hotele i prodajne prostore',
      'Muzička produkcija za podkast uvode, reklame i korporativne video sadržaje'
    ],
    code: `import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Lyria 3 Pro — profesionalna muzička kompozicija
const response = await ai.models.generateContent({
  model: 'lyria-3-pro-preview',
  contents: 'Komponiraj epsku orkestralnu temu za fantasy video igru: počni tiho sa solo violinom, postepeno dodaj gudače, zatim puni orkestar sa bubnjevima u klimaksu. Tonalitet D mol, tempo 90 BPM.',
  config: {
    responseModalities: ['AUDIO']
  }
});

console.log('Profesionalna kompozicija generisana!');`
  }
};