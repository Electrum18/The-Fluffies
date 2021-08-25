import { BufferGeometry, Skeleton } from 'three'
import create from 'zustand'

import Materials from '@/configs/materials.json'
import { createMaterials } from '@/libs/materials'

const useResources = create(set => ({
  geometries: {
    Empty: new BufferGeometry()
  },

  materials: createMaterials(Materials),
  textures: {},

  light: {},
  camera: {},

  skeleton: new Skeleton([]),

  addGeometry: (key, geometry) =>
    set(state => ({ geometries: { ...state.geometries, [key]: geometry } })),

  addTexture: (key, texture) =>
    set(state => ({ textures: { ...state.textures, [key]: texture } })),

  setLight: light => set({ light }),
  setCamera: camera => set({ camera }),

  setSkeleton: skeleton => set({ skeleton })
}))

export default useResources
