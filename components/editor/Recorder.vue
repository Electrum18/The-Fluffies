<template lang="pug">
  v-bottom-sheet(v-model="opened" hide-overlay)
    v-sheet.text-center(dark tile)
      v-container
        v-row
          v-col(cols="6" sm="3" md="2" lg="2" xl="2")
            v-combobox(
              v-model="size"

              color="primary"
              :items="resolutions.types"
              :label="$t('editor.quality')"
              outlined
              hide-details
            )

          v-col(cols="6" sm="2" md="2" lg="2" xl="2")
            v-combobox(
              v-model="frame"

              color="primary"
              :items="frames"
              label="FPS"
              outlined
              hide-details
            )

          v-col(cols="12" sm="7" md="3" lg="3" xl="3")
            BarColor(
              :text="$t('editor.screener.background')"
              val="background_basic"
            )

          v-col(cols="8" sm="9" md="3" lg="3" xl="3")
            p.mx-2.my-0.text-left
              | {{ $t('editor.animator.duration') }}:
              span.mx-2.primary--text {{ formatTime(getFullTime, true) }}s

            p.mx-2.mb-0.text-left
              | {{ $t('editor.recorder.duration') }}:
              span.mx-2.primary--text ~{{ formatTime(getFullTime * renderSpeed, true) }}s
              span.grey--text {{ multiplier }}

          v-col(cols="2" sm="3" md="2" lg="2" xl="2")
            v-btn.my-1(
              @click="render"
              light
              large
            ) {{ $t('editor.recorder.start') }}
</template>

<script>
import { reactive, watch, computed, toRefs } from '@vue/composition-api'

import BarColor from './BarColors.vue'

function Resolutions(getters, commit) {
  const resolutions = reactive({
    types: ['2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'],

    sizes: [
      [3840, 2160],
      [2560, 1440],
      [1920, 1080],
      [1280, 720],
      [854, 480],
      [640, 360],
      [426, 240],
      [256, 144]
    ]
  })

  const size = computed({
    get: () => getters['interface/getQuality'] + 'p',
    set(quality) {
      const { types, sizes } = resolutions

      commit('interface/setQuality', sizes[types.indexOf(quality)][1])
    }
  })

  return { resolutions, size }
}

function Frames(commit) {
  const FPS = reactive({
    frames: [15, 20, 30, 60],
    frame: 60
  })

  watch(
    () => FPS.frame,
    (fps) => commit('interface/setFPS', fps)
  )

  return { ...toRefs(FPS) }
}

function counters(getters, commit) {
  const { resolutions, size } = Resolutions(getters, commit)
  const { frames, frame } = Frames(commit)

  const getFrames = computed(() => getters['avatar/getFrames'])

  const renderSpeed = computed(() => {
    const { types, sizes } = resolutions

    const quality = sizes[types.indexOf(size.value)][1]
    const fps = frame.value / 60

    return (((quality / 1024) * fps * 10) | 0) / 10
  })

  const getFullTime = computed(() => {
    let duration = 0

    const frames = getFrames.value

    for (let i = 0; i < frames.length - 1; i++) {
      duration += frames[i].duration
    }

    return duration
  })

  const multiplier = computed(() => {
    const mul = ~~((renderSpeed.value - 1) * 100)

    return mul > 0 ? '+' + mul + '%' : mul + '%'
  })

  return {
    resolutions,
    size,

    frames,
    frame,

    getFrames,
    getFullTime,
    renderSpeed,
    multiplier
  }
}

export default {
  components: {
    BarColor
  },

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  setup(proper, { root: { $store } }) {
    const { getters, commit } = $store

    function render() {
      commit('interface/setRendering', true)
      commit('interface/resetRendered')
    }

    function formatTime(value, compact) {
      let minutes = (value / 60) | 0
      let seconds = (value - minutes * 60) | 0

      const milliseconds = ~~((value - seconds) * 10)
      const haveMins = compact ? minutes > 0 : true

      if (minutes < 10) minutes = '0' + minutes
      if (haveMins && seconds < 10) seconds = '0' + seconds

      return haveMins ? minutes + ':' + seconds + '.' + milliseconds : seconds + '.' + milliseconds
    }

    const opened = computed({
      get: () => proper.open,
      set: () => commit('interface/setPage', false)
    })

    return {
      ...counters(getters, commit),

      opened,
      render,
      formatTime
    }
  }
}
</script>
