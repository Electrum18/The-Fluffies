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
              label="Quality"
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
import { mapGetters, mapMutations } from 'vuex'

import BarColor from './BarColors.vue'

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

  data() {
    return {
      size: '480p',
      resolutions: {
        types: [
          '2160p',
          '1440p',
          '1080p',
          '720p',
          '480p',
          '360p',
          '240p',
          '144p'
        ],

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
      },

      frame: 60,
      frames: [15, 20, 30, 60]
    }
  },

  computed: {
    ...mapGetters('avatar', ['getFrames']),

    opened: {
      get() {
        return this.open
      },

      set() {
        this.setPage(false)
      }
    },

    getFullTime() {
      const { getFrames } = this

      let duration = 0

      for (let i = 0; i < getFrames.length - 1; i++) {
        duration += getFrames[i].duration
      }

      return duration
    },

    renderSpeed() {
      const { resolutions, size, frame } = this
      const { types, sizes } = resolutions

      const quality = sizes[types.indexOf(size)][1]
      const fps = frame / 60

      return (((quality / 1024) * fps * 10) | 0) / 10
    },

    multiplier() {
      const mul = ~~((this.renderSpeed - 1) * 100)

      return mul > 0 ? '+' + mul + '%' : mul + '%'
    }
  },

  watch: {
    size(quality) {
      const { types, sizes } = this.resolutions

      this.setQuality(sizes[types.indexOf(quality)][1])
    },

    frame(fps) {
      this.setFPS(fps)
    }
  },

  methods: {
    ...mapMutations('interface', [
      'setPage',
      'setRendering',
      'resetRendered',
      'setFPS',
      'setQuality'
    ]),

    formatTime(value, compact) {
      let minutes = (value / 60) | 0
      let seconds = (value - minutes * 60) | 0

      const milliseconds = ~~((value - seconds) * 10)
      const haveMins = compact ? minutes > 0 : true

      if (minutes < 10) minutes = '0' + minutes
      if (haveMins && seconds < 10) seconds = '0' + seconds

      return haveMins
        ? minutes + ':' + seconds + '.' + milliseconds
        : seconds + '.' + milliseconds
    },

    render() {
      this.setRendering(true)
      this.resetRendered()
    }
  }
}
</script>
