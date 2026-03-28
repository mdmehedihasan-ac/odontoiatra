import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, MapPin, Clock, ExternalLink, ChevronDown, Check } from "lucide-react";
import PageTransition from "../components/ui/PageTransition.jsx";

const SEDI = [
  {
    nome: "Castelfranco di Sotto",
    indirizzo: "Via Cupini, 17",
    citta: "56022 Castelfranco di Sotto (PI)",
    telefono: "0571 478087",
    telclean: "+390571478087",
    orari: [
      { g: "Martedì",   o: "09:00 – 19:00" },
      { g: "Mercoledì", o: "09:00 – 19:00" },
      { g: "Giovedì",   o: "15:00 – 19:00" },
      { g: "Venerdì",   o: "09:00 – 19:00" },
    ],
    mapsEmbed: "https://maps.google.com/maps?q=Via+Cupini+17+56022+Castelfranco+di+Sotto+PI+Italy&output=embed&hl=it",
    mapsLink: "https://maps.google.com/?q=Via+Cupini+17+Castelfranco+di+Sotto+PI",
  },
  {
    nome: "Peccioli",
    indirizzo: "Via Marconi, 7",
    citta: "56037 Peccioli (PI)",
    telefono: "0587 636162",
    telclean: "+390587636162",
    orari: [
      { g: "Lunedì",    o: "09:00 – 19:00" },
      { g: "Mercoledì", o: "09:00 – 18:00" },
      { g: "Giovedì",   o: "09:00 – 13:00" },
    ],
    mapsEmbed: "https://maps.google.com/maps?q=Via+Marconi+7+56037+Peccioli+PI+Italy&output=embed&hl=it",
    mapsLink: "https://maps.google.com/?q=Via+Marconi+7+Peccioli+PI",
  },
];

const PRESTAZIONI = [
  "Visita di controllo",
  "Igiene e pulizia dentale",
  "Devitalizzazione / endodonzia",
  "Implantologia",
  "Ortodonzia / allineatori",
  "Estetica del sorriso",
  "Parodontologia",
  "Estetica del volto",
  "Odontoiatria infantile",
  "Altro",
];

const WA_NUMBER = "393273938147";

function buildWhatsAppUrl({ nome, telefono, sede, prestazione, messaggio }) {
  const sedeLabel = sede === "castelfranco" ? "Castelfranco di Sotto" : "Peccioli";
  const lines = [
    `Buongiorno, vorrei prenotare una visita.`,
    ``,
    `*Nome:* ${nome || "(non specificato)"}`,
    telefono ? `*Telefono:* ${telefono}` : null,
    `*Sede:* ${sedeLabel}`,
    `*Prestazione:* ${prestazione || "da definire"}`,
    messaggio ? `*Note:* ${messaggio}` : null,
    ``,
    `Grazie mille!`,
  ].filter((l) => l !== null).join("\n");
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
}

