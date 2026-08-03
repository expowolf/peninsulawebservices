/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#0a0a0a',
        sand: '#e8dcc8',
        navy: '#16233f',
        // Steel-navy accent ramp (Wall-Street brand blue). Overrides Tailwind
        // `steel-*` names used across the app after the amber→steel sweep.
        steel: {
          300: '#9db2d6',
          400: '#7d97c4',
          500: '#5478b0',
          600: '#3d5a8c',
          700: '#2b4066',
          800: '#1e2f4d',
          900: '#16233f',
          950: '#0d1526',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"DM Sans"', 'ui-sans-serif', 'sans-serif'],
        wordmark: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
