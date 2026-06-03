export default function Logo({ size = 36 }) {
  // Replace src with /logo.png once the asset is added to /public.
  return (
    <span
      className="inline-flex items-center justify-center border border-stone-700 bg-stone-950"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 32 32" width={size * 0.6} height={size * 0.6} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-stone-100">
        <path d="M6 22 L14 8 L22 22 Z" />
        <circle cx="14" cy="8" r="1.2" fill="currentColor" />
        <line x1="4" y1="26" x2="28" y2="26" />
      </svg>
    </span>
  );
}
