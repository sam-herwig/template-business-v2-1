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
        aurora: {
          bg: '#030014',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          fuchsia: '#c026d3',
          pink: '#ec4899',
          cyan: '#06b6d4',
          text: '#ffffff',
          muted: 'rgba(255,255,255,0.8)',
          dim: 'rgba(255,255,255,0.6)',
          border: 'rgba(255,255,255,0.1)',
        },
      },
      fontFamily: {
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
