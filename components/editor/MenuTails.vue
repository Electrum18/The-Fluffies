<template>
  <v-navigation-drawer
    v-model="open"
    dark="dark"
    fixed="fixed"
    right="right"
    temporary="temporary"
    touchless="touchless"
    :permanent="open"
    hide-overlay="hide-overlay"
  >
    <v-container>
      <v-card outlined="outlined">
        <v-card-title
          >{{ locale.list[$i18n.locale] }}
          <v-spacer></v-spacer>
          <v-btn
            class="mx-n2"
            fab="fab"
            small="small"
            @click="close()"
            :aria-label="$t('editor.back')"
          >
            <v-icon>{{ icons.mdiKeyboardBackspace }}</v-icon>
          </v-btn>
        </v-card-title>

        <BarList
          target="tail"
          isListOf="tails"
          style="height: calc(100vh - 98px); overflow: auto"
        ></BarList>
      </v-card>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { reactive } from "@vue/composition-api";

import { mdiKeyboardBackspace } from "@mdi/js";

import BarList from "./BarLists";

export default {
  components: {
    BarList,
  },

  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },

  setup(_, { root: { $store } }) {
    const locale = reactive({
      list: {
        en: "Tails list",
        ru: "Список хвостов",
      },

      by: {
        en: "author: ",
        ru: "автор: ",
      },
    });

    const icons = reactive({
      mdiKeyboardBackspace,
    });

    return {
      locale,
      icons,

      close: () => $store.commit("interface/setPage", "Avatar"),
    };
  },
};
</script>
