import Reveal from '../components/Reveal.jsx';
import HeroAG from '../components/HeroAG.jsx';
import IconTicker from '../components/IconTicker.jsx';
import MapSection from '../components/MapSection.jsx';
import UseCases from '../components/UseCases.jsx';
import PricingTeaser from '../components/PricingTeaser.jsx';
import CtaBanner from '../components/CtaBanner.jsx';

export default function Home() {
  return (
    <div>
      <HeroAG />
      <IconTicker />
      <MapSection />
      <Reveal as="div"><UseCases /></Reveal>
      <Reveal as="div"><PricingTeaser /></Reveal>
      <CtaBanner />
    </div>
  );
}
