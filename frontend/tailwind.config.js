/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ledger: {
          50: '#F8FAFC',
          100: '#EEF2FF',
          200: '#E0E7FF',
          300: '#C7D2FE',
          400: '#A5B4FC',
          500: '#818CF8',
          600: '#6366F1',
          700: '#4F46E5',
          800: '#4338CA',
          900: '#312E81',
          950: '#1E1B4B',
        },
        gold: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          800: '#4C1D95',
          900: '#3B0764',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#16A34A',
          600: '#15803D',
          700: '#166534',
        },
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#D97706',
          600: '#B45309',
        },
        danger: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          500: '#DC2626',
          600: '#B91C1C',
        },
      },
      fontFamily: {
        display: ['"Inter"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        ledger: '0 24px 60px -24px rgba(79,70,229,0.24), 0 10px 30px -20px rgba(15,23,42,0.08)',
        'ledger-lg': '0 32px 100px -40px rgba(79,70,229,0.18), 0 16px 36px -26px rgba(15,23,42,0.1)',
      },
    },
  },
  plugins: [],
}
