<template lang="pug">
  v-icon.network {{ icon }}
</template>

<script>
import { computed } from '@vue/composition-api'

import { mdiSignalOff, mdiSignal } from '@mdi/js'

export default {
  setup(props, { root }) {
    return {
      icon: computed(() => (root.isOffline ? mdiSignalOff : mdiSignal))
    }
  }
}
</script>

<style lang="sass">
.network
  z-index: 6
</style>
