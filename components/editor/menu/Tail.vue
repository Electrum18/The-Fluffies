<template>
  <v-expansion-panel>
    <v-expansion-panel-header class="title">
      {{ $t("editor.menu.tail.title") }}
    </v-expansion-panel-header>

    <v-expansion-panel-content>
      <BarColor
        :text="$t('editor.menu.tail.color')"
        val="hair_basic"
        :shade="3 / 4"
      ></BarColor>

      <v-divider class="my-4"></v-divider>

      <v-card outlined="outlined">
        <v-card light="light">
          <v-card-title class="body-1 font-weight-bold">
            {{ globals["tail_name_" + $i18n.locale] }}
          </v-card-title>
        </v-card>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            class="btn-max text-truncate"
            @click="openTails()"
            :aria-label="$t('editor.menu.tail.change')"
          >
            {{ $t("editor.menu.tail.change") }}
          </v-btn>

          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { computed } from "@vue/composition-api";

import BarSwitch from "../BarSwitches";
import BarColor from "../BarColors";

export default {
  components: {
    BarSwitch,
    BarColor,
  },

  setup(_, { root: { $store } }) {
    function openTails() {
      $store.commit("interface/setPage", "Tails");
    }

    return {
      openTails,

      globals: computed(() => $store.getters["avatar/getGlobal"]),
    };
  },
};
</script>
