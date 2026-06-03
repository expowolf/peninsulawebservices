import { ArrowRight } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      {/* Decorative ghost watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -left-6 -bottom-10 font-display font-bold text-white/[0.04] whitespace-nowrap leading-none"
        style={{ fontSize: 'clamp(10rem, 22vw, 22rem)', letterSpacing: '-0.05em' }}
      >
        PENINSULA
      </span>
      <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] rounded-full bg-teal-700/30 blur-3xl" aria-hidden="true" />

      <div className="relative container-x py-24 md:py-32 text-center">
        <h2 className="font-display font-bold leading-[0.95] tracking-tight max-w-4xl mx-auto"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
          Local Roots. <span className="text-amber-300">Modern Solutions.</span>
        </h2>
        <p className="text-slate-300 text-lg mt-6 max-w-xl mx-auto">
          Let's build something that brings local customers right to your door.
        </p>
        <a
          href="#/contact"
          className="inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-full bg-white text-slate-900 font-semibold text-sm hover:bg-amber-300 transition-colors active:scale-[0.98] group"
        >
          Start Your Project
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
