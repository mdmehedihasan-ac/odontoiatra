import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",     path: "/" },
  { label: "Studio",   path: "/studio" },
  { label: "Staff",    path: "/staff" },
  {
    label: "Prestazioni",
    path: "#",
    children: [
      { label: "Prevenzione",              path: "/prestazioni/prevenzione" },
      { label: "Parodontologia",           path: "/prestazioni/parodontologia" },
      { label: "Conservativa & Endodonzia",path: "/prestazioni/conservativa-endodonzia" },
      { label: "Implantologia",            path: "/prestazioni/implantologia" },
      { label: "Ortodonzia",               path: "/prestazioni/ortodonzia" },
      { label: "Estetica del Volto",       path: "/prestazioni/estetica-volto" },
      { label: "Estetica del Sorriso",     path: "/prestazioni/estetica-sorriso" },
      { label: "Pedodonzia",               path: "/prestazioni/pedodonzia" },
    ],
  },
  { label: "Contatti", path: "/contatti" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-dark py-3 shadow-2xl"
            : "bg-transparent py-5",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(61,90,241,0.5)] transition-shadow duration-300">
              <span className="text-white font-serif font-bold text-lg leading-none">G</span>
            </div>
            <div className="leading-tight">
              <p className="font-serif text-pearl font-semibold text-sm tracking-wide">Odontoiatria</p>
              <p className="font-serif text-accent text-xs tracking-widest uppercase">Maria Gentili</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((v) => !v)}
                    className={[
                      "flex items-center gap-1.5 text-sm font-medium transition-colors duration-200",
                      dropdownOpen ? "text-accent" : "text-pearl/80 hover:text-pearl",
                    ].join(" ")}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 glass-dark rounded-2xl overflow-hidden shadow-2xl py-2"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-5 py-2.5 text-sm text-pearl/75 hover:text-pearl hover:bg-white/5 transition-colors duration-150"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={[
                    "text-sm font-medium relative transition-colors duration-200 group",
                    location.pathname === link.path
                      ? "text-accent"
                      : "text-pearl/80 hover:text-pearl",
                  ].join(" ")}
                >
                  {link.label}
                  <span className={[
                    "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300",
                    location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full",
                  ].join(" ")} />
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+390571478087"
              className="flex items-center gap-2 text-sm text-pearl/70 hover:text-accent transition-colors duration-200"
            >
              <Phone size={14} />
              <span>0571 478087</span>
            </a>
            <Link to="/contatti" className="btn-primary text-sm py-2.5 px-6">
              Prenota visita
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg glass text-pearl"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 glass-dark flex flex-col pt-20 sm:pt-24 px-5 sm:px-8 pb-12 overflow-y-auto"
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="text-accent text-xs font-semibold uppercase tracking-widest mt-6 mb-2">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className="block py-2 text-pearl/75 hover:text-pearl text-base transition-colors duration-150"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={[
                      "py-3 text-xl font-serif border-b border-white/5 transition-colors duration-150",
                      location.pathname === link.path
                        ? "text-accent"
                        : "text-pearl hover:text-accent",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="mt-auto pt-8 flex flex-col gap-3">
              <a href="tel:+390571478087" className="btn-outline justify-center">
                <Phone size={16} /> 0571 478087
              </a>
              <Link to="/contatti" className="btn-primary justify-center">
                Prenota una Visita
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
