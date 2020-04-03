<template lang="pug">
  div.pa-3
    h1.header {{ $t('meta.title.index') }}

    Version
    NetworkStatus

    v-container.max.text-center
      div.pa-6(@click="easter($refs)")
        Logo

      h2.body-1.px-9 {{ $t('index.title') }}

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
import { ref } from '@vue/composition-api'

import i18nHead from '~/assets/js/i18nHead'

import Logo from '~/components/Logo'
import Version from '~/components/Version'
import NetworkStatus from '~/components/NetworkStatus'

function easterEgg() {
  const active = ref(false)

  function easter(refs) {
    if (!active.value) {
      const fruitType = ['apple', 'mango'][(Math.random() * 2) | 0]

      const logo = refs.logo.style
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

export default {
  setup(props, { root }) {
    const haveSave = ref(false)

    if (process.client) {
      haveSave.value = !!localStorage.getItem('avatars')
    }

    const { easter } = easterEgg()

    return {
      haveSave,
      easter
    }
  },

  components: {
    Logo,
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

a.md-size
  width: 164px

a.sm-size
  width: 156px

div.max
  max-width: 700px

.size-by-content
  height: 100%

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
