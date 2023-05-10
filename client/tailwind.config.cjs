/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#000D26',
        secondary: '#a6b7c3',
        tertiary: '#00143a',
        quaternary: '#0088FF',
        quinary: '#00112e',
        'black-100': '#0d1525',
        'black-200': '#030e25',
        'white-100': '#f3f3f3',
      },
      boxShadow: {
        card: '0px 35px 120px -15px #211e35',
      },
      screens: {
        xs: '450px',
      },
      backgroundImage: {
        'hero-pattern': 'url("/src/assets/hero_background.png")',
      },
    },
  },
  plugins: [],
}