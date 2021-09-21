// const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    // colors: {      
    //   indigo: {
    //     light: '#8B5CF6',
    //     DEFAULT: '#8c52ff',
    //     dark: '#7C3AED',
    //   },
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
