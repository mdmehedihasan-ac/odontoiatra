import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { ICON_MAP } from "../constants/iconMap.js";
import PageTransition from "../components/ui/PageTransition.jsx";
import ContactCTA from "../components/sections/ContactCTA.jsx";
import { useSiteData } from "../hooks/useSiteData.jsx";

const SERVICE_CONTENT = {
  prevenzione: {
    title: "Prevenzione Dentale",
    subtitle: "La base per un sorriso sano e duraturo",
    body: [
      "La prevenzione è il cuore dell'approccio del nostro studio dentistico a Castelfranco di Sotto e Peccioli. La Dott.ssa Maria Gentili e il suo team promuovono da sempre la cultura della salute orale attraverso visite odontoiatriche complete e controlli periodici mirati.",
      "Durante ogni check-up odontoiatrico, i professionisti dello studio valutano lo stato di salute del cavo orale, individuano eventuali lesioni iniziali e forniscono indicazioni personalizzate per mantenere il sorriso in equilibrio nel tempo.",
    ],
    points: [
      "Ridurre il rischio di carie e malattie gengivali",
      "Mantenere denti forti e sani nel tempo",
      "Evitare trattamenti complessi e costosi",
      "Migliorare la qualità della vita e il benessere generale",
      "Igiene dentale professionale ogni 6 mesi",
      "Radiografie digitali a bassa dose di radiazioni",
    ],
  },
  parodontologia: {
    title: "Parodontologia",
    subtitle: "Cura e prevenzione della parodontite",
    body: [
      "La parodontite è una malattia seria che può portare alla perdita dei denti e influire sulla salute generale. Nel nostro studio, grazie a un metodo esclusivo, ci occupiamo di curare la parodontite in ogni stadio e di prevenirla nei pazienti sani.",
      "La nostra competenza in parodontologia ci ha resi esperti nella gestione di pazienti con una storia di parodontite severa, offrendo protocolli personalizzati per ogni fase della malattia.",
    ],
    points: [
      "Diagnosi precoce della malattia parodontale",
      "Trattamento non chirurgico e chirurgico della parodontite",
      "Rigenerazione ossea e dei tessuti gengivali",
      "Piani di mantenimento parodontale personalizzati",
      "Prevenzione della recidiva nel lungo termine",
      "Coordinamento con implantologia per casi complessi",
    ],
  },
  "conservativa-endodonzia": {
    title: "Conservativa & Endodonzia",
    subtitle: "Riparare il dente preservandone la struttura",
    body: [
      "L'odontoiatria conservativa si occupa di riparare denti danneggiati dalla carie o da traumi, preservando la struttura naturale del dente con materiali compositi di ultima generazione.",
      "L'endodonzia (devitalizzazione) consente di eliminare infezioni profonde del dente e di salvarlo dall'estrazione, grazie a strumenti di precisione e tecniche avanzate che rendono il trattamento sicuro e confortevole.",
    ],
    points: [
      "Otturazioni in composito estetico",
      "Trattamento della carie in tutti gli stadi",
      "Devitalizzazione (trattamento canalare) mono e pluriradicolare",
      "Ritrattamento endodontico",
      "Apicectomia nei casi indicati",
      "Ricostruzioni post-endodontiche con perni in fibra",
    ],
  },
  implantologia: {
    title: "Implantologia Avanzata",
    subtitle: "Soluzioni stabili per ogni tipo di caso",
    body: [
      "Soluzioni stabili e naturali per sostituire i denti mancanti e ritrovare funzionalità ed estetica. Il nostro studio è specializzato nell'implantologia avanzata e nella rigenerazione ossea, offrendo soluzioni anche nei casi che sembrano impossibili.",
      "Adottiamo un approccio parodontale all'implantologia, studiando con precisione ogni piano di trattamento per garantire risultati stabili e duraturi proteggendo gli impianti dalle infiammazioni future.",
    ],
    points: [
      "Riabilitazioni All-on-Four e All-on-Six",
      "Impianti post-estrattivi immediati",
      "Carico immediato con denti fissi in tempi rapidi",
      "Rigenerazione ossea guidata (GBR)",
      "Innesti di osso autologo e biomateriali",
      "Prevenzione della perimplantite",
    ],
  },
  ortodonzia: {
    title: "Ortodonzia",
    subtitle: "Il sorriso che hai sempre desiderato",
    body: [
      "Un sorriso armonioso migliora l'aspetto, l'autostima e anche la salute. Offriamo trattamenti ortodontici personalizzati per adulti e bambini, con le più moderne tecnologie disponibili.",
      "Gli allineatori trasparenti permettono di correggere i difetti di allineamento dentale in modo quasi invisibile, senza sacrificare l'estetica durante il trattamento.",
    ],
    points: [
      "Allineatori trasparenti invisibili per adulti",
      "Apparecchi fissi tradizionali ad alta precisione",
      "Ortodonzia intercettiva per bambini e adolescenti",
      "Contenitori e mantenitori post-trattamento",
      "Trattamenti interdisciplinari (ortodonzia + implantologia)",
      "Simulazione digitale del risultato finale",
    ],
  },
  "estetica-sorriso": {
    title: "Estetica del Sorriso",
    subtitle: "Trasforma il tuo sorriso con tecniche avanzate",
    body: [
      "Offriamo trattamenti personalizzati per migliorare l'estetica del sorriso, come lo sbiancamento e le faccette estetiche, utilizzando tecniche avanzate e materiali di alta qualità.",
      "Il design del sorriso digitale ci permette di pianificare il risultato prima ancora di iniziare il trattamento, coinvolgendo attivamente il paziente nella progettazione del proprio sorriso ideale.",
    ],
    points: [
      "Sbiancamento professionale in studio e domiciliare",
      "Faccette in ceramica e composito",
      "Smile Design digitale",
      "Corone in zirconia all-ceramic",
      "Allungamento della corona clinica",
      "Gengive armoniche con gengivoplastica estetica",
    ],
  },
  "estetica-volto": {
    title: "Estetica del Volto",
    subtitle: "Bellezza naturale, risultati duraturi",
    body: [
      "Trattiamo l'estetica del viso attraverso un'analisi accurata delle zone da migliorare e la terapia con filler di acido ialuronico, botulino e trattamenti rivitalizzanti.",
      "Il nostro approccio medico-estetico si integra perfettamente con quello odontoiatrico per offrire un risultato armonico e naturale dell'intera area del viso.",
    ],
    points: [
      "Filler volumizzanti con acido ialuronico",
      "Trattamento con tossina botulinica (Botox)",
      "Biorivitalizzazione cutanea",
      "Trattamento delle rughe perioculari e perilabiali",
      "Labbra: definizione e volume naturale",
      "Analisi del viso personalizzata",
    ],
  },
  pedodonzia: {
    title: "Pedodonzia",
    subtitle: "Un sorriso sano fin da piccoli",
    body: [
      "L'odontoiatria infantile richiede una cura e un'attenzione particolari. Nel nostro studio creiamo un ambiente accogliente e rassicurante per mettere i bambini a loro agio fin dalla prima visita.",
      "La prevenzione precoce è fondamentale per garantire uno sviluppo dentale sano. I controlli regolari fin dalla prima infanzia permettono di intercettare e correggere eventuali problemi prima che diventino complessi.",
    ],
    points: [
      "Prima visita dentistica consigliata a partire dai 2 anni",
      "Sigillatura dei solchi per la prevenzione della carie",
      "Trattamento fluoroprofilattico",
      "Otturazioni e devitalizzazioni su denti da latte",
      "Ortodonzia intercettiva precoce",
      "Approccio comportamentale per bambini ansiosi",
    ],
  },
};

