<template lang="pug">
  #app
    v-app#inspire(:class="dark ? 'theme--dark' : ''")
      div.pa-3
        v-chip(:dark="dark") {{ lang.version }}
          v-chip.version.v-avatar--right(
            :dark="!dark"
          ) dragon fruit

      v-item-group(:dark="dark")
        v-container.max(fluid)
          div.px-8(
            @click="easter($refs)"
          )
            svg.logo.mx-sm-4.mx-md-12.mx-lg-12(
              viewBox="0 0 1026 418"
              ref="logo"
            )
              path(fill="#fff" d="M220 247c5-3 8-8 13-10-5-3-9-6-15-7l4-12-26 9 1-11-16 10c-4 3-9 9-14 11l6-13-17 5 10-7c-9-5-18-9-29-11 8-2 15-2 22 0-1-5-4-9-7-12 14 5 27 12 40 19l-8-25 23 7c-2-6-5-11-8-15 8-2 17-2 25-2-3-5-10-11-11-16 3-2 7 0 10 1-1-5-4-8-8-10l11-8c-10-5-22-5-33-3l7-8c-13 0-27 3-39 8l10-16c-16 6-33 12-47 21 2-6 6-11 10-17-8 1-16 5-23 10-5 3-12 15-18 17-4 1-17-5-22-6-9-1-19 0-27 5 12 5 23 8 32 18-16 5-19 40-20 52 9-6 19-15 30-17-7 1-11 15-12 21-3 11-2 23-1 34 7-9 15-19 26-22 1 2-9 15-10 19-3 12-5 24-5 36l21-17c-4 6-5 20-6 27l-3 34 22-24c-1 17-2 34-1 51l16-21c5 11 10 22 17 32 1-11 4-21 6-32l26 20c-2-16-5-32-10-48l11 2c-8-13-16-25-27-35 9 2 16 8 25 10-5-10-4-20-8-30l38 15-7-19 29 5-13-25zM88 213")
              path(fill="#fff" d="M318 288l6-13-21 1c2-5 5-8 10-9-5-6-19-5-20-9-2-8 12-6 16-5-2-7-6-12-11-16-4-4-10-5-11-10l17 4c-5-14-12-27-20-39h19l-7-10c-3-2-10-8-11-11-2-6 13-16 19-20-7-2-14-2-21-2 3-8 7-17 13-24-9 2-18 5-27 10l5-17-15 9c-2 2-7 9-10 9a200 200 0 0 0-35-9l18 27-12 6c5 3 13 11 11 16-2 7-11 12-14 20 6-2 12-2 18-1 8 1 9 0 6 5-4 7-12 10-15 18 7-3 15-1 22 1-8 8-14 17-19 27l24-3c-5 10-7 21-5 32l10-8c2 5-4 15-4 22 0 9 2 18 6 26 2-5 5-10 9-13 1 10 4 20 7 30 4-7 7-13 12-19 2 7 5 13 9 19 2-5 7-16 11-17 5-2 16 5 20 7-1-5-8-18-6-21 0-2 6-6 8-7l-12-6z")
              path(fill="#fff" d="M458 276c-2-7-5-14-10-19l11 4-10-37c6-2 13-2 20 0-3-8-8-15-14-21l-4-3c-5-1-5-3-2-6 1-4 6-8 8-11l-15-2c1-7 3-15 6-22-6 1-12 5-17 5-7 1-5 2-11-2-9-4-20-8-30-3 7 5 10 9 12 17h-17c5 5 12 14 14 21 1 7-6 13-10 20l16 4-14 10 16 10c-6 0-13 1-18 5 5 4 5 11 5 16-1-2-4-7-7-8l-10 4c4-9-3-8-7-14l13-1-8-15-4-6c0-3 10-8 13-9-3-2-17-9-18-12-2-4 9-17 11-19l-16 2 2-22c-9 3-19 11-28 9s-17-7-27-5c8 6 11 16 14 26-7 1-13 5-19 10 5 2 16 6 17 13 0 3-4 10-5 13l-4 14c6-3 12-4 19-5 1 4-5 12-6 17-1 6-2 13-1 19l12-8v19l2 28 16-18c3 2 3 21 3 26l17-16 5 15 20-20 4 7 7-7 3 21c4-5 10-13 17-16 4-3 2-2 6 0 3 1 8 7 10 9 3-7 5-15 5-22l12 5-4-20z")
              path(fill="#fff" d="M542 179l6-3c-6-6-8-9-5-17h-13c-6-1-10-2-13-12l9 4 4-5c0-3 2-3 5-2l9 2-1-17c1-8 2-12 6-18l-10-1 6-11c-5 0-10 3-14 3-6 1-7 0-13-1h-29l3 6c-9 2-19 6-28 10l10 6c-4 5-8 12-9 18l6 2c-4 2-7 4-10 8l7 7-15 1c4 8 7 15 5 24-1 7-2 13-1 20 4-1 8-4 12-4l-4 10c4 0 7 1 11 3-7 7-8 16-9 25l11-2c-4 12-7 25-8 38l8-4c-2 9-1 19 1 28l8-4 7 28 14-26 11 11 5-24 10 5c0-12-7-25-13-36l9 3c-1-9-4-19-7-29l10 3c0-10-2-19-5-29h7c-1-7 2-6 9-6l-2-14z")
              path(fill="#fff" d="M637 199c0-6-3-11-5-16-1-4-2-4-1-8 0-2 5-7 7-8-8-3-16-4-24-5 6-4 7-2-2-11l18 5-1-9 7 1c-1-4-4-11-4-15 1-5 6-8 11-11l-9-4 9-7c-7-3-14-6-22-6-9-1-9 3-11-7-7 3-12 9-19 9-8 0-15-4-23-1 12 12-8 10-10 23 3 0 6 1 8 4-4 0-8 2-11 5 7 3 11 9 12 16l-10 1 3 6-15 2c2 3 7 8 7 11 1 6-7 13-8 20h12c-1 6-1 13 1 19l8-4c-5 7-8 15-9 24l8-1c-3 4-4 9-5 15 0 6-3 11 4 8l-11 29 7-1c1 8 3 17 7 25l6-9c5-3 2-4 8-3 6 2 12 9 16 13 3-9 5-18 5-27l12 1c-2-9-4-26-10-33l14 1-13-27 11 4c0-7-1-14-3-20 3 0 7 0 10 2 1-2 0-8 2-9 2-2 10-2 13-2zM652 138c-3 6-5 13-6 20l14-4 2 6c4-2 9-7 13-5 4 1 8 8 10 11l6-10c3-1 12 4 14 5l-1-16c-1-6-4-9 3-12h9c-2-5-6-9-10-11-8-5-8-4-4-13-10 1-22 5-31 3-8-1-16-5-24-3l6 12c0 1 2 3 1 5l-9 7 7 5zM695 205l10-11-13-6 11-17-19-2-12-5c-4-1-8-2-12-1-5 0-15 0-9 5-3 0-7 0-9 2 20 15-8 42-9 62 3-3 7-5 12-7-8 13-10 31-12 46l13-8-8 15c-2 7-3 14-2 21l9-3 4 24 20-19 10 14c5-12 8-25 7-38 5 4 3 3 5-1l1-13c1-7 0-14-1-20 4 4 5-12 5-16 0-6-5-17-1-22z")
              path(fill="#fff" d="M833 267c3-10 3-22 0-33h12c-3-8-8-15-13-22-4-5-5-4-3-9l9-7c-9-5-19-8-29-9 2-4 5-9 9-12-10-4-21-2-31 2l7-14c-14 0-28 4-36 17-3-6-5-12-4-18-9 5-14 16-18 25l-12-8c-3 10-2 22-6 31-2 5-1 4-7 6l-13 8c4 4 9 8 12 14-5 1-10 4-13 7 20 9 7 29 11 46 3-3 9-8 12-4l1 18c15-8 12-4 15 10l17-4 2 12 17-8 4 11c9-9 15-8 23 0 6-10 8-18 19-25l-9-9c-3-5-4-4 0-10l-8-1c-4-1-4-5-3-7-7-1-12 1-18 3-3 1-7 2-9 5l-2-10c-4 0-9 2-13 4l2-5c2-2 1-3-2-3l-3-2 2-7c3 10 4 6 12 5 10-3 8 0 11 8l11-4c6 0 6-2 8 5 11-7 15-4 22 7l9-15 5 2zm-59-35l-6 2c-2 2-3 1-3-3h-11c2-5 1-5-4-8 3 0 5-2 6-5 4 3 2 4 7 2s2-6 7-4c3 2 5 9 7 9 2 1 9-3 10-4-2 9 0 7 7 12-7-1-13-3-15 4l-5-5zM962 289l4-6c-4-4-9-7-14-9l-8-2-8-8c-2-1-6 2-8 1s-3-6-4-8c-3-5-2-5-9-4l-12 3c2-8 6-8-2-13l8 4c3 1 3 0 4-2 1-3 3-3 5 1l3 3c2 0 3-2 4-3 5 4 4 5 5 11 3-1 9-3 12-1-6 8-3 7 4 9s13 7 18 12c3-5 3-11 8-15 4-3 10-4 15-5-3-8-9-14-12-21-2-5 0-8 2-14l-15-1h-4c-3-2-3-11-3-13-4 0-10 5-13 5-5 0-12-10-14-13-3 4-4 8-8 7l-10-5c-6-2-13-3-20-3 2 3 3 6 3 10-8-2-16-2-24 0 3 7-3 6-9 8-5 3-9 5-13 9 7 6 5 4 3 11l-6 16h13c-3 7-5 14-5 22 5-2 16-4 18 0v7c2 3 1 2 10 2 2 1 8 0 10 2l2 8c4 7 3 2 10 2 6-1 4-1 5 6 3-1 10-2 14-1-3 1-9 2-10 5l4 6c-4 0-7-7-11-7-1-1-3 3-3 3l-3 2-1-3c-1-2-2-5-4-6l-5 2c-2-1-3-6-6-9-6-7-3 3-10-2l-14-8c-2 7-1 5-7 6l-17 2 8 8c-4 2-11 4-14 8 3 0 8 1 10 3 3 4 0 11 2 17 11-10 14 0 18 10 6-2 5-4 10-1 4 3 6 7 9 8l4-2 5 2 11 9c5-7 2-7 9-6l10 3c0-9 19-1 25 1l-1-11h18c0-5-2-9-3-13l12 1c-1-3-5-17-4-20 2-3 11-7 14-8-4-5-10-9-15-12z")
              path(fill="#222" d="M54 55h30v4H54v-4zm13 2h4v41h-4V57zM107 55h4v43h-4V55zm3 20h25v4h-25v-4zm23-20h4v43h-4V55zM166 55h4v43h-4V55zm3 0h24v4h-24v-4zm0 20h21v4h-21v-4zm0 19h24v4h-24v-4z")

          h2.body-1.text-center.py-8.px-12 {{ lang.title }}

          .pa-sm-1.pa-md-7.pa-lg-7

          v-row
            v-col(cols="12" md="12")
              v-row(justify="center")
                v-btn.title.md-size.d-none.d-md-flex.ma-8(
                  outlined
                  large
                  :title="lang.about"
                  href="/about"
                  :aria-label="lang.about"
                ) {{ lang.about }}

                v-card.size-by-content
                  v-btn.title(
                    text
                    large
                    :title="checkContinue().title"
                    href="/editor"
                    :aria-label="checkContinue().label"
                  ) {{ checkContinue().title }}

                v-btn.title.md-size.d-none.d-md-flex.ma-8(
                  outlined
                  large
                  :title="lang.support"
                  href="/support"
                  :aria-label="lang.support"
                ) {{ lang.support }}

            v-col(cols="12" md="4").d-flex.d-md-none
              v-row(justify="center")
                v-btn.title.sm-size(
                  outlined
                  large
                  :title="lang.about"
                  href="/about"
                  :aria-label="lang.about"
                ) {{ lang.about }}

              v-row(justify="center")
                v-btn.title.sm-size(
                  outlined
                  large
                  :title="lang.support"
                  href="/support"
                  :aria-label="lang.support"
                ) {{ lang.support }}

          Socials(:dark="dark")

      v-img#easter(
        src="/img/easterEgg.png"
        ref="easter"
        eager
      )

      v-img#fruit(
        src="/img/apple.png"
        ref="apple"
        eager
      )

      v-img#fruit(
        src="/img/mango.png"
        ref="mango"
        max-width=50
        eager
      )

      .pa-5

      v-footer(fixed :dark="dark" app)
        v-btn(
          @click="dark = !dark"
          :dark="!dark"
          absolute
          fab
          top
          right
          aria-label="Dark mode"
        )
          v-icon(large) {{ dark ? icons.sun : icons.moon }}

        div &copy {{ new Date().getFullYear() }} - The Fluffies
