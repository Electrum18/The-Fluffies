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

        v-color-picker(v-model="modelValue")
</template>

<script>
import { computed, reactive } from '@vue/composition-api'

import { mdiPalette } from '@mdi/js'

function colorState(getters, commit, val, shade) {
  const colors = computed(() => getters['avatar/getColor'])

  const modelValue = computed({
    get: () => colors.value[val],
    set(value) {
      if (value.a === 0) value.a += 0.01

      const slot = +localStorage.getItem('slot')
      const save = JSON.parse(localStorage.getItem('avatars'))

      commit('avatar/setColor', { path: val, value })

      save[slot].color[val] = value

      if (shade) {
        const { h, s, l } = value

        const path = val.replace('basic', 'shade')

        commit('avatar/setColor', {
          path,
          value: { h, s, l: l * shade }
        })

        save[slot].color[path] = { h, s, l: l * shade }
      }

      localStorage.setItem('avatars', JSON.stringify(save))
    }
  })

  const cssColor = computed(() => {
    const { h, s, l } = modelValue.value

    return 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)'
  })

  return {
    colors,
    modelValue,
    cssColor,

    darker: computed(() => (modelValue.value.l > 2 / 3 ? 'black' : 'white'))
  }
}

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

  setup({ text, val, shade, off }, { root: { $store, $i18n } }) {
    const { getters, commit } = $store

    const icons = reactive({
      mdiPalette
    })

    const title = computed(() => {
      return $i18n.locale === 'ru' ? 'цвет ' + text : text + ' color'
    })

    const globals = computed(() => getters['avatar/getGlobal'])

    return {
      ...colorState(getters, commit, val, shade),

      icons,
      globals,
      title,

      enable: computed(() => (off ? !globals.value[off] : false))
    }
  }
}
</script>
