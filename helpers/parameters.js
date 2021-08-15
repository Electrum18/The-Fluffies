import produce from 'immer'
import create from 'zustand'

import booleans from '@/configs/default/booleans.json'
import colors from '@/configs/default/color.json'
import names from '@/configs/default/names.json'
import {
  getSaves,
  getSaveValue,
  parsePersonSave,
  validateSaves
} from '@/libs/saves'

const saveDefaultData = { names, booleans, colors }

function getStoredSaves() {
  try {
    const saves = localStorage.getItem('avatars')

    return saves && validateSaves(JSON.parse(saves))
  } catch {
    return
  }
}

function getStoredSlot() {
  try {
    const slot = +localStorage.getItem('slot')

    if (!isNaN(slot) && typeof slot === 'number') return slot
  } catch {
    return 0
  }
}

const saves = getStoredSaves() || [{ ...saveDefaultData }]
const slot = getStoredSlot() || 0

const useParameters = create(set => ({
  saves,
  slot: saves[slot] ? slot : 0,

  profile: {
    saves: [],
    slot: 0,
    selected: false
  },

  setName: (key, value) =>
    set(
      produce(state => {
        getSaveValue(state, 'names')[key] = value
      })
    ),

  setBoolean: (key, value) =>
    set(
      produce(state => {
        getSaveValue(state, 'booleans')[key] = value
      })
    ),

  setColor: (key, { h, s, l, a }) => {
    const postColor = { h, s: s / 100, l: l / 100 }

    if (a) postColor.a = a

    set(
      produce(state => {
        getSaveValue(state, 'colors')[key] = postColor
      })
    )
  },

  setMale: value =>
    set(
      produce(state => {
        getSaveValue(state, 'booleans').male = value
      })
    ),

  setSlot: slot =>
    set(
      produce(state => {
        if (state.profile.selected) {
          state.profile.slot = slot
        } else {
          state.slot = slot
        }
      })
    ),

  addSave: () =>
    set(
      produce(state => {
        getSaves(state).push({ ...saveDefaultData })

        if (state.profile.selected) {
          state.profile.slot = state.profile.saves.length - 1
        } else {
          state.slot = state.saves.length - 1
        }
      })
    ),

  deleteSave: index =>
    set(
      produce(state => {
        getSaves(state).splice(index, 1)

        if (state.profile.selected) {
          state.profile.slot =
            index > state.profile.saves.length - 1
              ? state.profile.saves.length - 1
              : index < 0
              ? 0
              : index
        } else {
          state.slot =
            index > state.saves.length - 1
              ? state.saves.length - 1
              : index < 0
              ? 0
              : index
        }
      })
    ),

  parseSave: ({ target: { files } }) => {
    const reader = new FileReader()

    reader.readAsText(files[0])

    reader.onload = () => {
      const { names, booleans, color } = parsePersonSave(
        JSON.parse(reader.result)
      )

      set(
        produce(state => {
          getSaves(state).push({ names, booleans, colors: color })

          if (state.profile.selected) {
            state.profile.slot = state.profile.saves.length - 1
          } else {
            state.slot = state.saves.length - 1
          }
        })
      )
    }

    reader.onerror = () => console.log(reader.error)
  },

  setIsProfile: value =>
    set(
      produce(state => {
        state.profile.selected = value
      })
    ),

  setProfileSaves: _saves =>
    set(
      produce(state => {
        state.profile.saves = _saves.length ? _saves : [{ ...saveDefaultData }]
      })
    ),

  setProfileSlot: slot =>
    set(
      produce(state => {
        state.profile.slot = slot
      })
    ),

  setSaveOnlineOrOffline: () =>
    set(
      produce(state => {
        let save

        if (state.profile.selected) {
          save = state.profile.saves.splice(state.profile.slot, 1)[0]
          state.profile.slot = 0
        } else {
          save = state.saves.splice(state.slot, 1)[0]
          state.slot = 0
        }

        state.profile.selected = !state.profile.selected

        getSaves(state).push(save)

        if (state.profile.selected) {
          state.profile.slot = state.profile.saves.length - 1
        } else {
          state.slot = state.saves.length - 1
        }

        if (state.saves.length < 1) state.saves.push({ ...saveDefaultData })

        if (state.profile.saves.length < 1) {
          state.profile.saves.push({ ...saveDefaultData })
        }
      })
    )
}))

export default useParameters
