<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.eyes.title') }}
    v-expansion-panel-content
      BarColor(
        :text="$t('editor.menu.eyes.color')"
        val="eyes_left_basic"
      )

      BarSwitch(
        :text="$t('editor.menu.eyes.heterochromia')"
        val="eyes_right_enable"
      )

      BarColor(
        :text="$t('editor.menu.eyes.color_right')"
        val="eyes_right_basic"
        off="eyes_right_enable"
      )

      v-divider.my-4

      BarColor(
        :text="$t('editor.menu.eyes.color_sclera')"
        val="eyes_sclera"
      )

      v-divider.my-4

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.eyes.scale')"
          val="eyes_iris_scale"
          max=125
          min=50
        )

      v-divider.my-4


      p.subtitle-2 {{ $t('editor.menu.eyes.pupils') }}

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.eyes.width')"
          val="eyes_pupils_width"
          max=100
          min=10
        )

        BarColor(
          :text="$t('editor.menu.eyes.color_pupil')"
          val="eyes_pupil"
        )

      v-divider.my-4


      p.subtitle-2 {{ $t('editor.menu.eyes.position') }}

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.eyes.horizontal')"
          val="eyes_position_horiz"
          max=100
          min=-100
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.eyes.vertical')"
          val="eyes_position_verti"
          max=100
          min=-100
        )

      v-divider.my-4


      p.subtitle-2 {{ $t('editor.menu.eyes.left_eyelids') }}

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.eyes.upper')"
          val="eyes_eyelids_left_up"
          max=100
          min=0
          compare="eyes_eyelids_left_down"
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.eyes.lower')"
          val="eyes_eyelids_left_down"
          max=100
          min=0
          compare="eyes_eyelids_left_up"
        )

      v-divider.my-4


      p.subtitle-2 {{ $t('editor.menu.eyes.right_eyelids') }}

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.eyes.upper')"
          val="eyes_eyelids_right_up"
          max=100
          min=0
          compare="eyes_eyelids_right_down"
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.eyes.lower')"
          val="eyes_eyelids_right_down"
          max=100
          min=0
          compare="eyes_eyelids_right_up"
        )
</template>

<script>
import { computed } from '@vue/composition-api'

import BarSwitch from '../BarSwitches'
import BarSlider from '../BarSliders'
import BarColor from '../BarColors'

export default {
  components: {
    BarSwitch,
    BarSlider,
    BarColor
  },

  setup(props, { root: { $store } }) {
    return {
      globals: computed(() => $store.getters['avatar/getGlobal'])
    }
  }
}
</script>
