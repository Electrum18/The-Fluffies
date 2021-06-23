import create from 'zustand'
import { addEnumsToObject } from '@/libs/enums'

const useAnimations = create((set) => ({
  play: false,
  loop: false,

  folded: false,

  position: 0,

  morphsList: {},

  setPlay: (play) => set({ play }),
  setLoop: (loop) => set({ loop }),

  setFolded: (folded) => set({ folded }),

  setPosition: (value) =>
    set({ position: value > 1 ? 1 : value < 0 ? 0 : value }),

  setMorphsList: (key, value) =>
    set((state) => ({
      morphsList: { ...state.morphsList, [key]: addEnumsToObject(value) },
    })),
}))

export default useAnimations
