import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";

const HIGHLIGHTS = [
  "Approccio orientato alla prevenzione",
  "Tecnologie digitali di ultima generazione",
  "Team multidisciplinare specializzato",
  "Ambiente accogliente e rassicurante",
  "Piani di trattamento personalizzati",
  "Continuità di cura nel tempo",
];

export default function About() {
  return (
    <section className="section bg-[#0c1220] relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/4" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Visual side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="relative"
        >
          {/* Main visual block */}
          <div className="relative rounded-3xl overflow-hidden aspect-square max-w-[480px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-[#0a0f1e] to-accent/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Concentric rings decoration */}
              <div className="relative flex items-center justify-center">
                {[160, 220, 280].map((size, i) => (
                  <motion.div
                    key={size}
                    animate={{ rotate: i % 2 ? 360 : -360 }}
                    transition={{ duration: 30 + i * 10, repeat: Infinity, ease: "linear" }}
                    className="absolute rounded-full border border-primary/10"
                    style={{ width: size, height: size }}
                  />
                ))}
                {/* Center avatar placeholder */}
                <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 border border-white/10 flex items-center justify-center shadow-glow">
                  <span className="font-serif text-4xl font-bold text-gradient">MG</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quote card overlay */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="absolute -bottom-6 right-0 sm:-right-4 md:right-8 glass-dark rounded-2xl p-4 sm:p-5 max-w-[260px] sm:max-w-xs shadow-card"
          >
            <p className="text-pearl/70 text-sm italic leading-relaxed mb-3">
              "Mi ha insegnato a vedere ogni paziente come unico e speciale."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center">
                <span className="text-accent text-xs font-bold">MG</span>
              </div>
              <div>
                <p className="text-pearl text-xs font-semibold">Dott.ssa Maria Gentili</p>
                <p className="text-pearl/40 text-xs">Odontoiatra</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content side */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-label mb-6"
          >
            Il nostro studio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif text-4xl md:text-5xl font-bold text-pearl mb-6 leading-tight"
          >
            Benvenuto nel{" "}
            <span className="text-gradient">mio studio</span>{" "}
            dentistico
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="space-y-4 text-pearl/60 leading-relaxed mb-8"
          >
            <p>
              Ho fondato questo studio con l'obiettivo di offrire cure odontoiatriche di qualità,
              basate su competenza, innovazione e un'attenzione autentica verso ogni paziente.
            </p>
            <p>
              Un grande riconoscimento va a mio padre, Giovanni Gentili, che ha fatto il dentista
              per diversi anni. La sua passione mi ha insegnato a vedere ogni paziente come unico
              e speciale.
            </p>
            <p>
              Credo fermamente nella <strong className="text-pearl/80">prevenzione</strong>: prendersi
              cura del sorriso significa intervenire prima che insorgano problemi.
            </p>
          </motion.div>

          {/* Highlights */}
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10"
          >
            {HIGHLIGHTS.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.07, duration: 0.5 }}
                className="flex items-start gap-2.5 text-sm text-pearl/65"
              >
                <CheckCircle2 size={15} className="text-primary shrink-0 mt-0.5" />
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link to="/studio" className="btn-primary">
              Scopri lo studio <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
