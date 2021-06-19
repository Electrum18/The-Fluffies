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

  setColor: (key, color) =>
    set((state) => ({ colors: { ...state.colors, [key]: color } })),
}))

export default useParameters
