import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import PageTransition from "../components/ui/PageTransition.jsx";
import ContactCTA from "../components/sections/ContactCTA.jsx";

const STAFF = [
  {
    name: "Dott.ssa Maria Gentili",
    role: "Odontoiatra — Direttore Sanitario",
    specialty: "Parodontologia · Implantologia · Prevenzione",
    bio: "Fondatrice dello studio, la Dott.ssa Gentili porta avanti con passione la tradizione di famiglia combinata con le più moderne tecniche odontoiatriche.",
    photo: "/assets/images/studio_WhatsApp+Image+2026-03-02+at+11.40.19-1920w.jpeg",
    initials: "MG",
    color: "from-primary/30 to-blue-600/10",
  },
  {
    name: "Laura",
    role: "Igienista Dentale",
    specialty: "Igiene orale · Prevenzione · Pedodonzia",
    bio: "Igienista laureata con approccio delicato e professionale, custode del benessere orale di ogni paziente.",
    photo: "/assets/images/staff_laura-1920w.png",
    initials: "L",
    color: "from-accent/25 to-accent/5",
  },
  {
    name: "Azzurra",
    role: "Assistente Odontoiatrica",
    specialty: "Assistenza clinica · Accoglienza",
    bio: "Parte fondamentale del team clinico, assiste la dottoressa con competenza e attenzione ai dettagli.",
    photo: "/assets/images/staff_azzurra-87dfa0b0-0fd20ae6-1920w.png",
    initials: "A",
    color: "from-emerald-500/20 to-teal-500/5",
  },
  {
    name: "Gianmarco Quarta",
    role: "Ortodontista",
    specialty: "Ortodonzia fissa · Allineatori invisibili",
    bio: "Specialista in ortodonzia, affianca lo studio per i trattamenti di allineamento dentale.",
    photo: "/assets/images/staff_gianmarco-quarta-ed7bea7a-1920w.png",
    initials: "GQ",
    color: "from-violet-500/20 to-purple-500/5",
  },
  {
    name: "Gianni Ciampalini",
    role: "Medico Collaboratore",
    specialty: "Chirurgia orale · Implantologia",
    bio: "Collaboratore dello studio con esperienza in chirurgia orale e procedure implantologiche avanzate.",
    photo: "/assets/images/staff_gianni-ciampalini-1920w.png",
    initials: "GC",
    color: "from-sky-500/20 to-blue-500/5",
  },
  {
    name: "Errico Lanni",
    role: "Medico Collaboratore",
    specialty: "Parodontologia · Chirurgia",
    bio: "Specialista in parodontologia con esperienza internazionale, collabora con lo studio per i casi complessi.",
    photo: "/assets/images/staff_errico-lanni-1920w.png",
    initials: "EL",
    color: "from-rose-500/20 to-pink-500/5",
  },
  {
    name: "Ferdinando Di Monaco",
    role: "Medico Collaboratore",
    specialty: "Endodonzia · Conservativa",
    bio: "Esperto in endodonzia, garantisce trattamenti canalari precisi e conservativi.",
    photo: "/assets/images/staff_ferdinando-di-monaco-1920w.png",
    initials: "FD",
    color: "from-amber-500/20 to-orange-500/5",
  },
  {
    name: "Federica Puccioni",
    role: "Igienista Dentale",
    specialty: "Igiene · Sbiancamento · Prevenzione",
    bio: "Igienista dentale qualificata, contribuisce al benessere orale dei pazienti con professionalità.",
    photo: "/assets/images/staff_federica-puccioni-1920w.png",
    initials: "FP",
    color: "from-teal-500/20 to-cyan-500/5",
  },
  {
    name: "Vanessa",
    role: "Segreteria & Accoglienza",
    specialty: "Prenotazioni · Assistenza pazienti",
    bio: "Coordinatrice dell'accoglienza, guida ogni paziente con calore e professionalità dall'arrivo alla fine delle cure.",
    photo: "/assets/images/staff_Vanessa-R-f93b4b20-1920w.png",
    initials: "V",
    color: "from-fuchsia-500/20 to-pink-500/5",
  },
  {
    name: "Diletta",
    role: "Assistente Odontoiatrica",
    specialty: "Assistenza clinica · Sterilizzazione",
    bio: "Assistente odontoiatrica precisa e motivata, assicura il corretto svolgimento delle sedute cliniche.",
    photo: "/assets/images/staff_DILETTA1-1920w.jpg",
    initials: "D",
    color: "from-lime-500/20 to-green-500/5",
  },
  {
    name: "Elena",
    role: "Assistente Odontoiatrica",
    specialty: "Assistenza clinica · Accoglienza",
    bio: "Con la sua disponibilità, Elena rende ogni visita un'esperienza serena e positiva.",
    photo: "/assets/images/staff_elena--1920w.png",
    initials: "E",
    color: "from-indigo-500/20 to-blue-500/5",
  },
];

export default function Staff() {
  return (
    <PageTransition>
      <Helmet>
        <title>Staff — Odontoiatria Maria Gentili</title>
        <meta name="description" content="Il team professionale dello studio dentistico Maria Gentili." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-20 pt-36 overflow-hidden bg-deep noise">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-deep/60" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="section-label mb-5 block">Il team</span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-pearl leading-tight">
            Le persone<br />
            <span className="text-gradient">dietro il tuo sorriso</span>
          </h1>
        </div>
      </section>

      {/* Staff cards */}
      <section className="section bg-[#0c1220]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {STAFF.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                className="group"
              >
                {/* Avatar */}
                <div className={`relative aspect-square rounded-3xl bg-gradient-to-br ${member.color} border border-white/5 mb-6 overflow-hidden transition-all duration-500 group-hover:shadow-card`}>
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <span className="font-serif text-5xl font-bold text-pearl/60 group-hover:text-pearl/80 transition-colors duration-300">
                        {member.initials}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-pearl mb-1 group-hover:text-gradient transition-all duration-300">{member.name}</h3>
                <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">{member.role}</p>
                <p className="text-accent text-xs mb-4">{member.specialty}</p>
                <p className="text-pearl/50 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </PageTransition>
  );
}
