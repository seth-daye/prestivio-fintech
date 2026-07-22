/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f3f6fb',
          100: '#e3ebf6',
          200: '#c2d2e8',
          300: '#93b0d4',
          400: '#5d85b8',
          500: '#3a649d',
          600: '#2a4d80',
          700: '#123B6D',
          800: '#0e2f56',
          900: '#0a2240',
          950: '#061628',
        },
        gold: {
          50: '#fbf8ec',
          100: '#f6efcf',
          200: '#ecdf9f',
          300: '#e0cb6c',
          400: '#d4af37',
          500: '#c39a2a',
          600: '#a87c20',
          700: '#855e1d',
          800: '#6e4b1d',
          900: '#5e401c',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      boxShadow: {
        'navy': '0 20px 60px -15px rgba(18, 59, 109, 0.35)',
        'gold': '0 10px 40px -10px rgba(212, 175, 55, 0.45)',
        'soft': '0 8px 30px -12px rgba(18, 59, 109, 0.18)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
};
