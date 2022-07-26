<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.mouth.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <BarSwitch :text="$t('editor.menu.mouth.fangs')" val="fangs"></BarSwitch>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.emotion.teeth") }}</p>

      <BarSwitch
        :text="$t('editor.menu.mouth.sharp')"
        val="sharp_teeth"
      ></BarSwitch>

      <v-divider class="my-4"></v-divider>

      <BarColor
        :text="$t('editor.menu.mouth.mouth')"
        val="jaw_basic"
      ></BarColor>

      <BarColor
        :text="$t('editor.menu.mouth.tongue')"
        val="tongue_basic"
        :shade="9 / 10"
      ></BarColor>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import BarSwitch from "../BarSwitches";
import BarColor from "../BarColors";

export default {
  components: {
    BarSwitch,
    BarColor,
  },
};
</script>
