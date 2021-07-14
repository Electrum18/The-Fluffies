import create from 'zustand'
import produce from 'immer'

import { addEnumsToObject } from '@/libs/enums'

import properties from '@/configs/default/properties.json'
import positions from '@/configs/default/positions.json'

const useAnimations = create((set) => ({
  fps: 60,

  play: false,
  loop: false,

  folded: false,

  position: 0,

  morphsList: {},

  saves: [
    {
      name: 'Reared up',
      frames: [{ duration: 1, frame: { ...properties, ...positions } }],
    },
  ],

  slot: 0,
  selected: 0,

  setPlay: (play) => set({ play }),
  setLoop: (loop) => set({ loop }),

  setFolded: (folded) => set({ folded }),

  setPosition: (value) =>
    set({ position: value > 1 ? 1 : value < 0 ? 0 : value }),

  setMorphsList: (key, value) =>
    set((state) => ({
      morphsList: { ...state.morphsList, [key]: addEnumsToObject(value) },
    })),

  setProperty: (key, value) =>
    set(
      produce((state) => {
        state.saves[state.slot].frames[state.selected].frame[key] = value
      })
    ),

  setDuration: (index, value) =>
    set(
      produce((state) => {
        state.saves[state.slot].frames[index].duration = value
      })
    ),

  setSelectedFrame: (selected) => set({ selected }),

  addFrame: () =>
    set(
      produce((state) => {
        state.saves[state.slot].frames.splice(state.selected + 1, 0, {
          duration: 1,
          frame: { ...properties, ...positions },
        })
      })
    ),

  deleteFrame: () =>
    set(
      produce((state) => {
        state.saves[state.slot].frames.splice(state.selected, 1)
        state.selected =
          state.selected > state.saves[state.slot].frames.length - 1
            ? state.saves[state.slot].frames.length - 1
            : state.selected < 0
            ? 0
            : state.selected
      })
    ),
}))

export default useAnimations
