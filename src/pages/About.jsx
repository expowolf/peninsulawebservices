import { lazy, Suspense } from 'react';
import { Heart, Target, Zap, MapPin, ArrowRight } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { TeamImage } from '../components/ImagePlaceholder.jsx';

// framer-motion-backed hero; only loads on /about
const BackgroundCircles = lazy(() => import('../components/BackgroundCircles.jsx'));

const values = [
  { icon: Heart, title: 'Local & Personal', text: 'You talk to the person building your site — not an account manager in another state.' },
  { icon: Target, title: 'Marketing-Driven', text: 'NWTC marketing training means we build for real results, not just looks.' },
  { icon: Zap, title: 'Modern & Fast', text: 'Your site works on phones, loads fast, and ranks well on Google.' },
  { icon: MapPin, title: 'Door County Focus', text: 'We understand the local market and the seasonal tourism economy.' },
];

export default function About() {
  return (
    <div>
      <Suspense fallback={<div className="min-h-[72vh] bg-white" />}>
        <BackgroundCircles
          title="Local roots. Modern solutions."
          description="A small Door County web studio building premium sites for the businesses we grew up around."
        />
      </Suspense>

      <div className="page">

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <Reveal>
          <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
            <p>
              Peninsula Web Services is a small web studio in <strong className="text-slate-900">Sturgeon Bay, Wisconsin</strong>.
              We build websites and tools for local businesses — restaurants, shops, services, and anyone
              trying to grow online.
            </p>
            <p>
              Our founder completed formal marketing training at <strong className="text-slate-900">NWTC</strong>,
              so every website we build is designed not just to look good, but to actually
              <strong className="text-slate-900"> bring in customers</strong>.
            </p>
            <p>
              We're local, we understand Door County, and we genuinely care about your success —
              because when your business grows, so does ours.
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div className="rounded-2xl overflow-hidden shadow-xl shadow-slate-900/5 ring-1 ring-slate-900/5">
            <TeamImage />
          </div>
        </Reveal>
      </div>

      <Reveal className="max-w-2xl mb-10">
        <span className="eyebrow">Why Work With Us</span>
        <h2 className="text-3xl font-bold">A partner who's invested in your success.</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        {values.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 80}>
            <div className="card h-full p-7 flex gap-4">
              <div className="w-11 h-11 rounded-lg bg-rose-50 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-rose-700" />
              </div>
              <div>
                <h3 className="font-bold mb-1">{title}</h3>
                <p className="text-slate-600 leading-relaxed">{text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="text-center">
          <a href="#/contact" className="btn-primary group">
            Let's Work Together
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </Reveal>
      </div>
    </div>
  );
}
