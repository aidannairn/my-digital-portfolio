/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#000F26',
        secondary: '#a6b7c3',
        tertiary: '#001a35',
        quaternary: '#0088FF',
        quinary: '#00172f',
        'black-100': '#0d1525',
        'black-200': '#030e25',
        'white-100': '#f3f3f3',
      },
      boxShadow: {
        card: '0px 35px 120px -15px #1e2a35',
        alert: '0 2px 5px 0 rgb(0 0 0 / 16%),0 2px 10px 0 rgb(0 0 0 / 12%)'
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