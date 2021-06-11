const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      container: {
        center: true,
      },

      colors: {
        primary: '#ffaa22',
        'primary-dark': '#ff6644',
        orange: colors.orange,
        version: '#E91AFF',
      },

      maxWidth: {
        vmin: '100vmin',
      },

      spacing: {
        18: '4.5rem',
        24: '6rem',
      },

      scale: {
        125: '1.25',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
