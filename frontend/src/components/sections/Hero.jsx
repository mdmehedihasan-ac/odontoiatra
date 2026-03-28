import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, Star } from "lucide-react";

const CHARS_LINE1 = "Previeni,".split("");
const CHARS_LINE2 = "cura, mantieni.".split("");

function SplitText({ chars, delay = 0 }) {
  return (
    <>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.19, 1, 0.22, 1],
            delay: delay + i * 0.03,
          }}
          className="inline-block"
          style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </>
  );
}

export default function Hero() {
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep noise"
    >
      {/* ── Animated mesh gradient background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-mesh opacity-60" />
        {/* Radial glow primary */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
        />
        {/* Radial glow accent */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/10 blur-3xl"
        />
      </div>

      {/* ── Floating decorative orbs ── */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-20 w-3 h-3 rounded-full bg-accent/60 hidden lg:block"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 left-24 w-2 h-2 rounded-full bg-primary/70 hidden lg:block"
      />
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/2 right-1/3 w-1.5 h-1.5 rounded-full bg-pearl/20 hidden lg:block"
      />

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Main content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center"
      >
        {/* Left — Text */}
        <div>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="section-label mb-8"
          >
            Studio Dentistico — Castelfranco di Sotto & Peccioli
          </motion.div>

          {/* Heading split-char reveal */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-6 overflow-hidden">
            <div className="overflow-hidden">
              <SplitText chars={CHARS_LINE1} delay={0.35} />
            </div>
            <div className="overflow-hidden mt-1">
              <span className="text-gradient">
                <SplitText chars={CHARS_LINE2} delay={0.5} />
              </span>
            </div>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="text-pearl/60 text-lg leading-relaxed mb-10 max-w-md"
          >
            Studio dentistico specializzato nella prevenzione, con approccio
            personalizzato per ogni paziente. Due sedi in Toscana.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.7 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link to="/contatti" className="btn-primary">
              Prenota una Visita <ArrowRight size={16} />
            </Link>
            <a href="https://wa.me/393273938147" target="_blank" rel="noreferrer" className="btn-outline">
              <Phone size={15} /> Scrivici su WhatsApp
            </a>
          </motion.div>

          {/* Social proof bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex items-center gap-6 flex-wrap"
          >
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-accent text-accent" />
              ))}
            </div>
            <span className="text-sm text-pearl/50">
              5.0 su Google · <span className="text-pearl/80 font-medium">100+ recensioni</span>
            </span>
          </motion.div>
        </div>

        {/* Right — Visual card */}
        <motion.div
          initial={{ opacity: 0, x: 60, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ delay: 0.5, duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Main card */}
            <div className="glass rounded-3xl overflow-hidden aspect-[4/5] relative">
              {/* Placeholder gradient until real image loads */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface to-accent/10" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-10">
                {/* Decorative dental icon */}
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-glow"
                >
                  <svg viewBox="0 0 64 64" fill="none" className="w-12 h-12 opacity-90">
                    <path d="M32 8C22 8 14 14 14 26c0 6 2 12 5 18l4 10c1 2 3 2 4 0l2-5 2 5c1 2 3 2 4 0l2-5 2 5c1 2 3 2 4 0l4-10c3-6 5-12 5-18C50 14 42 8 32 8z" fill="rgba(61,90,241,0.7)" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
                    <path d="M24 20c2-3 5-4 8-4s6 1 8 4" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.div>
                <div className="text-center">
                  <p className="font-serif text-2xl font-bold text-pearl mb-1">Dott.ssa</p>
                  <p className="font-serif text-3xl font-bold text-gradient-gold">Maria Gentili</p>
                  <p className="text-pearl/40 text-sm mt-3">Odontoiatra — Specialista Parodontologia</p>
                </div>
              </div>
            </div>

            {/* Floating stat cards */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-8 top-1/4 glass-dark rounded-xl px-4 py-3 shadow-card"
            >
              <p className="text-2xl font-bold font-serif text-gradient">25+</p>
              <p className="text-xs text-pearl/50 mt-0.5">Anni di esperienza</p>
            </motion.div>

            <motion.div
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-6 bottom-1/4 glass-dark rounded-xl px-4 py-3 shadow-card"
            >
              <p className="text-2xl font-bold font-serif text-accent">2</p>
              <p className="text-xs text-pearl/50 mt-0.5">Sedi in Toscana</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-pearl/30 tracking-widest uppercase">Scorri</span>
        <div className="w-5 h-8 rounded-full border border-pearl/20 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-pearl/40"
          />
        </div>
      </motion.div>
    </section>
  );
}
