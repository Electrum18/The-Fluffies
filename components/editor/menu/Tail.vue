<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.tail.title') }}
    v-expansion-panel-content
      BarColor(
        :text="$t('editor.menu.tail.color')"
        val="hair_basic"
        :shade="3 / 4"
      )

      v-divider.my-4

      v-card(outlined)
        v-card(light)
          v-card-title.body-1.font-weight-bold {{ globals['tail_name_' + $i18n.locale] }}

        v-divider

        v-card-actions
          v-spacer
          v-btn.btn-max.text-truncate(
            @click="openTails()"
            :aria-label="$t('editor.menu.tail.change')"
          ) {{ $t('editor.menu.tail.change') }}
          v-spacer

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.tail.second.title') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="hair_second"
      )

      BarColor(
        :text="$t('editor.menu.tail.second.color')"
        val="hair_second"
        off="hair_second"
      )
</template>

<script>
import { computed } from '@vue/composition-api'

import BarSwitch from '../BarSwitches'
import BarColor from '../BarColors'

export default {
  components: {
    BarSwitch,
    BarColor
  },

  setup(_, { root: { $store } }) {
    function openTails() {
      $store.commit('interface/setPage', 'Tails')
    }

    return {
      openTails,

      globals: computed(() => $store.getters['avatar/getGlobal'])
    }
  }
}
</script>
