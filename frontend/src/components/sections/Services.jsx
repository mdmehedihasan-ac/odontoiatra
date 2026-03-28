import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import VanillaTilt from "vanilla-tilt";
import {
  ShieldCheck, Activity, Zap, Cpu, Smile, Star, Feather, Heart, ArrowRight,
} from "lucide-react";
import { useSiteData } from "../../hooks/useSiteData.jsx";

const ICON_MAP = {
  "shield-check": ShieldCheck,
  activity: Activity,
  zap: Zap,
  cpu: Cpu,
  smile: Smile,
  star: Star,
  feather: Feather,
  heart: Heart,
};

const FALLBACK_SERVICES = [
  { slug: "prevenzione",            label: "Prevenzione",              icon: "shield-check", summary: "La base per un sorriso sano e duraturo." },
  { slug: "parodontologia",         label: "Parodontologia",           icon: "activity",     summary: "Cura e prevenzione della parodontite." },
  { slug: "conservativa-endodonzia",label: "Conservativa & Endodonzia",icon: "zap",          summary: "Riparazione denti con conservazione della struttura naturale." },
  { slug: "implantologia",          label: "Implantologia",            icon: "cpu",          summary: "Impianti stabili; All-on-Four, carico immediato." },
  { slug: "ortodonzia",             label: "Ortodonzia",               icon: "smile",        summary: "Allineatori invisibili e apparecchi fissi." },
  { slug: "estetica-sorriso",       label: "Estetica del Sorriso",     icon: "star",         summary: "Sbiancamento e faccette estetiche su misura." },
  { slug: "estetica-volto",         label: "Estetica del Volto",       icon: "feather",      summary: "Filler, botulino e rivitalizzanti per il viso." },
  { slug: "pedodonzia",             label: "Pedodonzia",               icon: "heart",        summary: "Odontoiatria infantile in un ambiente rassicurante." },
];

function ServiceCard({ service, index }) {
  const tiltRef = useRef(null);
  const Icon = ICON_MAP[service.icon] || ShieldCheck;

  useEffect(() => {
    if (!tiltRef.current) return;
    VanillaTilt.init(tiltRef.current, {
      max: 12,
      speed: 600,
      glare: true,
      "max-glare": 0.08,
      perspective: 800,
      scale: 1.02,
    });
    return () => tiltRef.current?.vanillaTilt?.destroy();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.75,
        ease: [0.19, 1, 0.22, 1],
        delay: (index % 4) * 0.08,
      }}
    >
      <div
        ref={tiltRef}
        className="group h-full glass rounded-2xl p-7 cursor-pointer relative overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-[0_8px_40px_rgba(61,90,241,0.15)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Hover gradient bleeding */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none" />

        {/* Icon */}
        <div className="relative z-10 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-5 group-hover:from-primary/30 group-hover:border-primary/40 transition-all duration-300">
          <Icon size={22} className="text-primary group-hover:text-primary-light transition-colors duration-300" />
        </div>

        {/* Content */}
        <h3 className="relative z-10 font-serif text-xl font-semibold text-pearl mb-3 group-hover:text-gradient transition-all duration-300">
          {service.label}
        </h3>
        <p className="relative z-10 text-pearl/50 text-sm leading-relaxed mb-5">
          {service.summary}
        </p>

        {/* Link */}
        <Link
          to={`/prestazioni/${service.slug}`}
          className="relative z-10 inline-flex items-center gap-1.5 text-xs font-semibold text-primary/70 group-hover:text-accent transition-colors duration-200 uppercase tracking-wider"
        >
          Scopri di più
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>

        {/* decorative corner line */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute top-0 right-0 w-px h-6 bg-accent/20 group-hover:bg-accent/50 transition-colors duration-300" />
          <div className="absolute top-0 right-0 w-6 h-px bg-accent/20 group-hover:bg-accent/50 transition-colors duration-300" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const { data } = useSiteData();
  const services = data?.services_meta?.length ? data.services_meta : FALLBACK_SERVICES;

  return (
    <section className="section bg-deep relative overflow-hidden" id="prestazioni">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-4"
          >
            <span className="section-label">Le nostre cure</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif text-4xl md:text-5xl font-bold text-pearl mb-5"
          >
            Di cosa ci <span className="text-gradient">occupiamo</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-pearl/50 text-lg max-w-xl mx-auto"
          >
            Dalla prevenzione alla chirurgia avanzata — ogni trattamento è pensato attorno alle esigenze di ogni singolo paziente.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mt-14"
        >
          <Link to="/contatti" className="btn-outline">
            Richiedi una visita <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
