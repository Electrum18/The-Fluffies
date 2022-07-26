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
          >{{ $t("editor.saves.save") }}
          <v-spacer></v-spacer>
          <v-btn
            class="mx-n2"
            fab="fab"
            small="small"
            @click="close()"
            :aria-label="$t('editor.menu.close')"
          >
            <v-icon>{{ icons.mdiKeyboardBackspace }}</v-icon>
          </v-btn>
        </v-card-title>

        <v-divider class="my-2"></v-divider>

        <v-file-input
          class="px-2 my-3"
          dense="dense"
          accept=".json"
          hide-details="hide-details"
          @change="upload"
          :prepend-icon="icons.mdiUpload"
          :label="$t('editor.saves.upload')"
        ></v-file-input>

        <v-divider class="my-2"></v-divider>

        <v-card-title class="py-1 subtitle-2">{{
          $t("editor.saves.create")
        }}</v-card-title>

        <v-row justify="center">
          <v-btn
            class="my-1"
            small="small"
            text="text"
            color="primary"
            @click="createSave(0)"
            :title="$t('editor.saves.pony')"
            :aria-label="$t('editor.saves.pony')"
            >{{ $t("editor.saves.pony") }}</v-btn
          >

          <v-btn
            class="my-1"
            small="small"
            text="text"
            color="primary"
            @click="createSave(1)"
            :title="$t('editor.saves.zebra')"
            :aria-label="$t('editor.saves.zebra')"
            >{{ $t("editor.saves.zebra") }}</v-btn
          >

          <v-btn
            class="my-1"
            small="small"
            text="text"
            color="primary"
            @click="createSave(2)"
            :title="$t('editor.saves.deer')"
            :aria-label="$t('editor.saves.deer')"
            >{{ $t("editor.saves.deer") }}</v-btn
          >
        </v-row>
      </v-card>

      <v-card class="my-4" light="light">
        <v-list>
          <v-list-item-group
            v-model="slot"
            mandatory="mandatory"
            active-class="orange--text"
          >
            <template v-for="(save, i) in saves">
              <v-list-item :key="save.globals.name + i">
                <v-list-item-content>
                  <v-list-item-title>
                    {{ i + 1 }} • {{ save.globals.name }}
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action class="mx-n2 my-0">
                  <v-row>
                    <v-btn
                      icon="icon"
                      :href="encodeSave(save)"
                      :download="save.globals.name + '.json'"
                      :title="$t('editor.saves.download')"
                      :aria-label="$t('editor.saves.download')"
                    >
                      <v-icon>{{ icons.mdiDownload }}</v-icon>
                    </v-btn>

                    <v-btn
                      class="mr-2"
                      v-if="saves.length &gt; 1 &amp;&amp; i &lt; 10"
                      icon="icon"
                      @click="removeSave(i)"
                      :title="$t('editor.saves.delete')"
                      :aria-label="$t('editor.saves.delete')"
                    >
                      <v-icon>{{ icons.mdiDelete }}</v-icon>
                    </v-btn>
                  </v-row>
                </v-list-item-action>
              </v-list-item>

              <v-divider
                class="light"
                v-if="i + 1 &lt; saves.length"
                :key="i"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

import {
  mdiKeyboardBackspace,
  mdiDelete,
  mdiPatreon,
  mdiDownload,
  mdiUpload,
  mdiCloud,
} from "@mdi/js";

