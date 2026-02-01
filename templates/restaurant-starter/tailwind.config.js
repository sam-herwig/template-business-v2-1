/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Warm, appetizing restaurant palette
        primary: {
          50: '#fef7ee',
          100: '#fdedd3',
          200: '#f9d7a5',
          300: '#f5ba6d',
          400: '#f09432',
          500: '#ec7a14',  // Warm orange
          600: '#dd5f0a',
          700: '#b7460b',
          800: '#923810',
          900: '#763010',
        },
        secondary: {
          50: '#f8f5f0',
          100: '#efe9dc',
          200: '#ddd1bb',
          300: '#c9b492',
          400: '#b89a72',
          500: '#a98458',  // Warm brown
          600: '#9a724d',
          700: '#805b41',
          800: '#694b39',
          900: '#573f32',
        },
        dark: {
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
