import EyesList from '@/configs/changeable/eyes.json'

const Eyes = {
  Eyes: { color: 'eyes_left_basic' },
  Sclera: { color: 'eyes_sclera' },

  Scale: {
    value: 'eyes_iris_scale',
    min: 50,
    max: 125,
    step: 1,
  },

  Pupils: {
    folder: {
      'Pupil color': { color: 'eyes_pupil' },
    },
  },

  Position: {
    folder: {
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

  'Eyes types': {
    folder: {
      'Eyes list': { value: 'eyes', list: EyesList, imgSrc: 'eyes/' },
    },
  },

  'Left eyelids': {
    folder: {
      'Upper left': {
        value: 'eyes_eyelids_left_up',
        min: 1,
        max: 100,
      },

      'Lower left': {
        value: 'eyes_eyelids_left_down',
        min: 1,
        max: 100,
      },
    },
  },

  'Right eyelids': {
    folder: {
      'Upper right': {
        value: 'eyes_eyelids_right_up',
        min: 1,
        max: 100,
      },

      'Lower right': {
        value: 'eyes_eyelids_right_down',
        min: 1,
        max: 100,
      },
    },
  },
}

export default Eyes
