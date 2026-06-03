export default function Logo({ size = 36 }) {
  return (
    <img
      src="/logo.png"
      alt="Peninsula Web Services"
      style={{ height: size, width: 'auto' }}
      className="block object-contain"
    />
  );
}
