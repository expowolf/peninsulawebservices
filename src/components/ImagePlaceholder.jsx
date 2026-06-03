/**
 * Inline SVG scenes — editorial-style illustrations of Door County
 * storefronts. Zero network requests, sharp at any resolution.
 * Replace with real client photography when available.
 */

export function HeroImage() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-full" role="img" aria-label="Door County waterfront with a lighthouse at sunset">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="60%" stopColor="#fdf2f8" />
          <stop offset="100%" stopColor="#fef3e2" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <rect width="800" height="560" fill="url(#sky)" />
      <circle cx="600" cy="150" r="60" fill="#fda4af" opacity="0.55" />
      <g fill="#1e3a2f" opacity="0.35">
        <path d="M0 360 q60-40 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 V400 H0 Z" />
      </g>
      <rect y="380" width="800" height="180" fill="url(#water)" />
      <path d="M520 380 q60-20 160-10 v20 H520 Z" fill="#3f6212" />
      <g>
        <rect x="650" y="250" width="44" height="130" fill="#f8fafc" />
        <rect x="650" y="290" width="44" height="14" fill="#be123c" opacity="0.6" />
        <rect x="650" y="334" width="44" height="14" fill="#be123c" opacity="0.6" />
        <rect x="644" y="240" width="56" height="14" fill="#334155" />
        <rect x="660" y="214" width="24" height="28" fill="#1e293b" />
        <circle cx="672" cy="226" r="7" fill="#fbbf24" />
        <polygon points="660,214 684,214 672,200" fill="#334155" />
      </g>
    </svg>
  );
}

/* ---------- Restaurant: editorial storefront ---------- */
export function RestaurantImage() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" role="img" aria-label="Local restaurant storefront in Door County">
      <defs>
        <linearGradient id="r-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef3e2" />
          <stop offset="100%" stopColor="#fff7ed" />
        </linearGradient>
        <pattern id="r-brick" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
          <rect width="20" height="10" fill="#c8845c" />
          <rect width="20" height="10" fill="none" stroke="#a86b48" strokeWidth="0.6" />
          <line x1="10" y1="0" x2="10" y2="5" stroke="#a86b48" strokeWidth="0.6" />
          <line x1="0" y1="5" x2="20" y2="5" stroke="#a86b48" strokeWidth="0.6" />
          <line x1="20" y1="5" x2="0" y2="5" stroke="#a86b48" strokeWidth="0.6" />
        </pattern>
      </defs>

      <rect width="400" height="300" fill="url(#r-sky)" />

      {/* Cornice / roofline */}
      <rect x="20" y="60" width="360" height="14" fill="#7c5733" />
      <rect x="14" y="56" width="372" height="6" fill="#5b3f23" />

      {/* Brick facade */}
      <rect x="20" y="74" width="360" height="186" fill="url(#r-brick)" />

      {/* Awning — striped, scalloped */}
      <g>
        <path d="M 50 100 L 350 100 L 340 140 L 60 140 Z" fill="#be123c" />
        {[60, 110, 160, 210, 260, 310].map((x) => (
          <rect key={x} x={x} y="100" width="25" height="40" fill="#9a1037" />
        ))}
        {/* Scalloped edge */}
        <path d="M 60 140 q 12 8 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 L 340 140 Z"
              fill="#be123c" />
        {/* Sign across awning */}
        <text x="200" y="128" fontSize="16" fontWeight="800" fill="#fef3e2" textAnchor="middle"
              letterSpacing="2" fontFamily="Georgia, serif">CHERRY'S CAFÉ</text>
      </g>

      {/* Hanging sign on bracket */}
      <g>
        <line x1="40" y1="80" x2="40" y2="170" stroke="#4a3520" strokeWidth="2" />
        <line x1="40" y1="100" x2="60" y2="100" stroke="#4a3520" strokeWidth="2" />
        <circle cx="40" cy="80" r="3" fill="#4a3520" />
        <rect x="20" y="155" width="40" height="28" rx="3" fill="#fef3e2" stroke="#4a3520" strokeWidth="2" />
        <text x="40" y="174" fontSize="9" fontWeight="700" fill="#4a3520" textAnchor="middle">OPEN</text>
      </g>

      {/* Storefront windows (large, mullioned) */}
      <g>
        {/* Left window */}
        <rect x="70" y="155" width="100" height="80" fill="#bae6fd" stroke="#7c5733" strokeWidth="3" />
        <line x1="120" y1="155" x2="120" y2="235" stroke="#7c5733" strokeWidth="2" />
        <line x1="70" y1="195" x2="170" y2="195" stroke="#7c5733" strokeWidth="2" />
        <rect x="74" y="159" width="92" height="22" fill="#7dd3fc" opacity="0.5" />
        {/* Right window */}
        <rect x="230" y="155" width="100" height="80" fill="#bae6fd" stroke="#7c5733" strokeWidth="3" />
        <line x1="280" y1="155" x2="280" y2="235" stroke="#7c5733" strokeWidth="2" />
        <line x1="230" y1="195" x2="330" y2="195" stroke="#7c5733" strokeWidth="2" />
        <rect x="234" y="159" width="92" height="22" fill="#7dd3fc" opacity="0.5" />
      </g>

      {/* Door (centered) */}
      <g>
        <rect x="185" y="155" width="30" height="105" fill="#3d2817" />
        <rect x="190" y="165" width="20" height="22" fill="#bae6fd" stroke="#3d2817" strokeWidth="1" />
        <circle cx="208" cy="210" r="1.6" fill="#fbbf24" />
        {/* Welcome mat */}
        <rect x="180" y="260" width="40" height="6" fill="#7c2d12" />
      </g>

      {/* Planters with flowers */}
      <g>
        <rect x="74" y="240" width="46" height="14" fill="#5b3f23" />
        <circle cx="82" cy="237" r="4" fill="#be123c" />
        <circle cx="92" cy="234" r="4" fill="#f97316" />
        <circle cx="102" cy="237" r="4" fill="#be123c" />
        <circle cx="112" cy="234" r="4" fill="#fbbf24" />
        <rect x="234" y="240" width="46" height="14" fill="#5b3f23" />
        <circle cx="242" cy="237" r="4" fill="#fbbf24" />
        <circle cx="252" cy="234" r="4" fill="#be123c" />
        <circle cx="262" cy="237" r="4" fill="#f97316" />
        <circle cx="272" cy="234" r="4" fill="#be123c" />
      </g>

      {/* Sidewalk + curb */}
      <rect y="260" width="400" height="40" fill="#cbd5e1" />
      <rect y="260" width="400" height="3" fill="#94a3b8" />
      <line x1="0" y1="284" x2="400" y2="284" stroke="#94a3b8" strokeWidth="1" />

      {/* Chalkboard sign on sidewalk */}
      <g>
        <rect x="320" y="240" width="36" height="26" rx="2" fill="#1e293b" stroke="#7c5733" strokeWidth="2" />
        <text x="338" y="252" fontSize="6" fontWeight="700" fill="#fef3e2" textAnchor="middle">TODAY'S</text>
        <text x="338" y="260" fontSize="6" fontWeight="700" fill="#fef3e2" textAnchor="middle">SPECIAL</text>
      </g>
    </svg>
  );
}

