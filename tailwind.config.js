/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pastel: {
          blue: '#eef4ff',
          blueBorder: '#d6e4ff',
          blueText: '#254e8e',
          mint: '#eafbf3',
          mintBorder: '#bcf2d6',
          mintText: '#1b6343',
          sand: '#fdf8ee',
          sandBorder: '#f8e7b9',
          sandText: '#875314',
          lavender: '#f6f2fd',
          lavenderBorder: '#e7daf9',
          lavenderText: '#5e3a8c',
          rose: '#fef1f2',
          roseBorder: '#fecdd3',
          roseText: '#9f1239',
        },
        gov: {
          dark: '#1b2a47',
          header: '#24355a',
          primary: '#2b50aa',
          primaryHover: '#213f88',
          accent: '#c09848',
          subtle: '#64748b',
          surface: '#ffffff',
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
