<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.horn.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <p class="subtitle-2 mt-4">{{ $t("editor.menu.horn.second.title") }}</p>

      <BarSwitch
        :text="$t('editor.enable')"
        val="horn_second_color"
      ></BarSwitch>

      <BarColor
        :text="$t('editor.menu.horn.second.color')"
        val="horn_basic"
        :shade="4 / 5"
        off="horn_second_color"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <BarList target="horn_front"></BarList>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.horn.rear.title") }}</p>

      <BarColor
        :text="$t('editor.menu.horn.rear.set')"
        val="horn_rear_basic"
        :shade="4 / 5"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <BarList target="horn"></BarList>
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
