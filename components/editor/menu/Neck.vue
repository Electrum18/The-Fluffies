<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.neck.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <BarSwitch
        :text="$t('editor.menu.neck.collar.enable')"
        val="collar_enable"
      ></BarSwitch>

      <BarColor
        :text="$t('editor.menu.neck.collar.color')"
        :shade="3 / 5"
        val="collar_basic"
        off="collar_enable"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <BarSwitch
        :text="$t('editor.menu.neck.bowtie.enable')"
        val="bowtie_enable"
      ></BarSwitch>

      <BarColor
        :text="$t('editor.menu.neck.bowtie.color')"
        :shade="5 / 6"
        val="bowtie_basic"
        off="bowtie_enable"
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
