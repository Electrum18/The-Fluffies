<template lang="pug">
  v-icon.network {{ icon }}
</template>

<script>
import { computed } from '@vue/composition-api'

import { mdiSignalOff, mdiSignal } from '@mdi/js'

export default {
  setup(props, { root }) {
    const icon = computed(() => {
      return root.isOffline ? mdiSignalOff : mdiSignal
    })

    return {
      icon
    }
  }
}
</script>

<style lang="sass">
.network
  position: fixed!important
  right: 16px
  top: 16px
  z-index: 6
</style>
