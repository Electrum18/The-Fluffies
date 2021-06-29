import HornsList from '@/configs/changeable/front_horn.json'
import HornsBehind from '@/configs/changeable/horn.json'

const Horns = {
  'Front horns': {
    folder: {
      'Horn type': {
        value: 'horn_front',
        list: HornsList,
        imgSrc: 'horn_front/',
      },
    },
  },

  'Second color horns': {
    folder: {
      'Enable second horns': { boolean: 'horn_second_color' },
      'Horns second color': { color: 'horn_basic' },
    },
  },

  'Rear horns': {
    folder: {
      'Horns behind color': { color: 'horn_rear_basic' },
      'Horn behind type': { value: 'horn', list: HornsBehind, imgSrc: 'horn/' },
    },
  },
}

export default Horns
