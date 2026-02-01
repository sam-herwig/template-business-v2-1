/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kinetic: {
          bg: '#0a0a0b',
          text: '#fafafa',
          muted: 'rgba(250, 250, 250, 0.75)', /* WCAG AA compliant: 4.6:1 contrast */
          subtle: 'rgba(250, 250, 250, 0.55)', /* WCAG AA compliant for large text: 3.2:1 */
          dim: 'rgba(250, 250, 250, 0.4)', /* Decorative only - not for text */
          accent: '#60a5fa',
          accentAlt: '#a78bfa',
          accentPink: '#f472b6',
          border: 'rgba(250, 250, 250, 0.08)',
        },
      },
      fontFamily: {
        sans: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
