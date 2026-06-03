export default function Logo({ size = 36 }) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="text-stone-100"
    >
      <path d="M 20 4 L 12 28 L 20 24 L 28 28 Z" strokeLinejoin="round" />
      <circle cx="20" cy="6" r="1.5" fill="currentColor" />
      <line x1="8" y1="32" x2="32" y2="32" strokeLinecap="round" />
    </svg>
  );
}
