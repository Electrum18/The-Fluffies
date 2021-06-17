import EarsList from '@/configs/changeable/ears.json'

const Ears = {
  'Ears second color': {
    folder: {
      'Second ears': { value: 'ear_second_color' },
      'Second color ears': { value: 'ear_basic', isColor: true },
    },
  },

  'Ears types': {
    folder: {
      'Ears list': { value: 'ears', list: EarsList, imgSrc: 'ears/' },
    },
  },
}

export default Ears
