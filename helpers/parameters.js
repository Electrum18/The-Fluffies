import create from 'zustand'

import Names from '@/configs/default/names.json'
import Booleans from '@/configs/default/booleans.json'
import Properties from '@/configs/default/properties.json'
import Colors from '@/configs/default/color.json'

const colors = {}

for (const key in Colors) {
  if (!key.match(/_shade/)) colors[key] = Colors[key]
}

const useParameters = create((set) => ({
  values: { ...Names, ...Booleans, ...Properties },
  colors,

  setValue: (key, value) =>
    set((state) => ({ values: { ...state.values, [key]: value } })),

  setColor: (key, color) =>
    set((state) => ({ colors: { ...state.colors, [key]: color } })),
}))

export default useParameters
