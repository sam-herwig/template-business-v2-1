import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Dark Foundation
        background: {
          DEFAULT: '#0A0A0F',
          subtle: '#12121A',
          muted: '#1A1A24',
        },
        // Text
        foreground: {
          DEFAULT: '#FAFAFA',
          muted: '#A1A1AA',
          subtle: '#71717A',
        },
        // Electric Violet — Primary Brand Color
        primary: {
          DEFAULT: '#8B5CF6',
          hover: '#A78BFA',
          muted: 'rgba(139, 92, 246, 0.12)',
        },
        // Hot Coral — Conversion & Energy
        accent: {
          DEFAULT: '#FF6B6B',
          hover: '#FF8787',
          muted: 'rgba(255, 107, 107, 0.08)',
        },
        // Electric Cyan — Secondary Accent
        secondary: {
          DEFAULT: '#06B6D4',
          hover: '#22D3EE',
          muted: 'rgba(6, 182, 212, 0.08)',
        },
        // Borders
        border: {
          DEFAULT: '#27272A',
          hover: '#3F3F46',
        },
        // Status colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h1': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.25', fontWeight: '600' }],
        'h3': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
      },
      borderRadius: {
        'sm': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'DEFAULT': '0 4px 6px rgba(0, 0, 0, 0.4)',
        'md': '0 8px 16px rgba(0, 0, 0, 0.4)',
        'lg': '0 16px 32px rgba(0, 0, 0, 0.5)',
        'xl': '0 24px 48px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 60px rgba(139, 92, 246, 0.4)',
        'glow-accent': '0 0 60px rgba(255, 107, 107, 0.3)',
        'glow-sm': '0 0 30px rgba(139, 92, 246, 0.3)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 400ms ease-out forwards',
        'fade-in-up': 'fade-in-up 600ms ease-out forwards',
        'scale-in': 'scale-in 300ms ease-out forwards',
        'slide-up': 'slide-up 400ms ease-out forwards',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-cta': 'linear-gradient(135deg, #8B5CF6 0%, #FF6B6B 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
