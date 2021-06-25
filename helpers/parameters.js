import create from 'zustand'

import { generateNameIndexes } from '@/libs/nameIndexes'

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

  nameIndexes: generateNameIndexes(),

  setName: (key, value, index) =>
    set((state) => ({
      names: { ...state.names, [key]: value },
      nameIndexes: { ...state.nameIndexes, [key]: (index / 6) | 0 },
    })),

  setProperty: (key, value) =>
    set((state) => ({ properties: { ...state.properties, [key]: value } })),

  setBoolean: (key, value) =>
    set((state) => ({ booleans: { ...state.booleans, [key]: value } })),

  setColor: (key, { h, s, l, a }) => {
    const postColor = { h, s: s / 100, l: l / 100 }

    if (a) postColor.a = a

    set((state) => ({ colors: { ...state.colors, [key]: postColor } }))
  },

  setMale: (value) =>
    set((state) => ({
      booleans: { ...state.booleans, male: value },
      properties: { ...state.properties, male_morph: +value * 100 },
    })),
}))

export default useParameters