</template>

<script lang="ts">
import en from '../../assets/json/locales/en/index.json';
import ru from '../../assets/json/locales/ru/index.json';

import Vue from 'vue';
import {
  VApp,
  VChip,
  VItemGroup,
  VContainer,
  VCol,
  VRow,
  VBtn,
  VCard,
  VCardActions,
  VSpacer,
  VDivider,
  VFooter,
  VIcon,
  VImg
} from 'vuetify/lib';

import { ref, computed, reactive } from '@vue/composition-api';
import {
  mdiBrightness7,
  mdiMoonWaningCrescent
} from '@mdi/js';

import Socials from '../../components/Socials.vue';

import { getLanguage } from '../../assets/ts/language';
import loaderClose from '../../assets/ts/loaderClose';
import darkMode from '../../assets/ts/darkMode';

// Functions

function getSave() {
  const { lang } = getLanguage(en, ru);

  const saves = ref(localStorage.getItem('avatars') || undefined);
  const slot = ref(+(localStorage.getItem('slot') || 0));

  function checkContinue() {
    if (saves.value != null) {
      return lang.value.continue;
    } else {
      return lang.value.start;
    }
  }

  return {
    saves,
    slot,
    checkContinue
  }
}

function easterEgg() {
  const active = ref(false);

  function easter(refs: any) {
    if (!active.value) {
      const logo = refs.logo.style;

      const easter = refs.easter.$vnode.elm.style;

      const fruitType = ['apple', 'mango'][Math.random() * 2 | 0]

      const fruit = refs[fruitType].$vnode.elm.style;

      logo.animation = 'logo 1s ease-in-out';
      easter.animation = 'easter 4s ease-in-out';
      fruit.animation = 'fruit 4s ease-in-out';

      active.value = true;

      setTimeout(() => {
        logo.animation = '';
        easter.animation = '';
        fruit.animation = '';

        active.value = false;
      }, 4000);
    }
  }

  return {
    easter
  }
}



