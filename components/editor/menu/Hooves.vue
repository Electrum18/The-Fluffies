<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.paws.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <div class="py-2"></div>

      <p class="subtitle-2">{{ $t("editor.menu.paws.second.title") }}</p>

      <BarSwitch
        :text="$t('editor.enable')"
        val="hooves_second_color"
        off="hooves_enable"
      ></BarSwitch>

      <BarColor
        :text="$t('editor.menu.paws.second.color')"
        val="hooves_second_basic"
        :shade="4 / 5"
        off="hooves_second_color"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.paws.front.left") }}</p>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.paws.shoulder')"
          val="hooves_front_left_shoulder_angle"
          max="120"
          min="-120"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.paws.elbow')"
          val="hooves_front_left_elbow_angle"
          max="120"
          min="-120"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.paws.wrist')"
          val="hooves_front_left_wrist_angle"
          max="90"
          min="-90"
        ></BarSlider>
      </v-card>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.paws.front.right") }}</p>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.paws.shoulder')"
          val="hooves_front_right_shoulder_angle"
          max="120"
          min="-120"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.paws.elbow')"
          val="hooves_front_right_elbow_angle"
          max="120"
          min="-120"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.paws.wrist')"
          val="hooves_front_right_wrist_angle"
          max="90"
          min="-90"
        ></BarSlider>
      </v-card>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.paws.back.left") }}</p>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.paws.thigh')"
          val="hooves_back_left_thigh_angle"
          max="45"
          min="-45"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.paws.forearm')"
          val="hooves_back_left_forearm_angle"
          max="90"
          min="-90"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.paws.knee')"
          val="hooves_back_left_knee_angle"
          max="120"
          min="-120"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.paws.foot')"
          val="hooves_back_left_foot_angle"
          max="90"
          min="-90"
        ></BarSlider>
      </v-card>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.paws.back.right") }}</p>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.paws.thigh')"
          val="hooves_back_right_thigh_angle"
          max="45"
          min="-45"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.paws.forearm')"
          val="hooves_back_right_forearm_angle"
          max="90"
          min="-90"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.paws.knee')"
          val="hooves_back_right_knee_angle"
          max="120"
          min="-120"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.paws.foot')"
          val="hooves_back_right_foot_angle"
          max="90"
          min="-90"
        ></BarSlider>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import BarSwitch from "../BarSwitches";
import BarSlider from "../BarSliders";
import BarColor from "../BarColors";

export default {
  components: {
    BarSwitch,
    BarSlider,
    BarColor,
  },
};
</script>
