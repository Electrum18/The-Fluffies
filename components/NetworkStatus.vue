<template lang="pug">
  v-icon.network {{ icon }}
</template>

<script>
import { ref, watch } from '@vue/composition-api'

import { mdiSignalOff, mdiSignal } from '@mdi/js'

export default {
  setup(props, { root }) {
    function checkOnline(boolean) {
      return boolean ? mdiSignalOff : mdiSignal
    }

    const icon = ref(checkOnline(root.isOffline))

    watch(
      () => root.isOffline,
      (boolean) => (icon.value = checkOnline(boolean))
    )

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