export default Vue.extend({
  setup() {
    const { dark } = darkMode();
    const { lang } = getLanguage(en, ru);
    const { easter } = easterEgg();

    const {
      saves,
      slot,
      checkContinue
    } = getSave();

    const icons = {
      sun: mdiBrightness7,
      moon: mdiMoonWaningCrescent
    };

    loaderClose();

    return {
      dark,
      lang,
      saves,
      slot,
      checkContinue,
      icons,
      easter
    }
  },

  components: {
    Socials,

    VApp,
    VChip,
    VItemGroup,
    VContainer,
    VCol,
    VRow,
    VBtn,
    VCard,
    VCardActions,
    VSpacer,
    VDivider,
    VFooter,
    VIcon,
    VImg
  }
});
</script>

<style lang="sass">
  html
    overflow: auto!important

  a.md-size
    width: 164px

  a.sm-size
    width: 156px

  span.version
    background-image: linear-gradient(to right, #f46, #f2a)!important
    margin-right: -12px!important

  div.max
    max-width: 800px

  svg.logo
    background-image: linear-gradient(to right, #fa2, #f64)
    border-radius: 4vmin
    max-width: 600px
    cursor: pointer

  stop.grad
    stop-color: #fa2
    stop-opacity: 1

  stop.grad-end
    stop-color: #f64
    stop-opacity: 1

  .hide
    opacity: 0!important
    height: 0!important

  .size-by-content
    height: max-content

  #easter
    position: fixed
    left: -200px
    bottom: 35px

  #fruit
    position: fixed
    left: 140px
    bottom: -20px

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