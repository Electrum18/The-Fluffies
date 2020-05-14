<template lang="pug">
  v-bottom-sheet(v-model="opened" inset hide-overlay)
    v-sheet.text-center(dark)
      v-container
        v-row(v-if="mode == 1")
          v-col
            v-alert(type="error" outlined) {{ $t('editor.screener.warning') }}

        v-row
          v-col(cols="6" sm="6" md="2" lg="2" xl="2")
            v-text-field(
              v-model="width"
              :label="$t('editor.screener.width')"
              hide-details
              outlined
              suffix="px"
              :rules="[() => !!width || 'argh!']"
            )

          v-col(cols="6" sm="6" md="2" lg="2" xl="2")
            v-text-field(
              v-model="height"
              :label="$t('editor.screener.height')"
              hide-details
              outlined
              suffix="px"
              :rules="[() => !!height || 'argh!']"
            )

          v-col(cols="12" md="4" lg="4" xl="4")
            BarColor(
              :text="$t('editor.screener.background')"
              val="background_basic"
            )

          v-col(cols="6" sm="2" md="2" lg="2" xl="2")
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

          v-col(cols="3" sm="8" md="1" lg="1" xl="1")

          v-col(cols="3" sm="2" md="1" lg="1" xl="1")
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

    const opened = computed({
      get: () => props.open,
      set: () => commit('interface/setPage', false)
    })

    const icons = reactive({
      mdiCameraImage
    })

    const options = reactive({
      mode: 0,

      width: 1920,
      height: 1080
    })

    const store = reactive({
      globals: computed(() => getters['avatar/getGlobal']),
      colors: computed(() => getters['avatar/getColor'])
    })

    const screened = ref(false)
    const photo = ref('')
    const download = ref('')

    function takeImage() {
      const avatar = $refs.avatar
      const ratio = avatar.width / avatar.height

      const canvas = document.createElement('canvas')

      let widthVar = options.width
      let heightVar = options.height

      // Canvas setting

      canvas.width = widthVar
      canvas.height = heightVar

      // Setting at center

      widthVar = canvas.width
      heightVar = widthVar / ratio

      if (heightVar > canvas.height) {
        heightVar = canvas.height
        widthVar = canvas.height * ratio
      }

      widthVar *= 1.25

      const xOffset = (canvas.width - widthVar) / 2
      const yOffset = canvas.height - heightVar * 1.125

      heightVar *= 1.25

      // Drawing image over background at bottom-center

      const ctx = canvas.getContext('2d')

      const { h, s, l, a } = store.colors.background_basic

      ctx.fillStyle = a
        ? 'hsla(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%, ' + a + ')'
        : 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'

      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(avatar, xOffset, yOffset, widthVar, heightVar)

      // Creating file

      const format = ['png', 'jpeg', 'bmp'][options.mode]

      screened.value = true

      download.value = 'TFs - ' + store.globals.name + '.' + format
      photo.value = canvas.toDataURL('image/' + format)

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
