import { useMemo } from 'react';

/**
 * Editorial-style Wisconsin map.
 *
 *  • Real lat/lon coordinates for every vertex (~80 points around the state
 *    border, plus a separate trace of the Door County peninsula). Projected
 *    on-the-fly via a simple equirectangular projection sized to a square
 *    viewBox so the rendered shape is properly proportional.
 *  • Catmull-Rom → cubic-bezier smoothing produces soft natural coastlines
 *    instead of jagged polylines (especially noticeable on the Lake Michigan
 *    coast and the Mississippi River border).
 *  • Single accent (cherry) on Door County, monochrome elsewhere. Inline
 *    label inside the peninsula. Pinned Sturgeon Bay marker with a refined
 *    callout. No cheap reach-lines.
 *  • Subtle staggered fade-ins; no bouncing, no spinning.
 */

// ----- Real geography ---------------------------------------------------

const WI = [
  // NW Lake Superior coast (Superior, WI → eastern shore)
  [-92.07, 46.72], [-91.78, 46.69], [-91.55, 46.59], [-91.20, 46.72],
  [-91.02, 46.79], [-90.96, 46.66],
  // Bayfield Peninsula bump
  [-90.92, 46.77], [-90.86, 46.85], [-90.81, 46.86], [-90.74, 46.83],
  [-90.68, 46.85], [-90.55, 46.78], [-90.62, 46.66],
  // Continue Superior coast east
  [-90.42, 46.69], [-90.30, 46.58], [-90.21, 46.52], [-90.08, 46.40],
  // Wisconsin–Michigan UP border (going ESE through the Northwoods)
  [-89.84, 46.32], [-89.60, 46.27], [-89.30, 46.18], [-89.04, 46.06],
  [-88.74, 45.93], [-88.39, 45.83], [-88.05, 45.72], [-87.85, 45.55],
  [-87.69, 45.31], [-87.62, 45.10],
  // West shore of Green Bay → south
  [-87.79, 44.98], [-87.93, 44.83], [-88.00, 44.65], [-88.02, 44.52],
  // Around the south end of Green Bay
  [-87.94, 44.42], [-87.80, 44.39], [-87.65, 44.44],
  // Door Peninsula — WEST side going N
  [-87.55, 44.55], [-87.45, 44.71], [-87.38, 44.85], [-87.27, 45.00],
  [-87.12, 45.15], [-87.00, 45.26], [-86.93, 45.35],
  // Northern tip (Northport)
  [-86.91, 45.41],
  // Door Peninsula — EAST side (Lake Michigan) coming S
  [-86.95, 45.30], [-87.02, 45.16], [-87.10, 45.02], [-87.20, 44.86],
  [-87.30, 44.69], [-87.40, 44.50],
  // Lake Michigan mainland coast → south
  [-87.49, 44.30], [-87.58, 44.10], [-87.66, 43.92], [-87.72, 43.75],
  [-87.78, 43.55], [-87.86, 43.32], [-87.91, 43.05], [-87.83, 42.85],
  [-87.81, 42.73], [-87.82, 42.55], [-87.80, 42.495],
  // Straight southern border to SW corner
  [-90.64, 42.495],
  // Mississippi River — jagged border up to St. Croix junction
  [-90.84, 42.66], [-90.96, 42.85], [-91.06, 43.04], [-91.13, 43.18],
  [-91.18, 43.40], [-91.22, 43.55], [-91.27, 43.78], [-91.36, 43.97],
  [-91.43, 44.05], [-91.56, 44.10], [-91.69, 44.15], [-91.83, 44.20],
  [-91.95, 44.27], [-92.09, 44.40], [-92.22, 44.50], [-92.34, 44.55],
  [-92.46, 44.62], [-92.56, 44.73], [-92.66, 44.83], [-92.74, 44.93],
  // St. Croix River → north
  [-92.79, 45.07], [-92.84, 45.23], [-92.86, 45.42], [-92.87, 45.58],
  [-92.87, 45.82], [-92.80, 46.02],
  // Back across to NW corner via St. Louis River
  [-92.61, 46.22], [-92.42, 46.42], [-92.25, 46.55], [-92.07, 46.72],
];

