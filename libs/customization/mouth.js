import FangsList from '@/configs/changeable/fangs.json'

const Mouth = {
  'Mouth color': { color: 'jaw_basic' },
  'Tongue color': { color: 'tongue_basic' },

  Sharp: { boolean: 'sharp_teeth' },

  Fangs: {
    folder: {
      'Fangs list': { value: 'fangs', list: FangsList, imgSrc: 'fangs/' },
    },
  },
}

export default Mouth