/* ---------- Shop: editorial boutique storefront ---------- */
export function ShopImage() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" role="img" aria-label="Local boutique shop storefront in Door County">
      <defs>
        <linearGradient id="s-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdf2f8" />
          <stop offset="100%" stopColor="#fef3e2" />
        </linearGradient>
        <pattern id="s-clapboard" x="0" y="0" width="40" height="14" patternUnits="userSpaceOnUse">
          <rect width="40" height="14" fill="#e7d3a8" />
          <line x1="0" y1="13.5" x2="40" y2="13.5" stroke="#b8985f" strokeWidth="0.8" />
        </pattern>
      </defs>

      <rect width="400" height="300" fill="url(#s-sky)" />

      {/* Pitched gable roof */}
      <polygon points="20,90 200,30 380,90" fill="#5b3f23" />
      <polygon points="30,90 200,40 370,90" fill="#7c5733" />
      <rect x="190" y="48" width="20" height="44" fill="#fde68a" />

      {/* Clapboard facade */}
      <rect x="30" y="90" width="340" height="170" fill="url(#s-clapboard)" />

      {/* Trim */}
      <rect x="30" y="90" width="340" height="6" fill="#fef3e2" />
      <rect x="30" y="254" width="340" height="6" fill="#fef3e2" />

      {/* Striped awning */}
      <g>
        <path d="M 50 120 L 350 120 L 345 150 L 55 150 Z" fill="#fef3e2" />
        {[55, 90, 125, 160, 195, 230, 265, 300].map((x) => (
          <rect key={x} x={x} y="120" width="17" height="30" fill="#be123c" />
        ))}
        <path d="M 55 150 q 8 6 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 t 16 0 L 345 150 Z"
              fill="#be123c" opacity="0.85" />
      </g>

      {/* Shop sign mounted above awning */}
      <rect x="120" y="98" width="160" height="22" fill="#fef3e2" stroke="#7c5733" strokeWidth="2" rx="2" />
      <text x="200" y="114" fontSize="13" fontWeight="700" fill="#7c2d12" textAnchor="middle"
            letterSpacing="3" fontFamily="Georgia, serif">PENINSULA GOODS</text>

      {/* Big bay storefront windows with mullions */}
      <g>
        {/* Left display window */}
        <rect x="60" y="160" width="120" height="95" fill="#bae6fd" stroke="#7c5733" strokeWidth="3" />
        <line x1="120" y1="160" x2="120" y2="255" stroke="#7c5733" strokeWidth="2" />
        <line x1="60" y1="200" x2="180" y2="200" stroke="#7c5733" strokeWidth="2" />
        {/* Sale tag in window */}
        <rect x="70" y="210" width="34" height="20" fill="#fef3e2" stroke="#be123c" strokeWidth="2" rx="2" />
        <text x="87" y="223" fontSize="9" fontWeight="800" fill="#be123c" textAnchor="middle">SALE</text>
        <rect x="135" y="210" width="34" height="20" fill="#fef3e2" stroke="#7c5733" strokeWidth="1.5" rx="2" />
        <text x="152" y="223" fontSize="7" fontWeight="700" fill="#7c2d12" textAnchor="middle">NEW</text>

        {/* Right display window */}
        <rect x="220" y="160" width="120" height="95" fill="#bae6fd" stroke="#7c5733" strokeWidth="3" />
        <line x1="280" y1="160" x2="280" y2="255" stroke="#7c5733" strokeWidth="2" />
        <line x1="220" y1="200" x2="340" y2="200" stroke="#7c5733" strokeWidth="2" />
        {/* Mannequin silhouette */}
        <circle cx="248" cy="218" r="5" fill="#fbbf24" />
        <path d="M 240 224 q 8 14 16 0 L 246 250 L 250 250 Z" fill="#fbbf24" />
        {/* Display item */}
        <rect x="295" y="220" width="22" height="30" fill="#be123c" />
        <rect x="297" y="218" width="18" height="6" fill="#9a1037" />
      </g>

      {/* Bench */}
      <g>
        <rect x="186" y="222" width="32" height="34" fill="#3d2817" />
        <rect x="186" y="222" width="32" height="4" fill="#5b3f23" />
        <rect x="190" y="256" width="3" height="6" fill="#1e293b" />
        <rect x="211" y="256" width="3" height="6" fill="#1e293b" />
      </g>

      {/* String lights along awning */}
      <g opacity="0.9">
        <path d="M 50 92 q 50 8 100 0 t 100 0 t 100 0" fill="none" stroke="#7c5733" strokeWidth="0.6" />
        {[80, 130, 180, 230, 280, 330].map((x, i) => (
          <circle key={x} cx={x} cy={94 + (i % 2) * 2} r="2" fill="#fde68a" />
        ))}
      </g>

      {/* Sidewalk */}
      <rect y="260" width="400" height="40" fill="#cbd5e1" />
      <rect y="260" width="400" height="3" fill="#94a3b8" />
      <line x1="0" y1="284" x2="400" y2="284" stroke="#94a3b8" strokeWidth="1" />
    </svg>
  );
}