// Door County (the peninsula only, closed polygon).
// This list shares vertices with WI for the peninsula sections so the
// highlight sits perfectly over the state border.
const DOOR_COUNTY = [
  [-87.65, 44.44],
  [-87.55, 44.55], [-87.45, 44.71], [-87.38, 44.85], [-87.27, 45.00],
  [-87.12, 45.15], [-87.00, 45.26], [-86.93, 45.35],
  [-86.91, 45.41],
  [-86.95, 45.30], [-87.02, 45.16], [-87.10, 45.02], [-87.20, 44.86],
  [-87.30, 44.69], [-87.40, 44.50],
];

const CITIES = [
  { name: 'Eau Claire', lon: -91.50, lat: 44.81 },
  { name: 'Madison',    lon: -89.40, lat: 43.07 },
  { name: 'Milwaukee',  lon: -87.91, lat: 43.04 },
];

const STURGEON_BAY = { lon: -87.38, lat: 44.83 };

// ----- Projection -------------------------------------------------------
// Equirectangular at the centroid latitude. Wisconsin is roughly square in
// real-world km, so a square viewBox preserves proportion well.

const LON_MIN = -93.0, LON_MAX = -86.4;
const LAT_MIN = 42.40, LAT_MAX = 47.15;
const SIZE = 1000;
const PAD = 60;
const W = SIZE - PAD * 2;

const project = ([lon, lat]) => [
  ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W + PAD,
  ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * W + PAD,
];

// ----- Catmull-Rom → cubic bezier smoothing -----------------------------
// Produces an SVG path that smoothly interpolates the input points.

