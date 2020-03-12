<template lang="pug">
  v-sheet.transition(
    :height='height'
    dark
    tile
  )
    v-row.px-6
      v-col(cols="12").third-col
        p 0:0{{ ~~(valTime / 100 + 0.5) }}

      v-col(cols="12").third-col.text-center
        v-btn.mx-2(icon color="#fa0"): v-icon {{ icons.restart }}

        v-btn.start-button(
          @click="playing = !playing"
          fab
          light
        )
          v-icon(:size="playingSize") {{ icons.play }}
          v-icon(:size="pauseSize") {{ icons.pause }}

        v-btn.mx-2(icon color="#fa0"): v-icon {{ icons.repeat }}

      v-col(cols="12").third-col.text-end
        p 0:02

      v-btn.transition(
        :color="warnColor"
        @click="close"
        fab
        absolute
        right
        :style="buttonHeight"
      )
        v-icon(large) {{ icons.close }}

      v-btn.left-button.transition(
        @click="smaller"
        fab
        absolute
        right
        :style="buttonHeight"
      )
        v-icon(:size="arrowDown") {{ icons.down }}
        v-icon(:size="arrowUp") {{ icons.up }}

    .my-n5

    v-slider.mx-6.slider(
      v-model="valTime"
      color="#fa0"
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

      v-row.mx-1.my-5
        v-card.mx-3.px-2.arrows(
          v-for="elem, i in sequencce"
          :width="(elem * 128 * 2) - 24"
          height=48
          color="orange"
        )
          v-card.my-n6(
            width=96
            height=96
          )
            p.px-3.py-2.body-2 {{ i + 1 }}

      v-row.mx-1
        .timeline(
          :style="{ left: (valTime / 50) * 129 + 'px' }"
        )
          div
</template>

<script lang="ts">
import Vue from 'vue';
import {
  VSheet,
  VSlider,
  VDivider,
  VCol,
  VRow,
  VSpacer,
  VBtn,
  VIcon,
  VCard
} from 'vuetify/lib';

import {
  mdiPlay,
  mdiPause,
  mdiSkipPrevious,
  mdiRepeat,
  mdiClose,
  mdiChevronDown,
  mdiChevronUp
} from '@mdi/js';

export default Vue.extend({
  props: ['opened'],

  data() {
    return {
      icons: {
        play: mdiPlay,
        pause: mdiPause,
        restart: mdiSkipPrevious,
        repeat: mdiRepeat,
        close: mdiClose,
        down: mdiChevronDown,
        up: mdiChevronUp
      },

      sequencce: [
        1,
        1,
        2,
        1,
        1,
        3,
        3,
        3,
        3
      ],

      playing: false,
      small: false,

      valTime: 0,

      timer: undefined
    }
  },

  watch: {
    playing(val: number) {
      if (val) {
        const self: any = this;

        this.timer = setInterval(() => {
          if (self.valTime >= 200) {
            self.valTime = 0;
          } else {
            self.valTime += 2;
          }
        }, 20);
      } else {
        clearInterval(this.timer);
      }
    }
  },

  computed: {
    warnColor(): string | undefined {
      if ((this.$root as any).warning.close) return 'red';
    },

    buttonHeight() {
      if (this.opened) return { 'margin-top': '-76px' };
    },

    height() { return this.small ? 74 : 260 },

    arrowDown() { return this.small ? 0 : 42 },
    arrowUp() { return this.small ? 42 : 0 },

    playingSize() { return this.playing ? 0 : 42 },
    pauseSize() { return this.playing ? 42 : 0 }
  },

  methods: {
    close() {
      const parent: any = this.$parent.$parent.$parent.$parent;

      parent.opened.Animate = false;
    },

    smaller() {
      const parent: any = this.$parent.$parent.$parent.$parent;

      parent.animate = !parent.animate;

      this.small = parent.animate;
    }
  },

  components: {
    VSheet,
    VSlider,
    VDivider,
    VCol,
    VRow,
    VSpacer,
    VBtn,
    VIcon,
    VCard
  }
})
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
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='2 2 20 20'%3E%3Cpath fill='%23FFFFFF55' d='M14.58,16.59L19.17,12L14.58,7.41L16,6L22,12L16,18L14.58,16.59M8.58,16.59L13.17,12L8.58,7.41L10,6L16,12L10,18L8.58,16.59M2.58,16.59L7.17,12L2.58,7.41L4,6L10,12L4,18L2.58,16.59Z' /%3E%3C/svg%3E")
    background-repeat-x: repeat
    margin-top: 40px!important

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