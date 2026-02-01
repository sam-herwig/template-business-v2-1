/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm, trustworthy color palette
        primary: {
          50: '#fdf5f3',
          100: '#fae8e4',
          200: '#f7d5cc',
          300: '#f0b8aa',
          400: '#e6907b',
          500: '#d97254',  // Main terracotta
          600: '#c45a3c',
          700: '#a44831',
          800: '#873e2c',
          900: '#6f3729',
          950: '#3c1a12',
        },
        cream: {
          50: '#fdfdf9',
          100: '#f9f8f1',
          200: '#f4f1de',  // Main cream
          300: '#ebe6c9',
          400: '#dfd8ad',
          500: '#d1c68e',
        },
        sage: {
          50: '#f3f8f5',
          100: '#e4efe8',
          200: '#cbe0d3',
          300: '#a4c8b3',
          400: '#81b29a',  // Main sage
          500: '#559477',
          600: '#42775f',
          700: '#37604e',
          800: '#2f4e41',
          900: '#294137',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
