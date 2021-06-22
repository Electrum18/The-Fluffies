import create from 'zustand'
import { addEnumsToObject } from '@/libs/enums'

const useAnimations = create((set) => ({
  morphsList: {},

  setMorphsList: (key, value) =>
    set((state) => ({
      morphsList: { ...state.morphsList, [key]: addEnumsToObject(value) },
    })),
}))

export default useAnimations
