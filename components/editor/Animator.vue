<template lang="pug">
  v-bottom-sheet(
    v-model="open"
    hide-overlay
    persistent
    no-click-animation
  )
    v-sheet.transition(:height='height' dark tile)
      v-btn.panel-buttons.transition(
        @click="setPage('AnimateSaves')"
        fab
        absolute
        left
        large
        :style="topButtons"
      )
        v-icon {{ icons.mdiContentSave }}

      v-card.field-right(light :style="topInput")
        v-text-field.name-input.mx-3.px-0.py-1(
          v-model="saveName"
          color="primary"
          hide-details
        )
          v-icon(slot="append" color="primary") {{ icons.mdiPencil }}

      v-btn.panel-buttons.transition(
        @click="close"
        fab
        absolute
        right
        :style="topButtons"
      )
        v-icon(large) {{ icons.mdiClose }}

      v-btn.panel-buttons.left-button.transition(
        @click="smaller"
        fab
        absolute
        right
        :style="topButtons"
      )
        v-icon(x-large) {{ small ? icons.mdiChevronUp : icons.mdiChevronDown }}

      v-row.px-6
        v-col(cols="4")
          p {{ formatTime(~~(valTime / 10) / 10) }}

          v-slider(
            v-model="zoom"
            :label="'x' + (zoom / 10)"
            max=50
            min=5
            inverse-label
            hide-details
            style="margin-left: 96px; margin-top: -44px"
          )

        v-col(cols="4").text-center
          v-btn.mx-2(
            @click="valTime = 0"
            icon
            color="primary"
          )
            v-icon {{ icons.mdiSkipPrevious }}

          v-btn.start-button(@click="playing = !playing" fab light)
            v-icon(large) {{ playing ? icons.mdiPause : icons.mdiPlay }}

          v-btn.mx-2(
            @click="repeat = !repeat"
            icon
            color="primary"
            :outlined="repeat"
            :disabled="playing"
          )
            v-icon {{ repeat ? icons.mdiRepeatOff : icons.mdiRepeat }}

        v-col(cols="4").text-right
          p {{ formatTime(getFullTime()) }}

      .my-n5

      v-slider.mx-6.slider(
        v-model="valTime"
        color="primary"
        :max="percentLen"
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
        v-row.time-divider(:style="timeLines")
        v-row.mx-1.my-n2(style="background: transparent")
          v-card.mx-2.arrows(
            v-for="elem, i in sequence"

            :key="'frame' + i"
            :width="(elem.duration * 256 / (zoom / 10)) - 16"
            :style="frame === i ? 'border: solid 4px #fa0' : 'border: solid 0px #fa0'"

            @click="setFrame(i)"

            height=96
            color="#222"
          )
            p.time(v-if="sequence.length - 1 > i") {{ formatTime(getFullTime(i), true) }}s
            div.hidden.px-4
              v-row.px-4(:style="frame === i ? 'margin-top: -4px' : false")
                v-card.mx-n2.my-4(width=96 height=64)
                  v-img(:src="images[i]" width=96 height=64)
                    v-icon.center(v-if="images[i] === ''") {{ icons.mdiCursorPointer }}

                v-col.px-6.py-4.overline(v-if="sequence.length - 1 > i")
                  p.my-1.primary--text {{ $t('editor.animator.frame') }} №{{ i + 1 }}
                  p.mb-1.grey--text
                    | {{ $t('editor.animator.duration') }}
                    | {{ formatTime(elem.duration, true) }}s

                v-col.px-6.py-4.overline(v-if="sequence.length - 1 <= i")
                  p.my-5.pink--text.body-2.font-weight-black
                    | {{ $t('editor.animator.final') }}
                    | {{ $t('editor.animator.frame') }}

              v-btn.add(
                v-if="sequence.length - 1 > i"

                icon
                color="primary"
                absolute
                right
                small

                :disabled="playing"

                @click="add(i + 1)"
              )
                v-icon {{ icons.mdiPlus }}

              v-btn.delete(
                v-if="sequence.length - 1 > i && sequence.length > 2"

                icon
                color="primary"
                absolute
                right
                small

                :disabled="playing"

                @click="remove(i)"
              )
                v-icon {{ icons.mdiDelete }}

              v-btn.sizing(
                v-if="sequence.length - 1 > i"

                icon
                color="primary"
                absolute
                right
                small

                :disabled="playing"

                @mousedown="startDrag($event, i)"
                @touchstart="startDrag($event, i)"
              )
                v-icon {{ icons.mdiArrowLeftRightBold }}

        v-row.mx-1
          .timeline(:style="{ left: (valTime / 50) * 128 + 'px' }")
            div
</template>

<script>
import Vue from 'vue'

import { reactive, computed } from '@vue/composition-api'

import { mapMutations, mapGetters } from 'vuex'

import {
  mdiSkipPrevious,
  mdiPlay,
  mdiPause,
  mdiRepeat,
  mdiRepeatOff,
  mdiClose,
  mdiChevronDown,
  mdiChevronUp,
  mdiArrowLeftRightBold,
  mdiPlus,
  mdiDelete,
  mdiCursorPointer,
  mdiContentSave,
  mdiPencil
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
      playing: false,
      small: false,
      repeat: true,

      saveName: '',

      dragging: false,

      zoom: 10,

      selected: {
        index: 0,
        value: { ref: 0, temp: 0 },
        timer: undefined
      },

      last: {
        x: 0
      },

      framesLenght: 0,

      canvas: undefined,
      images: []
    }
  },

  computed: {
    ...mapGetters('avatar', ['getAnimationSavesSlot']),
    ...mapGetters('interface', [
      'getAnimate',
      'getPlaying',
      'getPlayVal',
      'getPlayLen',
      'getPlayRedraw'
    ]),

    height() {
      return this.small ? 74 : 260
    },

    timeLines() {
      const { percentLen, zoom } = this

      const size = zoom / 10
      const width = (130 / size) | 0

      return {
        width: (percentLen * 3 + 600 * size * 2) / size + 'px!important',
        background:
          'repeating-linear-gradient(to right, white ' +
          ~~(67 / size) +
          'px, white ' +
          width +
          'px, #ccc ' +
          width +
          'px, #ccc ' +
          (width + 1) +
          'px)'
      }
    }
  },

  watch: {
    playing(boolean) {
      this.setPlaying(boolean)
    },

    repeat(boolean) {
      if (boolean) {
        this.setPlayRepeat()
      } else {
        this.resetPlayRepeat()
      }
    },

    sequence: {
      handler(array) {
        const images = []

        for (let i = 0; i < array.length; i++) images.push('')

        this.images = images
      },

      immediate: true
    },

    'selected.value.temp'(value) {
      const self = this
      const { selected } = this

      if (selected.timer) clearTimeout(selected.timer)

      const duration = ((value * 10) | 0) / 10

      selected.timer = setTimeout(() => {
        this.updateSave()

        self.setFrameDur([selected.index, duration])
      }, 10)
    },

    getPlayLen: {
      handler(value) {
        this.framesLenght = value
      },

      immediate: true
    },

    getPlayRedraw() {
      this.canvas = this.$root.$refs.avatar

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      canvas.width = 144
      canvas.height = 96

      ctx.drawImage(this.canvas, 0, 0, 144, 96)

      Vue.set(this.images, this.frame, canvas.toDataURL())
    },

    getAnimationSavesSlot: {
      handler(slot) {
        if (process.client) {
          setTimeout(() => {
            const animations = JSON.parse(localStorage.getItem('animations'))

            this.saveName = animations[slot].name
          })
        }
      },

      immediate: true
    },

    saveName(name) {
      const slot = +localStorage.getItem('animationSlot')
      const animations = JSON.parse(localStorage.getItem('animations'))

      animations[slot].name = name

      localStorage.setItem('animations', JSON.stringify(animations))
    }
  },

  mounted() {
    window.addEventListener('mouseup', this.stopDrag)
    window.addEventListener('touchend', this.stopDrag)
    window.addEventListener('touchcancel', this.stopDrag)
  },

  methods: {
    ...mapMutations('avatar', ['setFrame', 'setFrameDur', 'addFrame', 'deleteFrame']),
    ...mapMutations('interface', [
      'setPage',
      'setAnimate',
      'setPlaying',
      'setPlayVal',
      'setPlaySeek',
      'setPlayRepeat',
      'resetPlayRepeat'
    ]),

    add(index) {
      this.addFrame(index)
      this.updateSave()
    },

    remove(index) {
      this.deleteFrame(index)
      this.updateSave()
    },

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
      this.selected.value.ref = this.sequence[index].duration

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
    },

    formatTime(value, compact) {
      let minutes = (value / 60) | 0
      let seconds = (value - minutes * 60) | 0

      const milliseconds = ~~((value - seconds) * 10)
      const haveMins = compact ? minutes > 0 : true

      if (minutes < 10) minutes = '0' + minutes
      if (haveMins && seconds < 10) seconds = '0' + seconds

      return haveMins ? minutes + ':' + seconds + '.' + milliseconds : seconds + '.' + milliseconds
    },

    getFullTime(length = undefined) {
      const { sequence } = this

      let duration = 0

      for (let i = 0; i < sequence.length - 1; i++) {
        if (length !== undefined && length <= i - 1) continue

        duration += sequence[i].duration
      }

      return duration
    },

    updateSave() {
      const slot = +localStorage.getItem('animationSlot')
      const animations = JSON.parse(localStorage.getItem('animations'))

      animations[slot].frames = this.sequence

      localStorage.setItem('animations', JSON.stringify(animations))
    }
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { root: { $store } }) {
    const { getters, commit } = $store

    const icons = reactive({
      mdiSkipPrevious,
      mdiPlay,
      mdiPause,
      mdiRepeat,
      mdiRepeatOff,
      mdiClose,
      mdiChevronDown,
      mdiChevronUp,
      mdiArrowLeftRightBold,
      mdiPlus,
      mdiDelete,
      mdiCursorPointer,
      mdiContentSave,
      mdiPencil
    })

    const percentLen = computed(() => getters['interface/getPlayLen'] * 100)
    const getPage = computed(() => getters['interface/getPage'])

    const valTime = computed({
      get: () => (getters['interface/getPlayVal'] * percentLen.value) | 0,
      set(value) {
        commit('interface/setPlayVal', value / percentLen.value)
        commit('interface/setPlaySeek')
      }
    })

    const topButtons = computed(() => {
      return { 'margin-top': getPage.value === 'Animate' ? '-68px' : '0px' }
    })

    const topInput = computed(() => {
      return { 'margin-top': getPage.value === 'Animate' ? '-58px' : '0px' }
    })

    return {
      icons,

      percentLen,
      valTime,
      getPage,

      topButtons,
      topInput,
      frame: computed(() => getters['avatar/getFrame']),
      sequence: computed(() => getters['avatar/getFrames'])
    }
  }
}
</script>

