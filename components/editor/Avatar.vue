<template>
  <div class="avatar">
    <v-overlay :value="rendered.opened">
      <v-card
        class="pa-4 max-photo-scale"
        light="light"
        raised="raised"
        max-width="800"
      >
        <v-img
          class="grey lighten-3"
          :src="rendered.data"
          max-height="450"
          contain="contain"
        ></v-img>

        <v-card-title>{{ rendered.title }}</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="text" @click="rendered.opened = false">{{
            $t("editor.close")
          }}</v-btn>
          <v-btn
            ref="gifDownload"
            color="primary"
            :href="rendered.data"
            :title="rendered.fileName"
            :download="rendered.fileName"
            >{{ $t("editor.save") }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { initEngine, options } from "~/assets/ts/avatar/index.ts";

export default {
  data() {
    return {
      quality: 1, // range from 0 to 1
      targetQuality: 0,

      // Configs

      ctx: {}, // Context of canvas

      x: 0, // Horizontal of angle in -1 to 1 range
      y: 0, // Vertical of angle in 0 to 1 range

      last: {
        // Last calculated variables for deltas
        x: 0,
        y: 0,
        time: 0,
      },

      paths: {
        keys: [
          "body",
          "emotions",
          "horn_front",
          "horn",
          "glasses",
          "ears",
          "clothing",
          "pants",
          "piercings_ears",
          "hairs",
          "tails",
        ],

        body: {},
        emotions: {},
        horn_front: {},
        horn: {},
        glasses: {},
        ears: {},
        clothing: {},
        pants: {},
        piercings_ears: {},
        hairs: {},
        tails: {},
      },

      globals: {},
      properties: {},

      player: {
        model: undefined,
        value: 0,
        timer: undefined,
      },

      fps: {
        ticker: 0,
        every: 1,
      },

      rendering: false,

      rendered: {
        opened: false,
        title: "",
        data: "",
        fileName: "",
      },

      windPropers: {
        enabled: true,
        cycle: 0,
      },

      tapped: false,
    };
  },

  computed: {
    ...mapGetters("avatar", [
      "getAngle",
      "getHoriz",
      "getDegress",
      "getPosHoriz",
      "getPosVerti",
      "getPosScale",
      "getPosAngle",
      "getGlobal",
      "getProper",
      "getColor",
      "getFrame",
      "getFrames",
    ]),

    ...mapGetters("interface", [
      "getPlaying",
      "getPlayVal",
      "getPlaySeek",
      "getPlayRepeat",
      "getPlayChangedFrame",
      "getFPS",
      "getQuality",
      "getRendering",
      "getRendered",
      "getWind",
      "getEditMode",
    ]),
  },

  watch: {
    getProper: {
      handler(propers) {
        this.properties = JSON.parse(JSON.stringify(propers));

        options.XYuv[0] = this.properties.degress / 90;
      },

      immediate: true,
      deep: true,
    },

    getGlobal: {
      handler(globals) {
        this.applyGlobals(globals);
      },

      deep: true,
    },

    "getGlobal.hair_name_en"(name) {
      this.setGlobal({ path: "hair_dreads", value: /Dreads/.test(name) });
      this.setGlobal({ path: "hair_feathers", value: /Feathers/.test(name) });

      if (this.paths.hairs[name]) {
        this.paths.hairs.name = name;
      }
    },

    "getGlobal.tail_name_en"(name) {
      this.setGlobal({ path: "tail_dreads", value: /Dreads/.test(name) });

      if (this.paths.tails[name]) {
        this.paths.tails.name = name;
      }
    },

    "getGlobal.piercing_ears_name_en"(name) {
      this.paths.piercings_ears.name = name;
    },

    "getGlobal.ears_name_en"(name) {
      this.paths.ears.name = name;
    },

    "getGlobal.horn_name_en"(name) {
      this.paths.horn.name = name;
    },

    "getGlobal.horn_front_name_en"(name) {
      this.paths.horn_front.name = name;
    },

    "getGlobal.glasses_name_en"(name) {
      this.paths.glasses.name = name;
    },

    "getGlobal.clothing_name_en"(name) {
      this.paths.clothing.name = name;
    },

    "getGlobal.pants_name_en"(name) {
      this.paths.pants.name = name;
    },

    getPlaying: {},

    getPlaySeek(value) {
      if (value) {
        const { getPlayVal, player } = this;

        player.value = getPlayVal;

        if (player.model) player.model.seek(getPlayVal);

        this.resetPlaySeek();
      }
    },

    getFPS(fps) {
      this.fps.every = 60 / fps;
      this.fps.ticker = 0;
    },

    getQuality: {
      handler(quality) {
        this.targetQuality = quality / 1024;
      },

      immediate: true,
    },

    getRendering: {},

    targetQuality(quality) {},

    getPlayChangedFrame(enabled) {
      if (enabled) {
        this.setPlayRedraw();
        this.resetPlayChangedFrame();
      }
    },

    getWind(value) {
      this.windPropers.enabled = value;
    },
  },

  mounted() {
    this.applyGlobals(this.getGlobal);

    this.paths.piercings_ears.name = this.getGlobal.piercing_ears_name_en;
    this.paths.ears.name = this.getGlobal.ears_name_en;
    this.paths.horn.name = this.getGlobal.horn_name_en;
    this.paths.horn_front.name = this.getGlobal.horn_front_name_en;
    this.paths.glasses.name = this.getGlobal.glasses_name_en;
    this.paths.clothing.name = this.getGlobal.clothing_name_en;
    this.paths.pants.name = this.getGlobal.pants_name_en;

    initEngine(this);

    this.setPlayChangedFrame();
  },

  methods: {
    ...mapMutations("avatar", [
      "setGlobal",
      "setProper",
      "setColor",
      "setHairsList",
      "setAllHairsList",
      "setTailsList",
      "setAllTailsList",
      "setMirror",
    ]),

    ...mapMutations("interface", [
      "setPlayVal",
      "setPlayLen",
      "resetPlaySeek",
      "setPlayRedraw",
      "setPlayChangedFrame",
      "resetPlayChangedFrame",
      "setRendered",
      "setTapping",
    ]),

    applyGlobals(globals) {
      this.globals = JSON.parse(JSON.stringify(globals));
    },

    asFile(key) {
      const name = this.globals[key + "_name_en"];

      const fileName = name.toLowerCase().split(" ").join("_");

      return { name, fileName };
    },

    importJSON() {},

    startDrag() {
      if (this.tapped === false) {
        this.tapped = true;

        this.setTapping(false);
      }
    },

    onDrag() {},
    stopDrag() {},
  },

  setup() {
    function setQuality(quality) {
      const resolutions = {
        2160: [3840, 2160],
        1440: [2560, 1440],
        1080: [1920, 1080],
        720: [1280, 720],
        480: [854, 480],
        360: [640, 360],
        240: [426, 240],
        144: [256, 144],
      };

      return resolutions[quality * 1024];
    }

    return {
      setQuality,
    };
  },
};
</script>

<style>
.max-photo-scale {
  width: 75vmin;
}
</style>
