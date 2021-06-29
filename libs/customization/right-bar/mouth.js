import FangsList from '@/configs/changeable/fangs.json'

const Mouth = {
  'Mouth color': { color: 'jaw_basic' },
  'Tongue color': { color: 'tongue_basic' },

  Teeths: {
    folder: {
      Sharp: { value: 'sharp_teeth', min: 1, max: 100 },
    },
  },

  Fangs: {
    folder: {
      'Fangs list': { value: 'fangs', list: FangsList, imgSrc: 'fangs/' },
    },
  },

  Tongue: {
    folder: {
      Raised: { value: 'tongue_raised', min: 1, max: 100 },
      Out: { value: 'tongue_out', min: 1, max: 100 },
    },
  },

  Emotion: {
    folder: {
      Open: { value: 'jaw_open', min: 1, max: 100 },
      Happy: { value: 'jaw_happy', min: 1, max: 100 },
      Sad: { value: 'jaw_sad', min: 1, max: 100 },
      Surprised: { value: 'jaw_surprised', min: 1, max: 100 },
      Nya: { value: 'jaw_cat', min: 1, max: 100 },
    },
  },
}

export default Mouth
