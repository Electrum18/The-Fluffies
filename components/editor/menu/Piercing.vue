<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.piercing.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <BarColor
        :text="$t('editor.menu.piercing.color')"
        val="piercings_basic"
        :shade="4 / 5"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <p class="subtitlle-2">{{ $t("editor.menu.piercing.ears") }}</p>

      <BarList target="piercing_ears"></BarList>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import BarColor from "../BarColors";
import BarList from "../BarLists";

export default {
  components: {
    BarColor,
    BarList,
  },
};
</script>
