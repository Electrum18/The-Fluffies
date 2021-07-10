import create from 'zustand'
import produce from 'immer'

import { parsePersonSave } from '@/libs/saves'

import names from '@/configs/default/names.json'
import booleans from '@/configs/default/booleans.json'
import colors from '@/configs/default/color.json'
import properties from '@/configs/default/properties.json'

const saveDefaultData = { names, booleans, colors }

const useParameters = create((set) => ({
  properties,

  saves: [{ ...saveDefaultData }],
  slot: 0,

  setName: (key, value) =>
    set(
      produce((state) => {
        state.saves[state.slot].names[key] = value
      })
    ),

  setProperty: (key, value) =>
    set((state) => ({ properties: { ...state.properties, [key]: value } })),

  setBoolean: (key, value) =>
    set(
      produce((state) => {
        state.saves[state.slot].booleans[key] = value
      })
    ),

  setColor: (key, { h, s, l, a }) => {
    const postColor = { h, s: s / 100, l: l / 100 }

    if (a) postColor.a = a

    set(
      produce((state) => {
        state.saves[state.slot].colors[key] = postColor
      })
    )
  },

  setMale: (value) =>
    set(
      produce((state) => {
        state.saves[state.slot].booleans.male = value
        state.properties.male_morph = +value * 100
      })
    ),

  setSlot: (value) => set({ slot: value }),

  addSave: () =>
    set(
      produce((state) => {
        state.saves.push({ ...saveDefaultData })
        state.slot = state.saves.length - 1
      })
    ),

  deleteSave: (index) =>
    set(
      produce((state) => {
        state.saves.splice(index, 1)
        state.slot =
          index > state.saves.length - 1
            ? state.saves.length - 1
            : index < 0
            ? 0
            : index
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
        produce((state) => {
          state.saves.push({ names, booleans, colors: color })
          state.slot = state.saves.length - 1
        })
      )
    }

    reader.onerror = () => console.log(reader.error)
  },
}))

export default useParameters
