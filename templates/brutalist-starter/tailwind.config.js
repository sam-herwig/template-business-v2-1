/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'media', // or 'class' for manual toggle
  theme: {
    extend: {
      colors: {
        brutal: {
          bg: 'var(--brutal-bg)',
          black: 'var(--brutal-black)',
          yellow: 'var(--brutal-yellow)',
          pink: 'var(--brutal-pink)',
          blue: 'var(--brutal-blue)',
          green: 'var(--brutal-green)',
          purple: 'var(--brutal-purple)',
          orange: 'var(--brutal-orange)',
          // Semantic colors
          text: 'var(--brutal-text)',
          'text-muted': 'var(--brutal-text-muted)',
          surface: 'var(--brutal-surface)',
          border: 'var(--brutal-border)',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        brutal: '6px 6px 0 var(--brutal-black)',
        'brutal-lg': '8px 8px 0 var(--brutal-black)',
        'brutal-xl': '12px 12px 0 var(--brutal-black)',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
      },
    },
  },
  plugins: [],
}
