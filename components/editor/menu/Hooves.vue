<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.hooves.title') }}
    v-expansion-panel-content
      BarSwitch(
        :text="$t('editor.enable')"
        val="hooves_enable"
      )


      .py-2

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.hooves.left') }}

      v-divider.my-4


      .py-2

      p.subtitle-2 {{ $t('editor.menu.hooves.shoulder') }}

      v-card(outlined :disabled="!getProper.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.hooves.rise')"
          val="hooves_left_shoulder_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.hooves.angle')"
          val="hooves_left_shoulder_angle"
          max=180
          min=-180
        )


      .py-2

      p.subtitle-2 {{ $t('editor.menu.hooves.elbow') }}

      v-card(outlined :disabled="!getProper.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.hooves.rise')"
          val="hooves_left_elbow_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.hooves.angle')"
          val="hooves_left_elbow_angle"
          max=180
          min=-180
        )


      .py-2

      p.subtitle-2 {{ $t('editor.menu.hooves.wrist') }}

      v-card(outlined :disabled="!getProper.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.hooves.rise')"
          val="hooves_left_wrist_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.hooves.angle')"
          val="hooves_left_wrist_angle"
          max=180
          min=-180
        )


      .py-2

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.hooves.right') }}

      v-divider.my-4


      .py-2

      p.subtitle-2 {{ $t('editor.menu.hooves.shoulder') }}

      v-card(outlined :disabled="!getProper.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.hooves.rise')"
          val="hooves_right_shoulder_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.hooves.angle')"
          val="hooves_right_shoulder_angle"
          max=180
          min=-180
        )


      .py-2

      p.subtitle-2 {{ $t('editor.menu.hooves.elbow') }}

      v-card(outlined :disabled="!getProper.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.hooves.rise')"
          val="hooves_right_elbow_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.hooves.angle')"
          val="hooves_right_elbow_angle"
          max=180
          min=-180
        )


      .py-2

      p.subtitle-2 {{ $t('editor.menu.hooves.wrist') }}

      v-card(outlined :disabled="!getProper.hooves_enable").my-2
        BarSlider(
          :text="$t('editor.menu.hooves.rise')"
          val="hooves_right_wrist_rise"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.hooves.angle')"
          val="hooves_right_wrist_angle"
          max=180
          min=-180
        )
</template>

<script>
import { mapGetters } from 'vuex'

import BarSwitch from '../BarSwitches'
import BarSlider from '../BarSliders'

export default {
  components: {
    BarSwitch,
    BarSlider
  },

  computed: {
    ...mapGetters('avatar', ['getProper'])
  }
}
</script>
