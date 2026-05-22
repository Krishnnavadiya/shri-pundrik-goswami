/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        gold: {
          50: '#fdfbf3',
          100: '#faf3df',
          200: '#f4e5b3',
          300: '#ecd180',
          400: '#e2b54f',
          500: '#d39e30',
          600: '#b27d25',
          700: '#8d5d20',
          800: '#714b21',
          900: '#5e3f20',
        },
        maroon: {
          50: '#fdf3f3',
          100: '#fbe5e5',
          200: '#f5cfcf',
          300: '#ecadac',
          400: '#df7c7c',
          500: '#cc5252',
          600: '#b73a3a',
          700: '#992e2e',
          800: '#7f2a2a',
          900: '#6c2828',
          950: '#3a1010',
        },
        cream: {
          50: '#fefdf9',
          100: '#fdfaf0',
          200: '#faf2d9',
          300: '#f6e9bd',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern':
          "linear-gradient(rgba(60, 20, 7, 0.55), rgba(60, 20, 7, 0.55)), url('https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?auto=format&fit=crop&w=1600&q=80')",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(124, 45, 18, 0.12)',
        glow: '0 0 40px -10px rgba(211, 158, 48, 0.4)',
      },
    },
  },
  plugins: [],
};
