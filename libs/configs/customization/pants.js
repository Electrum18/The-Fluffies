import PantsList from '@/configs/changeable/pants.json'

const Pants = {
  'Pants color': {
    value: 'pants_basic',
    shade: 'pants_shade',
    isColor: true,
  },

  'Pants types': {
    folder: {
      'Pants list': { value: 'pants', list: PantsList, imgSrc: 'pants/' },
    },
  },
}

export default Pants
