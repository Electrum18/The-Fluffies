import Hairs from '@/configs/changeable/hairs.json'

const Hair = {
  Hair: { value: 'hair_basic', isColor: true },

  'Second color': {
    folder: {
      Enable: { value: 'hair_second' },
      Color: { value: 'hair_second', isColor: true },
    },
  },

  'Hair types': {
    folder: {
      Type: { value: 'hair', list: Hairs, imgSrc: 'hair/' },
    },
  },
}

export default Hair