const EXCLUDED_H2S = new Set([
  "Fissa il tuo appuntamento",
  "Giorni e orari di apertura",
  "Additional Links",
  "This website uses cookies",
]);

const SERVICE_IMAGES = {
  prevenzione:              "/assets/images/prevenzione_WhatsApp+Image+2026-03-02+at+11.39.26-1920w.jpeg",
  parodontologia:           "/assets/images/parodontologia_tudio-dentistico-gentili-castelfranco-di-sotto-051-1920w.jpg",
  "conservativa-endodonzia":"/assets/images/conservativa-endodonzia_WhatsApp+Image+2026-03-02+at+11.39.24-1920w.jpeg",
  implantologia:            "/assets/images/studio_image00010-1920w.jpeg",
  ortodonzia:               "/assets/images/ortodonzia_WhatsApp+Image+2026-03-02+at+11.39.37-1920w.jpeg",
  "estetica-sorriso":       "/assets/images/parodontologia_macro-photography-beautiful-female-smile-with-white-healthy-teeth.jpg",
  "estetica-volto":         "/assets/images/estetica-volto_WhatsApp+Image+2026-03-02+at+11.39.25+(1)-ba4273e3-1920w.jpeg",
  pedodonzia:               "/assets/images/pedodonzia_WhatsApp+Image+2026-03-02+at+11.41.14-1920w.jpeg",
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const { data } = useSiteData();

  // Merge static content with scraped API data
  const serviceMeta = data?.services_meta?.find((s) => s.slug === slug);
  const pageData = data?.pages?.[slug];
  const staticContent = SERVICE_CONTENT[slug];
  const Icon = ICON_MAP[serviceMeta?.icon || "shield-check"] || ShieldCheck;

  const title = staticContent?.title || serviceMeta?.label || slug;
  const subtitle = staticContent?.subtitle || serviceMeta?.summary || "";
  const body = staticContent?.body || pageData?.paragraphs?.slice(0, 2) || [];
  const points = staticContent?.points || pageData?.services || [];
  const h2s = pageData?.h2?.slice(0, 4) || [];
  const filteredH2s = h2s.filter((h) => h.length > 6 && !EXCLUDED_H2S.has(h));
  const heroImg = SERVICE_IMAGES[slug];

  return (
    <PageTransition>
      <Helmet>
        <title>{title} — Odontoiatria Maria Gentili</title>
        <meta name="description" content={subtitle} />
      </Helmet>

      {/* Hero banner */}
      <section className="relative min-h-[55vh] flex items-end pb-16 sm:pb-20 pt-28 sm:pt-36 overflow-hidden bg-deep noise">
        {heroImg && (
          <img
            src={heroImg}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-deep/60 to-deep/90" />
        {/* Glow per icon */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/20 flex items-center justify-center">
              <Icon size={24} className="text-primary" />
            </div>
            <span className="section-label">Prestazione</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-pearl leading-tight mb-4">
            {title}
          </h1>
          <p className="text-pearl/50 text-lg max-w-xl">{subtitle}</p>
        </div>
      </section>

      {/* Main content */}
      <section className="section bg-[#0c1220]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-14">
          {/* Article */}
          <div className="lg:col-span-2 space-y-5">
            {body.length > 0 ? (
              body.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.7 }}
                  className="text-pearl/65 leading-relaxed text-base"
                >
                  {p}
                </motion.p>
              ))
            ) : (
              <p className="text-pearl/40 italic">Contenuto in caricamento...</p>
            )}

            {/* Sub-sections from scraped H2 */}
            {filteredH2s.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.7 }}
              >
                <h2 className="font-serif text-2xl font-bold text-pearl mt-8 mb-3">{h}</h2>
                <div className="w-10 h-0.5 bg-accent rounded-full" />
              </motion.div>
            ))}
          </div>

          {/* Sidebar — bullet points + CTA */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
              className="glass rounded-2xl p-6 lg:sticky top-28"
            >
              <h3 className="font-serif text-lg font-semibold text-pearl mb-5">
                Cosa includiamo
              </h3>
              <ul className="space-y-3">
                {points.slice(0, 8).map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-pearl/65">
                    <CheckCircle2 size={14} className="text-primary shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="divider my-6" />

              <Link to="/contatti" className="btn-primary w-full justify-center text-sm">
                Prenota una visita <ArrowRight size={14} />
              </Link>
              <a
                href="https://wa.me/393273938147"
                target="_blank"
                rel="noreferrer"
                className="btn-outline w-full justify-center text-sm mt-3"
              >
                Chiedi informazioni
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </PageTransition>
  );
}
