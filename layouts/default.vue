<template lang="pug">
  v-app
    v-img(:src="require('~/assets/svg/under/Blob1.svg')").blob1.blobs
    v-img(:src="require('~/assets/svg/under/Blob2.svg')").blob2.blobs
    v-img(:src="require('~/assets/svg/under/Blob3.svg')").blob3.blobs

    nuxt

    .my-7

    v-footer(fixed app)
      div.d-none.d-sm-flex &copy; {{ new Date().getFullYear() }} - The Fluffies
      div.d-flex.d-sm-none &copy; The Fluffies

      div#footer
        div(v-if="!/termsofservice/.test(pathname)")
          v-btn.text-caption.ml-1.px-1.d-none.d-md-flex(
            small
            text
            target="_blank"
            :title="$t('index.terms')"
            href="termsofservice"
            rel="noopener"
            :aria-label="$t('index.terms')"
          ) {{ $t('index.terms') }}

        div(v-if="!/privacypolicy/.test(pathname)")
          v-btn.text-caption.ml-1.px-1.d-none.d-md-flex(
            small
            text
            target="_blank"
            :title="$t('index.privacy')"
            href="privacypolicy"
            rel="noopener"
            :aria-label="$t('index.privacy')"
          ) {{ $t('index.privacy') }}

      v-spacer

      Locale

      v-btn(
          @click="dark = !dark"
          :light="dark"
          :dark="!dark"
          absolute
          fab
          top
          right
          aria-label="Dark mode"
        )
          v-icon(large) {{ dark ? icons.mdiBrightness7 : icons.mdiMoonWaningCrescent }}

    v-img(:src="require('~/assets/svg/upper/Blob1.svg')").blob1.blobs
    v-img(:src="require('~/assets/svg/upper/Blob2.svg')").blob2.blobs
    v-img(:src="require('~/assets/svg/upper/Blob3.svg')").blob3.blobs

    Patrons
</template>

<script>
import { reactive, computed } from '@vue/composition-api'

import { mdiBrightness7, mdiMoonWaningCrescent } from '@mdi/js'

import darkMode from '~/assets/ts/darkMode.ts'

import Socials from '~/components/Socials'
import Locale from '~/components/Locale'
import Patrons from '~/components/Patrons'

export default {
  setup(_, { root: { $vuetify } }) {
    const { dark } = darkMode($vuetify)

    const icons = reactive({
      mdiBrightness7,
      mdiMoonWaningCrescent
    })

    const pathname = computed(() => {
      if (process.browser) {
        return window.location.pathname
      } else {
        return ''
      }
    })

    return {
      dark,
      icons,
      pathname
    }
  },

  components: {
    Socials,
    Locale,
    Patrons
  }
}
</script>

<style lang="sass">
.blobs
  position: fixed
  pointer-events: none
  width: 50vmin
  height: 46vmin
  max-width: 350px

.blob1
  bottom: 0
  right: 0

.blob2
  top: 0
  left: 0

.blob3
  top: 0
  right: 0

div#footer
  display: flex!important
</style>
