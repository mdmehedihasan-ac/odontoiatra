import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

const SERVICES = [
  { label: "Prevenzione",              path: "/prestazioni/prevenzione" },
  { label: "Parodontologia",           path: "/prestazioni/parodontologia" },
  { label: "Implantologia",            path: "/prestazioni/implantologia" },
  { label: "Ortodonzia",               path: "/prestazioni/ortodonzia" },
  { label: "Estetica del Sorriso",     path: "/prestazioni/estetica-sorriso" },
  { label: "Estetica del Volto",       path: "/prestazioni/estetica-volto" },
  { label: "Pedodonzia",               path: "/prestazioni/pedodonzia" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#060b17] border-t border-white/5 overflow-hidden">
      {/* Blurred accent blobs */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">G</span>
              </div>
              <div>
                <p className="font-serif text-pearl font-semibold text-sm">Odontoiatria</p>
                <p className="font-serif text-accent text-xs tracking-widest uppercase">Maria Gentili</p>
              </div>
            </div>
            <p className="text-pearl/50 text-sm leading-relaxed mb-6">
              Studio dentistico specializzato in prevenzione e cura odontoiatrica a Castelfranco di Sotto e Peccioli.
            </p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/people/Odontoiatria-Maria-Gentili/100062945425780/" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-pearl/50 hover:text-accent hover:border-accent/30 transition-colors duration-200">
                <Facebook size={15} />
              </a>
              <a href="https://www.instagram.com/odontoiatriamariagentili/" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-pearl/50 hover:text-accent hover:border-accent/30 transition-colors duration-200">
                <Instagram size={15} />
              </a>
              <a href="https://wa.me/393273938147" target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-lg glass flex items-center justify-center text-pearl/50 hover:text-accent hover:border-accent/30 transition-colors duration-200">
                <MessageCircle size={15} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-serif text-pearl text-base font-semibold mb-5">Prestazioni</h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.path}>
                  <Link to={s.path} className="text-sm text-pearl/50 hover:text-accent transition-colors duration-150 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-accent/40 group-hover:bg-accent transition-colors duration-150" />
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sede 1 */}
          <div>
            <h4 className="font-serif text-pearl text-base font-semibold mb-5">Castelfranco di Sotto</h4>
            <div className="space-y-3 text-sm text-pearl/50">
              <div className="flex gap-2.5">
                <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                <span>Via Cupini, 17<br />56022 Castelfranco di Sotto (PI)</span>
              </div>
              <div className="flex gap-2.5">
                <Phone size={14} className="text-accent shrink-0 mt-0.5" />
                <a href="tel:+390571478087" className="hover:text-pearl transition-colors duration-150">+39 0571 478087</a>
              </div>
              <div className="mt-4 text-xs space-y-1 text-pearl/35">
                <p>Mar – Mer – Ven: 09:00 – 19:00</p>
                <p>Giovedì: 15:00 – 19:00</p>
              </div>
            </div>
          </div>

          {/* Sede 2 */}
          <div>
            <h4 className="font-serif text-pearl text-base font-semibold mb-5">Peccioli</h4>
            <div className="space-y-3 text-sm text-pearl/50">
              <div className="flex gap-2.5">
                <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                <span>Via Marconi, 7<br />56037 Peccioli (PI)</span>
              </div>
              <div className="flex gap-2.5">
                <Phone size={14} className="text-accent shrink-0 mt-0.5" />
                <a href="tel:+390587636162" className="hover:text-pearl transition-colors duration-150">+39 0587 636162</a>
              </div>
              <div className="mt-4 text-xs space-y-1 text-pearl/35">
                <p>Lunedì: 09:00 – 19:00</p>
                <p>Mercoledì: 09:00 – 18:00</p>
                <p>Giovedì: 09:00 – 13:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col items-center text-center md:flex-row md:items-center md:justify-between md:text-left gap-4 text-xs text-pearl/30">
          <p>
            © {new Date().getFullYear()} Odontoiatria Maria Gentili S.r.l. — P.I. 01810560506 / 02331710505
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-pearl/60 transition-colors duration-150">Privacy Policy</a>
            <a href="#" className="hover:text-pearl/60 transition-colors duration-150">Cookie Policy</a>
            <a href="#" className="hover:text-pearl/60 transition-colors duration-150">Informazioni Legali</a>
          </div>
          <p>Auth. sanitaria n.40 del 13/08/21 — Dir. San. Gentili Maria</p>
        </div>
      </div>
    </footer>
  );
}
