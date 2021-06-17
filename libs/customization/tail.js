import Tails from '@/configs/changeable/tails.json'

const Tail = {
  Tail: { value: 'hair_basic', isColor: true },

  'Second color': {
    folder: {
      Enable: { value: 'hair_second' },
      Color: { value: 'hair_second', isColor: true },
    },
  },

  'Tail types': {
    folder: {
      Type: { value: 'tail', list: Tails, imgSrc: 'tail/' },
    },
  },
}

export default Tail
