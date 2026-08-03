import { lazy, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';

// framer-motion-backed bento; only loads on /about
const BentoGrid = lazy(() => import('../components/BentoGrid.jsx'));

export default function About() {
  return (
    <div className="page">
      <Reveal className="max-w-3xl mb-14">
        <span className="eyebrow">About Us</span>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Local roots. Modern solutions.</h1>
        <div className="space-y-5 text-lg text-neutral-400 leading-relaxed">
          <p>
            Peninsula Web Services is an independent web studio in{' '}
            <strong className="text-white">Sturgeon Bay, Wisconsin</strong>. We build high-performance
            websites and AI tools for businesses that want to look exceptional and perform even better.
          </p>
          <p>
            Our founder completed formal marketing training at <strong className="text-white">NWTC</strong>,
            so every site we build is engineered not just to look good, but to
            <strong className="text-white"> bring in customers</strong>. You work directly with the person
            building your site — no account managers, no offshore handoffs.
          </p>
        </div>
      </Reveal>

      {/* Bento — replaces the old team image + animated backdrop */}
      <Reveal className="mb-16">
        <Suspense fallback={<div className="h-[500px]" />}>
          <BentoGrid />
        </Suspense>
      </Reveal>

      <Reveal>
        <div className="text-center">
          <a href="#/contact" className="btn-primary group">
            Let's Work Together
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
    </div>
  );
}
