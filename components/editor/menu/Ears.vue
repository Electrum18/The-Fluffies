<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.ears.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <BarList target="ears"></BarList>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.ears.second.title") }}</p>

      <BarSwitch :text="$t('editor.enable')" val="ear_second_color"></BarSwitch>

      <BarColor
        :text="$t('editor.menu.ears.second.color')"
        val="ear_basic"
        :shade="4 / 5"
        off="ear_second_color"
      ></BarColor>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import BarList from "../BarLists";
import BarSlider from "../BarSliders";
import BarSwitch from "../BarSwitches";
import BarColor from "../BarColors";

export default {
  components: {
    BarList,
    BarSlider,
    BarSwitch,
    BarColor,
  },
};
</script>