export default {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      saves: null,
      slot: 0,

      level: 0,
      count: 0,
      patronage: undefined,

      defaultIndex: 0,

      online: true,

      icons: {
        mdiKeyboardBackspace,
        mdiDelete,
        mdiPatreon,
        mdiDownload,
        mdiUpload,
        mdiCloud,
      },
    };
  },

  computed: {
    ...mapGetters("avatar", ["getGlobal", "getDefault"]),

    savesLength() {
      return this.saves !== null ? this.saves.length : 0;
    },

    savesLimits() {
      if (this.patronage === "Basic supporter") {
        return 4 + this.level * 3;
      } else if (this.patronage === "Huge supporter") {
        return 8 + this.level * 6;
      } else {
        return 3 + this.level;
      }
    },
  },

  watch: {
    open() {
      this.cloudLimits();
    },

    slot(val) {
      const avatars = JSON.parse(localStorage.getItem("avatars"));

      if (avatars[val]) {
        this.setAvatar(avatars[val]);

        localStorage.setItem("slot", val + "");
      } else if (val !== 0) {
        this.slot = 0;
      }
    },

    "getGlobal.name"(name) {
      this.saves[this.slot].name = name;
    },
  },

  mounted() {
    this.slot = this.getSlot();
    this.saves = this.getSave();
  },

  methods: {
    ...mapMutations("interface", ["setPage"]),
    ...mapActions("avatar", ["setAvatar"]),

    close() {
      this.setPage(false);
    },

    isEmpty(val) {
      return val === undefined || val === null;
    },

    getSlot() {
      const slot = +localStorage.getItem("slot");

      if (slot && slot <= this.maxLength) {
        return slot;
      } else {
        localStorage.setItem("slot", "0");

        return 0;
      }
    },

    compability(target, reference) {
      const object = {};
      const keys = Object.keys(reference);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (target[key] === undefined) {
          object[key] = reference[key];
        } else {
          object[key] = target[key];
        }

        if (typeof object[key] === "object") {
          object[key] = this.compability(object[key], reference[key]);
        }
      }

      return object;
    },

    getSave() {
      let avatars = localStorage.getItem("avatars");

      if (avatars && avatars.length) {
        avatars = JSON.parse(avatars);

        const { globals, color } = this.getDefault;

        for (let i = 0; i < avatars.length; i++) {
          const avatar = avatars[i];

          avatar.globals = this.compability(
            avatar.globals,
            globals[this.defaultIndex]
          );
          avatar.color = this.compability(
            avatar.color,
            color[this.defaultIndex]
          );
        }

        localStorage.setItem("avatars", JSON.stringify(avatars));

        this.setAvatar(avatars[this.slot]);

        return avatars;
      } else {
        const { frame, globals, color } = this.getDefault;

        const save = {
          frame,
          globals: globals[this.defaultIndex],
          color: color[this.defaultIndex],
        };

        localStorage.setItem("avatars", JSON.stringify([save]));

        this.setAvatar(save);

        return [save];
      }
    },

    createSave(index) {
      const parsedData = JSON.parse(localStorage.getItem("avatars"));

      const { frame, globals, color } = this.getDefault;

      const save = { frame, globals: globals[index], color: color[index] };

      parsedData.push(save);

      localStorage.setItem("avatars", JSON.stringify(parsedData));

      // Apply changes

      this.defaultIndex = index;
      this.slot = parsedData.length - 1;
      this.saves = this.getSave();
    },

    removeSave(slot) {
      const parsedData = JSON.parse(localStorage.getItem("avatars"));

      parsedData.splice(slot, 1);

      localStorage.setItem("avatars", JSON.stringify(parsedData));

      // Fix slot (index)

      this.slot = 0;

      localStorage.setItem("slot", this.slot + "");

      // Apply changes

      this.saves = this.getSave();
    },

    encodeSave(object) {
      const tempObj = JSON.parse(JSON.stringify(object));

      tempObj.globals.hair_info = {};
      tempObj.globals.tail_info = {};
      tempObj.globals.glasses_info = {};
      tempObj.globals.horn_info = {};

      return (
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(tempObj))
      );
    },

    upload(file) {
      if (file) {
        const reader = new FileReader();

        reader.onload = () => {
          const parsedData = JSON.parse(localStorage.getItem("avatars"));

          parsedData.push(JSON.parse(reader.result));

          localStorage.setItem("avatars", JSON.stringify(parsedData));

          // Apply changes

          this.slot = parsedData.length - 1;
          this.saves = this.getSave();
        };

        reader.readAsText(file);
      }
    },

    cloudLimits() {},
    cloudDownload() {},
    cloudUpload() {},

    underBadgeColor(level) {
      if (level < 3) {
        return { background: "#9E9E9E" };
      } else if (level >= 3 && level < 5) {
        return { background: "#00BCD4" };
      } else if (level >= 5 && level < 7) {
        return { background: "#3F51B5" };
      } else if (level >= 7) {
        return { background: "#9C27B0" };
      }
    },
  },
};
</script>
