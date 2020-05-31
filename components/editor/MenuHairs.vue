<template lang="pug">
  v-navigation-drawer(
    v-model="open"
    dark
    fixed
    right
    temporary
    touchless
    :permanent="open"
    hide-overlay
  )
    v-container
      v-card(outlined)
        v-card-title {{ locale.list[$i18n.locale] }}
          v-spacer
          v-btn.mx-n2(
            fab
            small
            @click="close()"
            :aria-label="$t('editor.back')"
          )
            v-icon {{ icons.mdiKeyboardBackspace }}

        BarList(target="hair" isHairList=true)
</template>

<script>
import { reactive } from '@vue/composition-api'

import { mdiKeyboardBackspace } from '@mdi/js'

import BarList from './BarLists'

export default {
  components: {
    BarList
  },

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  setup(_, { root: { $store } }) {
    const locale = reactive({
      list: {
        en: 'Mane list',
        ru: 'Список грив'
      },

      by: {
        en: 'author: ',
        ru: 'автор: '
      }
    })

    const icons = reactive({
      mdiKeyboardBackspace
    })

    return {
      locale,
      icons,

      close: () => $store.commit('interface/setPage', 'Avatar')
    }
  }
}
</script>
