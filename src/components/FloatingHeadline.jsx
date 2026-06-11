/**
 * Headline that floats in per-WORD (not per-letter). Animating ~5 words
 * instead of ~30 glyphs — and dropping the infinite per-glyph bob — removes
 * the cold-load jank entirely while keeping the weightless entrance.
 * GPU-only properties (translate3d/opacity), no filters.
 */
export default function FloatingHeadline({ lines, className = '', baseDelay = 0 }) {
  let wordIndex = 0;

  return (
    <h1 className={className} aria-label={lines.map((l) => l.text).join(' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.text.split(' ').map((word, wi) => {
            const i = wordIndex++;
            // Deterministic small offsets per word
            const s = Math.sin(i * 9301 + 49297) * 0.5 + 0.5;
            const ty = 18 + s * 22;            // 18–40px rise
            const delay = baseDelay + i * 0.09; // 90ms stagger per word
            return (
              <span key={wi} className="inline-block overflow-visible" aria-hidden="true">
                <span
                  className={`inline-block anim-word-in ${line.accent ?? ''}`}
                  style={{ '--ty': `${ty}px`, animationDelay: `${delay}s` }}
                >
                  {word}
                </span>
                {wi < line.text.split(' ').length - 1 && <span>&nbsp;</span>}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
