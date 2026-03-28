import { Helmet } from "react-helmet-async";
import PageTransition from "../components/ui/PageTransition.jsx";
import Hero from "../components/sections/Hero.jsx";
import Services from "../components/sections/Services.jsx";
import About from "../components/sections/About.jsx";
import Stats from "../components/sections/Stats.jsx";
import Reviews from "../components/sections/Reviews.jsx";
import ContactCTA from "../components/sections/ContactCTA.jsx";

export default function Home() {
  return (
    <PageTransition>
      <Helmet>
        <title>Odontoiatria Maria Gentili — Studio Dentistico Castelfranco di Sotto e Peccioli</title>
        <meta name="description" content="Studio dentistico della Dott.ssa Maria Gentili. Prevenzione, implantologia, ortodonzia, parodontologia. Sedi a Castelfranco di Sotto e Peccioli (PI)." />
      </Helmet>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Reviews />
      <ContactCTA />
    </PageTransition>
  );
}
