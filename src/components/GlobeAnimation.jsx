/**
 * Earth globe — North America centered so Wisconsin / Door County is in
 * clear view. Recognizable simplified continents, deep-ocean gradient,
 * subtle latitude/longitude grid, and an orbiting ring of accent dots.
 * Pin is anchored on Wisconsin's eastern shore (Door County peninsula).
 */
export default function GlobeAnimation() {
  return (
    <div className="relative w-72 h-72 md:w-80 md:h-80 mx-auto" aria-hidden="true">
      {/* Orbiting ring of accent dots */}
      <div className="absolute inset-0" style={{ animation: 'orbit 18s linear infinite' }}>
        {[0, 120, 240].map((deg) => (
          <span
            key={deg}
            className="absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full bg-amber-400 shadow"
            style={{ transform: `rotate(${deg}deg) translateX(150px) translate(-50%, -50%)` }}
          />
        ))}
      </div>

      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
        <defs>
          {/* Ocean: deep navy-blue, lit from upper-left */}
          <radialGradient id="ocean" cx="30%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="55%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </radialGradient>
          <clipPath id="sphere"><circle cx="100" cy="100" r="88" /></clipPath>
        </defs>

        {/* Ocean */}
        <circle cx="100" cy="100" r="88" fill="url(#ocean)" />

        <g clipPath="url(#sphere)">
          {/* Subtle latitude lines */}
          {[35, 60, 100, 140, 165].map((y) => (
            <path
              key={`lat-${y}`}
              d={`M 12 ${y} Q 100 ${y - (y < 100 ? 4 : -4)} 188 ${y}`}
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
              opacity="0.15"
            />
          ))}
          {/* Subtle meridians */}
          {[40, 70, 100, 130, 160].map((x) => (
            <ellipse
              key={`mer-${x}`}
              cx={x}
              cy="100"
              rx={Math.max(2, Math.abs(100 - x) * 0.85)}
              ry="88"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.5"
              opacity="0.12"
            />
          ))}

          {/* Continents — simplified but recognizable */}
          <g fill="#15803d">
            {/* Greenland */}
            <path d="M 78 30 Q 85 26 92 30 Q 96 38 92 44 Q 84 45 78 40 Z" />

            {/* North America (Alaska → Mexico) */}
            <path d="
              M 28 52
              Q 22 48 26 42
              L 36 38 L 50 36
              Q 60 35 68 40
              L 74 46
              Q 78 52 74 58
              L 72 66
              Q 76 72 74 80
              L 78 92
              Q 84 100 80 110
              Q 76 118 70 120
              L 64 126
              Q 58 130 54 126
              L 48 118
              Q 42 110 40 100
              L 36 88
              Q 32 78 30 68
              Z" />

            {/* Central America strip */}
            <path d="M 80 110 Q 84 118 88 126 L 90 134 Q 86 136 82 132 L 76 124 Z" />

            {/* South America */}
            <path d="
              M 88 134
              Q 96 138 100 148
              L 102 162
              Q 100 174 94 182
              Q 86 184 82 178
              L 78 168
              Q 76 156 80 146
              Z" />

            {/* Europe */}
            <path d="M 108 56 L 122 52 Q 128 56 126 64 L 120 70 L 112 68 Q 108 64 108 60 Z" />
            <path d="M 102 62 Q 105 62 106 66 L 104 70 L 100 68 Z" />

            {/* Africa */}
            <path d="
              M 112 80
              Q 120 76 128 78
              L 134 84
              Q 138 94 136 108
              L 130 122
              Q 124 134 118 138
              Q 112 138 110 130
              L 106 116
              Q 104 100 106 90
              Z" />

            {/* Asia (large) */}
            <path d="
              M 126 50
              L 152 46 L 170 50
              Q 180 56 178 66
              L 172 78
              Q 164 86 152 84
              L 138 78
              Q 128 70 126 60
              Z" />

            {/* India + SE Asia */}
            <path d="M 146 82 Q 152 88 150 96 L 144 102 L 140 94 Z" />
            <path d="M 158 88 Q 166 92 168 100 L 162 104 L 156 96 Z" />

            {/* Australia */}
            <path d="M 154 144 L 174 140 Q 180 146 176 154 L 162 158 Q 154 156 152 150 Z" />

            {/* Antarctica hint */}
            <path d="M 12 178 Q 100 188 188 178 L 188 192 L 12 192 Z" opacity="0.85" />
          </g>

          {/* Slight green variation for visual depth */}
          <g fill="#166534" opacity="0.5">
            <path d="M 40 76 L 56 74 L 60 84 L 50 88 Z" /> {/* central US tint */}
            <path d="M 120 100 L 130 102 L 128 116 L 118 112 Z" /> {/* central africa tint */}
            <path d="M 144 60 L 162 58 L 160 72 L 142 70 Z" /> {/* central asia tint */}
          </g>
        </g>

        {/* Soft sphere highlight (upper-left) */}
        <ellipse cx="70" cy="60" rx="34" ry="22" fill="#ffffff" opacity="0.14" />

        {/* Atmospheric rim */}
        <circle cx="100" cy="100" r="88" fill="none" stroke="#bae6fd" strokeWidth="1" opacity="0.5" />
        <circle cx="100" cy="100" r="89.5" fill="none" stroke="#0c4a6e" strokeWidth="1.5" />
      </svg>

      {/* Door County pin — Wisconsin, eastern shore on Lake Michigan */}
      <div className="absolute" style={{ left: '37.5%', top: '37%' }}>
        <span
          className="absolute -inset-1 block w-3 h-3 rounded-full bg-amber-400"
          style={{ animation: 'pulse-ring 2.4s ease-out infinite' }}
        />
        <span className="relative block w-3 h-3 rounded-full bg-amber-400 ring-2 ring-white shadow" />
        <div className="absolute left-5 -top-1 whitespace-nowrap rounded-lg bg-slate-900/90 text-white text-xs font-semibold px-2.5 py-1 shadow-lg">
          Door County, WI
        </div>
      </div>
    </div>
  );
}
