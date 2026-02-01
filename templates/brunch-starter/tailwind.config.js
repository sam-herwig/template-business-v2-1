/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brunch: {
          cream: '#FBF7F0',
          creamDark: '#F5EDE0',
          peach: '#F5DDD0',
          terracotta: '#C66B3D',
          terracottaLight: '#D4856A',
          terracottaDark: '#A85A32',
          sage: '#8B9E7C',
          sageLight: '#A7B99A',
          sageDark: '#4A5940',
          brown: '#3D2D1F',
          brownLight: '#5A4536',
          brownMuted: '#6B5A4A',
          white: '#FFFAF5',
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
