<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.emotion.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <div class="py-2"></div>

      <p class="subtitle-2">{{ $t("editor.menu.emotion.mouth") }}</p>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.emotion.open')"
          val="jaw_open"
          max="100"
          min="0"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.emotion.sad')"
          val="jaw_sad"
          max="100"
          min="0"
        ></BarSlider>
      </v-card>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.emotion.tongue") }}</p>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.emotion.raise')"
          val="tongue_raised"
          max="100"
          min="0"
        ></BarSlider>
      </v-card>

      <v-divider class="my-4"></v-divider>

      <p class="subtitle-2">{{ $t("editor.menu.emotion.teeth") }}</p>

      <v-card class="my-2" outlined="outlined">
        <BarSlider
          :text="$t('editor.menu.emotion.upper')"
          val="teeth_upper"
          max="100"
          min="0"
        ></BarSlider>

        <v-divider></v-divider>

        <BarSlider
          :text="$t('editor.menu.emotion.lower')"
          val="teeth_lower"
          max="100"
          min="0"
        ></BarSlider>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import BarSlider from "../BarSliders";

export default {
  components: {
    BarSlider,
  },
};
</script>
