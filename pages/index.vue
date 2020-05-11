<template lang="pug">
  div.pa-3
    //.defaults-container
      v-img(eager :src="require('~/assets/img/Defaulty_Zebra.png?webp')" :style="positions[1]")
      v-img(eager :src="require('~/assets/img/Defaulty_Deer.png?webp')" :style="positions[2]")
      v-img(eager :src="require('~/assets/img/Defaulty.png?webp')" :style="positions[0]")

    h1.header {{ $t('meta.title.index') }}

    v-row
      Version.mx-3
      v-spacer
      NetworkStatus.mx-3

    v-container.pa-0.max.text-center
      div.pb-6.px-12(@click="easter($refs)")
        TheFluffiesLogo.logo(ref="logo")

    v-row.row-bottom
      v-col
        v-row
          v-spacer

          v-btn.mx-4.my-3.width.d-none.d-md-flex(
            rounded
            :title="$t('index.about')"
            :to="localePath('about')"
            :aria-label="$t('index.about')"
            nuxt
          ) {{ $t('index.about') }}

          v-btn.mx-4(fab @click="left"): v-icon {{ icons.mdiArrowLeft }}

          v-btn(
            x-large
            rounded
            :title="haveSave ? $t('index.continue.title') : $t('index.start.title')"
            :href="localePath('editor')"
            :aria-label="haveSave ? $t('index.continue.label') : $t('index.start.label')"
          ) {{ haveSave ? $t('index.continue.title') : $t('index.start.title') }}

          v-btn.mx-4(fab @click="right"): v-icon {{ icons.mdiArrowRight }}

          v-btn.mx-4.my-3.width.d-none.d-md-flex(
            rounded
            :title="$t('index.support')"
            :to="localePath('support')"
            :aria-label="$t('index.support')"
            nuxt
          ) {{ $t('index.support') }}

          v-spacer

      // h2.body-1.font-weight-bold.px-9 {{ $t('index.title') }}

    //
      .py-4.py-md-12.py-lg-12

      v-row
        v-col(cols="12" md="12")
          v-row(justify="center")
            v-btn.title.md-size.d-none.d-md-flex.ma-8(
              outlined
              large
              :title="$t('index.about')"
              :to="localePath('about')"
              :aria-label="$t('index.about')"
              nuxt
            ) {{ $t('index.about') }}

            v-card.size-by-content
              v-btn.title(
                text
                large
                :title="haveSave ? $t('index.continue.title') : $t('index.start.title')"
                :href="localePath('editor')"
                :aria-label="haveSave ? $t('index.continue.label') : $t('index.start.label')"
              ) {{ haveSave ? $t('index.continue.title') : $t('index.start.title') }}

            v-btn.title.md-size.d-none.d-md-flex.ma-8(
              outlined
              large
              :title="$t('index.support')"
              :to="localePath('support')"
              :aria-label="$t('index.support')"
              nuxt
              ) {{ $t('index.support') }}

        v-col(cols="12" md="4").d-flex.d-md-none
          v-row(justify="center")
            v-btn.title.sm-size(
              outlined
              large
              :title="$t('index.about')"
              :to="localePath('about')"
              :aria-label="$t('index.about')"
              nuxt
            ) {{ $t('index.about') }}

          v-row(justify="center")
            v-btn.title.sm-size(
              outlined
              large
              :title="$t('index.support')"
              :to="localePath('support')"
              :aria-label="$t('index.support')"
              nuxt
            ) {{ $t('index.support') }}

    v-img#easter(
      :src="require('~/assets/img/easterEgg.png?webp')"
      ref="easter"
      eager
    )

    v-img.fruit(
      :src="require('~/assets/img/apple.png?webp')"
      ref="apple"
      max-width=44
      eager
    )

    v-img.fruit(
      :src="require('~/assets/img/mango.png?webp')"
      ref="mango"
      max-width=44
      eager
    )
</template>

<script>
import { ref, reactive, computed, toRefs } from '@vue/composition-api'
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js'

import i18nHead from '~/assets/js/i18nHead'

import TheFluffiesLogo from '~/assets/svg/TheFluffiesLogo.svg'

import Version from '~/components/Version'
import NetworkStatus from '~/components/NetworkStatus'

