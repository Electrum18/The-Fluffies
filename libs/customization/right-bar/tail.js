import Tails from '@/configs/changeable/tails.json'

const Tail = {
  Tail: { color: 'hair_basic' },

  'Second color': {
    folder: {
      Enable: { boolean: 'hair_second' },
      Color: { color: 'hair_second' },
    },
  },

  'Tail types': {
    folder: {
      Type: { value: 'tail', list: Tails, imgSrc: 'tail/' },
    },
  },
}

export default Tail
