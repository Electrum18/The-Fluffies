<template lang="pug">
  v-app
    Blob1.blob1.blobs
    Blob2.blob2.blobs
    Blob3.blob3.blobs

    nuxt

    .my-7

    v-footer(fixed app)
      span.d-none.d-sm-flex &copy; {{ new Date().getFullYear() }} - The Fluffies
      span.d-flex.d-sm-none &copy; The Fluffies

      v-btn.text-caption.ml-1.px-1.d-none.d-md-flex(
        v-if="pathname != '/termsofservice'"
        small
        text
        target="_blank"
        :title="$t('index.terms')"
        href="termsofservice"
        rel="noopener"
        :aria-label="$t('index.terms')"
      ) {{ $t('index.terms') }}

      v-btn.text-caption.ml-1.px-1.d-none.d-md-flex(
        v-if="pathname != '/privacypolicy'"
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

    UpperBlob1.blob1.blobs
    UpperBlob2.blob2.blobs
    UpperBlob3.blob3.blobs
</template>

<script>
import { reactive, computed } from '@vue/composition-api'

import { mdiBrightness7, mdiMoonWaningCrescent } from '@mdi/js'

import darkMode from '~/assets/ts/darkMode.ts'

import Socials from '~/components/Socials'
import Locale from '~/components/Locale'

import Blob1 from '~/assets/svg/under/Blob1.svg'
import Blob2 from '~/assets/svg/under/Blob2.svg'
import Blob3 from '~/assets/svg/under/Blob3.svg'

import UpperBlob1 from '~/assets/svg/upper/Blob1.svg'
import UpperBlob2 from '~/assets/svg/upper/Blob2.svg'
import UpperBlob3 from '~/assets/svg/upper/Blob3.svg'

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { root: { $vuetify } }) {
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
    Blob1,
    Blob2,
    Blob3,
    UpperBlob1,
    UpperBlob2,
    UpperBlob3
  }
}
</script>

<style lang="sass">
.blobs
  position: fixed
  pointer-events: none
  width: 50vmin
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
</style>
