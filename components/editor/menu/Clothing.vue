<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.clothing.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <BarColor
        :text="$t('editor.menu.clothing.color')"
        val="clothing_basic"
        :shade="4 / 5"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <BarList target="clothing"></BarList>

      <v-divider class="my-4"></v-divider>

      <BarSwitch :text="$t('editor.menu.scarf.title')" val="scarf"></BarSwitch>

      <BarColor
        :text="$t('editor.menu.scarf.color')"
        val="scarf_basic"
        :shade="4 / 5"
        off="scarf"
      ></BarColor>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import BarSwitch from "../BarSwitches";
import BarColor from "../BarColors";
import BarList from "../BarLists";

export default {
  components: {
    BarSwitch,
    BarColor,
    BarList,
  },
};
</script>
