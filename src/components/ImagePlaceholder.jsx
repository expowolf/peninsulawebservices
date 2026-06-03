export function HeroImage() {
  return (
    <svg viewBox="0 0 800 400" className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50">
      {/* Water */}
      <rect y="250" width="800" height="150" fill="#7db4d9" />
      <path d="M 0 250 Q 100 240 200 250 T 400 250 T 600 250 T 800 250" fill="none" stroke="#5a95c0" strokeWidth="2" opacity="0.5" />

      {/* Lighthouse */}
      <rect x="650" y="120" width="50" height="140" fill="#d4a574" />
      <polygon points="675,100 695,120 655,120" fill="#d4a574" />
      <circle cx="675" cy="95" r="8" fill="#ffd700" opacity="0.8" />
      <rect x="660" y="130" width="30" height="15" fill="#4a4a4a" opacity="0.3" />

      {/* Shore */}
      <ellipse cx="700" cy="280" rx="120" ry="30" fill="#c9b59a" />

      {/* Trees */}
      <g opacity="0.7">
        <polygon points="100,280 80,220 120,220" fill="#2d5016" />
        <polygon points="150,300 120,240 180,240" fill="#3d6b1f" />
        <polygon points="300,290 270,200 330,200" fill="#2d5016" />
      </g>

      {/* Text */}
      <text x="50" y="80" fontSize="48" fontWeight="bold" fill="#1e40af">Your Business Here</text>
      <text x="50" y="130" fontSize="24" fill="#475569">Fresh website. More customers.</text>
    </svg>
  );
}

export function RestaurantImage() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full bg-orange-50">
      {/* Building */}
      <rect x="50" y="80" width="300" height="160" fill="#d4a574" />
      {/* Roof */}
      <polygon points="50,80 200,20 350,80" fill="#8b6f47" />
      {/* Door */}
      <rect x="175" y="170" width="50" height="70" fill="#3d2817" />
      {/* Windows */}
      {[70, 130, 190, 250, 310].map(x => (
        <rect key={x} x={x} y="100" width="35" height="30" fill="#87ceeb" />
      ))}
      {/* Sign */}
      <rect x="150" y="45" width="100" height="20" fill="#8b0000" />
      <text x="200" y="58" fontSize="12" fontWeight="bold" fill="white" textAnchor="middle">Restaurant</text>
      {/* Ground */}
      <rect y="240" width="400" height="60" fill="#8b7355" />
    </svg>
  );
}

export function ShopImage() {
  return (
    <svg viewBox="0 0 400 300" className="w-full h-full bg-purple-50">
      {/* Building */}
      <rect x="40" y="90" width="320" height="150" fill="#deb887" />
      {/* Roof */}
      <polygon points="40,90 200,30 360,90" fill="#a0826d" />
      {/* Door */}
      <rect x="175" y="160" width="50" height="80" fill="#4a2511" />
      {/* Windows (storefront) */}
      {[60, 140, 220, 300].map(x => (
        <rect key={x} x={x} y="100" width="45" height="50" fill="#fff8dc" />
      ))}
      {/* Awning */}
      <polygon points="50,90 350,90 340,70 60,70" fill="#c41e3a" />
      {/* Sign */}
      <text x="200" y="75" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">Local Shop</text>
      {/* Ground */}
      <rect y="240" width="400" height="60" fill="#9b8b7e" />
    </svg>
  );
}

export function TeamImage() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full bg-slate-100">
      {/* Person */}
      <circle cx="200" cy="100" r="40" fill="#d4a574" />
      <rect x="160" y="150" width="80" height="100" fill="#1e40af" rx="5" />
      <ellipse cx="200" cy="180" rx="50" ry="20" fill="#f5f1e8" />

      {/* Desk */}
      <rect x="100" y="280" width="200" height="80" fill="#8b6f47" />
      <rect x="110" y="270" width="180" height="15" fill="#a0826d" />

      {/* Computer monitor */}
      <rect x="150" y="220" width="100" height="60" fill="#4a5568" />
      <rect x="155" y="225" width="90" height="50" fill="#87ceeb" />
      <rect x="140" y="285" width="130" height="8" fill="#4a5568" />

      {/* Text */}
      <text x="200" y="360" fontSize="18" fontWeight="bold" fill="#1e40af" textAnchor="middle">Meet the Team</text>
    </svg>
  );
}
