<template>
  <div>
    <Menu :open="getPage === 'Avatar'"></Menu>
    <MenuHairs :open="getPage === 'Hairs'"></MenuHairs>
    <MenuTails :open="getPage === 'Tails'"></MenuTails>
    <Saves :open="getPage === 'Saves'"></Saves>
    <Position :open="getPage === 'Position'"></Position>

    <v-main>
      <v-container fluid="fluid">
        <Avatar></Avatar>
      </v-container>
    </v-main>

    <!-- Bottom interface-->
    <v-app-bar
      app="app"
      bottom="bottom"
      color="transparent"
      flat="flat"
      style="pointer-events: none"
    >
      <div class="px-2"></div>

      <Version class="d-none d-sm-inline-flex"></Version>

      <v-spacer></v-spacer>
      <v-spacer class="mx-12 d-none d-sm-inline-flex"></v-spacer>
      <v-spacer class="d-inline-flex d-sm-none"></v-spacer>

      <!-- List popup menu-->
      <v-menu transition="slide-x-reverse-transition" v-model="openedList">
        <template v-slot:activator="{ on }">
          <v-btn
            fab="fab"
            dark="dark"
            style="pointer-events: auto"
            v-on="on"
            :aria-label="$t('editor.list')"
          >
            <v-icon large="large">{{ icons.mdiMenu }}</v-icon>
          </v-btn>
        </template>

        <v-list dense="dense">
          <v-list-item
            v-for="(item, i) in list"
            :key="i"
            @click.stop="
              item.wind !== undefined ? toggleWind() : openPage(item.text['en'])
            "
          >
            <v-list-item-icon right="right">
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                v-text="item.text[$i18n.locale]"
              ></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon v-if="item.wind !== undefined">
              <v-icon v-if="item.wind.value" color="primary">{{
                icons.mdiCheckboxMarked
              }}</v-icon>
              <v-icon v-else color="grey lighten-2">{{
                icons.mdiCheckboxBlankOutline
              }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { ref, computed, reactive, toRefs } from "@vue/composition-api";

import {
  mdiMenu,
  mdiContentSave,
  mdiMovieOpen,
  mdiCamera,
  mdiVideoVintage,
  mdiRecord,
  mdiWeatherWindy,
  mdiCheckboxMarked,
  mdiCheckboxBlankOutline,
  mdiArrowAll,
  mdiVk,
} from "@mdi/js";

import i18nHead from "~/assets/ts/seo/i18nHead.ts";

import Menu from "~/components/editor/Menu";
import MenuHairs from "~/components/editor/MenuHairs";
import MenuTails from "~/components/editor/MenuTails";
import Saves from "~/components/editor/Saves";
import Screener from "~/components/editor/Screener";
import Position from "~/components/editor/Position";

import Version from "~/components/Version";

function pagesControl(getters, commit) {
  const getPage = computed(() => getters["interface/getPage"]);

  const openedList = ref(false);

  function openPage(name) {
    commit("interface/setPage", name);

    openedList.value = false;
  }

  return {
    getPage,
    openPage,
    openedList,
  };
}

export default {
  layout: "editor",

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { root: { $store, $i18n } }) {
    const { getters, commit } = $store;

    const icons = reactive({
      mdiMenu,
      mdiContentSave,
      mdiMovieOpen,
      mdiCamera,
      mdiVideoVintage,
      mdiRecord,
      mdiWeatherWindy,
      mdiCheckboxMarked,
      mdiCheckboxBlankOutline,
      mdiArrowAll,
      mdiVk,
    });

    const wind = ref(true);

    const list = ref([
      {
        text: { en: "Avatar", ru: "Аватар" },
        icon: "$vuetify.icons.values.pony",
      },
      {
        text: { en: "Position", ru: "Позиция" },
        icon: icons.mdiArrowAll,
      },
    ]);

    function toggleWind() {
      wind.value = !wind.value;

      commit("interface/setWind", wind.value);
    }

    const store = reactive({
      frame: computed(() => getters["avatar/getFrame"]),
      frames: computed(() => getters["avatar/getFrames"].length),

      FPS: computed(() => getters["interface/getFPS"]),
      animate: computed(() => getters["interface/getAnimate"]),
      quality: computed(() => getters["interface/getQuality"]),
      rendering: computed(() => getters["interface/getRendering"]),
      tapping: computed(() => getters["interface/getTapping"]),
    });

    const { getPage, openPage, openedList } = pagesControl(getters, commit);

    if (process.client)
      commit("avatar/setSaveIndex", localStorage.getItem("defaultIndex") || 0);

    const editMode = computed({
      get: () => getters["interface/getEditMode"],
      set(value) {
        commit("interface/setEditMode", value);
      },
    });

    const defaultFrames = computed(() => getters["avatar/getDefaultFrames"]);

    if (process.browser) {
      const saves = localStorage.getItem("animations");

      if (!saves) {
        const save = {
          name: "Reared up",
          frames: defaultFrames.value,
        };

        localStorage.setItem("animations", JSON.stringify([save]));
      }
    }

    return {
      getPage,
      openPage,
      openedList,

      wind,
      toggleWind,

      ...toRefs(store),

      icons,
      list,

      Feedback: ref(false),

      editMode,
    };
  },

  components: {
    Menu,
    MenuHairs,
    MenuTails,

    Saves,
    Screener,
    Position,
    [process.browser && "Avatar"]: () => import("~/components/editor/Avatar"),
    Version,
  },

  head() {
    const { messages, locale } = this.$i18n;
    const { title, newMeta } = i18nHead(messages[locale], "editor");
    const { htmlAttrs, meta, link } = this.$nuxtI18nHead({
      addSeoAttributes: true,
    });

    return {
      htmlAttrs,
      title,
      meta: [...newMeta, ...meta],
      link,
    };
  },
};
</script>

<style>
html {
  overflow: auto !important;
}

#button-lang {
  top: -208px !important;
  pointer-events: auto;
  border-radius: 10px 10px 0 0 !important;
  border-bottom: 1px solid #666 !important;
}

#button-vk {
  top: -168px !important;
  pointer-events: auto;
  border-radius: 0px !important;
  border-bottom: 1px solid #666 !important;
}
</style>
