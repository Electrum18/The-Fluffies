<template lang="pug">
  v-bottom-sheet(v-model="opened" inset=true)
    v-sheet.text-center(dark)
      v-container
        v-row(v-if="mode == 1")
          v-col
            v-alert(type="error" outlined) {{ $t('editor.screener.warning') }}

        v-row
          v-col(cols="12" sm="6" md="2")
            v-text-field(
              v-model="width"
              :label="$t('editor.screener.width')"
              hide-details
              outlined
              suffix="px"
              :rules="[() => !!width || 'argh!']"
            )

          v-col(cols="12" sm="6" md="2")
            v-text-field(
              v-model="height"
              :label="$t('editor.screener.height')"
              hide-details
              outlined
              suffix="px"
              :rules="[() => !!height || 'argh!']"
            )

          v-col(cols="12" md="4")
            BarColor(
              :text="$t('editor.screener.background')"
              val="background_basic"
            )

          v-col(cols="12" sm="2" md="2")
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

          v-col(cols="12" sm="8" md="1")

          v-col(cols="12" sm="2" md="1")
            v-btn(
              fab
              @click="takeImage"
              :aria-label="$t('editor.screener.take_image')"
            )
              v-icon {{ icons.mdiCameraImage }}
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

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

  data() {
    return {
      mode: 0,

      width: 1920,
      height: 1080,

      icons: {
        mdiCameraImage
      }
    }
  },

  computed: {
    ...mapGetters('avatar', ['getProper', 'getColor']),

    opened: {
      get() {
        return this.open
      },

      set() {
        this.setPage(false)
      }
    }
  },

  methods: {
    ...mapMutations('interface', ['setPage']),

    takeImage() {
      const avatar = this.$root.$refs.avatar
      const ratio = avatar.width / avatar.height

      const canvas = document.createElement('canvas')

      let width = this.width
      let height = this.height

      // Canvas setting

      canvas.width = width
      canvas.height = height

      // Setting at center

      width = canvas.width
      height = width / ratio

      if (height > canvas.height) {
        height = canvas.height
        width = canvas.height * ratio
      }

      width *= 1.25

      const xOffset = (canvas.width - width) / 2
      const yOffset = canvas.height - height * 1.125

      height *= 1.25

      // Drawing image over background at bottom-center

      const ctx = canvas.getContext('2d')

      const { h, s, l, a } = this.getColor.background_basic

      ctx.fillStyle = a
        ? 'hsla(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%, ' + a + ')'
        : 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'

      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(avatar, xOffset, yOffset, width, height)

      // Creating file

      const e = document.createElement('a')

      const format = ['png', 'jpeg', 'bmp'][this.mode]

      e.style.display = 'none'
      e.download = 'TFs-' + this.getProper.name + '.' + format
      e.href = canvas.toDataURL('image/' + format)

      // Download file

      document.body.appendChild(e)

      e.click()

      document.body.removeChild(e)
    }
  }
}
</script>
