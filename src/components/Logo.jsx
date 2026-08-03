/**
 * Peninsula Web Services "PW" monogram — bordered square with a serif PW,
 * rebuilt as crisp SVG so it scales sharply and inherits color (white on the
 * dark theme). Matches the brand mark.
 */
export default function Logo({ size = 32, className = '' }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`text-white ${className}`}
      role="img"
      aria-label="Peninsula Web Services"
      fill="none"
    >
      <rect x="8" y="6" width="84" height="88" stroke="currentColor" strokeWidth="3.5" />
      <text
        x="50"
        y="71"
        textAnchor="middle"
        fontFamily="'Cormorant Garamond', Georgia, serif"
        fontWeight="600"
        fontSize="60"
        letterSpacing="-5"
        fill="currentColor"
      >
        PW
      </text>
    </svg>
  );
}
