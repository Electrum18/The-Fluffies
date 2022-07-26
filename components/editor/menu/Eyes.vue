<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.eyes.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <BarColor
        :text="$t('editor.menu.eyes.color')"
        val="eyes_left_basic"
      ></BarColor>

      <BarSwitch
        :text="$t('editor.menu.eyes.heterochromia')"
        val="eyes_right_enable"
      ></BarSwitch>

      <BarColor
        :text="$t('editor.menu.eyes.color_right')"
        val="eyes_right_basic"
        off="eyes_right_enable"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <BarColor
        :text="$t('editor.menu.eyes.color_sclera')"
        val="eyes_sclera"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.eyes.scale')"
          val="eyes_iris_scale"
          max="125"
          min="10"
        ></BarSlider>
      </v-card>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.eyes.pupils") }}</p>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.eyes.width')"
          val="eyes_pupils_width"
          max="100"
          min="0"
        ></BarSlider>
      </v-card>

      <BarColor
        :text="$t('editor.menu.eyes.color_pupil')"
        val="eyes_pupil"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.eyes.eyelashes.title") }}</p>

      <BarSwitch
        :text="$t('editor.menu.eyes.eyelashes.enable')"
        val="eyelashes_second_color"
      ></BarSwitch>
      <BarColor
        :text="$t('editor.menu.eyes.eyelashes.color')"
        val="eyelashes_basic"
        off="eyelashes_second_color"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.eyes.position") }}</p>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.eyes.horizontal')"
          val="eyes_position_horiz"
          max="100"
          min="-100"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.eyes.vertical')"
          val="eyes_position_verti"
          max="100"
          min="-100"
        ></BarSlider>

        <BarSlider
          :text="$t('editor.menu.eyes.focus')"
          val="eyes_focus"
          max="100"
          min="-100"
        ></BarSlider>
      </v-card>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.eyes.left_eyelids") }}</p>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.eyes.upper')"
          val="eyes_eyelids_left_up"
          max="100"
          min="0"
          compare="eyes_eyelids_left_down"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.eyes.lower')"
          val="eyes_eyelids_left_down"
          max="100"
          min="0"
          compare="eyes_eyelids_left_up"
        ></BarSlider>
      </v-card>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.eyes.right_eyelids") }}</p>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.eyes.upper')"
          val="eyes_eyelids_right_up"
          max="100"
          min="0"
          compare="eyes_eyelids_right_down"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.eyes.lower')"
          val="eyes_eyelids_right_down"
          max="100"
          min="0"
          compare="eyes_eyelids_right_up"
        ></BarSlider>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { computed } from "@vue/composition-api";

import BarSwitch from "../BarSwitches";
import BarSlider from "../BarSliders";
import BarColor from "../BarColors";

export default {
  components: {
    BarSwitch,
    BarSlider,
    BarColor,
  },

  setup(_, { root: { $store } }) {
    return {
      globals: computed(() => $store.getters["avatar/getGlobal"]),
    };
  },
};
</script>
