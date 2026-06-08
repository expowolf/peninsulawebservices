import { useMemo } from 'react';

/**
 * Per-letter "anti-gravity" headline.
 *  • Each glyph starts at a random offset/rotation/blur and eases to rest.
 *  • Stagger by index — letters arrive one after another.
 *  • A subtle perpetual sway runs after settle (`bob` keyframe in index.css).
 *  • Two color zones (`pre` / `post`) so we can theme half the headline.
 *  • prefers-reduced-motion is handled globally — animations collapse.
 *
 * Layout: pass `lines` as an array of { text, accent? } pairs.
 */
export default function FloatingHeadline({ lines, className = '', baseDelay = 0 }) {
  // Deterministic but varied per-letter offsets (seeded from index)
  const offsets = useMemo(() => {
    const seeded = (i) => {
      const s = Math.sin(i * 9301 + 49297) * 0.5 + 0.5; // 0..1
      return s;
    };
    return Array.from({ length: 80 }, (_, i) => ({
      tx:  (seeded(i)      - 0.5) * 90,  // ±45px — shorter travel, smoother
      ty:  (seeded(i + 7)  - 0.5) * 70,  // ±35px
      rot: (seeded(i + 13) - 0.5) * 10,  // ±5deg
    }));
  }, []);

  let glyphIndex = 0;

  return (
    <h1 className={className} aria-label={lines.map((l) => l.text).join(' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {Array.from(line.text).map((ch, ci) => {
            const i = glyphIndex++;
            const o = offsets[i % offsets.length];
            // Stagger: ~40ms per glyph (tighter; whole headline lands sooner)
            const delay = baseDelay + i * 0.04;
            if (ch === ' ') return <span key={ci} className="inline-block w-[0.35em]">&nbsp;</span>;
            return (
              <span
                key={ci}
                aria-hidden="true"
                className={`inline-block anim-float-in ${line.accent ?? ''}`}
                style={{
                  '--tx': `${o.tx}px`,
                  '--ty': `${o.ty}px`,
                  '--rot': `${o.rot}deg`,
                  animationDelay: `${delay}s, ${1 + delay}s`,
                }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
