import SuitsList from '@/configs/changeable/clothing.json'

const Suits = {
  'Suit color': { color: 'clothing_basic' },

  'Suit types': {
    folder: {
      'Suit list': { value: 'clothing', list: SuitsList, imgSrc: 'clothing/' },
    },
  },

  Scarf: {
    folder: {
      'Scarf enable': { boolean: 'scarf' },
      'Scarf color': { color: 'scarf_basic' },
    },
  },
}

export default Suits
