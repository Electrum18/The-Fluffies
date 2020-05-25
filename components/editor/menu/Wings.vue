<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.wings.title') }}
    v-expansion-panel-content
      BarSwitch(
        :text="$t('editor.enable')"
        val="wings_enable"
      )

      BarSwitch(
        :text="$t('editor.menu.wings.bat')"
        val="wings_bat"
        off="wings_enable"
      )

      v-divider.my-4

      BarColor(
        :text="$t('editor.menu.wings.color')"
        val="wings_basic"
        :shade="4 / 5"
        off="wings_enable"
      )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.wings.raise') }}

      v-card(outlined :disabled="!globals.wings_enable").my-2
        BarSlider(
          :text="$t('editor.menu.wings.left')"
          val="wing_left_folded"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.wings.right')"
          val="wing_right_folded"
          max=100
          min=0
        )
</template>

<script>
import { computed } from '@vue/composition-api'

import BarSlider from '../BarSliders'
import BarSwitch from '../BarSwitches'
import BarColor from '../BarColors'

export default {
  components: {
    BarSlider,
    BarSwitch,
    BarColor
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { root: { $store } }) {
    return {
      globals: computed(() => $store.getters['avatar/getGlobal'])
    }
  }
}
</script>