/* ---------- Team / studio scene ---------- */
export function TeamImage() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Web designer working at a desk">
      <rect width="400" height="400" fill="#fdf2f8" />
      <rect x="60" y="300" width="280" height="100" fill="#c8a97e" />
      <rect x="60" y="290" width="280" height="14" fill="#a8855f" />
      <rect x="150" y="200" width="120" height="80" rx="6" fill="#1e293b" />
      <rect x="158" y="208" width="104" height="64" rx="3" fill="#be123c" />
      <rect x="166" y="216" width="50" height="6" rx="3" fill="#fef3e2" />
      <rect x="166" y="228" width="80" height="6" rx="3" fill="#fda4af" opacity="0.7" />
      <rect x="166" y="240" width="60" height="6" rx="3" fill="#fda4af" opacity="0.5" />
      <rect x="200" y="280" width="20" height="16" fill="#475569" />
      <rect x="180" y="294" width="60" height="6" rx="3" fill="#334155" />
      <circle cx="300" cy="180" r="34" fill="#e0ac8b" />
      <path d="M266 178 a34 34 0 0 1 68 0 q-34-22-68 0Z" fill="#3f2d23" />
      <path d="M252 300 q48-70 96 0 Z" fill="#be123c" />
      <rect x="90" y="250" width="30" height="40" rx="3" fill="#7c2d12" />
      <path d="M105 250 q-20-30 0-50 q20 20 0 50" fill="#16a34a" />
      <path d="M105 250 q-30-10 -34-36 q26 6 34 36" fill="#22c55e" />
    </svg>
  );
}
