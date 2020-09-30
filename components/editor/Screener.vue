<template lang="pug">
  v-bottom-sheet(v-model="opened" inset hide-overlay)
    v-sheet.text-center(dark)
      v-container
        v-row(v-if="mode == 1")
          v-col
            v-alert(type="error" outlined) {{ $t('editor.screener.warning') }}

        v-row
          v-col(cols="5" sm="5" md="2" lg="2" xl="2")
            v-combobox(
              v-model="size"

              color="primary"
              :items="resolutions.types"
              :label="$t('editor.quality')"
              outlined
              hide-details
            )

          v-col(cols="6" sm="2" md="3" lg="3" xl="3")
            v-btn-toggle.my-1(
              v-model="mode"
              mandatory
              color="primary"
            )
              v-btn(
                outlined
                :aria-label="$t('editor.screener.format.png')"
              ) png

              v-btn(
                outlined
                :aria-label="$t('editor.screener.format.jpeg')"
              ) jpeg

              v-btn(
                outlined
                :aria-label="$t('editor.screener.format.bmp')"
              ) bmp

          v-col(cols="9" md="4" lg="4" xl="4")
            BarColor(
              :text="$t('editor.screener.background')"
              val="background_basic"
            )

          v-col(cols="1" sm="1" md="2" lg="2" xl="2")
          v-col(cols="1" sm="2" md="1" lg="1" xl="1")
            v-btn(
              fab
              @click="takeImage"
              :aria-label="$t('editor.screener.take_image')"
            )
              v-icon {{ icons.mdiCameraImage }}

    v-overlay(:value="screened")
      v-card.pa-4.max-photo-scale(light raised max-width="800")
        v-img.grey.lighten-3(:src="photo" max-height="450" contain)

        v-card-title {{ globals.name }}
        v-card-actions
          v-spacer
          v-btn(text @click="screened = false") {{ $t('editor.close') }}
          v-btn(
            ref="imageDownload"
            color="primary"
            :href="photo"
            :title="download"
            :download="download"
          ) {{ $t('editor.save') }}
</template>

<script>
import { computed, reactive, toRefs, ref } from '@vue/composition-api'

import { mdiCameraImage } from '@mdi/js'

import BarColor from './BarColors.vue'

function Resolutions(getters, commit) {
  const resolutions = reactive({
    types: ['2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'],

    sizes: [
      [3840, 2160],
      [2560, 1440],
      [1920, 1080],
      [1280, 720],
      [854, 480],
      [640, 360],
      [426, 240],
      [256, 144]
    ]
  })

  const size = computed({
    get: () => getters['interface/getQuality'] + 'p',
    set(quality) {
      const { types, sizes } = resolutions

      commit('interface/setQuality', sizes[types.indexOf(quality)][1])
    }
  })

  return { resolutions, size }
}

export default {
  components: {
    BarColor
  },

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { refs, root: { $store, $refs } }) {
    const { getters, commit } = $store
    const { resolutions, size } = Resolutions(getters, commit)

    const opened = computed({
      get: () => props.open,
      set: () => commit('interface/setPage', false)
    })

    const icons = reactive({
      mdiCameraImage
    })

    const options = reactive({
      mode: 0
    })

    const store = reactive({
      globals: computed(() => getters['avatar/getGlobal']),
      colors: computed(() => getters['avatar/getColor'])
    })

    const screened = ref(false)
    const photo = ref('')
    const download = ref('')

    function takeImage() {
      const format = ['png', 'jpeg', 'bmp'][options.mode]

      screened.value = true

      download.value = 'TFs - ' + store.globals.name + '.' + format
      photo.value = $refs.avatar.toDataURL('image/' + format)

      setTimeout(() => {
        const img = document.createElement('img')

        img.src = photo.value
        img.alt = download.value
        img.style = 'display: none'

        refs.imageDownload.$el.appendChild(img)
      }, 100)
    }

    return {
      ...toRefs(options),
      ...toRefs(store),

      resolutions,
      size,

      opened,
      icons,
      takeImage,
      screened,
      photo,
      download
    }
  }
}
</script>

<style lang="sass">
.max-photo-scale
  width: 75vmin
</style>
