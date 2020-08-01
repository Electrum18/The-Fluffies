<template lang="pug">
  v-row.socials.my-n9(justify="center")
    v-btn.ma-4(
      icon
      large
      target="_blank"
      title="Github"
      href="https://github.com/Electrum18/The-Fluffies"
      rel="noopener"
      aria-label="Github"
    )
      v-icon(large) {{ icons.mdiGithub }}

    v-btn.ma-4(
      icon
      large
      target="_blank"
      title="Twitter"
      href="https://twitter.com/TFluffies"
      rel="noopener"
      aria-label="Twitter"
    )
      v-icon(large) {{ icons.mdiTwitter }}
</template>

<script lang="ts">
import { reactive } from '@vue/composition-api'

import { mdiGithub, mdiTwitter } from '@mdi/js'

export default {
  setup() {
    const icons = reactive({
      mdiGithub,
      mdiTwitter
    })

    return {
      icons
    }
  }
}
</script>

<style lang="sass">
.socials.row
  flex: unset
  margin: 0
  overflow: hidden
</style>
