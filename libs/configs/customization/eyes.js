const Eyes = {
  Eyes: {
    value: 'eyes_left_basic',
    isColor: true,
  },

  'Heterochromia ': {
    folder: {
      Divide: { value: 'eyes_right_enable' },
      'Right eye': {
        value: 'eyes_right_basic',
        isColor: true,
      },
    },
  },

  Sclera: {
    value: 'eyes_sclera',
    isColor: true,
  },

  Scale: {
    value: 'eyes_iris_scale',
    min: 10,
    max: 125,
  },

  Pupils: {
    folder: {
      'Pupil color': {
        value: 'eyes_pupil',
        isColor: true,
      },
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

      Focus: {
        value: 'eyes_focus',
        min: 1,
        max: 100,
      },
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
