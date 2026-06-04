/**
 * Animated Wisconsin map with Door County highlighted.
 *
 * Animation sequence (CSS keyframes; plays on mount, so the user sees it
 * fresh each time the "Local SEO" tab is activated):
 *   0.0s  Outline draws in via stroke-dashoffset
 *   1.4s  Door County peninsula fades in with cherry fill
 *   1.9s  Major Wisconsin cities pop in (staggered)
 *   2.5s  Dashed reach-lines fan out from Sturgeon Bay
 *   3.1s  Sturgeon Bay pin drops, pulse loop begins
 *   3.5s  "Sturgeon Bay" label slides in
 *
 * Respects prefers-reduced-motion (globally collapsed in index.css).
 */

// Wisconsin outline. Clockwise from NW (Lake Superior).
const WI_PATH = `
  M 56 58
  L 88 52
  L 118 60
  L 140 50
  L 162 60
  L 180 78
  L 196 92
  L 232 100
  L 275 114
  L 296 130
  L 308 162
  L 304 196
  L 296 224
  L 286 250
  L 286 266
  L 308 266
  L 324 250
  L 328 222
  L 338 188
  L 350 155
  L 362 122
  L 372 96
  L 374 90
  L 368 112
  L 358 144
  L 348 178
  L 338 210
  L 330 238
  L 334 254
  L 338 286
  L 336 322
  L 328 354
  L 320 372
  L 76 372
  L 68 350
  L 60 318
  L 54 286
  L 58 252
  L 50 218
  L 46 184
  L 50 152
  L 42 118
  L 48 84
  Z
`;

// Door County peninsula highlight (north of the Sturgeon Bay canal).
const DOOR_COUNTY_PATH = `
  M 314 222
  L 326 200
  L 336 172
  L 346 142
  L 358 112
  L 368 92
  L 374 90
  L 372 96
  L 364 116
  L 354 148
  L 344 180
  L 334 210
  L 326 230
  Z
`;

// Approximate map positions for major WI cities (in viewBox coords)
const CITIES = [
  { name: 'Milwaukee', x: 320, y: 340 },
  { name: 'Madison', x: 200, y: 340 },
  { name: 'Green Bay', x: 292, y: 215 },
  { name: 'Eau Claire', x: 96, y: 220 },
];

// Sturgeon Bay pin coords
const STURGEON_BAY = { x: 348, y: 162 };

