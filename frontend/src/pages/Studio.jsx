import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageTransition from "../components/ui/PageTransition.jsx";
import ContactCTA from "../components/sections/ContactCTA.jsx";

const TREATMENTS = [
  {
    title: "Odontoiatria conservativa",
    desc: "Cure mirate a riparare i denti danneggiati dalla carie, preservando la struttura naturale del dente.",
  },
  {
    title: "Endodonzia",
    desc: "Trattamenti per eliminare infezioni profonde del dente e salvarlo, evitando l'estrazione.",
  },
  {
    title: "Chirurgia orale",
    desc: "Interventi chirurgici eseguiti in sicurezza per la risoluzione di problematiche dentali e ossee.",
  },
  {
    title: "Visite specialistiche",
    desc: "Valutazioni complete e controlli regolari per monitorare la salute orale.",
  },
  {
    title: "Ortodonzia",
    desc: "Trattamenti con apparecchi fissi tradizionali o allineatori invisibili per allineare i denti.",
  },
  {
    title: "Prevenzione e igiene orale",
    desc: "Sedute di igiene professionale e consigli personalizzati per prevenire carie e problemi futuri.",
  },
  {
    title: "Protesi dentarie",
    desc: "Riabilitazioni su misura per sostituire uno o più denti mancanti, ripristinando estetica e masticazione.",
  },
];

export default function Studio() {
  return (
    <PageTransition>
      <Helmet>
        <title>Lo Studio — Odontoiatria Maria Gentili</title>
        <meta name="description" content="Scopri la filosofia e i trattamenti dello studio dentistico di Maria Gentili a Castelfranco di Sotto e Peccioli." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-20 pt-36 overflow-hidden bg-deep noise">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-deep/60" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="section-label mb-5 block">Lo Studio</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-pearl leading-tight">
            La nostra <br /><span className="text-gradient">filosofia</span>
          </h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section bg-[#0c1220]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="font-serif text-4xl font-bold text-pearl mb-6">
              Competenza, tecnologia<br />e{" "}
              <span className="text-gradient">ascolto attento.</span>
            </h2>
            <div className="space-y-4 text-pearl/60 leading-relaxed">
              <p>
                Il nostro Studio Dentistico, con sedi a Castelfranco di Sotto e Peccioli,
                nasce per offrire cure odontoiatriche complete in un ambiente moderno e accogliente.
              </p>
              <p>
                La nostra missione è diffondere la cultura della prevenzione e garantire cure
                odontoiatriche di alta qualità, con attenzione alle esigenze individuali di ogni paziente.
              </p>
              <p>
                Crediamo che un sorriso sano sia il risultato di competenza, tecnologia e ascolto attento.
                La prevenzione è al centro del nostro lavoro.
              </p>
            </div>
            <div className="mt-8">
              <Link to="/contatti" className="btn-primary">
                Prenota una visita <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Decorative block */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
            className="glass rounded-3xl p-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-3xl blur-2xl pointer-events-none" />
            <blockquote className="font-serif text-2xl text-pearl/80 italic leading-relaxed mb-8">
              "Vogliamo aiutare i pazienti a evitare problemi prima che insorgano, garantendo benessere e sicurezza nel tempo."
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center">
                <span className="text-accent text-sm font-bold">MG</span>
              </div>
              <div>
                <p className="text-pearl font-semibold text-sm">Dott.ssa Maria Gentili</p>
                <p className="text-pearl/40 text-xs">Fondatrice, Odontoiatra</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Treatments grid */}
      <section className="section bg-deep">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="section-label mx-auto mb-4 flex justify-center">I nostri trattamenti</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-pearl">
              Cure complete per <span className="text-gradient">adulti e bambini</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TREATMENTS.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                className="glass rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-pearl mb-2 group-hover:text-gradient transition-all duration-300">{t.title}</h3>
                    <p className="text-pearl/50 text-sm leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </PageTransition>
  );
}
