import Body from './body'
import Ears from './ears'
import Eyes from './eyes'
import Glasses from './glasses'
import Hair from './hair'
import Horns from './horns'
import Mouth from './mouth'
import Neck from './neck'
import Nose from './nose'
import Pants from './pants'
import Piercings from './piercings'
import SaveAnimation from './saves/animations'
import SavePerson from './saves/person'
import Suits from './suits'
import Tail from './tail'
import Wings from './wings'

const Emotions = {
  Emotions: {
    folder: {
      Open: { value: 'jaw_open', min: 1, max: 100 },
      Happy: { value: 'jaw_happy', min: 1, max: 100 },
      Sad: { value: 'jaw_sad', min: 1, max: 100 },
      Surprised: { value: 'jaw_surprised', min: 1, max: 100 },
      Nya: { value: 'jaw_cat', min: 1, max: 100 },
    },
  },

  'Tongue emotion': {
    folder: {
      Raised: { value: 'tongue_raised', min: 1, max: 100 },
      Out: { value: 'tongue_out', min: 1, max: 100 },
    },
  },

  'Eyes emotion': {
    folder: {
      Scale: {
        value: 'eyes_iris_scale',
        min: 50,
        max: 125,
        step: 1,
      },

      Horizontal: {
        value: 'eyes_position_horiz',
        min: -100,
        max: 100,
      },

      Vertical: {
        value: 'eyes_position_verti',
        min: -100,
        max: 100,
      },
    },
  },

  'Eyelids emotion': {
    folder: {
      Upper: {
        value: 'eyes_eyelids_up',
        min: 1,
        max: 100,
      },

      Lower: {
        value: 'eyes_eyelids_down',
        min: 1,
        max: 100,
      },

      Angry: {
        value: 'eyes_eyelids_angry',
        min: 1,
        max: 100,
      },

      Sad: {
        value: 'eyes_eyelids_sad',
        min: 1,
        max: 100,
      },
    },
  },
}

export const configs = [
  Body,
  Hair,
  Tail,
  Eyes,
  Glasses,
  Nose,
  Horns,
  Mouth,
  Ears,
  Piercings,
  Neck,
  Wings,
  Suits,
  Pants,
  Emotions,
  SavePerson,
  SaveAnimation,
]
