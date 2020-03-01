<template lang="pug">
  #app
    v-app#inspire(:class="dark ? 'theme--dark' : ''")
      v-app-bar(fixed :dark="dark" app)
        v-toolbar-title.title.uppercase {{ lang.support }}
        v-btn.d-none.d-sm-flex(
          large
          depressed
          href="/"
          :title="lang.back"
          :aria-label="lang.back"
        )
          v-icon(left) {{ icons.left }}
          | {{ lang.back }}

        v-btn.d-flex.d-sm-none(
          small
          depressed
          href="/"
          fab
          :title="lang.back"
          :aria-label="lang.back"
        )
          v-icon {{ icons.left }}

      v-content
        v-item-group(:dark="dark")
          v-container(fluid)

            Socials(:dark="dark")

            v-row(justify="center")
              v-col(v-for="(card, i) in lang.content" :key="card + i" cols="12" md="5")
                v-card(class="align-center")
                  v-card-title.gradient
                    | {{ card.title }}

                  v-spacer
                  v-card-text
                    p.font-weight-medium(v-for="(text, j) in card.text" :key="text + j" v-html="format(text)")

                    v-divider(v-if="card.href")
                    .py-2(v-if="card.href")

                    v-item-group
                      v-row.py-1(v-for="(href, j) in card.href" :key="href + j" )
                        v-badge(overlap color="transparent")
                          template(v-slot:badge)
                            v-icon(small :color="url()") {{ icons.openIn }}

                          v-btn.body-2.font-weight-medium(
                            :color="url()"
                            text
                            target="_blank"
                            :title="href.text"
                            :href="href.url"
                            rel="noopener"
                            :aria-label="href.text"
                          ) {{ href.text }}

            Socials(:dark="dark")


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
import en from '../../assets/json/locales/en/support.json';
import ru from '../../assets/json/locales/ru/support.json';

import Vue from 'vue';
import {
  VApp,
  VAppBar,
  VToolbarTitle,
  VBtn,
  VIcon,
  VContent,
  VItemGroup,
  VContainer,
  VRow,
  VCol,
  VCard,
  VCardText,
  VCardTitle,
  VSpacer,
  VDivider,
  VBadge,
  VFooter
} from 'vuetify/lib';

import {
  mdiBrightness7,
  mdiMoonWaningCrescent,
  mdiOpenInNew,
  mdiChevronLeft
} from '@mdi/js';

import Socials from '../../components/Socials.vue';

import { getLanguage } from '../../assets/ts/language';
import loaderClose from '../../assets/ts/loaderClose';
import darkMode from '../../assets/ts/darkMode';
import format from '../../assets/ts/format';

export default Vue.extend({
  setup() {
    const { dark } = darkMode();
    const { lang } = getLanguage(en, ru);

    function url() {
      return dark.value ? '#8bf' : '#359';
    }

    const icons = {
      openIn: mdiOpenInNew,
      left: mdiChevronLeft,
      sun: mdiBrightness7,
      moon: mdiMoonWaningCrescent
    };

    loaderClose();

    return {
      dark,
      icons,
      lang,
      format,
      url
    }
  },

  components: {
    Socials,

    VApp,
    VAppBar,
    VToolbarTitle,
    VBtn,
    VIcon,
    VContent,
    VItemGroup,
    VContainer,
    VRow,
    VCol,
    VCard,
    VCardText,
    VCardTitle,
    VSpacer,
    VDivider,
    VBadge,
    VFooter
  }
});
</script>

<style lang="sass">
  html
    overflow: auto!important

  .title
    width: 100%
    position: absolute
    text-align: center

  .uppercase
    text-transform: uppercase

  .gradient
    background-image: linear-gradient(to right, #fa2, #f64)

  .hide
    opacity: 0!important
    height: 0!important
</style>