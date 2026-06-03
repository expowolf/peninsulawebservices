export default function Logo({ size = 32 }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className="text-blue-700">
      <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 20 8 L 28 30 L 20 26 L 12 30 Z" fill="currentColor" />
      <circle cx="20" cy="10" r="1.5" fill="white" />
    </svg>
  );
}
