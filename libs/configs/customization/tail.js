import Tails from '@/configs/changeable/tails.json'

const Tail = {
  Tail: {
    value: 'hair_basic',
    shade: 'hair_shade',
    isColor: true,
  },

  'Second color': {
    folder: {
      Enable: { value: 'hair_second' },
      Color: {
        value: 'hair_second',
        shade: 'hair_second_shade',
        isColor: true,
      },
    },
  },

  'Tail types': {
    folder: {
      Type: { value: 'tail', list: Tails, imgSrc: 'tail/' },
    },
  },
}

export default Tail
