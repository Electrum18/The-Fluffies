<template lang="pug">
  div
    v-btn.fixed-position(
      @click="open = !open"
      fab
      fixed
      left
      color="#f96854"
      dark
      small
      title="Patreon"
      aria-label="Patreon"
    )
      v-icon {{ icons.mdiPatreon }}

    v-navigation-drawer(
      v-model="open"
      fixed
      dark
      clipped
    )
      v-container
        v-card(outlined)
          v-card-title {{ $t('index.patrons.title') }}
            v-spacer
            v-btn(fab small @click="open = false")
              v-icon {{ icons.mdiArrowLeft }}

          v-card-subtitle {{ $t('index.patrons.subtitle') }}

          v-btn(
            block
            @click="open = false"
            target="_blank"
            title="Patreon"
            href="https://www.patreon.com/the_fluffies"
            rel="noopener"
            aria-label="Patreon"
            color="#f96854"
          ) Patreon
            v-icon(right) {{ icons.mdiPatreon }}

        v-divider.my-4

        v-virtual-scroll(
          :items="patrons"
          :item-height="50"
          width="100vw"
          height=1080
          max-height="calc(100vh - 212px)"
        )
          template(v-slot="{ item }")
            v-list-item
              v-list-item-avatar.ml-0
                v-avatar(color="grey" size=42)
                  img(
                    :alt="item.name"
                    :src="item.avatar"
                  )

              v-list-item-content
                v-list-item-title {{ item.name }}
                v-list-item-subtitle(:style="patronageColor(item.type)") {{ item.type }}

</template>

<script>
import axios from 'axios'

import { ref, onBeforeMount, reactive } from '@vue/composition-api'

import { mdiPatreon, mdiArrowLeft } from '@mdi/js'

export default {
  setup() {
    const open = ref(false)
    const patrons = ref([])

    const icons = reactive({
      mdiPatreon,
      mdiArrowLeft
    })

    let url

    if (process.browser) {
      if (window.location.hostname === 'localhost') {
        url = 'http://localhost:5001'
      } else {
        url = 'https://the-fluffies.net'
      }
    }

    function patronageColor(patronage) {
      if (patronage === 'Little supporter') {
        return { color: '#D84315' }
      } else if (patronage === 'Basic supporter') {
        return { color: '#CFD8DC' }
      } else if (patronage === 'Huge supporter') {
        return { color: '#FFD600' }
      }
    }

    onBeforeMount(() => {
      axios
        .get(url + '/patrons', { withCredentials: true })
        .then(({ data }) => (patrons.value = data))
        .catch(() => {})
    })

    return {
      open,
      patrons,
      icons,
      patronageColor
    }
  }
}
</script>

<style lang="sass">
.fixed-position
  top: 50%
</style>
