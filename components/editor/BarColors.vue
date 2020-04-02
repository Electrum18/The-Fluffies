<template lang="pug">
  v-card(outlined :disabled="enable").my-2
    v-row
      div.body-2.mx-6.py-2 {{ title }}
      v-spacer
      v-menu(:close-on-content-click="false")
        template(v-slot:activator="{ on }")
          v-btn.mx-3.px-0(
            :color="cssColor"
            v-on="on"
            style="min-width: 42px"
            aria-label="Open color picker"
          )
            v-icon(:color="darker") {{ icons.mdiPalette }}

        v-color-picker(v-model="value")
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import { mdiPalette } from '@mdi/js'

export default {
  props: {
    text: {
      type: String,
      default: '',
      required: true
    },

    val: {
      type: String,
      default: '',
      required: true
    },

    shade: {
      type: Number,
      default: undefined
    },

    off: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      icons: {
        mdiPalette
      }
    }
  },

  computed: {
    ...mapGetters('avatar', ['getProper', 'getColor']),

    enable() {
      return this.off ? !this.getProper[this.off] : false
    },

    darker() {
      return this.value.l > 2 / 3 ? 'black' : 'white'
    },

    cssColor() {
      const { h, s, l } = this.value

      return 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'
    },

    title() {
      const { locale } = this.$i18n

      if (locale === 'ru') {
        return 'цвет ' + this.text
      } else {
        return this.text + ' color'
      }
    },

    value: {
      get() {
        return this.getColor[this.val]
      },

      set(setVal) {
        if (setVal.a === 0) setVal.a += 0.01

        this.setColor({
          path: this.val,
          value: setVal
        })

        if (this.shade) {
          const { h, s, l } = setVal

          this.setColor({
            path: this.val.replace('basic', 'shade'),
            value: { h, s, l: l * this.shade }
          })
        }
      }
    }
  },

  methods: {
    ...mapMutations('avatar', ['setColor'])
  }
}
</script>
