/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B2722',
          forest: '#1E7E34',
          emerald: '#28A745',
          mint: '#EBF7EE',
          gold: '#FCB900',
          amber: '#E67E22',
          softBg: '#F8FBF8',
          slate: '#2C3E50',
          muted: '#6C757D'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif']
      },
      boxShadow: {
        pill: '0 8px 30px rgba(11, 39, 34, 0.08)',
        card: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)'
      }
    },
  },
  plugins: [],
}
