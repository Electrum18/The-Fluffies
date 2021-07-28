import create from 'zustand'

const useMenu = create((set, get) => ({
  page: null,

  setPage: index => set({ page: get().page !== index ? index : null }),
  closePages: () => set({ page: null })
}))

export default useMenu
