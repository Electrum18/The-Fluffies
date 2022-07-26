<template>
  <v-card class="my-2" outlined="outlined" :disabled="enable">
    <v-row>
      <div class="body-2 py-5" style="margin-left: 24px !important">
        {{ text }}
      </div>

      <v-spacer></v-spacer>

      <v-switch
        class="mx-4 my-3.5"
        v-model="check"
        color="primary"
        hide-details="hide-details"
      ></v-switch>
    </v-row>
  </v-card>
</template>

<script>
import { computed } from "@vue/composition-api";

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

    off: {
      type: String,
      default: undefined,
    },

    global: {
      type: [Boolean, undefined],
      default: undefined,
    },
  },

  setup({ val, off }, { root: { $store } }) {
    const globals = computed(() => $store.getters["avatar/getGlobal"]);

    const check = computed({
      get: () => globals.value[val],
      set(value) {
        const slot = +localStorage.getItem("slot");
        const save = JSON.parse(localStorage.getItem("avatars"));

        const { globals } = save[slot];

        $store.commit("avatar/setGlobal", { path: val, value });

        globals[val] = value;

        localStorage.setItem("avatars", JSON.stringify(save));
      },
    });

    return {
      enable: computed(() => (off ? !globals.value[off] : false)),

      check,
    };
  },
};
</script>
