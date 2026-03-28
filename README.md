# Odontoiatria Maria Gentili — Nuovo Sito Web

Ricostruzione completa del sito su monorepo React (Vite) + Node.js/Express.

---

## Avvio rapido

### 1. Scraper (opzionale — estrae contenuti e immagini dal sito originale)
```bash
cd scraper
pip install -r requirements.txt
python scrape.py
# Output: scraped_assets/site_data.json + scraped_assets/images/
```
Dopo lo scraping, copia `site_data.json` in `backend/data/`.

### 2. Backend
```bash
cd backend
npm install
node server.js         # prod
node --watch server.js # dev (auto-restart)
# ✅ http://localhost:3001
# GET /api/content  → restituisce site_data.json
# GET /api/ping     → health check
```

### 3. Frontend (in un altro terminale)
```bash
cd frontend
npm install
npm run dev
# ✅ http://localhost:5173
```

---

## Struttura
```
dentista/
├── scraper/                # Python scraper
│   ├── scrape.py
│   ├── requirements.txt
│   └── scraped_assets/     # output (gitignored)
│       ├── site_data.json
│       └── images/
├── backend/
│   ├── server.js           # Express entrypoint
│   ├── routes/content.js   # GET /api/content
│   └── data/
│       └── site_data.json  # mock DB (copiato da scraper)
└── frontend/
    ├── vite.config.js
    ├── tailwind.config.js
    └── src/
        ├── App.jsx          # Router + AnimatePresence + Lenis
        ├── components/
        │   ├── layout/      # Navbar, Footer
        │   ├── ui/          # CustomCursor, PageLoader, PageTransition
        │   └── sections/    # Hero, Services, About, Stats, Reviews, ContactCTA
        ├── pages/           # Home, Studio, Staff, ServiceDetail, Contatti
        └── hooks/           # useSiteData.jsx, useScrollAnimation.jsx
```

## Stack
- **Frontend:** React 18 + Vite, TailwindCSS, Framer Motion, GSAP, Lenis, vanilla-tilt, Lucide
- **Backend:** Node.js + Express, Helmet, CORS
- **Scraper:** Python 3 + requests + BeautifulSoup4
