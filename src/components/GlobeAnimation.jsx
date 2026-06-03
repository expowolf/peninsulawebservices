/**
 * A slowly spinning globe with a pulsing pin on Door County, WI and
 * orbiting "connection" dots — signaling local reach with modern web tech.
 * Pure SVG + CSS. Honors prefers-reduced-motion.
 */
export default function GlobeAnimation() {
  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto" aria-hidden="true">
      {/* Orbiting ring of connection dots */}
      <div className="absolute inset-0" style={{ animation: 'orbit 18s linear infinite' }}>
        {[0, 120, 240].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow"
            style={{ transform: `rotate(${deg}deg) translateX(150px) translate(-50%, -50%)` }}
          />
        ))}
      </div>

      {/* Globe */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="ocean" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="55%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#0f766e" />
          </radialGradient>
          <clipPath id="sphere"><circle cx="100" cy="100" r="88" /></clipPath>
        </defs>

        <circle cx="100" cy="100" r="88" fill="url(#ocean)" />

        {/* Spinning surface: meridians, latitudes, and continents */}
        <g clipPath="url(#sphere)">
          <g style={{ animation: 'globe-spin 12s linear infinite' }}>
            {/* duplicate band so the scroll loops seamlessly */}
            {[0, 200].map((ox) => (
              <g key={ox} transform={`translate(${ox},0)`}>
                {/* meridians */}
                {[20, 60, 100, 140, 180].map((x) => (
                  <ellipse key={x} cx={x} cy="100" rx="14" ry="88" fill="none" stroke="#ccfbf1" strokeWidth="0.8" opacity="0.35" />
                ))}
                {/* land masses */}
                <path d="M30 70 q20-14 40-6 q14 6 8 22 q-10 18-34 12 q-22-6-14-28Z" fill="#0d9488" opacity="0.85" />
                <path d="M120 60 q24-6 30 12 q4 16-14 20 q-20 4-24-12 q-4-16 8-20Z" fill="#0d9488" opacity="0.85" />
                <path d="M70 130 q18-10 30 4 q8 12-6 22 q-18 10-30-4 q-8-14 6-22Z" fill="#0d9488" opacity="0.8" />
              </g>
            ))}
          </g>

          {/* latitude lines (static) */}
          {[40, 70, 100, 130, 160].map((y) => (
            <line key={y} x1="12" y1={y} x2="188" y2={y} stroke="#ccfbf1" strokeWidth="0.6" opacity="0.25" />
          ))}
        </g>

        {/* Sphere highlight + rim */}
        <circle cx="100" cy="100" r="88" fill="none" stroke="#0f766e" strokeWidth="2" />
        <ellipse cx="74" cy="68" rx="34" ry="22" fill="#ffffff" opacity="0.12" />
      </svg>

      {/* Door County pin (fixed on the front of the globe) */}
      <div className="absolute" style={{ left: '58%', top: '40%' }}>
        <span className="absolute -inset-1 block w-3 h-3 rounded-full bg-amber-400" style={{ animation: 'pulse-ring 2.4s ease-out infinite' }} />
        <span className="relative block w-3 h-3 rounded-full bg-amber-400 ring-2 ring-white shadow" />
        <div className="absolute left-5 -top-1 whitespace-nowrap rounded-lg bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1 shadow-lg">
          Door County, WI
        </div>
      </div>
    </div>
  );
}
