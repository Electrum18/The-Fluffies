<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.pants.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <BarColor
        :text="$t('editor.menu.pants.color')"
        val="pants_basic"
        :shade="4 / 5"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <BarList target="pants"></BarList>
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
