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
    initials: "MG",
    color: "from-primary/30 to-blue-600/10",
  },
  {
    name: "Igienista Dentale",
    role: "Igienista Dentale Laureata",
    specialty: "Igiene orale · Prevenzione · Pedodonzia",
    bio: "La nostra igienista garantisce trattamenti professionali con un approccio attento, delicato e rispettoso delle esigenze di ogni paziente.",
    initials: "ID",
    color: "from-accent/25 to-accent/5",
  },
  {
    name: "Personale di Segreteria",
    role: "Accoglienza & Coordinamento",
    specialty: "Prenotazioni · Assistenza pazienti",
    bio: "Il nostro team di segreteria è qui per guidarti dall'appuntamento fino al termine delle cure, con professionalità e calore.",
    initials: "PS",
    color: "from-emerald-500/20 to-teal-500/5",
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
          <div className="grid md:grid-cols-3 gap-8">
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
                <div className={`relative aspect-square rounded-3xl bg-gradient-to-br ${member.color} border border-white/5 flex items-center justify-center mb-6 overflow-hidden transition-all duration-500 group-hover:shadow-card`}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="absolute inset-0 bg-gradient-to-t from-deep/80 to-transparent" />
                  </div>
                  <span className="font-serif text-5xl font-bold text-pearl/60 group-hover:text-pearl/80 transition-colors duration-300">
                    {member.initials}
                  </span>
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
