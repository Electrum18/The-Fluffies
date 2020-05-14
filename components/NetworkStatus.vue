<template lang="pug">
  v-icon.network {{ icon }}
</template>

<script>
import { computed } from '@vue/composition-api'

import { mdiSignalOff, mdiSignal } from '@mdi/js'

export default {
  setup(props, { root }) {
    const offline = computed(() => root.isOffline)

    return {
      offline,

      icon: computed(() => (offline.value ? mdiSignalOff : mdiSignal))
    }
  }
}
</script>

<style lang="sass">
.network
  z-index: 6
</style>
