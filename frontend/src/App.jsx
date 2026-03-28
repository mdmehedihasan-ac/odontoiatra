import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { SiteDataProvider } from "./hooks/useSiteData.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import CustomCursor from "./components/ui/CustomCursor.jsx";
import PageLoader from "./components/ui/PageLoader.jsx";
import Home from "./pages/Home.jsx";
import Studio from "./pages/Studio.jsx";
import Staff from "./pages/Staff.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import Contatti from "./pages/Contatti.jsx";

function AppRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/prestazioni/:slug" element={<ServiceDetail />} />
        <Route path="/contatti" element={<Contatti />} />
        {/* Catch-all */}
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <SiteDataProvider>
      <BrowserRouter>
        <CustomCursor />
        <PageLoader />
        <Navbar />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </BrowserRouter>
    </SiteDataProvider>
  );
}
