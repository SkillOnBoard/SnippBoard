/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/renderer/src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#4A2F8F',
        gray: {
          50: '#F9F9FB',
          100: '#D9D9E0',
          200: '#B8BAC5',
          300: '#989AAB',
          400: '#777B90',
          500: '#575B75',
          600: '#42455A',
          700: '#2D303E',
          800: '#181A23',
          900: '#0B0C12'
        }
      }
    }
  },
  plugins: []
}
