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
      v-btn.panel-buttons.transition(
        @click="close"
        fab
        absolute
        right
        :style="buttonHeight"
      )
        v-icon(large) {{ icons.mdiClose }}

      v-btn.panel-buttons.left-button.transition(
        @click="smaller"
        fab
        absolute
        right
        :style="buttonHeight"
      )
        v-icon(x-large) {{ this.small ? icons.mdiChevronUp : icons.mdiChevronDown }}

      v-row.px-6
        v-col(cols="12").third-col
          p 0:0{{ ~~(valTime / 100) }}:{{ valTime }}

        v-col(cols="12").third-col.text-center
          v-btn.mx-2(
            @click="valTime = 0"
            icon
            color="primary"
          )
            v-icon {{ icons.mdiSkipPrevious }}

          v-btn.start-button(
            @click="playing = !playing"
            fab
            light
          )
            v-icon(large) {{ this.playing ? icons.mdiPause : icons.mdiPlay }}

          v-btn.mx-2(icon color="primary")
            v-icon {{ icons.mdiRepeat }}

        v-col(cols="12").third-col.text-right
          p 0:02

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

        @mousemove="onDrag"
        @touchmove="onDrag"
      )
        v-row.mx-1
          .time-divider(v-for="elem, i in 36")
            p.pa-1.time.text-end.caption {{ i / 2 }}s

        v-row.mx-1.my-n2
          v-card.mx-2.px-4.arrows(
            v-for="elem, i in sequencce"

            :key="'frame' + i"
            :width="(elem.duration * 256) - 16"
            :style="frame === i ? 'border: solid 4px #fa0' : 'border: solid 0px #fa0'"

            @click="frame = i"

            height=96
            color="#222"
          )
            v-row.px-4(
              :style="frame === i ? 'margin-top: -4px' : false"
            )
              v-card.mx-n2.my-4(width=96 height=64)
                v-img.grey(width=96 height=64)

              v-col.px-6.py-4.overline
                p.my-1.primary--text frame №{{ i + 1 }}
                p.mb-1(style="color: #aaa") duration {{ elem.duration }}s

            v-btn.sizing(
              icon
              color="primary"
              absolute
              right
              small

              @mousedown="startDrag($event, i)"
              @touchstart="startDrag($event, i)"
            )
              v-icon {{ icons.mdiArrowLeftRightBold }}

        v-row.mx-1
          .timeline(
            :style="{ left: (valTime / 50) * 128 + 'px' }"
          )
            div
</template>

<script>
import Vue from 'vue'

import { mapMutations, mapGetters } from 'vuex'

import {
  mdiSkipPrevious,
  mdiPlay,
  mdiPause,
  mdiRepeat,
  mdiClose,
  mdiChevronDown,
  mdiChevronUp,
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
      sequencce: [
        { duration: 1 },
        { duration: 1 },
        { duration: 2 },
        { duration: 3 },
        { duration: 2 }
      ],

      playing: false,
      small: false,

      dragging: false,

      frame: 0,

      selected: {
        index: 0,
        value: { ref: 0, temp: 0 },
        timer: undefined
      },

      last: {
        x: 0
      },

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
    },

    'selected.value.temp'(value) {
      const { selected } = this

      if (selected.timer) clearTimeout(selected.timer)

      const refValue = this.sequencce[selected.index]

      refValue.duration = ((value * 10) | 0) / 10

      selected.timer = setTimeout(() => {
        Vue.set(this.sequencce, selected.index, refValue)
      }, 10)
    }
  },

  mounted() {
    window.addEventListener('mouseup', this.stopDrag)
    window.addEventListener('touchend', this.stopDrag)
    window.addEventListener('touchcancel', this.stopDrag)
  },

  methods: {
    ...mapMutations('interface', ['setPage', 'setAnimate']),

    close() {
      this.setPage(false)
    },

    smaller() {
      this.setAnimate(!this.getAnimate)

      this.small = this.getAnimate
    },

    startDrag(e, index) {
      if (!e.pageX && e.touches) e = e.touches[0]

      this.last.x = e.pageX

      this.selected.index = index
      this.selected.value.ref = this.sequencce[index].duration

      this.dragging = true
    },

    onDrag(e) {
      if (this.dragging) {
        if (!e.pageX && e.touches) e = e.touches[0]

        const move = e.pageX - this.last.x

        this.selected.value.temp = this.selected.value.ref + move / 256
      }
    },

    stopDrag() {
      this.dragging = false
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

.panel-buttons
  margin-top: -68px!important

.left-button
  margin-right: 70px!important

.arrows
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-6 -4 14.5 110'%3E%3Crect fill='%23FFFFFF' width='6' height='10'/%3E%3Crect fill='%23FFFFFF' y='92.5' width='6' height='10'/%3E%3C/svg%3E")
  background-repeat-x: repeat
  margin-top: 40px!important
  transition: width 300ms ease, border 500ms ease
  overflow: hidden

  .row.px-4
    transition: margin-top 500ms ease

  .sizing
    top: 50%
    right: 4px
    transform: translateY(-50%)

.time-divider
  width: 1px
  margin-left: 127px
  margin-bottom: -152px
  background: #0002

  p.time
    width: 128px!important
    position: relative!important
    left: -126px!important

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
