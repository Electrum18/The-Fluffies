import create from 'zustand'
import produce from 'immer'

import { generateNameIndexes } from '@/libs/nameIndexes'

import { parsePersonSave } from '@/libs/saves'

import names from '@/configs/default/names.json'
import booleans from '@/configs/default/booleans.json'
import properties from '@/configs/default/properties.json'
import Colors from '@/configs/default/color.json'

const colors = {}

for (const key in Colors) {
  if (!key.match(/_shade/)) colors[key] = Colors[key]
}

const useParameters = create((set) => ({
  names,
  booleans,
  properties,
  colors,

  saves: [{ names, booleans, colors, nameIndexes: generateNameIndexes() }],

  slot: 0,

  nameIndexes: generateNameIndexes(),

  setName: (key, value, index) =>
    set(
      produce((state) => {
        state.saves[state.slot].names[key] = value
        state.saves[state.slot].nameIndexes[key] = (index / 6) | 0
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

  parseSave: ({ target: { files } }) => {
    const reader = new FileReader()

    reader.readAsText(files[0])

    reader.onload = () => {
      const { names, booleans, color } = parsePersonSave(
        JSON.parse(reader.result)
      )

      set(
        produce((state) => {
          state.saves[state.slot].names = names
          state.saves[state.slot].booleans = booleans
          state.saves[state.slot].colors = color
        })
      )
    }

    reader.onerror = () => console.log(reader.error)
  },
}))

export default useParameters
