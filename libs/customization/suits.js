import SuitsList from '@/configs/changeable/clothing.json'

const Suits = {
  'Suit color': { value: 'clothing_basic', isColor: true },

  'Suit types': {
    folder: {
      'Suit list': { value: 'clothing', list: SuitsList, imgSrc: 'clothing/' },
    },
  },

  Scarf: {
    folder: {
      'Scarf enable': { value: 'scarf' },
      'Scarf color': { value: 'scarf_basic', isColor: true },
    },
  },
}

export default Suits
