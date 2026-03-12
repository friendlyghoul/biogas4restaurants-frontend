# 🌿 Biogas4Restaurants — Frontend (PWA)

> *"If biogas can't come to you — you go to the biogas."*

Open-source energy resilience framework for Indian cloud kitchens and restaurants.

**Live site:** [biogas4restaurants.org](https://biogas4restaurants.org)  
**YouTube:** [@biogas4restaurants](https://youtube.com/@biogas4restaurants)  
**License:** CC0 1.0 — Public Domain

---

## What is this?

A multilingual PWA (Progressive Web App) landing page for the Biogas4Restaurants open-source concept. The site:

- Explains the biogas backup concept in **6 Indian languages** (EN, HI, TA, MR, KN, ML)
- Switches YouTube explainer videos **and** infographic images together when language changes
- Works **offline** once installed as a PWA
- Installable on Android and iOS home screens
- Phase 2 will host a **live IoT pilot dashboard** (backend: `biogas4restaurants-backend`)

## Tech Stack

- **React 18** + **Vite 5**
- **vite-plugin-pwa** (Workbox) — offline + install prompt
- **Deployed on Vercel** (free tier)

---

## Project Structure

```
biogas4restaurants-frontend/
├── public/
│   ├── favicon.svg
│   ├── images/              ← Language-specific infographics (NotebookLM generated)
│   │   ├── infographic-en.png
│   │   ├── infographic-hi.png
│   │   ├── infographic-mr.png
│   │   ├── infographic-kn.png
│   │   ├── infographic-ml.png
│   │   ├── infographic-ml2.png
│   │   └── infographic-ml3.png
│   ├── icons/               ← PWA icons (generate with: npm run generate-icons)
│   └── concept-doc.docx     ← Downloadable concept document
├── src/
│   ├── main.jsx             ← Entry point + service worker registration
│   ├── App.jsx              ← Root component + PWA banners
│   ├── data/
│   │   └── languages.js     ← All 6 languages: content, YouTube video IDs, image mapping
│   ├── components/
│   │   ├── LandingPage.jsx  ← Full multilingual landing page
│   │   └── PWABanners.jsx   ← Install / update / offline banners
│   └── hooks/
│       └── usePWAInstall.js ← PWA install + update hook
├── scripts/
│   └── generate-icons.js    ← Icon generation helper
├── index.html               ← Full meta/OG/PWA tags
├── vite.config.js           ← Vite + PWA plugin config
├── vercel.json              ← Vercel deployment + headers config
└── package.json
```

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Generate PWA icons (one time only)
npm run generate-icons

# 3. Run locally
npm run dev

# 4. Build for production
npm run build
```

---

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Repository
3. Vercel auto-detects Vite — no config needed
4. Add custom domain `biogas4restaurants.org` in Vercel dashboard
5. Every push to `main` auto-deploys ✅

---

## Adding / Updating a Language

Open `src/data/languages.js` and:
1. Add a new entry to the `LANGUAGES` object
2. Set `videoId` to your YouTube video ID
3. Set `imageIndex` to the correct image in `IMAGE_FILES`
4. Add the infographic PNG to `public/images/`

---

## Phase 2: Live IoT Dashboard

When the pilot cloud kitchen is live, the frontend will connect to:
- **Backend:** `biogas4restaurants-backend` (Railway + PostgreSQL)
- **Data:** Real-time gas pressure, temperature, pH from Raspberry Pi
- **Display:** Live charts showing daily gas output, LPG savings, digester health

---

## YouTube Channel

**@biogas4restaurants** — Videos available in:
- 🇬🇧 English · 🇮🇳 Hindi · தமிழ் · मराठी · ಕನ್ನಡ · മലയാളം

---

## License

**CC0 1.0 Universal** — Public Domain.  
No patents. No company. Free to use, copy, modify, distribute — no attribution required.
