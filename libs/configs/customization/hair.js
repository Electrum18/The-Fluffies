import Hairs from '@/configs/changeable/hairs.json'

const Hair = {
  Hair: {
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

  'Hair types': {
    folder: {
      Type: { value: 'hair', list: Hairs, imgSrc: 'hair/' },
    },
  },
}

export default Hair
