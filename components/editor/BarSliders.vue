<template>
  <v-col>
    <v-row class="mt-0">
      <div class="body-2 pl-3">{{ text }}</div>
      <v-spacer></v-spacer>

      <v-btn
        icon="icon"
        x-small="x-small"
        @click="modelValue = defaultVal.propers[val]"
      >
        <v-icon>{{ icons.mdiRestore }}</v-icon>
      </v-btn>
      
      <div class="body-2 mx-2 px-1 value primary">{{ modelValue }}</div>
    </v-row>

    <v-row>
      <v-slider
        class="inputs2 mx-1 my-0"
        v-model="modelValue"
        color="primary"
        hide-details="hide-details"
        :max="max"
        :min="min"
      ></v-slider>

      <v-tooltip top="top">
        <template v-slot:activator="{ on }">
          <v-icon class="mr-2 my-2" color="primary" small="small" v-on="on">{{
            icons.mdiAnimation
          }}</v-icon>
        </template>

        <span>{{ $t("editor.menu.animated") }}</span>
      </v-tooltip>
    </v-row>
  </v-col>
</template>

<script>
import { computed, reactive } from "@vue/composition-api";

import { mdiAnimation, mdiRestore } from "@mdi/js";

export default {
  props: {
    text: {
      type: String,
      default: "",
      required: true,
    },

    val: {
      type: String,
      default: "",
      required: true,
    },

    min: {
      type: String,
      default: "0",
    },

    max: {
      type: String,
      default: "100",
    },

    compare: {
      type: String,
      default: undefined,
    },
  },

  setup({ val, compare }, { root: { $store } }) {
    const { getters, commit } = $store;

    const icons = reactive({
      mdiAnimation,
      mdiRestore,
    });

    const defaultVal = computed(() => getters["avatar/getDefault"]);
    const getting = computed(() => getters["avatar/getProper"]);
    const getFrame = computed(() => getters["avatar/getFrame"]);

    const modelValue = computed({
      get: () => getting.value[val],
      set(value) {
        commit("avatar/setProper", { path: val, value });
        commit("interface/setPlayChangedFrame");

        const animations = JSON.parse(localStorage.getItem("animations"));

        const frame = animations[0].frames[getFrame.value].frame;

        frame[val] = value;

        if (compare && 100 - getting.value[compare] <= value) {
          commit("avatar/setProper", {
            path: compare,
            value: 100 - value,
          });

          frame[compare] = 100 - value;
        }

        localStorage.setItem("animations", JSON.stringify(animations));
      },
    });

    return {
      icons,
      getting,
      modelValue,
      defaultVal,
    };
  },
};
</script>

<style>
.value {
  user-select: none;
  border-radius: 4px;
}
</style>
