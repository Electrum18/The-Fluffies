import produce from 'immer'
import create from 'zustand'

import properties from '@/configs/default/properties.json'
import { addEnumsToObject } from '@/libs/enums'

const useEmotions = create(set => ({
  morphsList: {},

  emotions: { ...properties },

  setMorphsList: (key, value) =>
    set(state => ({
      morphsList: { ...state.morphsList, [key]: addEnumsToObject(value) }
    })),

  setEmotion: (key, value) =>
    set(
      produce(state => {
        state.emotions[key] = value
      })
    )
}))

export default useEmotions
