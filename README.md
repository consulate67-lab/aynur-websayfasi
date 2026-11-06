# Aynur Alişan Azer — kişisel site

Vercel’e hazır Next.js (App Router) sitesi. Türkçe arayüz; sage / tea-amber mahalle editorial dili; AI ile üretilmiş hikâye fotoğrafları.

Repo kökü = uygulama kökü (soundteacher ile aynı düzen).

## Preferred: production on Vercel

### One-time: Import GitHub → permanent URL

1. Open [vercel.com/new](https://vercel.com/new) → **Import** `consulate67-lab/aynur-websayfasi`
2. Branch: **`main`**
3. Framework: **Next.js** (auto from `vercel.json`) → Root Directory: `.` → **Deploy**
4. No required env vars for MVP. Optional placeholders: see `.env.example`.
5. Copy the Production URL (`https://….vercel.app`) and use that for QA.

### Agent / CI permanent deploy (optional)

Cloud agent **cannot** create a sticky production URL without a Vercel token:

1. [vercel.com/account/tokens](https://vercel.com/account/tokens) → create token  
2. Add secret **`VERCEL_TOKEN`** to the Cursor cloud agent / environment (and optionally `VERCEL_ORG_ID` + `VERCEL_PROJECT_ID` after first `vercel link`)  
3. Re-run → `npx vercel deploy --prod --yes`

```bash
npx vercel login          # or export VERCEL_TOKEN=…
npx vercel link           # project: aynur-websayfasi
npx vercel --prod --yes
```

Anonymous `npx vercel deploy --temporary` expires in ~60 minutes — claim via the printed claim URL, or use Dashboard Import above for a permanent project.

## Local dev

```bash
npm install
cp .env.example .env.local   # optional; no secrets required yet
npm run dev
```

http://localhost:3000

Üretim derlemesi:

```bash
npm run build
npm start
```

## Yeni hikâye ekleme

1. Sahneye uygun fotoğrafı `public/stories/` altına koyun (örn. `aynur-cay-saati.jpg`).
2. `content/stories.json` dosyasına yeni bir nesne ekleyin:

```json
{
  "id": "cay-saati",
  "slug": "cay-saati",
  "title": "Çay saati",
  "eyebrow": "Hikaye",
  "summary": "Kısa özet…",
  "body": ["Paragraf 1.", "Paragraf 2."],
  "image": "/stories/aynur-cay-saati.jpg",
  "imageAlt": "Aynur çay içerken",
  "date": "2026-11-07"
}
```

3. Push to `main` (Vercel redeploy) veya `npm run build` yerel.

## Yapı

```
app/                 # App Router
components/          # Header, Reveal, StoryCard
content/stories.json # Hikâye verisi
lib/stories.ts       # Okuyucu yardımcıları
public/photos/       # Portre / hero
public/stories/      # AI hikâye görselleri
vercel.json          # Next.js framework + npm build/install
```
