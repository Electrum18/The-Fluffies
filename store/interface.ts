import { GetterTree, MutationTree } from 'vuex'

export const state = () => ({
  page: false as string | boolean,
  animate: false,

  animating: {
    playing: false,
    value: 0,
    length: 0,
    seek: 0,
    repeat: 1,
    redraw: 0,
    changed_frame: 0
  },

  fps: 60,
  quality: 720,

  rendering: 0,
  rendered: 0,

  wind: {
    enabled: true
  }
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  getPage: ({ page }) => page,
  getAnimate: ({ animate }) => animate,
  getPlaying: ({ animating }) => animating.playing,

  getPlayVal: ({ animating }) => animating.value,
  getPlayLen: ({ animating }) => animating.length,
  getPlaySeek: ({ animating }) => animating.seek,
  getPlayRepeat: ({ animating }) => animating.repeat,
  getPlayRedraw: ({ animating }) => animating.redraw,
  getPlayChangedFrame: ({ animating }) => animating.changed_frame,

  getRendering: ({ rendering }) => rendering,
  getRendered: ({ rendered }) => rendered,

  getFPS: ({ fps }) => fps,
  getQuality: ({ quality }) => quality,

  getWind: ({ wind }) => wind.enabled
}

export const mutations: MutationTree<RootState> = {
  setPage: (state, name) => (state.page = name),
  setAnimate: (state, boolean) => (state.animate = boolean),
  setPlaying: (state, boolean) => (state.animating.playing = boolean),

  setPlayVal: (state, value) => (state.animating.value = value),
  setPlayLen: (state, value) => (state.animating.length = value),

  setPlaySeek: (state) => (state.animating.seek += 1),
  resetPlaySeek: (state) => (state.animating.seek = 0),

  setPlayRepeat: (state) => (state.animating.repeat += 1),
  resetPlayRepeat: (state) => (state.animating.repeat = 0),

  setPlayRedraw: (state) => (state.animating.redraw += 1),
  resetPlayRedraw: (state) => (state.animating.redraw = 0),

  setPlayChangedFrame: (state) => (state.animating.changed_frame += 1),
  resetPlayChangedFrame: (state) => (state.animating.changed_frame = 0),

  setRendering: (state, boolean) => {
    if (boolean) {
      state.page = 'recorderRender'

      state.animating.playing = true
      state.animating.value = 0
      state.animating.repeat = 0

      state.animating.seek += 1
    }

    state.rendering = boolean
  },

  setRendered: (state) => (state.rendered += 1),
  resetRendered: (state) => (state.rendered = 0),

  setFPS: (state, value) => (state.fps = value),
  setQuality: (state, array) => (state.quality = array),

  setWind: (state, bool) => (state.wind.enabled = bool)
}
