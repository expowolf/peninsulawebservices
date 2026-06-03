import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Antigravity-style hero: full-viewport, oversized centered headline,
 * dual CTAs, ghost watermark behind, animated particle field.
 * Canvas is paused under prefers-reduced-motion.
 */
export default function HeroAG() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let particles = [];
    let raf;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      const n = Math.min(80, Math.floor((canvas.clientWidth * canvas.clientHeight) / 16000));
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25 * dpr,
        vy: (Math.random() - 0.5) * 0.25 * dpr,
        r: (Math.random() * 1.4 + 0.4) * dpr,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 118, 110, 0.45)';
        ctx.fill();
      }
      // soft connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 110 * dpr) {
            ctx.strokeStyle = `rgba(15, 118, 110, ${0.18 * (1 - d / (110 * dpr))})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    if (!reduce) draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-white">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Soft pastel gradient accents (antigravity-style decor) */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-[28rem] h-[28rem] rounded-full bg-teal-100/60 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 w-[32rem] h-[32rem] rounded-full bg-amber-100/60 blur-3xl" aria-hidden="true" />

      {/* Ghost watermark */}
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
        <h1
          className="font-display font-bold text-slate-900 leading-[0.95] tracking-tight mb-8 mx-auto max-w-5xl"
          style={{ fontSize: 'clamp(2.75rem, 8vw, 6.5rem)' }}
        >
          Local Roots.<br />
          <span className="text-teal-700">Modern Solutions.</span>
        </h1>
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
