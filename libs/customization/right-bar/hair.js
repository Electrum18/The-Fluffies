import Hairs from '@/configs/changeable/hairs.json'

const Hair = {
  Hair: { color: 'hair_basic' },

  'Second color': {
    folder: {
      Enable: { boolean: 'hair_second' },
      Color: { color: 'hair_second' },
    },
  },

  'Hair types': {
    folder: {
      Type: { value: 'hair', list: Hairs, imgSrc: 'hair/' },
    },
  },
}

export default Hair
