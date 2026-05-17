/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#2563EB', // A strong blue for brand identity
        accent: '#10B981', // A vibrant green for positive actions/highlights
        danger: '#EF4444', // For warnings or critical items
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}