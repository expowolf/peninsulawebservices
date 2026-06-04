import { useEffect, useRef } from 'react';

/**
 * Cursor-reactive particle network.
 *  • Free-floating dots with velocity damping.
 *  • Cursor exerts a soft attraction within a falloff radius, then particles
 *    return to drift — no runaway, no gimmicky orbits.
 *  • Distance-based line connections; opacity fades with distance.
 *  • DPR-aware, pauses when off-screen, hard-cancelled on reduced-motion.
 */
export default function ParticleField({ className = '', color = '190, 18, 60' }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999, active: false };

    let particles = [];
    const config = {
      density: 18000,     // px² per particle (lower = more dots)
      maxDots: 110,
      linkDist: 130,      // CSS px before DPR
      cursorRadius: 160,  // CSS px
      cursorForce: 0.12,
      drift: 0.18,        // base random velocity
      damping: 0.95,
    };

    const resize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const want = Math.min(config.maxDots, Math.floor((w * h) / config.density));
      particles = Array.from({ length: want }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * config.drift,
        vy: (Math.random() - 0.5) * config.drift,
        r: Math.random() * 1.4 + 0.6,
      }));
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onLeave = () => { mouse.active = false; mouse.x = mouse.y = -9999; };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);

    let raf;
    let visible = true;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    io.observe(canvas);

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const w = canvas.clientWidth, h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // Update particles
      for (const p of particles) {
        if (mouse.active) {
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d2 = dx * dx + dy * dy;
          const r2 = config.cursorRadius * config.cursorRadius;
          if (d2 < r2) {
            const d = Math.sqrt(d2) || 1;
            const falloff = 1 - d / config.cursorRadius;
            // Attract toward cursor, weighted by falloff²
            p.vx += (dx / d) * config.cursorForce * falloff * falloff;
            p.vy += (dy / d) * config.cursorForce * falloff * falloff;
          }
        }
        // Add a tiny random nudge so the field stays alive without cursor
        p.vx += (Math.random() - 0.5) * 0.01;
        p.vy += (Math.random() - 0.5) * 0.01;

        p.vx *= config.damping; p.vy *= config.damping;
        p.x += p.vx; p.y += p.vy;

        // Wrap edges (feels more natural than bouncing)
        if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
      }

      // Draw links first (behind dots)
      const linkD2 = config.linkDist * config.linkDist;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkD2) {
            const alpha = (1 - d2 / linkD2) * 0.32;
            ctx.strokeStyle = `rgba(${color}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Draw dots
      for (const p of particles) {
        ctx.fillStyle = `rgba(${color}, 0.55)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [color]);

  return <canvas ref={ref} className={`absolute inset-0 w-full h-full ${className}`} aria-hidden="true" />;
}
