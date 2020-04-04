export const state = () => ({
  page: false,
  animate: false,
  incompatibility: false
})

export const getters = {
  getPage: (state) => state.page,
  getAnimate: (state) => state.animate,
  getIncompatibility: (state) => state.incompatibility
}

export const mutations = {
  setPage: (state, name) => (state.page = name),
  setAnimate: (state, boolean) => (state.animate = boolean),
  setIncompatibility: (state, boolean) => (state.incompatibility = boolean)
}
