import create from 'zustand'

const useCustomizing = create((set) => ({
  index: null,

  setConfig: (index) =>
    set((state) => ({ index: state.index !== index ? index : null })),

  closeWindow: () => set({ index: null }),
}))

export default useCustomizing
