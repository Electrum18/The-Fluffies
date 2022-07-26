<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.wings.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <BarSwitch :text="$t('editor.enable')" val="wings_enable"></BarSwitch>

      <BarSwitch
        :text="$t('editor.menu.wings.bat')"
        val="wings_bat"
        off="wings_enable"
      ></BarSwitch>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.wings.second.title") }}</p>

      <BarSwitch
        :text="$t('editor.enable')"
        val="wings_second_color"
        off="wings_enable"
      ></BarSwitch>

      <BarColor
        :text="$t('editor.menu.wings.second.color')"
        val="wings_basic"
        :shade="4 / 5"
        off="wings_second_color"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.wings.raise") }}</p>

      <v-card
        class="my-2"
        outlined="outlined"
        :disabled="!globals.wings_enable"
      >
        <BarSlider
          :text="$t('editor.menu.wings.left')"
          val="wing_left_folded"
          max="100"
          min="0"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.wings.right')"
          val="wing_right_folded"
          max="100"
          min="0"
        ></BarSlider>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { computed } from "@vue/composition-api";

import BarSlider from "../BarSliders";
import BarSwitch from "../BarSwitches";
import BarColor from "../BarColors";

export default {
  components: {
    BarSlider,
    BarSwitch,
    BarColor,
  },

  setup(_, { root: { $store } }) {
    return {
      globals: computed(() => $store.getters["avatar/getGlobal"]),
    };
  },
};
</script>
