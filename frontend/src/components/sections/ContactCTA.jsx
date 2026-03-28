import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, MessageCircle, ArrowRight, MapPin } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-deep to-accent/8" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <span className="section-label">Pronto a iniziare?</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-pearl leading-tight mb-6"
        >
          Il tuo sorriso{" "}
          <br />
          <span className="text-gradient">merita il meglio.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="text-pearl/55 text-lg leading-relaxed max-w-xl mx-auto mb-12"
        >
          Riceviamo su appuntamento per garantire la massima attenzione e ridurre i tempi di attesa.
          Contattaci per una prima visita o un preventivo gratuito.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-14"
        >
          <a href="tel:+390571478087" className="btn-primary text-base py-4 px-8 w-full sm:w-auto justify-center">
            <Phone size={18} /> Chiama ora
          </a>
          <a href="https://wa.me/393273938147" target="_blank" rel="noreferrer" className="btn-outline text-base py-4 px-8 w-full sm:w-auto justify-center">
            <MessageCircle size={18} /> Scrivici su WhatsApp
          </a>
        </motion.div>

        {/* Location chips */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { name: "Castelfranco di Sotto", tel: "0571 478087" },
            { name: "Peccioli", tel: "0587 636162" },
          ].map((loc) => (
            <div
              key={loc.name}
              className="glass-dark rounded-xl px-5 py-3 flex items-center gap-3 text-sm"
            >
              <MapPin size={14} className="text-accent" />
              <span className="text-pearl/80 font-medium">{loc.name}</span>
              <span className="text-pearl/40 text-xs">— {loc.tel}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
