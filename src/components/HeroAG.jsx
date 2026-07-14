import { lazy, Suspense } from 'react';
import { ArrowRight } from 'lucide-react';
import FloatingHeadline from './FloatingHeadline.jsx';

// three.js + shader is heavy; load it lazily so the rest of the page
// can render and become interactive without waiting.
const ShaderCanvas = lazy(() => import('./ShaderCanvas.jsx'));

/**
 * Hero with a WebGL fragment-shader background tinted to the brand palette,
 * the per-letter "anti-gravity" headline, an "Available" status pill, and
 * the existing dual CTAs.
 */
export default function HeroAG() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-black isolate">
      {/* Shader background */}
      <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-br from-rose-950 via-black to-amber-950" />}>
        <ShaderCanvas />
      </Suspense>

      {/* Soft top/bottom darkening so text contrast stays comfortable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" aria-hidden="true" />

      {/* Ghost watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute font-display font-bold text-white/[0.04] whitespace-nowrap"
        style={{ fontSize: 'clamp(8rem, 22vw, 22rem)', letterSpacing: '-0.05em' }}
      >
        PENINSULA
      </span>

      <div className="relative container-x text-center px-6 pt-32 pb-20 z-10">
        <p className="text-xs uppercase tracking-[0.28em] font-semibold text-white/60 mb-6">
          Web Design · Development · AI
        </p>

        <FloatingHeadline
          baseDelay={0.1}
          lines={[
            { text: 'Websites that', accent: 'text-white' },
            { text: 'mean business.', accent: 'text-rose-400' },
          ]}
          className="font-display font-bold leading-[0.95] tracking-tight mb-8 mx-auto max-w-5xl text-white"
        />

        <p className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto mb-8 leading-relaxed">
          We design, build, and optimize high-performance websites and AI tools that turn visitors into customers.
        </p>

        {/* "Available" status pill */}
        <div className="inline-flex items-center gap-2 mb-10 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-semibold text-emerald-300 tracking-wide">Available for new projects</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#/contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full
                       bg-white text-slate-900 border-2 border-white
                       hover:bg-rose-100 hover:border-rose-100 transition-all active:scale-[0.98] group"
          >
            Get a Free Quote
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#products"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full
                       bg-transparent text-white border-2 border-white/30
                       hover:border-white transition-all active:scale-[0.98]"
          >
            See What We Do
          </a>
        </div>
      </div>
    </section>
  );
}