function easterEgg() {
  const active = ref(false)

  function easter(refs) {
    if (!active.value) {
      const fruitType = ['apple', 'mango'][(Math.random() * 2) | 0]

      const logo = refs.logo.$vnode.elm.style
      const easter = refs.easter.$vnode.elm.style
      const fruit = refs[fruitType].$vnode.elm.style

      logo.animation = 'logo 1s ease-in-out'
      easter.animation = 'easter 4s ease-in-out'
      fruit.animation = 'fruit 4s ease-in-out'

      active.value = true

      setTimeout(() => {
        logo.animation = easter.animation = fruit.animation = ''

        active.value = false
      }, 4000)
    }
  }

  return { easter }
}

function carousel() {
  const defaults = reactive({
    index: 0,
    length: 3
  })

  const side = ref('right')

  function left() {
    defaults.index -= 1

    if (defaults.index < 0) defaults.index = defaults.length - 1

    side.value = 'left'
  }

  function right() {
    defaults.index += 1

    if (defaults.index > defaults.length - 1) defaults.index = 0

    side.value = 'right'
  }

  const positions = computed(() => {
    return [
      [
        { left: '50%', 'max-width': '512px', 'z-index': 3 },
        {
          left: 'calc(50% + 20vw)',
          'max-width': '448px',
          filter: 'brightness(0.8)',
          'z-index': side.value === 'left' ? 2 : 1
        },
        {
          left: 'calc(50% - 20vw)',
          'max-width': '448px',
          filter: 'brightness(0.8)',
          'z-index': side.value === 'left' ? 1 : 2
        }
      ],
      [
        {
          left: 'calc(50% - 20vw)',
          'max-width': '448px',
          filter: 'brightness(0.8)',
          'z-index': side.value === 'left' ? 1 : 2
        },
        { left: '50%', 'max-width': '512px', 'z-index': 3 },
        {
          left: 'calc(50% + 20vw)',
          'max-width': '448px',
          filter: 'brightness(0.8)',
          'z-index': side.value === 'left' ? 2 : 1
        }
      ],
      [
        {
          left: 'calc(50% + 20vw)',
          'max-width': '448px',
          filter: 'brightness(0.8)',
          'z-index': side.value === 'left' ? 2 : 1
        },
        {
          left: 'calc(50% - 20vw)',
          'max-width': '448px',
          filter: 'brightness(0.8)',
          'z-index': side.value === 'left' ? 1 : 2
        },
        { left: '50%', 'max-width': '512px', 'z-index': 3 }
      ]
    ][defaults.index]
  })

  return {
    defaults,
    side,
    left,
    right,
    positions
  }
}

export default {
  setup(props, { root }) {
    const haveSave = ref(false)

    if (process.client) {
      haveSave.value = !!localStorage.getItem('avatars')
    }

    const icons = reactive({
      mdiArrowLeft,
      mdiArrowRight
    })

    return {
      ...toRefs(carousel()),

      ...easterEgg(),

      icons,
      haveSave
    }
  },

  components: {
    TheFluffiesLogo,
    Version,
    NetworkStatus
  },

  head() {
    return i18nHead(this, 'index')
  }
}
</script>

<style lang="sass">
html
  overflow: auto!important

.header
  position: fixed
  opacity: 0
  pointer-events: none
  width: 0
  height: 0

div.max
  position: relative
  max-width: 700px

.size-by-content
  height: 100%

svg.logo
  background-image: linear-gradient(to right, #fa2, #f64)
  border-radius: 4vmin
  max-width: 400px
  cursor: pointer

#easter
  display: block
  position: fixed
  left: -200px
  bottom: 35px

.fruit
  position: fixed!important
  left: 140px
  bottom: -20px
  height: 50px

.defaults-container
  position: absolute
  left: 50%
  bottom: 35px
  transform: translate(-50%)

  .v-image
    position: absolute
    bottom: 0
    transform: translate(-50%)
    width: 90vmin
    transition: left 0.7s ease, max-width 0.7s ease, filter 0.7s ease

.row-bottom
  position: absolute
  bottom: 35px
  width: 100%

.width.v-btn
  width: 130px

@keyframes logo
  0%
    transform: rotate(0deg)

  33%
    transform: rotate(-3deg)

  66%
    transform: rotate(3deg)

  100%
    transform: rotate(0deg)

@keyframes easter
  0%
    left: -200px
    bottom: 35px

  50%
    left: -200px
    bottom: 35px

  66%
    left: 55px
    bottom: 35px

  75%
    left: 55px
    bottom: 35px

  100%
    left: 55px
    bottom: -200px

@keyframes fruit
  0%
    bottom: -150px

  33%
    bottom: 75px

  75%
    bottom: 75px

  100%
    bottom: -150px
</style>
