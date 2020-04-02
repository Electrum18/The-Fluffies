export const state = () => ({
  page: false,
  animate: false
})

export const getters = {
  getPage: (state) => state.page,
  getAnimate: (state) => state.animate
}

export const mutations = {
  setPage(state, name) {
    state.page = name
  },

  setAnimate(state, boolean) {
    state.animate = boolean
  }
}
