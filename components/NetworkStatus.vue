<template lang="pug">
  v-chip(label).my-0.px-2
    v-icon.network {{ icon }}
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api'

import { mdiSignalOff, mdiSignal } from '@mdi/js'

export default {
  setup() {
    const online = ref(true)

    function handleNetworkChange() {
      online.value = navigator.onLine
    }

    if (process.browser) {
      window.addEventListener('online', handleNetworkChange)
      window.addEventListener('offline', handleNetworkChange)
    }

    onMounted(() => {
      handleNetworkChange()
    })

    return {
      online,

      icon: computed(() => (online.value ? mdiSignal : mdiSignalOff))
    }
  }
}
</script>

<style lang="sass">
.network
  z-index: 6
</style>
