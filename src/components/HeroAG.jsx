import { ArrowRight } from 'lucide-react';
import ParticleField from './ParticleField.jsx';
import FloatingHeadline from './FloatingHeadline.jsx';

/**
 * Hero composition:
 *  • ParticleField — cursor-reactive network behind everything
 *  • Soft pastel gradient accents (decor)
 *  • Ghost watermark
 *  • FloatingHeadline — per-letter anti-gravity entrance
 *  • Subtitle + dual CTAs
 */
export default function HeroAG() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-white">
      <ParticleField color="190, 18, 60" />

      <div className="pointer-events-none absolute -top-20 -left-20 w-[28rem] h-[28rem] rounded-full bg-rose-100/60 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 w-[32rem] h-[32rem] rounded-full bg-amber-100/60 blur-3xl" aria-hidden="true" />

      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute font-display font-bold text-slate-900/[0.04] whitespace-nowrap"
        style={{ fontSize: 'clamp(8rem, 22vw, 22rem)', letterSpacing: '-0.05em' }}
      >
        PENINSULA
      </span>

      <div className="relative container-x text-center px-6 pt-32 pb-20">
        <p className="text-xs uppercase tracking-[0.28em] font-semibold text-slate-500 mb-6">
          Sturgeon Bay · Door County, WI
        </p>

        <FloatingHeadline
          baseDelay={0.1}
          lines={[
            { text: 'Local Roots.', accent: 'text-slate-900' },
            { text: 'Modern Solutions.', accent: 'text-rose-700' },
          ]}
          className="font-display font-bold leading-[0.95] tracking-tight mb-8 mx-auto max-w-5xl"
        />

        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Premium websites, AI tools, and local marketing for the businesses of Door County.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full
                       bg-slate-900 text-white border-2 border-slate-900
                       hover:bg-slate-800 hover:border-slate-800 transition-all active:scale-[0.98] group"
          >
            Get a Free Quote
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full
                       bg-transparent text-slate-900 border-2 border-slate-300
                       hover:border-slate-900 transition-all active:scale-[0.98]"
          >
            See What We Do
          </a>
        </div>
      </div>
    </section>
  );
}
