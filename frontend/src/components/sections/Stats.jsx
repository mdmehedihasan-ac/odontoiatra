import { useRef } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "../../hooks/useScrollAnimation.jsx";

const STATS = [
  { label: "Anni di esperienza",   value: 25,   suffix: "+" },
  { label: "Pazienti soddisfatti", value: 3000, suffix: "+" },
  { label: "Trattamenti eseguiti", value: 8000, suffix: "+" },
  { label: "Valutazione Google",   value: 5,    suffix: "★" },
];

function StatItem({ label, value, suffix, index }) {
  const numRef = useRef(null);
  useCountUp(numRef, value, 2.2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
      className="text-center"
    >
      <div className="relative inline-block">
        <span
          ref={numRef}
          className="font-serif text-5xl md:text-6xl font-bold text-gradient"
        >
          0
        </span>
        <span className="font-serif text-4xl md:text-5xl font-bold text-accent ml-1">{suffix}</span>
      </div>
      <p className="text-pearl/50 text-sm mt-2 tracking-wide">{label}</p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep via-surface to-deep" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
