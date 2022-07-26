<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.fur.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <BarColor
        :text="$t('editor.menu.fur.color')"
        val="fur_basic"
        :shade="3 / 4"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.fur.stripes.title") }}</p>

      <BarSwitch :text="$t('editor.enable')" val="stripes_enable"></BarSwitch>
      <BarColor
        :text="$t('editor.menu.fur.stripes.color')"
        val="stripes_basic"
        off="stripes_enable"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.fur.freckles.title") }}</p>

      <BarSwitch
        :text="$t('editor.menu.fur.freckles.nose')"
        val="freckles_nose"
      ></BarSwitch>

      <BarSwitch
        :text="$t('editor.menu.fur.freckles.cheek')"
        val="freckles_cheeks"
      ></BarSwitch>

      <BarColor
        :text="$t('editor.menu.fur.freckles.color')"
        val="freckles_basic"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.fur.fluff.title") }}</p>

      <BarSwitch
        :text="$t('editor.menu.fur.fluff.cheeks')"
        val="fluff_cheeks"
      ></BarSwitch>

      <BarSwitch
        :text="$t('editor.menu.fur.fluff.chest')"
        val="fluff_chest"
      ></BarSwitch>

      <BarColor
        :text="$t('editor.menu.fur.fluff.color')"
        val="fluff_basic"
        :shade="4 / 5"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.fur.second.title") }}</p>

      <BarSwitch :text="$t('editor.enable')" val="fur_second_color"></BarSwitch>

      <BarColor
        :text="$t('editor.menu.fur.second.color')"
        val="fur_second_basic"
        :shade="3 / 4"
        off="fur_second_color"
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
