import { lazy, Suspense } from 'react';
import HeroAG from '../components/HeroAG.jsx';
import MapSection from '../components/MapSection.jsx';
import ClaudeCodeMockup from '../components/ClaudeCodeMockup.jsx';

// framer-motion / confetti / number-flow are only needed here; lazy chunks.
const ContainerScroll = lazy(() =>
  import('../components/ContainerScroll.jsx').then((m) => ({ default: m.ContainerScroll })),
);
const PricingSection = lazy(() => import('../components/PricingSection.jsx'));

const pricingPlans = [
  {
    name: 'Basic',
    price: '25',          // per month
    yearlyPrice: '300',   // annual total (/yr)
    oneTimePrice: '250',  // one-time build
    description: 'A polished one-page site to get online fast.',
    features: ['Single-page website', 'Mobile-first & fast', 'Contact form + maps', 'Basic on-page SEO'],
    buttonText: 'Get Started',
    href: '#/contact',
  },
  {
    name: 'Professional',
    price: '35',
    yearlyPrice: '420',
    oneTimePrice: '350',
    description: 'A complete multi-page site built to convert.',
    features: ['Up to 5 custom pages', 'Local SEO setup', 'Lead-capture forms', 'Analytics & 30 days support'],
    buttonText: 'Get Started',
    href: '#/contact',
    isPopular: true,
  },
  {
    name: 'Deluxe',
    price: '50',
    yearlyPrice: '600',
    oneTimePrice: '500',
    description: 'Full site plus AI tools and ongoing support.',
    features: ['Everything in Professional', 'AI chatbot & automation', 'Ongoing SEO & updates', 'Priority support'],
    buttonText: 'Contact Us',
    href: '#/contact',
  },
];

export default function Home() {
  return (
    <div>
      <HeroAG />
      <MapSection />

      {/* Scroll-animated showcase: AI-assisted development */}
      <section className="bg-black">
        <Suspense fallback={<div className="bg-black h-[600px]" />}>
          <ContainerScroll
            titleComponent={
              <>
                <p className="text-sm uppercase tracking-[0.28em] font-semibold text-steel-400 mb-4">
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

      <Suspense fallback={<div className="bg-slate-950 h-[600px]" />}>
        <PricingSection
          plans={pricingPlans}
          title="Simple, transparent pricing"
          description="Choose a one-time project build or an ongoing care plan — no surprises, ever."
        />
      </Suspense>
    </div>
  );
}
