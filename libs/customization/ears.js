import EarsList from '@/configs/changeable/ears.json'

const Ears = {
  'Ears second color': {
    folder: {
      'Second ears': { boolean: 'ear_second_color' },
      'Second color ears': { color: 'ear_basic' },
    },
  },

  'Ears types': {
    folder: {
      'Ears list': { value: 'ears', list: EarsList, imgSrc: 'ears/' },
    },
  },
}

export default Ears
