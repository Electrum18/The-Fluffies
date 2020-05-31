<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.eyebrows.title') }}
    v-expansion-panel-content
      BarSwitch(:text="$t('editor.enable')" val="eyes_brows_show")

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.eyebrows.left') }}

      v-card(outlined :disabled="!globals.eyes_brows_show").my-2
        BarSlider(
          :text="$t('editor.menu.eyebrows.width')"
          val="eyes_brows_left_width"
          max=150
          min=50
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.eyebrows.height')"
          val="eyes_brows_left_height"
          max=100
          min=-100
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.eyebrows.evil')"
          val="eyes_brows_left_evil"
          max=100
          min=0
          compare="eyes_brows_left_wide"
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.eyebrows.surprised')"
          val="eyes_brows_left_wide"
          max=100
          min=0
          compare="eyes_brows_left_evil"
        )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.eyebrows.right') }}

      v-card(outlined :disabled="!globals.eyes_brows_show").my-2
        BarSlider(
          :text="$t('editor.menu.eyebrows.width')"
          val="eyes_brows_right_width"
          max=150
          min=50
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.eyebrows.height')"
          val="eyes_brows_right_height"
          max=100
          min=-100
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.eyebrows.evil')"
          val="eyes_brows_right_evil"
          max=100
          min=0
          compare="eyes_brows_right_wide"
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.eyebrows.surprised')"
          val="eyes_brows_right_wide"
          max=100
          min=0
          compare="eyes_brows_right_evil"
        )
</template>

<script>
import { computed } from '@vue/composition-api'

import BarSwitch from '../BarSwitches.vue'
import BarSlider from '../BarSliders.vue'
import BarColor from '../BarColors.vue'

export default {
  setup: (_, { root: { $store } }) => {
    return {
      globals: computed(() => $store.getters['avatar/getGlobal'])
    }
  },

  components: {
    BarSwitch,
    BarSlider,
    BarColor
  }
}
</script>
