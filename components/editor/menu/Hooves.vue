<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.paws.title') }}
    v-expansion-panel-content
      .py-2

      p.subtitle-2 {{ $t('editor.menu.paws.second.title') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="hooves_second_color"
        off="hooves_enable"
      )

      BarColor(
        :text="$t('editor.menu.paws.second.color')"
        val="hooves_second_basic"
        :shade="4 / 5"
        off="hooves_second_color"
      )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.paws.front.left') }}

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.paws.shoulder')"
          val="hooves_front_left_shoulder_angle"
          max=120
          min=-120
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.elbow')"
          val="hooves_front_left_elbow_angle"
          max=120
          min=-120
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.wrist')"
          val="hooves_front_left_wrist_angle"
          max=90
          min=-90
        )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.paws.front.right') }}

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.paws.shoulder')"
          val="hooves_front_right_shoulder_angle"
          max=120
          min=-120
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.elbow')"
          val="hooves_front_right_elbow_angle"
          max=120
          min=-120
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.wrist')"
          val="hooves_front_right_wrist_angle"
          max=90
          min=-90
        )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.paws.back.left') }}

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.paws.thigh')"
          val="hooves_back_left_thigh_angle"
          max=45
          min=-45
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.forearm')"
          val="hooves_back_left_forearm_angle"
          max=90
          min=-90
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.knee')"
          val="hooves_back_left_knee_angle"
          max=120
          min=-120
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.foot')"
          val="hooves_back_left_foot_angle"
          max=90
          min=-90
        )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.paws.back.right') }}

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.paws.thigh')"
          val="hooves_back_right_thigh_angle"
          max=45
          min=-45
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.forearm')"
          val="hooves_back_right_forearm_angle"
          max=90
          min=-90
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.knee')"
          val="hooves_back_right_knee_angle"
          max=120
          min=-120
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.paws.foot')"
          val="hooves_back_right_foot_angle"
          max=90
          min=-90
        )
</template>

<script>
import BarSwitch from '../BarSwitches'
import BarSlider from '../BarSliders'
import BarColor from '../BarColors'

export default {
  components: {
    BarSwitch,
    BarSlider,
    BarColor
  }
}
</script>
