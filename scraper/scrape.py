"""
Production-ready scraper for odontoiatriamariagentili.it
Extracts: semantic content, color palette, images
Output: site_data.json + scraped_assets/images/
"""

import os
import re
import json
import time
import hashlib
from urllib.parse import urljoin, urlparse, unquote
import requests
from bs4 import BeautifulSoup

# ─── Configuration ────────────────────────────────────────────────────────────

BASE_URL = "https://www.odontoiatriamariagentili.it"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "scraped_assets")
IMAGES_DIR = os.path.join(OUTPUT_DIR, "images")
OUTPUT_JSON = os.path.join(OUTPUT_DIR, "site_data.json")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/122.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "it-IT,it;q=0.9,en;q=0.8",
    "Referer": BASE_URL,
}
TIMEOUT = 12
REQUEST_DELAY = 0.8  # seconds between requests — polite crawling

ROUTES = [
    {"slug": "home",                             "path": "/"},
    {"slug": "studio",                           "path": "/studio"},
    {"slug": "staff",                            "path": "/staff-gallery"},
    {"slug": "prevenzione",                      "path": "/prestazioni/prevenzione"},
    {"slug": "parodontologia",                   "path": "/prestazioni/parodontologia"},
    {"slug": "conservativa-endodonzia",          "path": "/prestazioni/conservativa-ed-endodonzia"},
    {"slug": "implantologia",                    "path": "/prestazioni/implantologia"},
    {"slug": "ortodonzia",                       "path": "/prestazioni/ortodonzia"},
    {"slug": "estetica-volto",                   "path": "/prestazioni/estetica"},
    {"slug": "estetica-sorriso",                 "path": "/estetica-del-sorriso"},
    {"slug": "pedodonzia",                       "path": "/prestazioni/odontoiatria-infantile"},
    {"slug": "contatti",                         "path": "/contatti"},
]

# Fallback palette in case CSS extraction finds nothing
FALLBACK_PALETTE = {
    "primary": "#0a2342",
    "secondary": "#4a9ebe",
    "accent": "#c8a96e",
    "background": "#ffffff",
    "text": "#1a1d2e",
}


# ─── Helpers ──────────────────────────────────────────────────────────────────

def ensure_dirs():
    os.makedirs(IMAGES_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)


def sanitize_filename(name: str, max_len: int = 80) -> str:
    name = unquote(name)
    name = re.sub(r'[\\/*?:"<>|]', "_", name)
    name = re.sub(r'\s+', "_", name.strip())
    name = re.sub(r'_+', "_", name)
    return name[:max_len] if len(name) > max_len else name


def fetch_page(url: str) -> BeautifulSoup | None:
    try:
        resp = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
        resp.raise_for_status()
        return BeautifulSoup(resp.text, "lxml")
    except requests.exceptions.HTTPError as e:
        print(f"  [HTTP ERROR] {url} → {e}")
    except requests.exceptions.ConnectionError:
        print(f"  [CONNECTION ERROR] Could not reach {url}")
    except requests.exceptions.Timeout:
        print(f"  [TIMEOUT] {url}")
    except Exception as e:
        print(f"  [UNEXPECTED ERROR] {url} → {e}")
    return None


def fetch_bytes(url: str) -> bytes | None:
    try:
        resp = requests.get(url, headers=HEADERS, timeout=TIMEOUT, stream=True)
        resp.raise_for_status()
        return resp.content
    except Exception as e:
        print(f"  [IMAGE FETCH ERROR] {url} → {e}")
    return None


# ─── Color Palette Extraction ─────────────────────────────────────────────────

def _extract_hex_colors_from_css_text(css_text: str) -> list[str]:
    """Find all 3- and 6-digit hex color codes in a CSS string."""
    pattern = r'#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b'
    matches = re.findall(pattern, css_text)
    # Normalize 3-digit to 6-digit
    normalized = []
    for m in matches:
        if len(m) == 4:  # #abc
            m = "#" + "".join(c * 2 for c in m[1:])
        normalized.append(m.lower())
    return normalized


def _is_interesting_color(hex_col: str) -> bool:
    """Skip pure black, near-black, pure white, near-white and pure grays."""
    r = int(hex_col[1:3], 16)
    g = int(hex_col[3:5], 16)
    b = int(hex_col[5:7], 16)
    gray_threshold = 20
    if abs(r - g) < gray_threshold and abs(g - b) < gray_threshold:
        return False
    brightness = (r * 299 + g * 587 + b * 114) / 1000
    return 15 < brightness < 240


