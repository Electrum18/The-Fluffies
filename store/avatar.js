import SetPropersSide from '~/assets/js/avatar/setSide'

import globals from '~/assets/json/configs/globals.json'
import propers from '~/assets/json/configs/properties.json'
import color from '~/assets/json/configs/color.json'

// Import lists configs

import Hairs from '~/assets/json/configs/names/hair.json'
import Horns from '~/assets/json/configs/names/horn.json'
import Glasses from '~/assets/json/configs/names/glasses.json'

// Apply lists configs

globals.hair_info = Hairs
globals.horn_info = Horns
globals.glasses_info = Glasses

const defaultValue = {
  frame: 0,

  globals,
  color
}

const FrameObj2 = cloneObject(propers)
const FrameObj3 = cloneObject(propers)
const FrameObj4 = cloneObject(propers)

FrameObj2.eyes_position_horiz = -25

FrameObj3.eyes_position_horiz = -25
FrameObj3.eyes_eyelids_left_up = 15
FrameObj3.eyes_eyelids_right_up = 20
FrameObj3.eyes_brows_right_height = -100

FrameObj3.jaw_open = 100

FrameObj3.hooves_left_shoulder_rise = 100
FrameObj3.hooves_left_shoulder_angle = 66

FrameObj3.hooves_left_elbow_rise = 100
FrameObj3.hooves_left_elbow_angle = -33

FrameObj4.eyes_position_horiz = -25
FrameObj4.eyes_eyelids_left_up = 15
FrameObj4.eyes_eyelids_right_up = 20
FrameObj4.eyes_brows_right_height = -100

FrameObj4.jaw_open = 100

FrameObj4.hooves_left_shoulder_rise = 100
FrameObj4.hooves_left_shoulder_angle = 66

FrameObj4.hooves_left_elbow_rise = 100
FrameObj4.hooves_left_elbow_angle = -75

const defaultFrames = [
  {
    duration: 0.5,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...cloneObject(propers)
    }
  },
  {
    duration: 1.2,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj2
    }
  },
  {
    duration: 0.5,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj3
    }
  },
  {
    duration: 0.5,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj4
    }
  },
  {
    duration: 0.5,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj3
    }
  },
  {
    duration: 0.5,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj4
    }
  },
  {
    duration: 1.2,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...FrameObj3
    }
  },
  {
    duration: 1.2,
    frame: {
      angle: 0,
      horiz: 0,
      degress: 12.5,
      ...cloneObject(propers)
    }
  }
]

function cloneObject(object) {
  return JSON.parse(JSON.stringify(object))
}

export const state = () => ({
  ...defaultValue,

  angle: 0,
  horiz: 0,

  degress: 12.5,
  mirror: false,

  hairsList: [],

  frames: defaultFrames,

  animationSavesSlot: 0,

  defaultFrames,
  default: defaultValue // Default constant params
})

export const getters = {
  getAngle: ({ angle }) => angle,
  getHoriz: ({ horiz }) => horiz,

  getDegress: ({ degress }) => degress,
  getMirror: ({ mirror }) => mirror,

  getFrame: ({ frame }) => frame,
  getFrames: ({ frames }) => frames,

  getGlobal: ({ globals }) => globals,
  getProper: ({ frames, frame }) => frames[frame].frame,
  getColor: ({ color }) => color,

  getDefault: (state) => state.default,
  getDefaultFrames: (state) => state.defaultFrames,

  getHairsList: ({ hairsList }) => hairsList,

  getAnimationSavesSlot: ({ animationSavesSlot }) => animationSavesSlot
}

export const mutations = {
  setAngle: (state, angle) => (state.angle = angle),
  setHoriz: (state, value) => (state.horiz = value),

  setDegress: (state, degress) => (state.degress = degress),
  setMirror: (state, mirror) => (state.mirror = mirror),

  setFrame: (state, frame) => {
    state.frame = frame

    const { horiz, angle, degress } = state.frames[frame].frame

    state.degress = degress
    state.mirror = degress < 90

    state.horiz = horiz
    state.angle = angle

    SetPropersSide(state.mirror, state.frames[frame].frame)
  },

  addFrame: ({ frames }, index) => {
    frames.splice(index, 0, {
      duration: 1,
      frame: {
        angle: 0,
        horiz: 0,
        degress: 12.5,
        ...cloneObject(frames[index - 1].frame)
      }
    })
  },

  setFrames: (state, { frames }) => {
    state.frames = frames
    state.frame = 0

    const { horiz, angle, degress } = frames[0].frame

    state.degress = degress
    state.mirror = degress < 90

    state.horiz = horiz
    state.angle = angle

    for (let i = 0; i < frames.length; i++) {
      SetPropersSide(state.mirror, frames[i].frame)
    }
  },

  deleteFrame: (state, index) => {
    const { frames, frame } = state

    frames.splice(index, 1)

    if (frame > frames.length - 1) state.frame = frames.length - 1
  },

  setFrameDur: ({ frames }, [index, length]) => {
    frames[index].duration = length
  },

  setProper({ frames, frame }, { path, value }) {
    frames[frame].frame[path] = value
  },

  setGlobal({ globals, color }, { path, value }) {
    globals[path] = value

    if (!globals.eyes_right_enable) {
      color.eyes_right_basic = color.eyes_left_basic
    }

    if (globals.fur_second_color) {
      color.fur_SECOND = color.fur_second_basic
      color.fur_SECOND_SHADE = color.fur_second_shade
    } else {
      color.fur_SECOND = color.fur_basic
      color.fur_SECOND_SHADE = color.fur_shade
    }
  },

  setColor({ color, globals }, { path, value }) {
    color[path] = value

    if (!globals.eyes_right_enable) {
      color.eyes_right_basic = color.eyes_left_basic
    }

    if (globals.fur_second_color) {
      color.fur_SECOND = color.fur_second_basic
      color.fur_SECOND_SHADE = color.fur_second_shade
    } else {
      color.fur_SECOND = color.fur_basic
      color.fur_SECOND_SHADE = color.fur_shade
    }
  },

  setAllGlobals: (state, globals) => {
    state.globals = globals

    if (state.globals.fur_second_color) {
      state.color.fur_SECOND = state.color.fur_second_basic
      state.color.fur_SECOND_SHADE = state.color.fur_second_shade
    } else {
      state.color.fur_SECOND = state.color.fur_basic
      state.color.fur_SECOND_SHADE = state.color.fur_shade
    }
  },

  setAllColors: (state, color) => {
    state.color = color

    if (state.globals.fur_second_color) {
      state.color.fur_SECOND = state.color.fur_second_basic
      state.color.fur_SECOND_SHADE = state.color.fur_second_shade
    } else {
      state.color.fur_SECOND = state.color.fur_basic
      state.color.fur_SECOND_SHADE = state.color.fur_shade
    }
  },

  setHairsList: ({ hairsList }, string) => {
    if (!hairsList.includes(string)) {
      hairsList.push(string)
    }
  },

  setAllHairsList: (state, array) => (state.hairsList = array),

  setAnimationSavesSlot: (state, slot) => (state.animationSavesSlot = slot)
}

export const actions = {
  setAvatar({ commit }, { globals, color }) {
    commit('setAllGlobals', globals)
    commit('setAllColors', color)
  }
}