function smoothPath(points, closed = true) {
  if (points.length < 2) return '';
  const pts = points.map(project);
  const get = (i) => pts[((i % pts.length) + pts.length) % pts.length];
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;
  const last = closed ? pts.length : pts.length - 1;
  for (let i = 0; i < last; i++) {
    const p0 = get(i - 1), p1 = get(i), p2 = get(i + 1), p3 = get(i + 2);
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  if (closed) d += ' Z';
  return d;
}

// ----- Component --------------------------------------------------------

export default function WisconsinMap() {
  const wiPath = useMemo(() => smoothPath(WI, true), []);
  const dcPath = useMemo(() => smoothPath(DOOR_COUNTY, true), []);
  const sturgeonPx = useMemo(() => project([STURGEON_BAY.lon, STURGEON_BAY.lat]), []);
  const cityPx = useMemo(() => CITIES.map((c) => ({ ...c, p: project([c.lon, c.lat]) })), []);

  // Door County label anchor (inland on the peninsula, above Sturgeon Bay)
  const dcLabel = useMemo(() => project([-87.05, 45.18]), []);

  // Approximate path lengths for the stroke-draw animation
  const wiLen = 4800;
  const dcLen = 1200;

  return (
    <figure
      className="relative w-full max-w-md mx-auto"
      aria-label="Map of Wisconsin highlighting Door County"
    >
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full h-auto block"
        role="img"
      >
        <defs>
          <linearGradient id="wi-paper" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#fbf7ee" />
            <stop offset="100%" stopColor="#f4ecd8" />
          </linearGradient>
          <linearGradient id="dc-fill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"  stopColor="#e11d48" />
            <stop offset="100%" stopColor="#9f1239" />
          </linearGradient>
          <filter id="dc-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="2" />
            <feComponentTransfer><feFuncA type="linear" slope="0.35" /></feComponentTransfer>
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Parchment background ring (subtle) */}
        <rect width={SIZE} height={SIZE} fill="#fbf7ee" />

        {/* Subtle compass tick marks at corners */}
        <g stroke="#cbb98a" strokeWidth="1" opacity="0.55">
          <path d="M 30 60 L 30 30 L 60 30" fill="none" />
          <path d={`M ${SIZE - 60} 30 L ${SIZE - 30} 30 L ${SIZE - 30} 60`} fill="none" />
          <path d={`M 30 ${SIZE - 60} L 30 ${SIZE - 30} L 60 ${SIZE - 30}`} fill="none" />
          <path d={`M ${SIZE - 60} ${SIZE - 30} L ${SIZE - 30} ${SIZE - 30} L ${SIZE - 30} ${SIZE - 60}`} fill="none" />
        </g>

        {/* Faint orientation marks */}
        <g fontFamily="ui-serif, Georgia, serif" fill="#a8966a" fontSize="13" letterSpacing="6">
          <text x={SIZE / 2} y="42" textAnchor="middle">N</text>
          <text x={SIZE / 2} y={SIZE - 16} textAnchor="middle">S</text>
          <text x="20" y={SIZE / 2 + 5} textAnchor="middle">W</text>
          <text x={SIZE - 20} y={SIZE / 2 + 5} textAnchor="middle">E</text>
        </g>

        {/* Wisconsin land fill (subtle paper tone) */}
        <path d={wiPath} fill="url(#wi-paper)" />

        {/* Subtle inner grain — repeated very thin lines giving paper texture */}
        <path d={wiPath} fill="none" stroke="#000" strokeOpacity="0.025" strokeWidth="6" />

        {/* Wisconsin outline — drawn-in via stroke-dashoffset */}
        <path
          d={wiPath}
          fill="none"
          stroke="#1c1917"
          strokeWidth="1.8"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{
            strokeDasharray: wiLen,
            strokeDashoffset: wiLen,
            animation: 'wi-draw 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.15s forwards',
          }}
        />

        {/* Door County: filled cherry gradient with soft shadow */}
        <g style={{ opacity: 0, animation: 'wi-fade 0.7s ease-out 1.6s forwards' }}>
          <path d={dcPath} fill="url(#dc-fill)" filter="url(#dc-shadow)" />
          <path
            d={dcPath}
            fill="none"
            stroke="#881337"
            strokeWidth="1.4"
            strokeLinejoin="round"
            style={{
              strokeDasharray: dcLen,
              strokeDashoffset: dcLen,
              animation: 'wi-draw 0.8s ease-out 1.6s forwards',
            }}
          />
        </g>

        {/* City markers — minimalist */}
        {cityPx.map(({ name, p }, i) => (
          <g
            key={name}
            style={{ opacity: 0, animation: `wi-fade 0.4s ease-out ${2.4 + i * 0.1}s forwards` }}
          >
            <circle cx={p[0]} cy={p[1]} r="4" fill="#1c1917" />
            <circle cx={p[0]} cy={p[1]} r="9" fill="none" stroke="#1c1917" strokeOpacity="0.18" strokeWidth="1" />
            <text
              x={p[0]}
              y={p[1] + 22}
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              fontSize="14"
              fontWeight="500"
              fill="#44403c"
              letterSpacing="0.4"
            >
              {name}
            </text>
          </g>
        ))}

        {/* Sturgeon Bay pin — refined */}
        <g style={{ opacity: 0, animation: 'wi-fade 0.5s ease-out 3.0s forwards' }}>
          {/* Pulse rings */}
          <circle
            cx={sturgeonPx[0]}
            cy={sturgeonPx[1]}
            r="12"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            style={{ transformOrigin: `${sturgeonPx[0]}px ${sturgeonPx[1]}px`, animation: 'wi-pulse 2.6s ease-out infinite' }}
          />
          <circle
            cx={sturgeonPx[0]}
            cy={sturgeonPx[1]}
            r="12"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="2"
            style={{ transformOrigin: `${sturgeonPx[0]}px ${sturgeonPx[1]}px`, animation: 'wi-pulse 2.6s ease-out 1.3s infinite' }}
          />
          {/* Pin: amber filled circle inside a white halo */}
          <circle cx={sturgeonPx[0]} cy={sturgeonPx[1]} r="9" fill="white" />
          <circle cx={sturgeonPx[0]} cy={sturgeonPx[1]} r="6" fill="#f59e0b" />
        </g>

        {/* "Sturgeon Bay" callout, anchored bottom-left of the pin */}
        <g style={{ opacity: 0, animation: 'wi-fade 0.5s ease-out 3.3s forwards' }}>
          <line
            x1={sturgeonPx[0] - 6}
            y1={sturgeonPx[1] + 6}
            x2={sturgeonPx[0] - 60}
            y2={sturgeonPx[1] + 50}
            stroke="#1c1917"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <text
            x={sturgeonPx[0] - 64}
            y={sturgeonPx[1] + 56}
            textAnchor="end"
            fontFamily="ui-serif, Georgia, serif"
            fontSize="18"
            fontWeight="600"
            fill="#1c1917"
            letterSpacing="0.5"
          >
            Sturgeon Bay
          </text>
          <text
            x={sturgeonPx[0] - 64}
            y={sturgeonPx[1] + 74}
            textAnchor="end"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            fontSize="11"
            fontWeight="500"
            fill="#78716c"
            letterSpacing="3"
          >
            STUDIO HQ · WI
          </text>
        </g>
      </svg>
    </figure>
  );
}
