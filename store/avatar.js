import PropertiesConfig from '~/assets/json/configs/properties.json'
import ColorConfig from '~/assets/json/configs/color.json'

// Import lists configs

import Hairs from '~/assets/json/configs/names/hair.json'
import Horns from '~/assets/json/configs/names/horn.json'
import Glasses from '~/assets/json/configs/names/glasses.json'

// Apply lists configs

PropertiesConfig.hair_info = Hairs
PropertiesConfig.horn_info = Horns
PropertiesConfig.glasses_info = Glasses

const defaultValue = {
  angle: 0,
  horiz: 0,
  degress: 12.5,

  propers: PropertiesConfig,
  color: ColorConfig
}

export const state = () => ({
  ...defaultValue,

  hairsList: [],

  default: defaultValue // Default constant params
})

export const getters = {
  getAngle: (state) => state.ang,
  getHoriz: (state) => state.horiz,
  getDegress: (state) => state.degress,

  getProper: (state) => state.propers,
  getColor: (state) => state.color,

  getDefault: (state) => state.default,

  getHairsList: (state) => state.hairsList
}

export const mutations = {
  setAngle: (state, value) => (state.ang = value),
  setHoriz: (state, value) => (state.horiz = value),
  setDegress: (state, value) => (state.degress = value),

  setProper({ propers, color }, { path, value }) {
    propers[path] = value

    if (!propers.eyes_right_enable) {
      color.eyes_right_basic = color.eyes_left_basic
    }

    propers.horn_IS_DEFAULT = propers.horn_enable && !propers.horn_changeling
    propers.horn_IS_CHANGELING = propers.horn_enable && propers.horn_changeling
  },

  setColor({ color, propers }, { path, value }) {
    color[path] = value

    if (!propers.eyes_right_enable) {
      color.eyes_right_basic = color.eyes_left_basic
    }
  },

  setAllPropers: (state, value) => (state.propers = value),
  setAllColors: (state, value) => (state.color = value),

  setHairsList: ({ hairsList }, string) => {
    if (!hairsList.includes(string)) {
      hairsList.push(string)
    }
  },

  setAllHairsList: (state, array) => (state.hairsList = array)
}

export const actions = {
  setAvatar({ commit }, { angle, horiz, degress, propers, color }) {
    commit('setAngle', angle)
    commit('setHoriz', horiz)
    commit('setDegress', degress)

    commit('setAllPropers', propers)
    commit('setAllColors', color)
  }
}
