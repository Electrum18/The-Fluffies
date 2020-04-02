<template lang="pug">
  v-bottom-sheet(
    v-model="open"
    hide-overlay
    persistent
    no-click-animation
  )
    v-sheet.transition(
      :height='height'
      dark
      tile
    )
      v-row.px-6
        v-col(cols="12").third-col
          p 0:0{{ ~~(valTime / 100) }}

        v-col(cols="12").third-col.text-center
          v-btn.mx-2(icon color="primary")
            v-icon {{ icons.mdiSkipPrevious }}

          v-btn.start-button(
            @click="playing = !playing"
            fab
            light
          )
            v-icon(:size="playingSize") {{ icons.mdiPlay }}
            v-icon(:size="pauseSize") {{ icons.mdiPause }}

          v-btn.mx-2(icon color="primary")
            v-icon {{ icons.mdiRepeat }}

        v-col(cols="12").third-col.text-end
          p 0:02

        v-btn.transition(
          @click="close"
          fab
          absolute
          right
          :style="buttonHeight"
        )
          v-icon(large) {{ icons.mdiClose }}

        v-btn.left-button.transition(
          @click="smaller"
          fab
          absolute
          right
          :style="buttonHeight"
        )
          v-icon(:size="arrowDown") {{ icons.mdiChevronDown }}
          v-icon(:size="arrowUp") {{ icons.mdiChevronUp }}

      .my-n5

      v-slider.mx-6.slider(
        v-model="valTime"
        color="primary"
        max=200
        track-color="grey"
      )

      v-divider.my-n4

      v-card.mx-6.my-8.player-box(
        light
        flat
        height=152
      )
        v-row.mx-1
          .time-divider(v-for="elem, i in 36")
            p.pa-1.time.text-end.caption {{ (i + 1) / 2 }}s

        v-row.mx-1.my-n2
          v-card.mx-3.px-4.arrows(
            v-for="elem, i in sequencce"
            :key="'frame' + i"
            :width="(elem * 128 * 2) - 24"
            height=96
            color="#222"
          )
            v-row.px-4
              v-card.mx-n2.my-4(width=96 height=64)

              v-col.px-6.py-4.overline
                p.my-1(style="color: primary") frame №{{ i + 1 }}
                p(style="color: #aaa") duration {{ elem }}s

            v-btn.moving(
              fab
              absolute
              right
              x-small
            )
              v-icon {{ icons.mdiCursorMove }}

            v-btn.sizing(
              fab
              absolute
              right
              x-small
            )
              v-icon {{ icons.mdiArrowLeftRightBold }}

        v-row.mx-1
          .timeline(
            :style="{ left: (valTime / 50) * 128 + 'px' }"
          )
            div
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

import {
  mdiSkipPrevious,
  mdiPlay,
  mdiPause,
  mdiRepeat,
  mdiClose,
  mdiChevronDown,
  mdiChevronUp,
  mdiCursorMove,
  mdiArrowLeftRightBold
} from '@mdi/js'

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      sequencce: [1, 1, 2, 1, 1, 3, 3, 3, 3],

      playing: false,
      small: false,

      valTime: 0,

      timer: undefined,

      icons: {
        mdiSkipPrevious,
        mdiPlay,
        mdiPause,
        mdiRepeat,
        mdiClose,
        mdiChevronDown,
        mdiChevronUp,
        mdiCursorMove,
        mdiArrowLeftRightBold
      }
    }
  },

  computed: {
    ...mapGetters('interface', ['getAnimate']),

    buttonHeight() {
      if (this.opened) {
        return { 'margin-top': '-76px' }
      } else {
        return undefined
      }
    },

    height() {
      return this.small ? 74 : 260
    },

    arrowDown() {
      return this.small ? 0 : 42
    },

    arrowUp() {
      return this.small ? 42 : 0
    },

    playingSize() {
      return this.playing ? 0 : 42
    },

    pauseSize() {
      return this.playing ? 42 : 0
    }
  },

  watch: {
    playing(val) {
      if (val) {
        const self = this

        this.timer = setInterval(() => {
          if (self.valTime >= 200) {
            self.valTime = 0
          } else {
            self.valTime += 2
          }
        }, 20)
      } else {
        clearInterval(this.timer)
      }
    }
  },

  methods: {
    ...mapMutations('interface', ['setPage', 'setAnimate']),

    close() {
      this.setPage(false)
    },

    smaller() {
      this.setAnimate(!this.getAnimate)

      this.small = this.getAnimate
    }
  }
}
</script>

<style lang="sass">
.player-box
  width: calc(100% - 48px)
  overflow: overlay!important

  .row
    width: max-content!important

.left-button
  margin-right: 70px!important

.arrows
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-6 -4 14.5 110'%3E%3Crect fill='%23FFFFFF' width='6' height='10'/%3E%3Crect fill='%23FFFFFF' y='92.5' width='6' height='10'/%3E%3C/svg%3E")
  background-repeat-x: repeat
  margin-top: 40px!important

  .moving
    top: 12px
    right: -8px

  .sizing
    top: 52px
    right: -8px

.time-divider
  width: 1px
  margin-left: 127px
  margin-bottom: -152px
  background: #0002

  p.time
    width: 128px!important
    position: relative!important
    left: -132px!important

.start-button
  margin-top: -24px!important

.third-col
  flex: 0 0 33.33%!important
  max-width: 33.33%!important

.slider
  .v-slider__thumb-container, .v-slider__track-fill, .v-slider__track-background
    transition: none!important

.timeline
  width: 3px
  height: 100%
  background: #0afd
  position: absolute!important
  top: 0

  div
    margin: 0px -4px
    border-left: 6px solid transparent
    border-right: 5px solid transparent
    border-top: 11px solid #0afd

div.transition
  transition: height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)

button.transition
  transition: background 200ms linear, margin-top 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)
</style>
