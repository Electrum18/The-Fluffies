import SuitsList from '@/configs/changeable/clothing.json'

const Suits = {
  'Suit color': {
    value: 'clothing_basic',
    shade: 'clothing_shade',
    isColor: true,
  },

  'Suit types': {
    folder: {
      'Suit list': { value: 'clothing', list: SuitsList, imgSrc: 'clothing/' },
    },
  },

  Scarf: {
    folder: {
      'Scarf enable': { value: 'scarf' },
      'Scarf color': {
        value: 'scarf_basic',
        shade: 'scarf_shade',
        isColor: true,
      },
    },
  },
}

export default Suits
