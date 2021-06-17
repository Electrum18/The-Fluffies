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
      'Enable second horns': { value: 'horn_second_color' },
      'Horns second color': { value: 'horn_basic', isColor: true },
    },
  },

  'Rear horns': {
    folder: {
      'Horns behind color': { value: 'horn_rear_basic', isColor: true },
      'Horn behind type': { value: 'horn', list: HornsBehind, imgSrc: 'horn/' },
    },
  },
}

export default Horns
