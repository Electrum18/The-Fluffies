import create from 'zustand'

const useTextures = create((set) => ({
  textures: {},
  addTexture: (key, texture) =>
    set((state) => ({ textures: { ...state.textures, [key]: texture } })),
}))

export default useTextures