<style lang="sass">
.center
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)

.player-box
  width: calc(100% - 48px)
  overflow: overlay!important

  .row
    width: max-content!important

.panel-buttons
  transition: margin-top 500ms ease

.left-button
  margin-right: 70px!important

.field-right
  position: absolute!important
  left: 94px

.arrows
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-6 -4 14.5 110'%3E%3Crect fill='%23FFFFFF' width='6' height='10'/%3E%3Crect fill='%23FFFFFF' y='92.5' width='6' height='10'/%3E%3C/svg%3E")
  background-repeat: repeat-x
  margin-top: 40px!important
  transition: width 300ms ease, border 500ms ease

  .time
    margin-top: -28px
    margin-bottom: 4px
    text-align: right

  .hidden
    overflow: hidden

  .row.px-4
    transition: margin-top 500ms ease

  .add
    top: 16px
    right: 4px

  .delete
    top: 16px
    right: 32px

  .sizing
    top: 52px
    right: 4px

.time-divider
  position: absolute
  height: 100%
  margin-left: 1px

.start-button
  margin-top: -24px!important

.slider
  .v-slider__thumb-container, .v-slider__track-fill, .v-slider__track-background
    transition: 100ms linear!important

.timeline
  width: 3px
  height: 100%
  background: #0afd
  position: absolute!important
  transition: 100ms linear!important
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
