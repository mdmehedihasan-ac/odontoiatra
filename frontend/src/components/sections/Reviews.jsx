import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  { author: "Alfredo Costanzo",  text: "Professionali, gentili e competenti!! Studio all'avanguardia.", rating: 5 },
  { author: "Melania Gaglioti",  text: "Come in famiglia ❤️ posto accogliente e personale cordiale.", rating: 5 },
  { author: "Ermira Banaj",      text: "Il top! Bravissimi, migliori di loro non ci sono.", rating: 5 },
  { author: "Marco Rossi",       text: "Esperienza impeccabile da inizio a fine. Altamente raccomandato!", rating: 5 },
  { author: "Laura Bianchi",     text: "Professionalità e cortesia in uno studio davvero moderno.", rating: 5 },
  { author: "Giovanni Neri",     text: "Ottimo servizio, personale disponibile e competente.", rating: 5 },
];

// Double the array for infinite loop
const ALL_REVIEWS = [...REVIEWS, ...REVIEWS];

function ReviewCard({ review }) {
  return (
    <div className="glass rounded-2xl p-6 w-72 shrink-0 mx-3 relative overflow-hidden">
      <div className="absolute top-3 right-4 text-accent/15">
        <Quote size={32} />
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} size={13} className="fill-accent text-accent" />
        ))}
      </div>
      <p className="text-pearl/70 text-sm leading-relaxed mb-5 italic">{review.text}</p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
          <span className="text-primary text-xs font-bold">{review.author[0]}</span>
        </div>
        <div>
          <p className="text-pearl text-xs font-semibold">{review.author}</p>
          <p className="text-pearl/35 text-xs">Google ★</p>
        </div>
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="section bg-deep relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-14">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-4"
          >
            <span className="section-label">Testimonianze</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
            className="font-serif text-4xl md:text-5xl font-bold text-pearl"
          >
            Dicono di <span className="text-gradient">noi</span>
          </motion.h2>
        </div>
      </div>

      {/* Infinite marquee track 1 — left to right */}
      <div className="relative">
        <div className="flex animate-marquee w-max mb-4">
          {ALL_REVIEWS.map((r, i) => (
            <ReviewCard key={`a-${i}`} review={r} />
          ))}
        </div>
        {/* Track 2 — reversed */}
        <div className="flex animate-marquee-rev w-max">
          {[...ALL_REVIEWS].reverse().map((r, i) => (
            <ReviewCard key={`b-${i}`} review={r} />
          ))}
        </div>

        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-deep to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-deep to-transparent z-10" />
      </div>

      <div className="text-center mt-12">
        <a
          href="https://www.google.com/search?q=Odontoiatria+Maria+Gentili+Recensioni"
          target="_blank"
          rel="noreferrer"
          className="btn-outline text-sm"
        >
          Tutte le recensioni su Google ↗
        </a>
      </div>
    </section>
  );
}
