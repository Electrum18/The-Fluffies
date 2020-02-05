<template lang="pug">
  v-card(outlined :disabled="enable").my-2
    v-row
      div.body-2.mx-6.py-2 {{ title }}
      v-spacer
      v-menu(:close-on-content-click="false")
        template(v-slot:activator="{ on }")
          v-btn.mx-3.px-0(
            :color="value.slice(0, 7)"
            v-on="on"
            style="min-width: 42px"
            aria-label="Open color picker"
          )
            v-icon(:color="darker ? 'black' : 'white'") mdi-palette

        v-color-picker(v-model="value")
</template>

<script lang="ts">
import Vue from 'vue'
import { getProp, setProp } from '../../../assets/ts/nested'
import {
  VCard,
  VRow,
  VSpacer,
  VMenu,
  VColorPicker,
  VBtn,
  VIcon
} from 'vuetify/lib'


export default Vue.extend({
  props: {
    text: String,
    val: Array,
    shade: Number,
    off: Array
  },

  data() {
    return { darker: false }
  },

  computed: {
    enable(): boolean {
      if (this.off) {
        return !getProp(this.$root as any, this.off as string[]) as boolean;
      } else {
        return false;
      }
    },

    title(): string {
      const root: any = this.$root;

      if (root.locale === 'ru') {
        return 'цвет ' + this.text
      } else {
        return this.text + ' color'
      }
    },

    value: {
      get(): string {
        const root: any = this.$root;

        return getProp(root, this.val as string[]) as string;
      },

      set(setVal: string) {
        const root: any = this.$root;

        setProp(root, this.val as string[], setVal);


        // Calculate pallete icon color

        enum Color { R = 1, G = 2, B = 3 }

        const
          parseHexColorChannel = (pos: number): number => {
            return parseInt(setVal[pos * 2 - 1] + setVal[pos * 2], 16)
          },

          R = parseHexColorChannel(Color.R),
          G = parseHexColorChannel(Color.G),
          B = parseHexColorChannel(Color.B),

          lightness = (Math.max(R, G, B) + Math.min(R, G, B)) / 2;

        this.darker = lightness / 255 > 2 / 3;


        // Calculate shading if enabled

        if (this.shade) {
          const
            shade: number = this.shade,
            val: string[] = this.val as string[],

            lower = (color: number): string => {
              let shadeOut = Math.round(color * shade).toString(16);

              if (shadeOut.length < 2) shadeOut = '0' + shadeOut;

              return shadeOut;
            };

          if (val[2]) {
            root[val[0]][val[1]].shade = '#' + lower(R) + lower(G) + lower(B);
          } else if (val[1]) {
            root[val[0]].shade = '#' + lower(R) + lower(G) + lower(B);
          }
        }
      }
    }
  },

  mounted() {
    this.value = this.value;  // Execute icon darking
  },

  components: {
    VCard,
    VRow,
    VSpacer,
    VMenu,
    VColorPicker,
    VBtn,
    VIcon
  }
});
</script>