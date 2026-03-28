import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import PageTransition from "../components/ui/PageTransition.jsx";

const SEDI = [
  {
    nome: "Castelfranco di Sotto",
    indirizzo: "Via Cupini, 17 — 56022 Castelfranco di Sotto (PI)",
    telefono: "+39 0571 478087",
    telclean: "+390571478087",
    orari: [
      { g: "Martedì",   o: "09:00 – 19:00" },
      { g: "Mercoledì", o: "09:00 – 19:00" },
      { g: "Giovedì",   o: "15:00 – 19:00" },
      { g: "Venerdì",   o: "09:00 – 19:00" },
    ],
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2861.4!2d10.7427!3d43.6968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDQxJzQ4LjUiTiAxMMKwNDQnMzMuNyJF!5e0!3m2!1sit!2sit!4v1234567890",
  },
  {
    nome: "Peccioli",
    indirizzo: "Via Marconi, 7 — 56037 Peccioli (PI)",
    telefono: "+39 0587 636162",
    telclean: "+390587636162",
    orari: [
      { g: "Lunedì",    o: "09:00 – 19:00" },
      { g: "Mercoledì", o: "09:00 – 18:00" },
      { g: "Giovedì",   o: "09:00 – 13:00" },
    ],
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2861.4!2d10.7185!3d43.5542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDMzJzE1LjEiTiAxMMKwNDMnMDYuNiJF!5e0!3m2!1sit!2sit!4v1234567891",
  },
];

export default function Contatti() {
  const [formState, setFormState] = useState({ nome: "", email: "", telefono: "", messaggio: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // mailto fallback — replace with real backend endpoint when ready
    const { nome, email, telefono, messaggio } = formState;
    const body = `Nome: ${nome}\nEmail: ${email}\nTelefono: ${telefono}\n\n${messaggio}`;
    window.open(`mailto:info@odontoiatriamariagentili.it?subject=Richiesta visita da ${encodeURIComponent(nome)}&body=${encodeURIComponent(body)}`);
    setSubmitted(true);
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Contatti — Odontoiatria Maria Gentili</title>
        <meta name="description" content="Prenota una visita o richiedi informazioni allo Studio Dentistico Maria Gentili. Sedi a Castelfranco di Sotto e Peccioli." />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end pb-20 pt-36 overflow-hidden bg-deep noise">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-deep/60" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="section-label mb-5 block">Sono qui per te</span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-pearl leading-tight">
            Prenota la<br />
            <span className="text-gradient">tua visita</span>
          </h1>
        </div>
      </section>

      {/* Quick contacts bar */}
      <section className="bg-surface/50 border-y border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <a href="tel:+390571478087" className="flex items-center gap-2.5 glass-dark rounded-xl px-5 py-3 text-sm hover:border-primary/30 transition-all duration-200 group">
            <Phone size={15} className="text-primary group-hover:text-accent transition-colors" />
            <span className="text-pearl/70 group-hover:text-pearl transition-colors">0571 478087 (Castelfranco)</span>
          </a>
          <a href="tel:+390587636162" className="flex items-center gap-2.5 glass-dark rounded-xl px-5 py-3 text-sm hover:border-primary/30 transition-all duration-200 group">
            <Phone size={15} className="text-primary group-hover:text-accent transition-colors" />
            <span className="text-pearl/70 group-hover:text-pearl transition-colors">0587 636162 (Peccioli)</span>
          </a>
          <a href="https://wa.me/393273938147" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 glass-dark rounded-xl px-5 py-3 text-sm hover:border-green-500/30 transition-all duration-200 group">
            <MessageCircle size={15} className="text-green-400 group-hover:text-green-300 transition-colors" />
            <span className="text-pearl/70 group-hover:text-pearl transition-colors">WhatsApp: 327 3938147</span>
          </a>
          <a href="mailto:info@odontoiatriamariagentili.it" className="flex items-center gap-2.5 glass-dark rounded-xl px-5 py-3 text-sm hover:border-accent/30 transition-all duration-200 group">
            <Mail size={15} className="text-accent/70 group-hover:text-accent transition-colors" />
            <span className="text-pearl/70 group-hover:text-pearl transition-colors">info@odontoiatriamariagentili.it</span>
          </a>
        </div>
      </section>

      {/* Form + Sedi */}
      <section className="section bg-[#0c1220]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <h2 className="font-serif text-3xl font-bold text-pearl mb-2">Scrivici</h2>
            <p className="text-pearl/50 text-sm mb-8">Risponderemo entro 24 ore lavorative.</p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-10 text-center"
              >
                <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-pearl mb-2">Messaggio inviato!</h3>
                <p className="text-pearl/55 text-sm">Grazie per averci contattato. Ti risponderemo al più presto.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { name: "nome",      label: "Nome e cognome", type: "text",  required: true },
                  { name: "email",     label: "Email",          type: "email", required: true },
                  { name: "telefono",  label: "Telefono",       type: "tel",   required: false },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block text-xs font-semibold text-pearl/50 uppercase tracking-wider mb-1.5">
                      {field.label} {field.required && <span className="text-accent">*</span>}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formState[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      autoComplete="off"
                      className="w-full glass rounded-xl px-4 py-3 text-sm text-pearl placeholder-pearl/25 bg-transparent focus:outline-none focus:border-primary/50 transition-colors duration-200"
                      placeholder={`Il tuo ${field.label.toLowerCase()}`}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-xs font-semibold text-pearl/50 uppercase tracking-wider mb-1.5">
                    Messaggio <span className="text-accent">*</span>
                  </label>
                  <textarea
                    name="messaggio"
                    value={formState.messaggio}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full glass rounded-xl px-4 py-3 text-sm text-pearl placeholder-pearl/25 bg-transparent focus:outline-none focus:border-primary/50 transition-colors duration-200 resize-none"
                    placeholder="Descrivi la tua richiesta o indica la prestazione di interesse..."
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center mt-2">
                  <Send size={16} /> Invia messaggio
                </button>
              </form>
            )}
          </motion.div>

          {/* Sedi */}
          <div className="space-y-8">
            {SEDI.map((sede, i) => (
              <motion.div
                key={sede.nome}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                className="glass rounded-2xl overflow-hidden"
              >
                {/* Map embed */}
                <div className="h-40 bg-gradient-to-br from-primary/10 to-deep relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin size={32} className="text-primary/30" />
                  </div>
                  <div className="absolute bottom-3 left-4 glass-dark rounded-lg px-3 py-1.5 text-xs text-pearl/70">
                    {sede.nome}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-pearl mb-4">{sede.nome}</h3>
                  <div className="space-y-3 text-sm mb-5">
                    <div className="flex gap-2.5 text-pearl/60">
                      <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                      <span>{sede.indirizzo}</span>
                    </div>
                    <div className="flex gap-2.5 text-pearl/60">
                      <Phone size={14} className="text-accent shrink-0 mt-0.5" />
                      <a href={`tel:${sede.telclean}`} className="hover:text-pearl transition-colors">{sede.telefono}</a>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock size={13} className="text-accent" />
                      <span className="text-xs font-semibold text-pearl/50 uppercase tracking-wider">Orari</span>
                    </div>
                    <div className="space-y-1.5">
                      {sede.orari.map((o) => (
                        <div key={o.g} className="flex justify-between text-xs">
                          <span className="text-pearl/50">{o.g}</span>
                          <span className="text-pearl/70 font-medium">{o.o}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
