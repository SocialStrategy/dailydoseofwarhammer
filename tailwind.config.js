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
        'dark-byzantium': '#502F4C',
        'old-lavender': '#70587C',
        'lavender-gray': '#C8B8DB',
        'languid-lavender': '#DCCFEC',
        'warhammer-gold': '#fbca1b',
        'warhammer-red': '#8B0000',
        'warhammer-dark': '#1a1a1a',
        'warhammer-gray': '#2d2d2d',
      },
      fontFamily: {
        'anton': ['Anton', 'sans-serif'],
        'bitter': ['Bitter', 'serif'],
        'grimdark': ['Cinzel', 'serif'],
      },
      fontSize: {
        '54': '3.375rem',
        '88': '5.5rem',
        'hero': 'clamp(2.5rem, 8vw, 5.5rem)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
