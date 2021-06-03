import create from 'zustand'

import Globals from '@/configs/default/globals.json'
import Colors from '@/configs/default/color.json'

const useParameters = create((set) => ({
  values: Globals,
  colors: Colors,
  setValue: (key, value) =>
    set((state) => ({ values: { ...state.values, [key]: value } })),
  setColor: (key, color) =>
    set((state) => ({ colors: { ...state.colors, [key]: color } })),
}))

export default useParameters
