import { BufferGeometry } from 'three'
import create from 'zustand'

import Materials from '@/configs/materials.json'

import { createMaterials } from '@/libs/materials'

const useResources = create((set) => ({
  geometries: {
    Empty: new BufferGeometry(),
  },

  materials: createMaterials(Materials),
  textures: {},

  light: {},
  ambientLight: {},

  addGeometry: (key, geometry) =>
    set((state) => ({ geometries: { ...state.geometries, [key]: geometry } })),

  addTexture: (key, texture) =>
    set((state) => ({ textures: { ...state.textures, [key]: texture } })),

  setLight: (light) => set({ light }),
  setAmbientLight: (ambientLight) => set({ ambientLight }),
}))

export default useResources
