/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        minimal: {
          bg: '#fafafa',
          text: '#171717',
          muted: '#525252', // Improved contrast (7.0:1 on #fafafa)
          border: '#e5e5e5',
          accent: '#0070f3',
          // Dark mode variants
          dark: {
            bg: '#0a0a0a',
            text: '#fafafa',
            muted: '#a3a3a3', // 4.5:1 contrast on dark bg
            border: '#262626',
            card: '#171717',
          },
          // Gradient colors
          gradientPink: '#ff0080',
          gradientPurple: '#7928ca',
          gradientBlue: '#0070f3',
          gradientCyan: '#00d4ff',
        },
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        display: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
