/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f5f1e8',
        sand: '#e8dcc8',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"DM Sans"', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
