<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.glasses.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <BarColor
        :text="$t('editor.menu.glasses.color.lenses')"
        val="glasses_lenses"
      ></BarColor>

      <BarColor
        :text="$t('editor.menu.glasses.color.frame')"
        val="glasses_frame"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <BarList target="glasses"></BarList>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import BarSwitch from "../BarSwitches";
import BarSlider from "../BarSliders";
import BarColor from "../BarColors";
import BarList from "../BarLists";

export default {
  components: {
    BarSwitch,
    BarSlider,
    BarColor,
    BarList,
  },
};
</script>
