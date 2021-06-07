import { BufferGeometry } from 'three'
import create from 'zustand'

const useResources = create((set) => ({
  geometries: {
    Empty: new BufferGeometry(),
  },
  addGeometry: (key, geometry) =>
    set((state) => ({ geometries: { ...state.geometries, [key]: geometry } })),
}))

export default useResources
