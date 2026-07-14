import { lazy, Suspense } from 'react';
import Reveal from '../components/Reveal.jsx';
import HeroAG from '../components/HeroAG.jsx';
import IconTicker from '../components/IconTicker.jsx';
import MapSection from '../components/MapSection.jsx';
import PricingTeaser from '../components/PricingTeaser.jsx';
import ClaudeCodeMockup from '../components/ClaudeCodeMockup.jsx';

// framer-motion is only needed here; load it as its own chunk.
const ContainerScroll = lazy(() =>
  import('../components/ContainerScroll.jsx').then((m) => ({ default: m.ContainerScroll })),
);

export default function Home() {
  return (
    <div>
      <HeroAG />
      <IconTicker />
      <MapSection />

      {/* Scroll-animated showcase: AI-assisted development */}
      <section className="bg-black">
        <Suspense fallback={<div className="bg-black h-[600px]" />}>
          <ContainerScroll
            titleComponent={
              <>
                <p className="text-sm uppercase tracking-[0.28em] font-semibold text-rose-400 mb-4">
                  AI-Accelerated Development
                </p>
                <h2 className="text-3xl md:text-[3.25rem] font-bold text-white leading-tight">
                  We build faster, <br />
                  <span className="text-4xl md:text-[5rem] font-bold mt-1 leading-none block bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                    with AI at our side.
                  </span>
                </h2>
              </>
            }
          >
            <ClaudeCodeMockup />
          </ContainerScroll>
        </Suspense>
      </section>

      <Reveal as="div"><PricingTeaser /></Reveal>
    </div>
  );
}
