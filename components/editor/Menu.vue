<template>
  <v-navigation-drawer
    class="menu-drawer"
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
      <BarColor
        class="ma-0"
        :text="$t('editor.screener.background')"
        val="background_basic"
      ></BarColor>
    </v-container>

    <v-expansion-panels focusable="focusable">
      <Eyes></Eyes>
      <Glasses></Glasses>
      <Mane></Mane>
      <Tail></Tail>
      <Fur></Fur>
      <Nose></Nose>
      <Horns></Horns>
      <Mouth></Mouth>
      <Emotion></Emotion>
      <Ears></Ears>
      <Piercing></Piercing>
      <Hooves></Hooves>
      <Neck></Neck>
      <Wings></Wings>
      <Clothing></Clothing>
      <Pants></Pants>
    </v-expansion-panels>

    <div class="abs">
      <v-card light="light" tile="tile">
        <v-container>
          <v-row>
            <v-btn
              class="my-2"
              icon="icon"
              large="large"
              :color="gender.color"
              @click="changeGender"
              :aria-label="$t('editor.menu.change_gender')"
            >
              <v-icon large="large">{{ gender.icon }}</v-icon>
            </v-btn>

            <v-text-field
              class="name-input"
              v-model="name"
              :label="$t('editor.name.label')"
              hide-details="hide-details"
            ></v-text-field>
          </v-row>

          <v-row>
            <v-spacer></v-spacer>

            <v-btn
              class="mx-2"
              dark="dark"
              rounded="rounded"
              @click="close()"
              :aria-label="$t('editor.menu.close_editor')"
              >{{ $t("editor.menu.close") }}
            </v-btn>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { computed } from "@vue/composition-api";

import { mdiGenderMale, mdiGenderFemale } from "@mdi/js";

import Eyes from "./menu/Eyes";
import Glasses from "./menu/Glasses";
import Mane from "./menu/Mane";
import Tail from "./menu/Tail";
import Fur from "./menu/Fur";
import Nose from "./menu/Nose";
import Horns from "./menu/Horns";
import Mouth from "./menu/Mouth";
import Emotion from "./menu/Emotion";
import Ears from "./menu/Ears";
import Piercing from "./menu/Piercing";
import Hooves from "./menu/Hooves";
import Neck from "./menu/Neck";
import Wings from "./menu/Wings";
import Clothing from "./menu/Clothing";
import Pants from "./menu/Pants";

import BarColor from "./BarColors";

function Gender({ commit }, globals) {
  const gender = computed(() => {
    return globals.value.male
      ? { color: "blue", icon: mdiGenderMale }
      : { color: "pink", icon: mdiGenderFemale };
  });

  function changeGender() {
    commit("avatar/setGlobal", { path: "male", value: !globals.value.male });

    const slot = +localStorage.getItem("slot");
    const save = JSON.parse(localStorage.getItem("avatars"));

    save[slot].globals.male = globals.value.male;

    localStorage.setItem("avatars", JSON.stringify(save));
  }

  return {
    gender,
    changeGender,
  };
}

export default {
  components: {
    Eyes,
    Glasses,
    Mane,
    Tail,
    Fur,
    Nose,
    Horns,
    Mouth,
    Emotion,
    Ears,
    Piercing,
    Hooves,
    Neck,
    Wings,
    Clothing,
    Pants,

    BarColor,
  },

  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },

  setup(_, { root: { $store } }) {
    const globals = computed(() => $store.getters["avatar/getGlobal"]);

    const name = computed({
      get: () => globals.value.name,
      set: (value) => {
        $store.commit("avatar/setGlobal", { path: "name", value });

        const slot = +localStorage.getItem("slot");
        const save = JSON.parse(localStorage.getItem("avatars"));

        save[slot].globals.name = value;

        localStorage.setItem("avatars", JSON.stringify(save));
      },
    });

    return {
      ...Gender($store, globals),

      globals,
      name,

      close: () => $store.commit("interface/setPage", false),
    };
  },
};
</script>

<style>
.abs {
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 100%;
}

.btn-max {
  width: 100% !important;
}

.name-input {
  padding-left: 0 !important;
  margin-right: 6px !important;
}

.menu-drawer .v-navigation-drawer__content {
  height: calc(100% - 120px);
}
</style>
