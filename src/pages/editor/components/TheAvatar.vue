<template lang="pug">
  #avatar(v-press-hold="[MouseMove, Click, Hold]")
    canvas(:id="$root.name" ref="avatar")
</template>

<script lang="ts">
type Object = { [index: string]: any };
type NestedObject = { [index: string]: Object };

// Libraries

const
  abs = require("abs-svg-path"),
  parse = require("parse-svg-path"),
  curvify = require("curvify-svg-path");

import { keyframes, easing } from 'popmotion'

// Configs

import Elems from "../configs/elems.json"
import IS from "../configs/interpolationScheme.json"
import Powers from "../configs/power.json"

// Scripts

import Animate from "./Avatar/animate"
import Draw from "./Avatar/draw"

import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      quality: 0.5,  // range from 0 to 1
      vmin: 0,

      // Configs

      color: (this.$root as Object).color,
      state: (this.$root as Object).propers, // Using for "if" attribute in "elems" config

      layers: Elems,
      math: Powers,
      interpolationScheme: IS,


      ctx: {},  // Context of canvas

      horiz: 0,
      angle: 0,  // Calculated angle for transformation

      x: 0,  // Horizontal of angle in -1 to 1 range
      y: 0,  // Vertical of angle in 0 to 1 range

      last: {  // Last calculated variables for deltas
        x: 0,
        y: 0,
        time: 0
      },

      paths: {},       // Imported and parsed svg references
      calculated: {},  // Calculated paths

      mirror: false,            // Avatar isnt mirrored in this time
      executeAnimation: false,  // Check for optimization
      afterChange: 0,           // Counter after changing angle
      fullQuality: true         // Rendering at quality equal to 1
    }
  },

  watch: {
    x(num: number) {
      const { horn } = this.state,
        lessThan45 = this.x <= 0.5;

      horn.behind = lessThan45 && horn.rear;
      horn.behindAfterEars = !lessThan45 && horn.rear;

      this.mirror = num < 0;
    },

    "$root.propers.hair.name"(name: Object) {
      const hair = this.state.hair;

      if (/Dreads/.test(name['en'])) {
        hair.isDreads = true;
        hair.isBasic  = false;
      } else {
        hair.isDreads = false;
        hair.isBasic  = true;
      }

      const hairs: Object = (this.paths as Object).hairs;

      if (hairs && hairs[name['en']]) {
        this.fullQuality = false;
        this.executeAnimation = true;
      } else {
        const hairName = name['en'].toLowerCase().replace(/\W/g, "_");

        this.getPartsJSON("hairs", "hairs/" + hairName + ".json");
      }
    },

    "$root.propers.glasses.name"(name) {
      const glasses = (this.paths as Object).glasses;

      if (glasses && glasses[name['en']]) {
        this.fullQuality = false;
        this.executeAnimation = true;
      } else {
        const glassesName = name['en'].toLowerCase().replace(/\W/g, "_");

        this.getPartsJSON("glasses", "glasses/" + glassesName + ".json");
      }
    },

    "$root.propers.horn.name"(name) {
      const horn = (this.paths as Object).horn;

      if (horn && horn[name['en']]) {
        this.fullQuality = false;
        this.executeAnimation = true;
      } else {
        const hornsName = name['en'].toLowerCase().replace(/\W/g, "_");

        this.getPartsJSON("horn", "horns/" + hornsName + ".json");
      }
    },

    "$root.propers": {
      handler(val) {
        this.state = val;

        const { horn, hair, eyes, piercings } = val;

        // Horns

        horn.isBasic = horn.enable && !horn.changeling;
        horn.isChnlg = horn.enable && horn.changeling;

        const lessThan45 = this.x <= 0.5;

        horn.behind = lessThan45  && horn.rear;
        horn.behindAfterEars = !lessThan45 && horn.rear;

        // Hair

        hair.isSecond = !hair.second.isends && hair.second.enable;
        hair.isEnds =  hair.second.isends && hair.second.enable;


        // Eyes

        if (!eyes.right.enable) {
          const { right, left } = this.color.eyes;

          right.basic = left.basic;
        }

        this.fullQuality = false;
        this.executeAnimation = true;
      },

      deep: true
    },

    "$root.color": {
      handler(val) {
        this.color = val;

        if (!this.state.eyes.right.enable) {
          this.color.eyes.right.basic = val.eyes.left.basic;
        }

        this.fullQuality = false;
        this.executeAnimation = true;
      },

      deep: true
    },

    "$root.saveChanged"(val) {
      if (val) {
        this.horiz = this.$root.horiz;
        this.angle = this.$root.ang;

        this.x = this.$root.degress / 90;

        this.$root.saveChanged = false;
      }
    }
  },

  methods: {
    getPartsJSON(target: string, url: string) {
      const self: any = this,
        loader  = this.$root.loadings,
        capital = target[0].toUpperCase() + target.slice(1);

      if (target == "glasses" || target == "horn") {
        loader.push(`${capital} - ${this.state[target].name['en']}`);
      } else if (target == "hairs") {
        loader.push(`${capital} - ${this.state.hair.name['en']}`);
      } else {
        loader.push(capital);
      }

      (this.$http)
        .get(window.location.origin + "/data/" + url)
        .then((res: NestedObject) => {
          loader.splice(loader.indexOf(capital, 1));

          self.parseSVGbasic(res.body, target);

          self.fullQuality = false;
          self.executeAnimation = true;

        }, (err: any) => {
          // Trying get again if not loaded

          setTimeout(() => {
            loader.splice(loader.indexOf(capital, 1));

            self.getPartsJSON(target, url);
          }, 5e3);
        });
    },

    Click(e: Object) {
      if (!e.pageX) {
        if (e.touches) {
          e = e.touches[0];
        } else {
          return;
        }
      }

      const { last } = this as any;

      last.x = e.pageX;
      last.y = e.pageY;
    },

    Hold(val: boolean) {
      const { last, $root } = this as any;

      if (val) {
        last.time = Date.now();
      } else if (Date.now() - last.time < 150) {
        $root.warning.close = true;
      }
    },

    MouseMove(e: Object) {
      if (!e.pageX) {
        if (e.touches) {
          e = e.touches[0];
        } else {
          return;
        }
      }

      const self: any = this,
        root: any = self.$root,

        BCR = self.$el.getBoundingClientRect(),

        { state, x, y, last } = this as Object,

        ang = Math.atan2(
          ((x + 1 / 2) * BCR.width)  - (BCR.left + BCR.width  / 2),
          ((y + 1 / 2) * BCR.height) - (BCR.top + BCR.height / 2)
        ) * 180 / Math.PI;

      self.x += (e.pageX - last.x) / 500;
      self.y += (e.pageY - last.y) / 100;

      if (x > 1) self.x = 1;
      if (x < -1) self.x = -1;

      if (y > 1) self.y = 1;
      if (y < -1) self.y = -1;

      root.horiz = self.horiz = -((y * (1 - Math.abs(x))) ** 7);
      root.ang = self.angle = (y * 90 * Math.abs(x)) / 4;

      root.degress = x * 90;

      state.hornsBehind = x <= 0.5 && state.horn.rear;
      state.hornsAterEars = x > 0.5 && state.horn.rear;

      if (x == 0) self.x = 0.01;  // Bug prevention

      self.fullQuality = false;
      self.executeAnimation = true;

      last.x = e.pageX;
      last.y = e.pageY;
    },

    parseSVGbasic(get: any, set: string) {
      const self: any = this;

      function capitalize(text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1);
      }

      function unCapitalize(text: string): string {
        return text.charAt(0).toLowerCase() + text.slice(1);
      }

      function give(obj: any[][], keyIn: string = '') {
        if (obj[0]) {
          // If there are items in the branch

          const newPaths = [];

          for (let i = 0; i < obj.length; i++) {
            const path = obj[i],
              newPath = curvify(abs(parse(path)));

            // Paths scale decreaser

            for (let j = 0; j < newPath.length; j++) {
              const points = newPath[j];

              for (let k = 0; k < points.length; k++) {
                const point = points[k];

                if (k > 0) {
                  newPath[j][k] = point;
                } else {
                  newPath[j][k] = point;
                }
              }

              newPaths[i] = newPath;
            }
          }

          // Creating an object to export to a variable

          const paths = self.paths;

          keyIn = keyIn.replace("Main", "");

          if (!paths[set]) paths[set] = { keys: [] };

          if (["hairs", "glasses", "horn"].includes(set)) {
            const
              set2: string = set == "hairs" ? "hair" : set,
              name = self.state[set2].name['en'];

            if (!paths[set][name]) {
              paths[set].keys.push(name);
              paths[set][name] = { keys: [] };
            }

            // Adding elements to a variable

            const key = set == "hairs" ? keyIn : set + capitalize(keyIn);

            paths[set][name][key] = newPaths;
            paths[set][name].keys.push(key);

          } else {
            paths[set][keyIn] = newPaths;
            paths[set].keys.push(keyIn);
          }

        } else { // Going deeper to branch
          const keys = Object.keys(obj);

          if (!keyIn) keyIn = "";

          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];

            give((obj as any)[key], unCapitalize(keyIn + capitalize(key)));
          }
        }
      }

      give(get);
    },

    calc(a: number, b: number, range: number) { return Math.floor(a + (b - a) * range); },

    morph(a: number[][], b: number[][], range: number) {
      const newPath = [];

      for (let i = 0; i < a.length; i++) {
        const
          part = a[i],
          newPart = [];

        for (let j = 0; j < part.length; j++) {
          const point = part[j];

          if (j > 0) {
            if (!b) continue;

            const calc = this.calc(point, b[i][j], range);

            if (calc) {
              newPart[j] = calc | 0;
            } else {
              continue;
            }

          } else {
            newPart[j] = point;
          }
        }

        newPath[i] = newPart;
      }

      return newPath;
    },

    draw: Draw,
    animate: Animate
  },

  mounted() {
    // Setting context

    const ctx = this.$refs.avatar.getContext("2d");

    ctx.canvas.width  = Math.round(1024 * this.quality * 2);
    ctx.canvas.height = Math.round(1024 * this.quality * 1.25);

    ctx.lineCap = ctx.lineJoin = "round";

    this.ctx = ctx;

    // Quality calculatoin relative screen size

    const
      X = window.screen.width,
      Y = window.screen.height;

    this.vmin = X < Y ? X : Y;

    window.requestAnimationFrame(this.animate); // Start drawing and calculation

    // Define ref to root for screener component

    this.$root.$refs.avatar = this.$refs.avatar;

    const self = this;

    /*
    { easeOutIn } = easing
    { jaw, eyes } = self.state

    keyframes(
      values: [
        { x: 0.3, horiz: -30, open: 100, lids: 25 },
        { x: 0.1, horiz: 0, open: 0, lids: 0 },
        { x: 0.3, horiz: -30, open: 100, lids: 25 }
      ]
      duration: 2000
      easings: easeOutIn,
      loop: Infinity
    )
    .start (val) ->
      self.x = val.x

      { position, eyelids, brows } = eyes

      position.horiz   = val.horiz
      eyelids.left.up  = val.lids
      eyelids.right.up = val.lids

      jaw.open = val.open

      self.executeAnimation = yes
    */

    function asFile(name: string) {
      const fileName = self.state[name].name['en'];

      return fileName.toLowerCase().replace(/\W/g, "_");
    }

    // Get JSON data to client and execute

    this.getPartsJSON("body",     "pony/body.json");
    this.getPartsJSON("emotions", "pony/emotions.json");

    this.getPartsJSON("hairs",    "hairs/"   + asFile("hair")    + ".json");
    this.getPartsJSON("glasses",  "glasses/" + asFile("glasses") + ".json");
    this.getPartsJSON("horn",     "horns/"   + asFile("horn")    + ".json");
  }
});
</script>

<style lang="sass">
  #avatar canvas
    position: fixed
    cursor: move
    width: 100vmin
    height: 100vmin
    z-index: 0
    left: 50%
    bottom: 0%
    transform: translate(-50%) scale(2, 1.25)
</style>