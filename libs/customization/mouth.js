import FangsList from '@/configs/changeable/fangs.json'

const Mouth = {
  'Mouth color': {
    value: 'jaw_basic',
    isColor: true,
  },

  'Tongue color': {
    value: 'tongue_basic',
    shade: 'tongue_shade',
    isColor: true,
  },

  Sharp: { value: 'sharp_teeth' },

  Fangs: {
    folder: {
      'Fangs list': { value: 'fangs', list: FangsList, imgSrc: 'fangs/' },
    },
  },
}

export default Mouth
