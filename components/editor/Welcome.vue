<template>
  <div>
    <v-btn
      id="button-guide"
      fab="fab"
      dark="dark"
      absolute="absolute"
      left="left"
      top="top"
      small="small"
      @click="
        opened = true;
        openedGuide = false;
      "
    >
      <v-icon color="primary">{{ icons.mdiInformation }}</v-icon>
    </v-btn>

    <v-dialog v-model="opened" width="600">
      <v-card dark="dark">
        <v-img
          class="white--text align-end"
          height="250px"
          :src="require('~/assets/img/welcome.png?webp')"
        >
          <v-card-title>{{ $t("editor.welcome.title") }}</v-card-title>
        </v-img>

        <v-card-text class="pt-6">{{ $t("editor.welcome.desc") }}</v-card-text>
        <v-card-text>{{ $t("editor.welcome.desc2") }}</v-card-text>
        <v-divider class="pb-4"></v-divider>

        <v-card-subtitle class="text-subtitle-1 pb-0">{{
          $t("editor.welcome.choose.title")
        }}</v-card-subtitle>

        <v-container class="px-6" fluid="fluid">
          <v-row>
            <v-col cols="12">
              <v-btn block="block" color="primary" @click="page = 0">{{
                $t("editor.welcome.choose.main")
              }}</v-btn>
            </v-col>

            <v-col cols="12" sm="6">
              <v-btn
                block="block"
                outlined="outlined"
                color="primary"
                @click="page = 1"
                >{{ $t("editor.welcome.choose.editor") }}</v-btn
              >
            </v-col>

            <v-col cols="12" sm="6">
              <v-btn
                block="block"
                outlined="outlined"
                color="primary"
                @click="page = 3"
                >{{ $t("editor.welcome.choose.saves") }}</v-btn
              >
            </v-col>

            <v-col cols="12" sm="6">
              <v-btn
                block="block"
                outlined="outlined"
                color="primary"
                @click="page = 4"
                >{{ $t("editor.welcome.choose.upgrade") }}</v-btn
              >
            </v-col>
          </v-row>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="text" color="red" @click="opened = false">{{
            $t("editor.welcome.close")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="openedGuide" width="600">
      <v-card dark="dark">
        <v-tabs
          v-model="page"
          grow="grow"
          show-arrows="show-arrows"
          center-active="center-active"
          :color="tabColor"
        >
          <v-tab>{{ $t("editor.welcome.tabs.main") }}</v-tab>
          <v-tab>{{ $t("editor.welcome.tabs.editor") }}</v-tab>
          <v-tab>{{ $t("editor.welcome.tabs.upgrade") }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="page">
          <v-tab-item>
            <v-card flat="flat">
              <v-img
                :src="require('~/assets/img/welcome/example.png?webp')"
              ></v-img>

              <v-card-title>{{ $t("editor.welcome.main.title") }}</v-card-title>

              <v-card-text>{{
                $t("editor.welcome.main.subtitle")
              }}</v-card-text>

              <v-divider></v-divider>

              <v-list-item three-line="three-line">
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    $t("editor.welcome.main.character.title")
                  }}</v-list-item-title>

                  <v-list-item-subtitle class="no-clamp">{{
                    $t("editor.welcome.main.character.text")
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar rounded="rounded" size="128" color="grey">
                  <v-img
                    :src="require('~/assets/img/welcome/character.png?webp')"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item three-line="three-line">
                <v-list-item-avatar rounded="rounded" size="128" color="grey">
                  <v-img
                    :src="require('~/assets/img/welcome/editing.png?webp')"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    $t("editor.welcome.main.editor.title")
                  }}</v-list-item-title>

                  <v-list-item-subtitle class="no-clamp">{{
                    $t("editor.welcome.main.editor.text")
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-row class="mx-4 mb-0 mt-n4 pb-4">
                <v-spacer></v-spacer>

                <v-btn text="text" color="primary" @click="page = 1">{{
                  $t("editor.welcome.main.editor.button")
                }}</v-btn>
              </v-row>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat="flat">
              <v-list-item three-line="three-line">
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    $t("editor.welcome.editor.title")
                  }}</v-list-item-title>

                  <v-list-item-subtitle class="no-clamp">{{
                    $t("editor.welcome.editor.subtitle")
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar rounded="rounded" size="128" color="grey">
                  <v-img
                    :src="
                      require('~/assets/img/welcome/editing_opened.png?webp')
                    "
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item three-line="three-line">
                <v-list-item-avatar rounded="rounded" size="128" color="grey">
                  <v-img
                    :src="require('~/assets/img/welcome/editing_1.png?webp')"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    $t("editor.welcome.editor.view.title")
                  }}</v-list-item-title>

                  <v-list-item-subtitle class="no-clamp">{{
                    $t("editor.welcome.editor.view.text")
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item three-line="three-line">
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    $t("editor.welcome.editor.save.title")
                  }}</v-list-item-title>

                  <v-list-item-subtitle class="no-clamp">{{
                    $t("editor.welcome.editor.save.text")
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar rounded="rounded" size="128" color="grey">
                  <v-img
                    :src="require('~/assets/img/welcome/editing_2.png?webp')"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item three-line="three-line">
                <v-list-item-avatar rounded="rounded" size="128" color="grey">
                  <v-img
                    :src="require('~/assets/img/welcome/editing_3.png?webp')"
                  ></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    $t("editor.welcome.editor.wind.title")
                  }}</v-list-item-title>

                  <v-list-item-subtitle class="no-clamp">{{
                    $t("editor.welcome.editor.wind.text")
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-divider></v-divider>

              <v-list-item three-line="three-line">
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{
                    $t("editor.welcome.editor.image.title")
                  }}</v-list-item-title>

                  <v-list-item-subtitle class="no-clamp">{{
                    $t("editor.welcome.editor.image.text")
                  }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar rounded="rounded" size="128" color="grey">
                  <v-img
                    :src="require('~/assets/img/welcome/editing_4.png?webp')"
                  ></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="text" color="red" @click="openedGuide = false">{{
                  $t("editor.welcome.close")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>

          <v-tab-item>
            <v-card flat="flat">
              <v-card-title>{{
                $t("editor.welcome.upgrade.title")
              }}</v-card-title>

              <v-card-text>{{
                $t("editor.welcome.upgrade.subtitle")
              }}</v-card-text>

              <v-divider></v-divider>

              <v-card-title>{{
                $t("editor.welcome.upgrade.coders.title")
              }}</v-card-title>

              <v-card-text>{{
                $t("editor.welcome.upgrade.coders.text")
              }}</v-card-text>

              <v-row class="mx-4 my-0 pb-4">
                <v-spacer></v-spacer>

                <v-btn
                  dark="dark"
                  color="black"
                  href="https://github.com/Electrum18/The-Fluffies"
                  >GitHub
                  <v-icon right="right" small="small">{{
                    icons.mdiGithub
                  }}</v-icon>
                </v-btn>
              </v-row>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="text" color="red" @click="openedGuide = false">{{
                  $t("editor.welcome.close")
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref, watch, reactive, computed } from "@vue/composition-api";

import { mdiStar, mdiGithub, mdiPatreon, mdiInformation } from "@mdi/js";

export default {
  setup(_, { root: { $i18n } }) {
    const icons = reactive({
      mdiStar,
      mdiGithub,
      mdiPatreon,
      mdiInformation,
    });

    const opened = ref(false);
    const openedGuide = ref(false);

    const page = ref(undefined);

    const tabs = ref([
      "Устройство сайта",
      "Редактирование",
      "Улучшение",
    ]);
    const tabColor = ref("primary");

    watch(
      () => page.value,
      (val) => {
        if (val !== undefined) {
          opened.value = false;
          openedGuide.value = true;
          tabColor.value = "primary";
        }
      }
    );

    if (process.browser) {
      if (localStorage.getItem("firstGuide") === null) {
        setTimeout(() => {
          opened.value = true;

          localStorage.setItem("firstGuide", true);
        });
      }
    }

    return {
      icons,

      opened,
      openedGuide,

      page,

      tabs,
      tabColor,
    };
  },
};
</script>

<style>
#button-guide {
  top: -128px !important;
  pointer-events: auto;
  border-radius: 0 0 10px 10px !important;
}

.no-clamp {
  -webkit-line-clamp: inherit !important;
}
</style>