export default function WisconsinMap() {
  // path lengths are pre-measured estimates (~OK for the dash animation)
  const wiPathLen = 1400;
  const dcPathLen = 360;

  return (
    <div className="relative w-full max-w-sm mx-auto" aria-label="Map of Wisconsin highlighting Door County">
      <svg viewBox="0 0 400 400" className="w-full h-auto block">
        <defs>
          <linearGradient id="wi-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fafaf9" />
            <stop offset="100%" stopColor="#f3f4f6" />
          </linearGradient>
          <linearGradient id="dc-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#be123c" />
          </linearGradient>
          <filter id="pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" />
            <feOffset dx="0" dy="1" result="off" />
            <feMerge><feMergeNode in="off" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Decorative neighboring state hints (very faint) */}
        <g opacity="0.35">
          <text x="200" y="20" fontSize="9" fill="#94a3b8" textAnchor="middle" letterSpacing="2">LAKE SUPERIOR</text>
          <text x="392" y="200" fontSize="9" fill="#94a3b8" textAnchor="end" letterSpacing="2" transform="rotate(90 392 200)">LAKE MICHIGAN</text>
          <text x="14" y="200" fontSize="9" fill="#94a3b8" textAnchor="middle" letterSpacing="2" transform="rotate(-90 14 200)">MINNESOTA</text>
          <text x="200" y="395" fontSize="9" fill="#94a3b8" textAnchor="middle" letterSpacing="2">ILLINOIS</text>
        </g>

        {/* Wisconsin filled background (instant) */}
        <path d={WI_PATH} fill="url(#wi-fill)" opacity="0.7" />

        {/* Wisconsin outline — drawing-in animation */}
        <path
          d={WI_PATH}
          fill="none"
          stroke="#1e293b"
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            strokeDasharray: wiPathLen,
            strokeDashoffset: wiPathLen,
            animation: 'wi-draw 1.4s cubic-bezier(0.65, 0, 0.35, 1) 0.1s forwards',
          }}
        />

        {/* Door County fills with cherry once outline is mostly complete */}
        <path
          d={DOOR_COUNTY_PATH}
          fill="url(#dc-fill)"
          style={{ opacity: 0, animation: 'wi-fade 0.55s ease-out 1.4s forwards' }}
        />
        <path
          d={DOOR_COUNTY_PATH}
          fill="none"
          stroke="#9f1239"
          strokeWidth="1.2"
          strokeLinejoin="round"
          style={{
            strokeDasharray: dcPathLen,
            strokeDashoffset: dcPathLen,
            animation: 'wi-draw 0.6s ease-out 1.4s forwards',
          }}
        />

        {/* Reach lines from Sturgeon Bay to major cities */}
        {CITIES.map((c, i) => (
          <line
            key={`reach-${c.name}`}
            x1={STURGEON_BAY.x}
            y1={STURGEON_BAY.y}
            x2={c.x}
            y2={c.y}
            stroke="#be123c"
            strokeWidth="1"
            strokeDasharray="3 4"
            style={{ opacity: 0, animation: `wi-fade 0.5s ease-out ${2.5 + i * 0.12}s forwards` }}
          />
        ))}

        {/* City markers */}
        {CITIES.map((c, i) => (
          <g key={c.name} style={{ opacity: 0, animation: `wi-fade 0.4s ease-out ${1.9 + i * 0.12}s forwards` }}>
            <circle cx={c.x} cy={c.y} r="3.5" fill="#0f172a" stroke="#fff" strokeWidth="1.2" />
            <text
              x={c.x}
              y={c.y - 7}
              fontSize="9.5"
              textAnchor="middle"
              fill="#475569"
              fontWeight="600"
              letterSpacing="0.3"
            >
              {c.name}
            </text>
          </g>
        ))}

        {/* Sturgeon Bay pulsing rings (loop) */}
        <g style={{ opacity: 0, animation: 'wi-fade 0.4s ease-out 3.1s forwards' }}>
          <circle cx={STURGEON_BAY.x} cy={STURGEON_BAY.y} r="6" fill="none" stroke="#fbbf24" strokeWidth="1.5"
                  style={{ transformOrigin: `${STURGEON_BAY.x}px ${STURGEON_BAY.y}px`, animation: 'wi-pulse 2.4s ease-out infinite' }} />
          <circle cx={STURGEON_BAY.x} cy={STURGEON_BAY.y} r="6" fill="none" stroke="#fbbf24" strokeWidth="1.5"
                  style={{ transformOrigin: `${STURGEON_BAY.x}px ${STURGEON_BAY.y}px`, animation: 'wi-pulse 2.4s ease-out 1.2s infinite' }} />
        </g>

        {/* Sturgeon Bay pin (drops in) */}
        <g
          filter="url(#pin-shadow)"
          style={{
            opacity: 0,
            transformOrigin: `${STURGEON_BAY.x}px ${STURGEON_BAY.y}px`,
            animation: 'wi-pin-drop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) 3.0s forwards',
          }}
        >
          <circle cx={STURGEON_BAY.x} cy={STURGEON_BAY.y} r="6" fill="#fbbf24" stroke="white" strokeWidth="2.5" />
        </g>

        {/* Sturgeon Bay label — anchored upper-left of the pin so it
            stays inside the visible card area */}
        <g style={{ opacity: 0, animation: 'wi-fade 0.5s ease-out 3.5s forwards' }}>
          {/* Connector line from label corner to pin */}
          <line
            x1={STURGEON_BAY.x - 10}
            y1={STURGEON_BAY.y - 22}
            x2={STURGEON_BAY.x - 3}
            y2={STURGEON_BAY.y - 7}
            stroke="#0f172a"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <rect
            x={STURGEON_BAY.x - 100}
            y={STURGEON_BAY.y - 38}
            width="90"
            height="22"
            rx="11"
            fill="#0f172a"
          />
          <text
            x={STURGEON_BAY.x - 55}
            y={STURGEON_BAY.y - 23}
            fontSize="10"
            fontWeight="700"
            textAnchor="middle"
            fill="white"
            letterSpacing="0.2"
          >
            Sturgeon Bay
          </text>
        </g>
      </svg>
    </div>
  );
}
