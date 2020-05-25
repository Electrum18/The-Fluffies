<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.paws.title') }}
    v-expansion-panel-content
      BarSwitch(
        :text="$t('editor.enable')"
        val="hooves_enable"
      )


      .py-2

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.paws.left') }}

      v-divider.my-4


      .py-2

      p.subtitle-2 {{ $t('editor.menu.paws.shoulder') }}

      v-card(outlined :disabled="!globals.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.paws.rise')"
          val="hooves_left_shoulder_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.angle')"
          val="hooves_left_shoulder_angle"
          max=180
          min=-180
        )


      .py-2

      p.subtitle-2 {{ $t('editor.menu.paws.elbow') }}

      v-card(outlined :disabled="!globals.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.paws.rise')"
          val="hooves_left_elbow_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.angle')"
          val="hooves_left_elbow_angle"
          max=180
          min=-180
        )


      .py-2

      p.subtitle-2 {{ $t('editor.menu.paws.wrist') }}

      v-card(outlined :disabled="!globals.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.paws.rise')"
          val="hooves_left_wrist_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.angle')"
          val="hooves_left_wrist_angle"
          max=180
          min=-180
        )


      .py-2

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.paws.right') }}

      v-divider.my-4


      .py-2

      p.subtitle-2 {{ $t('editor.menu.paws.shoulder') }}

      v-card(outlined :disabled="!globals.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.paws.rise')"
          val="hooves_right_shoulder_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.angle')"
          val="hooves_right_shoulder_angle"
          max=180
          min=-180
        )


      .py-2

      p.subtitle-2 {{ $t('editor.menu.paws.elbow') }}

      v-card(outlined :disabled="!globals.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.paws.rise')"
          val="hooves_right_elbow_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.angle')"
          val="hooves_right_elbow_angle"
          max=180
          min=-180
        )


      .py-2

      p.subtitle-2 {{ $t('editor.menu.paws.wrist') }}

      v-card(outlined :disabled="!globals.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.paws.rise')"
          val="hooves_right_wrist_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.angle')"
          val="hooves_right_wrist_angle"
          max=180
          min=-180
        )
</template>

<script>
import { computed } from '@vue/composition-api'

import BarSwitch from '../BarSwitches'
import BarSlider from '../BarSliders'

export default {
  components: {
    BarSwitch,
    BarSlider
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { root: { $store } }) {
    return {
      globals: computed(() => $store.getters['avatar/getGlobal'])
    }
  }
}
</script>
