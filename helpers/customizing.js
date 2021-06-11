import create from 'zustand'

import { configs } from '@/libs/configs'

const useCustomizing = create((set, get) => ({
  index: null,
  config: [],
  setConfig: (index) =>
    get().index !== index
      ? set({ config: configs[index], index })
      : set({ config: [], index: null }),
  closeWindow: () => set({ config: [], index: null }),
}))

export default useCustomizing
