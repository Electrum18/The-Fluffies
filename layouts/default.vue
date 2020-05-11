<template lang="pug">
  v-app
    nuxt

    // Socials

    .my-7

    v-footer(fixed app)
      span &copy; {{ new Date().getFullYear() }} - The Fluffies

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
</template>

<script>
import { reactive } from '@vue/composition-api'

import { mdiBrightness7, mdiMoonWaningCrescent } from '@mdi/js'

import darkMode from '~/assets/js/darkMode'

import Socials from '~/components/Socials'

export default {
  setup(props, { root: { $vuetify } }) {
    const { dark } = darkMode($vuetify)

    const icons = reactive({
      mdiBrightness7,
      mdiMoonWaningCrescent
    })

    return {
      dark,
      icons
    }
  },

  components: {
    Socials
  }
}
</script>