def extract_palette(soup: BeautifulSoup) -> dict:
    """Parse inline <style> tags + inline style attributes for hex colors."""
    all_colors: list[str] = []

    # 1. <style> tags
    for style_tag in soup.find_all("style"):
        all_colors.extend(_extract_hex_colors_from_css_text(style_tag.get_text()))

    # 2. Inline style="..." attributes
    for tag in soup.find_all(style=True):
        all_colors.extend(_extract_hex_colors_from_css_text(tag["style"]))

    # Count frequency
    freq: dict[str, int] = {}
    for c in all_colors:
        if _is_interesting_color(c):
            freq[c] = freq.get(c, 0) + 1

    if not freq:
        print("  [PALETTE] No interesting colors found — using fallback palette.")
        return FALLBACK_PALETTE

    sorted_colors = sorted(freq.items(), key=lambda x: -x[1])
    print(f"  [PALETTE] Top colors found: {sorted_colors[:5]}")

    palette = dict(FALLBACK_PALETTE)  # start from fallback
    top = [c for c, _ in sorted_colors]
    if len(top) >= 1:
        palette["primary"] = top[0]
    if len(top) >= 2:
        palette["secondary"] = top[1]
    if len(top) >= 3:
        palette["accent"] = top[2]
    return palette


# ─── Content Extraction ───────────────────────────────────────────────────────

def _clean_text(raw: str) -> str:
    return re.sub(r'\s+', ' ', raw).strip()


def extract_content(soup: BeautifulSoup, slug: str) -> dict:
    content = {
        "slug": slug,
        "h1": [],
        "h2": [],
        "paragraphs": [],
        "services": [],
        "images": [],
    }

    # H1
    for tag in soup.find_all("h1"):
        text = _clean_text(tag.get_text())
        if text:
            content["h1"].append(text)

    # H2
    for tag in soup.find_all("h2"):
        text = _clean_text(tag.get_text())
        if text and len(text) > 3:
            content["h2"].append(text)

    # Main paragraphs (skip very short or cookie-banner ones)
    SKIP_KEYWORDS = ["cookie", "consent", "gdpr", "policy", "cookiebot"]
    for tag in soup.find_all("p"):
        text = _clean_text(tag.get_text())
        if len(text) > 40:
            lower = text.lower()
            if not any(k in lower for k in SKIP_KEYWORDS):
                content["paragraphs"].append(text)

    # Service lists: <ul> / <li> groups that look like services
    for ul in soup.find_all(["ul", "ol"]):
        items = []
        for li in ul.find_all("li"):
            text = _clean_text(li.get_text())
            if len(text) > 5:
                items.append(text)
        if len(items) >= 2:
            content["services"].extend(items)

    # Deduplicate while preserving order
    content["h1"] = list(dict.fromkeys(content["h1"]))
    content["h2"] = list(dict.fromkeys(content["h2"]))
    content["paragraphs"] = list(dict.fromkeys(content["paragraphs"]))
    content["services"] = list(dict.fromkeys(content["services"]))

    return content


# ─── Image Downloading ────────────────────────────────────────────────────────

def download_images(soup: BeautifulSoup, page_url: str, slug: str) -> list[dict]:
    """Download all <img> src images found on a page, return list of metadata."""
    downloaded = []
    seen_urls: set[str] = set()

    for img_tag in soup.find_all("img"):
        src = img_tag.get("src") or img_tag.get("data-src") or img_tag.get("data-lazy-src")
        if not src:
            continue

        # Build absolute URL
        abs_url = urljoin(page_url, src)
        parsed = urlparse(abs_url)

        # Skip non-http, data URIs, tracking pixels
        if parsed.scheme not in ("http", "https"):
            continue
        if abs_url in seen_urls:
            continue
        seen_urls.add(abs_url)

        # Derive filename
        path_part = parsed.path.rstrip("/")
        basename = os.path.basename(path_part) or "image"
        name, ext = os.path.splitext(basename)
        if not ext or ext.lower() not in (".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"):
            ext = ".jpg"

        safe_name = sanitize_filename(f"{slug}_{name}") + ext
        local_path = os.path.join(IMAGES_DIR, safe_name)
        relative_path = f"images/{safe_name}"

        # Download
        image_bytes = fetch_bytes(abs_url)
        if image_bytes and len(image_bytes) > 500:  # Skip tracking pixels < 500 bytes
            try:
                with open(local_path, "wb") as f:
                    f.write(image_bytes)
                alt = _clean_text(img_tag.get("alt", ""))
                downloaded.append({
                    "original_url": abs_url,
                    "local_path": relative_path,
                    "alt": alt,
                    "filename": safe_name,
                })
                print(f"    ✓ {safe_name} ({len(image_bytes) // 1024} KB)")
            except OSError as e:
                print(f"    [SAVE ERROR] {safe_name} → {e}")
        else:
            print(f"    [SKIP] Too small or empty: {abs_url}")

        time.sleep(0.2)  # polite delay between image downloads

    return downloaded