export default function Contatti() {
  const [form, setForm] = useState({
    nome: "", telefono: "", sede: "castelfranco", prestazione: "", messaggio: "",
  });

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleWhatsApp = (e) => {
    e.preventDefault();
    window.open(buildWhatsAppUrl(form), "_blank", "noopener,noreferrer");
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Contatti — Odontoiatria Maria Gentili</title>
        <meta name="description" content="Prenota una visita o richiedi informazioni allo Studio Dentistico Maria Gentili. Sedi a Castelfranco di Sotto e Peccioli." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative min-h-[50vh] flex items-end pb-20 pt-36 overflow-hidden bg-deep noise">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-deep/60" />
        <div className="relative max-w-7xl mx-auto px-6">
          <span className="section-label mb-5 block">Siamo qui per te</span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-pearl leading-tight">
            Prenota la<br />
            <span className="text-gradient">tua visita</span>
          </h1>
          <p className="mt-6 text-pearl/55 text-lg max-w-xl">
            Compila il modulo: ti prepariamo un messaggio WhatsApp già impostato, così prenoti in un click.
          </p>
        </div>
      </section>

      {/* ── Quick contacts bar ── */}
      <section className="bg-surface/50 border-y border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row gap-3 justify-center items-center flex-wrap">
          <a href="tel:+390571478087" className="flex items-center gap-2.5 glass-dark rounded-xl px-5 py-3 text-sm hover:border-primary/30 transition-all duration-200 group">
            <Phone size={14} className="text-primary group-hover:text-accent transition-colors shrink-0" />
            <span className="text-pearl/70 group-hover:text-pearl transition-colors">0571 478087 — Castelfranco</span>
          </a>
          <a href="tel:+390587636162" className="flex items-center gap-2.5 glass-dark rounded-xl px-5 py-3 text-sm hover:border-primary/30 transition-all duration-200 group">
            <Phone size={14} className="text-primary group-hover:text-accent transition-colors shrink-0" />
            <span className="text-pearl/70 group-hover:text-pearl transition-colors">0587 636162 — Peccioli</span>
          </a>
          <a href="https://wa.me/393273938147" target="_blank" rel="noreferrer noopener" className="flex items-center gap-2.5 glass-dark rounded-xl px-5 py-3 text-sm hover:border-green-500/40 transition-all duration-200 group">
            <MessageCircle size={14} className="text-green-400 group-hover:text-green-300 transition-colors shrink-0" />
            <span className="text-pearl/70 group-hover:text-pearl transition-colors">WhatsApp 327 3938147</span>
          </a>
          <a href="mailto:info@odontoiatriamariagentili.it" className="flex items-center gap-2.5 glass-dark rounded-xl px-5 py-3 text-sm hover:border-accent/30 transition-all duration-200 group">
            <Mail size={14} className="text-accent/70 group-hover:text-accent transition-colors shrink-0" />
            <span className="text-pearl/70 group-hover:text-pearl transition-colors">info@odontoiatriamariagentili.it</span>
          </a>
        </div>
      </section>

      {/* ── Form + Maps ── */}
      <section className="section bg-[#0c1220]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-start">

          {/* Left — WhatsApp form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle size={22} className="text-green-400" />
              <h2 className="font-serif text-3xl font-bold text-pearl">Prenota via WhatsApp</h2>
            </div>
            <p className="text-pearl/50 text-sm mb-8 ml-9">
              Compila i campi e ti apriremo WhatsApp con il messaggio già scritto.
            </p>

            <form onSubmit={handleWhatsApp} className="space-y-5">
              {/* Nome */}
              <div>
                <label className="block text-xs font-semibold text-pearl/50 uppercase tracking-wider mb-1.5">
                  Nome e cognome <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Es. Mario Rossi"
                  className="w-full glass rounded-xl px-4 py-3 text-sm text-pearl placeholder-pearl/25 bg-transparent focus:outline-none focus:border-primary/50 transition-colors duration-200"
                />
              </div>

              {/* Telefono */}
              <div>
                <label className="block text-xs font-semibold text-pearl/50 uppercase tracking-wider mb-1.5">
                  Numero di telefono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  autoComplete="tel"
                  placeholder="Es. 333 1234567"
                  className="w-full glass rounded-xl px-4 py-3 text-sm text-pearl placeholder-pearl/25 bg-transparent focus:outline-none focus:border-primary/50 transition-colors duration-200"
                />
              </div>

              {/* Sede selector */}
              <div>
                <label className="block text-xs font-semibold text-pearl/50 uppercase tracking-wider mb-2">
                  Sede preferita <span className="text-accent">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "castelfranco", label: "Castelfranco di Sotto", sub: "Via Cupini, 17" },
                    { value: "peccioli",     label: "Peccioli",              sub: "Via Marconi, 7" },
                  ].map((opt) => {
                    const active = form.sede === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, sede: opt.value }))}
                        className={`relative glass rounded-xl px-4 py-3 text-left transition-all duration-200 border ${
                          active
                            ? "border-green-500/70 bg-green-500/10 shadow-[0_0_18px_rgba(34,197,94,0.18)]"
                            : "border-white/5 hover:border-white/15"
                        }`}
                      >
                        <div className={`text-sm font-semibold ${active ? "text-green-300" : "text-pearl"}`}>{opt.label}</div>
                        <div className="text-xs text-pearl/40 mt-0.5">{opt.sub}</div>
                        {active && (
                          <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                            <Check size={10} strokeWidth={3} className="text-white" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Prestazione */}
              <div>
                <label className="block text-xs font-semibold text-pearl/50 uppercase tracking-wider mb-1.5">
                  Prestazione di interesse <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <select
                    name="prestazione"
                    value={form.prestazione}
                    onChange={handleChange}
                    required
                    className="w-full glass rounded-xl px-4 py-3 text-sm text-pearl bg-transparent focus:outline-none focus:border-primary/50 transition-colors duration-200 appearance-none cursor-pointer pr-10"
                  >
                    <option value="" disabled className="bg-[#0c1220] text-pearl/50">Seleziona una prestazione…</option>
                    {PRESTAZIONI.map((p) => (
                      <option key={p} value={p} className="bg-[#0c1220] text-pearl">{p}</option>
                    ))}
                  </select>
                  <ChevronDown size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-pearl/40 pointer-events-none" />
                </div>
              </div>

              {/* Note libere */}
              <div>
                <label className="block text-xs font-semibold text-pearl/50 uppercase tracking-wider mb-1.5">
                  Note aggiuntive <span className="text-pearl/30 normal-case font-normal">(facoltativo)</span>
                </label>
                <textarea
                  name="messaggio"
                  value={form.messaggio}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Urgenza, orari preferiti, domande specifiche…"
                  className="w-full glass rounded-xl px-4 py-3 text-sm text-pearl placeholder-pearl/25 bg-transparent focus:outline-none focus:border-primary/50 transition-colors duration-200 resize-none"
                />
              </div>

              {/* CTA */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 rounded-xl py-4 px-6 text-base font-semibold text-white bg-green-600 hover:bg-green-500 active:scale-[0.98] transition-all duration-200 shadow-[0_4px_24px_rgba(22,163,74,0.35)]"
              >
                <MessageCircle size={18} />
                Apri WhatsApp con il messaggio
              </button>
              <p className="text-center text-xs text-pearl/30">
                Verrai reindirizzato a WhatsApp. Non viene inviato nulla automaticamente.
              </p>
            </form>
          </motion.div>

          {/* Right — sedi cards with real maps */}
          <div className="space-y-8">
            {SEDI.map((sede, i) => {
              const isActive = (form.sede === "castelfranco" && sede.nome.includes("Castelfranco")) ||
                               (form.sede === "peccioli"     && sede.nome.includes("Peccioli"));
              return (
                <motion.div
                  key={sede.nome}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                  className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${
                    isActive ? "ring-1 ring-primary/40 shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.12)]" : ""
                  }`}
                >
                  {/* ── Google Maps iframe ── */}
                    <div className="relative h-40 sm:h-52 w-full overflow-hidden">
                    <iframe
                      src={sede.mapsEmbed}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "invert(0.88) hue-rotate(185deg) saturate(0.6)" }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mappa ${sede.nome}`}
                      className="absolute inset-0 w-full h-full"
                    />
                    {/* open in maps button */}
                    <a
                      href={sede.mapsLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="absolute bottom-3 right-3 glass-dark rounded-lg px-3 py-1.5 text-xs text-pearl/70 hover:text-pearl flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink size={12} /> Apri in Maps
                    </a>
                  </div>

                  <div className="p-6">
                    <h3 className="font-serif text-xl font-bold text-pearl mb-4">{sede.nome}</h3>
                    <div className="space-y-3 text-sm mb-5">
                      <div className="flex gap-2.5 text-pearl/60">
                        <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                        <span>{sede.indirizzo}, {sede.citta}</span>
                      </div>
                      <div className="flex gap-2.5 text-pearl/60">
                        <Phone size={14} className="text-accent shrink-0 mt-0.5" />
                        <a href={`tel:${sede.telclean}`} className="hover:text-pearl transition-colors">{sede.telefono}</a>
                      </div>
                    </div>

                    <div className="border-t border-white/5 pt-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock size={13} className="text-accent shrink-0" />
                        <span className="text-xs font-semibold text-pearl/50 uppercase tracking-wider">Orari di apertura</span>
                      </div>
                      <div className="space-y-1.5">
                        {sede.orari.map((o) => (
                          <div key={o.g} className="flex justify-between text-xs">
                            <span className="text-pearl/45">{o.g}</span>
                            <span className="text-pearl/70 font-medium tabular-nums">{o.o}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA strip ── */}
      <section className="py-16 bg-deep border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-pearl/40 text-sm mb-2">Preferisci chiamare direttamente?</p>
          <h2 className="font-serif text-2xl font-bold text-pearl mb-6">Siamo sempre disponibili</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+390571478087" className="btn-outline gap-2">
              <Phone size={15} /> 0571 478087
            </a>
            <a href="tel:+390587636162" className="btn-outline gap-2">
              <Phone size={15} /> 0587 636162
            </a>
            <a
              href="https://wa.me/393273938147"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-sm font-semibold text-white bg-green-700 hover:bg-green-600 transition-all duration-200"
            >
              <MessageCircle size={15} /> WhatsApp diretto
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
