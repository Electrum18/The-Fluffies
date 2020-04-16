<template lang="pug">
  v-bottom-sheet(
    v-model="opened"

    hide-overlay
    persistent
    no-click-animation
  )
    v-sheet.text-center(dark tile)
      v-container
        v-btn(
          @click="close"

          absolute
          right

          :style="topButtons"
        ) {{ (getRendering || !getRendered) ? 'cancel' : 'close' }}

        v-progress-linear.mt-n3(
          :value="getPlayVal * 100"

          striped
          absolute
          height=8
          :color="getRendering ? 'primary' : 'lime accent-4'"
        )

      v-row
        v-col(cols="4").py-0.d-none.d-md-block
          p.mx-6.mb-0.mt-n2.text-left {{ formatTime(~~(progress / 10) / 10) }}s

        v-col(cols="4").py-0.d-none.d-md-block
          v-chip.title(
            v-if="getRendering && !getRendered"
            label
            color="yellow accent-3"
            outlined
          ) {{ $t('editor.recorder.wait') }}...

          v-chip.title(
            v-if="!getRendering && !getRendered"
            label
            color="yellow accent-4"
            outlined
          ) {{ $t('editor.recorder.preparing') }}...
            v-progress-circular.ml-2(
              :size="25"
              indeterminate
            )

          v-chip.title(
            v-if="!getRendering && getRendered"
            label
            color="lime accent-4"
            outlined
          ) {{ $t('editor.recorder.ready') }}

        v-col(cols="4").py-0.d-none.d-md-block
          p.mx-6.mb-0.mt-n2.text-right
            span {{ $t('editor.recorder.left') }}:
              span.ml-2.primary--text {{ formatTime(~~(leftProgress / 10) / 10, true) }}s
            span.mx-2 •
            | {{ formatTime(getFullTime) }}s

        // For small screen sizes

        v-col(cols="6").py-0.d-block.d-md-none
          p.mx-6.mb-0.mt-n2.text-left {{ formatTime(~~(progress / 10) / 10) }}s

        v-col(cols="6").py-0.d-block.d-md-none
          p.mx-6.mb-0.mt-n2.text-right
            span {{ $t('editor.recorder.left') }}:
              span.ml-2.primary--text {{ formatTime(~~(leftProgress / 10) / 10, true) }}s
            span.mx-2 •
            | {{ formatTime(getFullTime) }}s

        v-col(cols="12").pt-0.pb-2.d-block.d-md-none
          v-chip.title(
            v-if="getRendering && !getRendered"
            label
            color="yellow accent-3"
            outlined
          ) {{ $t('editor.recorder.wait') }}...

          v-chip.title(
            v-if="!getRendering && !getRendered"
            label
            color="yellow accent-4"
            outlined
          ) {{ $t('editor.recorder.preparing') }}...
            v-progress-circular.ml-2(
              :size="25"
              indeterminate
            )

          v-chip.title(
            v-if="!getRendering && getRendered"
            label
            color="lime accent-4"
            outlined
          ) {{ $t('editor.recorder.ready') }}
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters('avatar', ['getFrames']),
    ...mapGetters('interface', [
      'getPage',
      'getPlayVal',
      'getPlayLen',
      'getRendering',
      'getRendered'
    ]),

    opened: {
      get() {
        return this.open
      },

      set() {
        this.setPage(false)
      }
    },

    progress() {
      return (this.getPlayVal * this.getPlayLen * 100) | 0
    },

    leftProgress() {
      return ((1 - this.getPlayVal) * this.getPlayLen * 100) | 0
    },

    topButtons() {
      return this.getPage ? { 'margin-top': '-56px' } : { 'margin-top': '0px' }
    },

    getFullTime() {
      const { getFrames } = this

      let duration = 0

      for (let i = 0; i < getFrames.length - 1; i++) {
        duration += getFrames[i].duration
      }

      return duration
    }
  },

  watch: {
    getPlayVal(value) {
      if (value === 1) {
        this.setPlaying(false)
        this.setRendering(false)
      }
    }
  },

  methods: {
    ...mapMutations('interface', [
      'setPage',
      'setPlaying',
      'setRendering',
      'setPlayVal',
      'setPlaySeek'
    ]),

    close() {
      this.setPage(false)

      if (this.getPlayVal < 1) {
        this.setPlaying(false)
        this.setPlayVal(0)
        this.setPlaySeek()

        this.setRendering(false)
      }
    },

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
    }
  }
}
</script>