# ─── Main Orchestrator ────────────────────────────────────────────────────────

def build_navigation() -> list[dict]:
    return [
        {"label": "Home",          "slug": "home",                    "path": "/"},
        {"label": "Lo Studio",     "slug": "studio",                  "path": "/studio"},
        {"label": "Staff",         "slug": "staff",                   "path": "/staff-gallery"},
        {
            "label": "Prestazioni",
            "slug": "prestazioni",
            "path": "#",
            "children": [
                {"label": "Prevenzione",             "slug": "prevenzione",             "path": "/prestazioni/prevenzione"},
                {"label": "Parodontologia",          "slug": "parodontologia",          "path": "/prestazioni/parodontologia"},
                {"label": "Conservativa & Endodonzia","slug": "conservativa-endodonzia","path": "/prestazioni/conservativa-ed-endodonzia"},
                {"label": "Implantologia",           "slug": "implantologia",           "path": "/prestazioni/implantologia"},
                {"label": "Ortodonzia",              "slug": "ortodonzia",              "path": "/prestazioni/ortodonzia"},
                {"label": "Estetica del Volto",      "slug": "estetica-volto",          "path": "/prestazioni/estetica"},
                {"label": "Estetica del Sorriso",    "slug": "estetica-sorriso",        "path": "/estetica-del-sorriso"},
                {"label": "Pedodonzia",              "slug": "pedodonzia",              "path": "/prestazioni/odontoiatria-infantile"},
            ],
        },
        {"label": "Contatti",      "slug": "contatti",                "path": "/contatti"},
    ]


def build_contact_info() -> dict:
    return {
        "sedi": [
            {
                "nome": "Castelfranco di Sotto",
                "indirizzo": "Via Cupini, 17, 56022 - Castelfranco di Sotto (PI)",
                "telefono": "+39 0571 478087",
                "orari": {
                    "Martedì":  "09:00 – 19:00",
                    "Mercoledì":"09:00 – 19:00",
                    "Giovedì":  "15:00 – 19:00",
                    "Venerdì":  "09:00 – 19:00",
                },
                "maps_embed": "https://maps.google.com/maps?q=Via+Cupini+17+Castelfranco+di+Sotto+PI&output=embed",
            },
            {
                "nome": "Peccioli",
                "indirizzo": "Via Marconi, 7, 56037 - Peccioli (PI)",
                "telefono": "+39 0587 636162",
                "orari": {
                    "Lunedì":   "09:00 – 19:00",
                    "Mercoledì":"09:00 – 18:00",
                    "Giovedì":  "09:00 – 13:00",
                },
                "maps_embed": "https://maps.google.com/maps?q=Via+Marconi+7+Peccioli+PI&output=embed",
            },
        ],
        "whatsapp": "+39 327 3938147",
        "email": "info@odontoiatriamariagentili.it",
        "social": {
            "facebook": "https://www.facebook.com/people/Odontoiatria-Maria-Gentili/100062945425780/",
            "instagram": "https://www.instagram.com/odontoiatriamariagentili/",
            "whatsapp": "https://wa.me/393273938147",
        },
    }


