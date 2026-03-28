import { Router } from "express";
import { readFileSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Path to site_data.json produced by the Python scraper
// Resolve from backend/data/site_data.json
const DATA_PATH = resolve(__dirname, "..", "data", "site_data.json");

const router = Router();

/**
 * GET /api/content
 * Returns the full site data object from site_data.json.
 * The frontend fetches this on mount and uses it to render all sections.
 */
router.get("/content", (_req, res) => {
  if (!existsSync(DATA_PATH)) {
    // Return a minimal stub if the scraper hasn't run yet
    console.warn(`[WARN] site_data.json not found at ${DATA_PATH}. Returning stub.`);
    return res.json(getFallbackData());
  }

  try {
    const raw = readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);
    return res.json(data);
  } catch (err) {
    console.error("[ERROR] Failed to read/parse site_data.json:", err.message);
    return res.status(500).json({ error: "Failed to load site data" });
  }
});

/**
 * GET /api/content/:slug
 * Returns a single page's content by slug.
 */
router.get("/content/:slug", (req, res) => {
  const { slug } = req.params;

  if (!existsSync(DATA_PATH)) {
    return res.status(503).json({ error: "Site data not yet available. Run the scraper first." });
  }

  try {
    const raw = readFileSync(DATA_PATH, "utf-8");
    const data = JSON.parse(raw);
    const page = data.pages?.[slug];

    if (!page) {
      return res.status(404).json({ error: `Page '${slug}' not found` });
    }

    return res.json({
      meta: data.meta,
      palette: data.palette,
      page,
    });
  } catch (err) {
    console.error("[ERROR]", err.message);
    return res.status(500).json({ error: "Failed to load page data" });
  }
});

// ─── Fallback stub (before scraper runs) ─────────────────────────────────────
function getFallbackData() {
  return {
    meta: {
      site_name: "Odontoiatria Maria Gentili",
      doctor: "Dott.ssa Maria Gentili",
      tagline: "Previeni, cura, mantieni.",
      subtitle: "Studio dentistico a Castelfranco di Sotto e Peccioli, specializzato nella prevenzione.",
      base_url: "https://www.odontoiatriamariagentili.it",
    },
    palette: {
      primary: "#0a2342",
      secondary: "#4a9ebe",
      accent: "#c8a96e",
      background: "#ffffff",
      text: "#1a1d2e",
    },
    navigation: [],
    contact: {
      sedi: [],
      whatsapp: "+39 327 3938147",
      email: "info@odontoiatriamariagentili.it",
      social: {},
    },
    services_meta: [],
    pages: {},
    stats: [],
    reviews: [],
    _stub: true,
  };
}

export default router;
