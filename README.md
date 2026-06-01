# Gemini Models List App

🟢 **Live Demo:** [https://gemini-models-list-app.onrender.com](https://gemini-models-list-app.onrender.com)

Gemini Models List App je interaktivna veb aplikacija koja korisnicima omogućava da pregledaju, analiziraju i testiraju svih 50 zvaničnih Google Gemini AI modela na jednom mestu. Aplikacija služi kao ultimativni katalog i živi tester (playground) za eksperimentisanje sa tekstualnim, vizuelnim i audio funkcijama najnovijih Gemini modela.

## 🚀 Mogućnosti Aplikacije

- **Sveobuhvatna Lista Modela:** Pregled svih 50 modela sa opisima, slučajevima upotrebe i tehničkim karakteristikama.
- **Interaktivni Tester (Playground):** Šaljite zahteve modelima i pratite odgovore u realnom vremenu uz "JSON konzolu" ispod haube.
- **Multimodalna Podrška:** _Drag & Drop_ sistem omogućava ubacivanje slika, videa i audio fajlova direktno u Prompt.
- **Praktični Primeri (Mock Baza):** Svaki model dolazi sa "Vizuelnim primerom" (Tekst, Audio, Slika, Video) koji pokazuje šta sve konkretan model može.
- **Bezbednost na prvom mestu:** Vaš Google API ključ komunicira direktno sa lokalnim serverom – bez brige o curenju podataka.

---

## ⚙️ Preduslovi za instalaciju

Da biste pokrenuli ovaj projekat lokalno, potrebno je da na Vašem računaru imate instaliran **Node.js**.
Proverite da li imate instaliran Node.js otvaranjem terminala i ukucavanjem:

```bash
node -v
```

_(Ukoliko Vam komanda nije prepoznata, besplatno preuzmite Node.js sa [nodejs.org](https://nodejs.org/))_

---

## 🔑 Kako dobiti besplatan Google Gemini API Ključ

Za korišćenje ove aplikacije, potreban Vam je Google Gemini API ključ. Google trenutno nudi fenomenalan **Free Tier** (potpuno besplatan pristup većini modela sa vrlo izdašnim limitima za testiranje).

1. Idite na zvanični portal: **[Google AI Studio](https://aistudio.google.com/)**
2. Prijavite se sa Vašim standardnim Google (Gmail) nalogom.
3. Sa leve strane, u meniju kliknite na dugme **"Get API key"**.
4. Zatim kliknite na **"Create API key"** (Možete odabrati novi projekat ili iskoristiti postojeći ako ga imate).
5. Kopirajte generisani kod (ovaj kod ćete ubaciti u `.env` fajl u sledećem koraku).

---

## 🛠️ Instalacija i Pokretanje

1. **Klonirajte repozitorijum** (ili preuzmite ZIP fajl):

```bash
git clone git@github.com:Newbluewood/Gemini-Models-List-App.git
cd Gemini-Models-List-App
```

2. **Instalirajte zavisnosti:**

```bash
npm install
```

3. **Napravite `.env` fajl:**
   U glavnom direktorijumu aplikacije postoji fajl koji se zove `.env.example`. Preimenujte ga u **`.env`** (ili jednostavno kreirajte novi fajl sa tim imenom).
   Otvorite ga i unutra ubacite Vaš API ključ koji ste malopre kopirali iz Google AI Studija. Fajl treba da izgleda isključivo ovako:

```env
GEMINI_API_KEY=ubaci_svoj_generisani_kljuc_ovde
```

4. **Pokrenite aplikaciju:**

```bash
npm run dev
```

5. **Otvorite aplikaciju u pretraživaču!**
   U Vašem omiljenom internet pretraživaču otvorite adresu:
   `http://localhost:3000`

---

## 📂 Struktura Projekta

- `/public` - Front-end fajlovi (HTML, Tailwind stilovi, `app.js` interakcija i slike/primeri).
- `server.js` - Express back-end (Ovaj deo služi kao siguran Proxy. On čuva Vaš `.env` ključ i šalje obezbeđene zahteve ka Google serverima).
- `init-db.cjs` / `models.db` - SQLite baza podataka i skripta za generisanje primera i modela. (Baza je već kreirana, a komandom `node init-db.cjs` uvek možete vratiti primere na fabrička podešavanja).

Uživajte u istraživanju budućnosti AI-a kroz Gemini ekosistem! 🤖✨🙌
