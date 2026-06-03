/**
 * Lightweight inline SVG scenes. Zero network requests, scale crisply,
 * and stay on-brand. Swap any of these for real photography later.
 */

export function HeroImage() {
  return (
    <svg viewBox="0 0 800 560" className="w-full h-full" role="img" aria-label="Door County waterfront with a lighthouse at sunset">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="60%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#fef3e2" />
        </linearGradient>
        <linearGradient id="water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      <rect width="800" height="560" fill="url(#sky)" />
      <circle cx="600" cy="150" r="60" fill="#fde68a" opacity="0.7" />

      {/* Distant treeline */}
      <g fill="#1e3a2f" opacity="0.35">
        <path d="M0 360 q60-40 120 0 t120 0 t120 0 t120 0 t120 0 t120 0 V400 H0 Z" />
      </g>

      {/* Water */}
      <rect y="380" width="800" height="180" fill="url(#water)" />
      <g stroke="#93c5fd" strokeWidth="3" opacity="0.6" fill="none">
        <path d="M40 430 q40-10 80 0" />
        <path d="M260 470 q40-10 80 0" />
        <path d="M540 440 q40-10 80 0" />
      </g>

      {/* Headland */}
      <path d="M520 380 q60-20 160-10 v20 H520 Z" fill="#3f6212" />
      <path d="M520 380 q60-20 160-10 l0 6 q-90-8-160 8 Z" fill="#4d7c0f" />

      {/* Lighthouse */}
      <g>
        <rect x="650" y="250" width="44" height="130" fill="#f8fafc" />
        <rect x="650" y="250" width="44" height="130" fill="#ef4444" opacity="0.15" />
        <rect x="650" y="290" width="44" height="14" fill="#ef4444" opacity="0.5" />
        <rect x="650" y="334" width="44" height="14" fill="#ef4444" opacity="0.5" />
        <rect x="644" y="240" width="56" height="14" fill="#334155" />
        <rect x="660" y="214" width="24" height="28" fill="#1e293b" />
        <circle cx="672" cy="226" r="7" fill="#fbbf24" />
        <polygon points="660,214 684,214 672,200" fill="#334155" />
      </g>

      {/* Foreground pines */}
      <g fill="#14532d">
        <polygon points="90,420 50,300 130,300" />
        <polygon points="90,360 56,250 124,250" />
        <rect x="84" y="420" width="12" height="30" fill="#422006" />
        <polygon points="200,440 168,340 232,340" />
        <polygon points="200,390 172,300 228,300" />
        <rect x="194" y="440" width="12" height="28" fill="#422006" />
      </g>

      {/* Sailboat */}
      <g>
        <path d="M360 410 h40 l-8 16 h-24 Z" fill="#475569" />
        <polygon points="380,408 380,350 410,400" fill="#f8fafc" />
        <line x1="380" y1="408" x2="380" y2="348" stroke="#334155" strokeWidth="2" />
      </g>
    </svg>
  );
}

export function RestaurantImage() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" role="img" aria-label="Local restaurant storefront">
      <rect width="400" height="300" fill="#fff7ed" />
      <rect x="50" y="90" width="300" height="160" fill="#e7c9a0" />
      <polygon points="40,90 200,30 360,90" fill="#9a6f44" />
      <rect x="40" y="84" width="320" height="10" fill="#7c5733" />
      <rect x="170" y="170" width="60" height="80" fill="#5b3a1a" />
      <circle cx="222" cy="210" r="3" fill="#fbbf24" />
      {[70, 130, 250, 310].map((x) => (
        <g key={x}>
          <rect x={x} y="110" width="40" height="40" fill="#bae6fd" />
          <rect x={x} y="110" width="40" height="40" fill="none" stroke="#7c5733" strokeWidth="3" />
        </g>
      ))}
      <rect x="150" y="55" width="100" height="22" rx="3" fill="#9a3412" />
      <text x="200" y="71" fontSize="13" fontWeight="700" fill="#fff" textAnchor="middle">CAFÉ</text>
      <rect y="250" width="400" height="50" fill="#a8a29e" />
    </svg>
  );
}

export function ShopImage() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full" role="img" aria-label="Local retail shop storefront">
      <rect width="400" height="300" fill="#f5f3ff" />
      <rect x="40" y="95" width="320" height="155" fill="#d9c5a8" />
      <polygon points="40,95 200,38 360,95" fill="#8d7355" />
      <g>
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={50 + i * 30} y="95" width="30" height="22"
            fill={i % 2 ? '#0e7490' : '#f8fafc'} />
        ))}
      </g>
      <rect x="170" y="165" width="60" height="85" fill="#44403c" />
      {[60, 280].map((x) => (
        <rect key={x} x={x} y="130" width="60" height="55" fill="#fefce8" stroke="#8d7355" strokeWidth="3" />
      ))}
      <rect x="150" y="62" width="100" height="22" rx="3" fill="#0e7490" />
      <text x="200" y="78" fontSize="12" fontWeight="700" fill="#fff" textAnchor="middle">SHOP</text>
      <rect y="250" width="400" height="50" fill="#a8a29e" />
    </svg>
  );
}

export function TeamImage() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full" role="img" aria-label="Web designer working at a desk">
      <rect width="400" height="400" fill="#eff6ff" />
      <rect x="60" y="300" width="280" height="100" fill="#c8a97e" />
      <rect x="60" y="290" width="280" height="14" fill="#a8855f" />
      {/* Monitor */}
      <rect x="150" y="200" width="120" height="80" rx="6" fill="#1e293b" />
      <rect x="158" y="208" width="104" height="64" rx="3" fill="#3b82f6" />
      <rect x="166" y="216" width="50" height="6" rx="3" fill="#bfdbfe" />
      <rect x="166" y="228" width="80" height="6" rx="3" fill="#93c5fd" opacity="0.7" />
      <rect x="166" y="240" width="60" height="6" rx="3" fill="#93c5fd" opacity="0.5" />
      <rect x="200" y="280" width="20" height="16" fill="#475569" />
      <rect x="180" y="294" width="60" height="6" rx="3" fill="#334155" />
      {/* Person */}
      <circle cx="300" cy="180" r="34" fill="#e0ac8b" />
      <path d="M266 178 a34 34 0 0 1 68 0 q-34-22-68 0Z" fill="#3f2d23" />
      <path d="M252 300 q48-70 96 0 Z" fill="#1d4ed8" />
      {/* Plant */}
      <rect x="90" y="250" width="30" height="40" rx="3" fill="#9a3412" />
      <path d="M105 250 q-20-30 0-50 q20 20 0 50" fill="#16a34a" />
      <path d="M105 250 q-30-10 -34-36 q26 6 34 36" fill="#22c55e" />
    </svg>
  );
}
