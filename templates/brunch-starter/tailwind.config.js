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
        // Primary Palette
        cream: {
          DEFAULT: '#FAF7F2',
          dark: '#F0EBE3',
        },
        sage: {
          DEFAULT: '#6B8E6B',
          light: '#E8F0E8',
          muted: '#7A9A7A', // dark mode
        },
        coral: {
          DEFAULT: '#E07B54',
          light: '#F5A88A',
          dark: '#C4603B',
          bright: '#EF8B64', // dark mode
        },
        sunny: {
          DEFAULT: '#F5D547',
          golden: '#E8C840', // dark mode
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
          light: '#5A5A5A',
        },
        // Extended
        peach: '#FAEEE5',
        // Dark mode backgrounds
        'dark-bg': '#1A1614',
        'dark-card': '#252019',
        'dark-elevated': '#2A2320',
        // Semantic
        success: '#6B8E6B',
        warning: '#F5D547',
        error: '#D64545',
        info: '#5B8DB8',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Lora', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Inter', '-apple-system', 'sans-serif'],
        script: ['var(--font-script)', 'Satisfy', 'cursive'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 4.5rem)', { lineHeight: '1.1', fontWeight: '600' }],
        'display': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.15', fontWeight: '600' }],
        'h2': ['clamp(2rem, 4vw, 2.75rem)', { lineHeight: '1.2', fontWeight: '500' }],
        'h3': ['clamp(1.5rem, 3vw, 1.75rem)', { lineHeight: '1.3', fontWeight: '500' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'overline': ['0.75rem', { lineHeight: '1.4', fontWeight: '600', letterSpacing: '0.2em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 16px 40px rgba(0,0,0,0.12)',
        'button': '0 8px 20px rgba(224, 123, 84, 0.3)',
        'nav': '0 2px 20px rgba(0,0,0,0.08)',
        'hero': '0 25px 50px -12px rgba(0,0,0,0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'pulse-slow': 'pulse 8s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