def build_services_meta() -> list[dict]:
    """Static metadata for service cards — enriches scraped content."""
    return [
        {
            "slug": "prevenzione",
            "label": "Prevenzione",
            "icon": "shield-check",
            "summary": "La base per un sorriso sano e duraturo. Visite odontoiatriche complete e controlli periodici mirati.",
        },
        {
            "slug": "parodontologia",
            "label": "Parodontologia",
            "icon": "activity",
            "summary": "Cura e prevenzione della parodontite in ogni stadio con metodo esclusivo.",
        },
        {
            "slug": "conservativa-endodonzia",
            "label": "Conservativa & Endodonzia",
            "icon": "zap",
            "summary": "Cure mirate per riparare denti danneggiati preservando la struttura naturale.",
        },
        {
            "slug": "implantologia",
            "label": "Implantologia",
            "icon": "cpu",
            "summary": "Soluzioni stabili per sostituire denti mancanti. All-on-Four, All-on-Six, carico immediato.",
        },
        {
            "slug": "ortodonzia",
            "label": "Ortodonzia",
            "icon": "smile",
            "summary": "Allineatori invisibili e apparecchi fissi per un sorriso armonioso.",
        },
        {
            "slug": "estetica-sorriso",
            "label": "Estetica del Sorriso",
            "icon": "star",
            "summary": "Sbiancamento professionale, faccette estetiche e trattamenti personalizzati.",
        },
        {
            "slug": "estetica-volto",
            "label": "Estetica del Volto",
            "icon": "feather",
            "summary": "Filler acido ialuronico, botulino e rivitalizzanti per l'estetica facciale.",
        },
        {
            "slug": "pedodonzia",
            "label": "Pedodonzia",
            "icon": "heart",
            "summary": "Odontoiatria infantile per i più piccoli in un ambiente accogliente e rassicurante.",
        },
    ]


def main():
    ensure_dirs()

    site_data = {
        "meta": {
            "site_name": "Odontoiatria Maria Gentili",
            "doctor": "Dott.ssa Maria Gentili",
            "tagline": "Previeni, cura, mantieni.",
            "subtitle": "Studio dentistico a Castelfranco di Sotto e Peccioli, specializzato nella prevenzione.",
            "base_url": BASE_URL,
        },
        "palette": {},
        "navigation": build_navigation(),
        "contact": build_contact_info(),
        "services_meta": build_services_meta(),
        "pages": {},
        "stats": [
            {"label": "Anni di esperienza",  "value": 25, "suffix": "+"},
            {"label": "Pazienti soddisfatti","value": 3000, "suffix": "+"},
            {"label": "Sedi",                "value": 2, "suffix": ""},
            {"label": "Valutazione Google",  "value": 5, "suffix": "★"},
        ],
        "reviews": [
            {"author": "Alfredo Costanzo",  "text": "Professionali, gentili e competenti!!", "rating": 5, "source": "Google"},
            {"author": "Melania Gaglioti",  "text": "Come in famiglia ❤️ posto accogliente e personale cordiale", "rating": 5, "source": "Google"},
            {"author": "Ermira Banaj",      "text": "Il top! Bravissimi, migliori di loro non ci sono.", "rating": 5, "source": "Google"},
        ],
    }

    # ── Phase 1: Crawl pages ──────────────────────────────────────────────────
    palette_extracted = False

    for route in ROUTES:
        slug = route["slug"]
        url = BASE_URL + route["path"]
        print(f"\n[CRAWL] {slug} → {url}")

        soup = fetch_page(url)
        if soup is None:
            print(f"  [SKIP] Could not fetch {url}")
            continue

        # Extract palette from homepage only
        if not palette_extracted:
            site_data["palette"] = extract_palette(soup)
            palette_extracted = True

        # Extract text content
        page_content = extract_content(soup, slug)

        # Extract + download images
        print(f"  [IMAGES] Downloading images for {slug}...")
        images_meta = download_images(soup, url, slug)
        page_content["images"] = images_meta

        site_data["pages"][slug] = page_content

        print(f"  [DONE] h1={len(page_content['h1'])}, h2={len(page_content['h2'])}, "
              f"p={len(page_content['paragraphs'])}, imgs={len(images_meta)}")

        time.sleep(REQUEST_DELAY)

    # ── Phase 2: Write JSON ───────────────────────────────────────────────────
    try:
        with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
            json.dump(site_data, f, ensure_ascii=False, indent=2)
        print(f"\n✅ site_data.json written → {OUTPUT_JSON}")
        print(f"✅ Images saved → {IMAGES_DIR}")
    except OSError as e:
        print(f"\n[ERROR] Could not write JSON: {e}")


if __name__ == "__main__":
    main()
