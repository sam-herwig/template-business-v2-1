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
        studio: {
          bg: '#0A0A0F',
          bgLight: '#12121A',
          bgCard: '#16161F',
          violet: '#8B5CF6',
          blue: '#3B82F6',
          emerald: '#10B981',
          amber: '#F59E0B',
          pink: '#EC4899',
          text: '#FFFFFF',
          // Updated for WCAG AA contrast (4.5:1 minimum)
          muted: 'rgba(255,255,255,0.7)',   // ~5.2:1 on #0A0A0F
          dim: 'rgba(255,255,255,0.6)',      // ~4.5:1 on #0A0A0F
          border: 'rgba(255,255,255,0.08)',
          borderHover: 'rgba(255,255,255,0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-satoshi)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
