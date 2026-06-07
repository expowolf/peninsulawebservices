import { lazy, Suspense } from 'react';
import Reveal from '../components/Reveal.jsx';
import HeroAG from '../components/HeroAG.jsx';
import IconTicker from '../components/IconTicker.jsx';
import MapSection from '../components/MapSection.jsx';
import PricingTeaser from '../components/PricingTeaser.jsx';

// framer-motion is only needed here; load it as its own chunk.
const SectionWithMockup = lazy(() => import('../components/SectionWithMockup.jsx'));

const builtFor = {
  title: (
    <>
      Built for Door County.
      <br />
      Designed to convert.
    </>
  ),
  description: (
    <>
      From restaurants and shops to lodging and local services — we build fast,
      modern websites tuned to how locals and tourists actually search, so your
      business turns visitors into customers, not just clicks.
    </>
  ),
  // Real Unsplash photos (marketing analytics / modern web work)
  primaryImageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=900&q=80',
  secondaryImageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=900&q=80',
};

export default function Home() {
  return (
    <div>
      <HeroAG />
      <IconTicker />
      <MapSection />
      <Suspense fallback={<div className="bg-black h-[600px]" />}>
        <SectionWithMockup {...builtFor} />
      </Suspense>
      <Reveal as="div"><PricingTeaser /></Reveal>
    </div>
  );
}
