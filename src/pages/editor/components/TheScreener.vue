<template lang="pug">
  v-sheet.text-center(dark)
    v-container
      v-row(v-if="mode == 1")
        v-col
          v-alert(type="error" outlined) {{ lang.screener.warning }}

      v-row
        v-col(cols="12" sm="6" md="2")
          v-text-field(
            v-model="width"
            :label="lang.screener.width"
            hide-details
            outlined
            suffix="px"
            :rules="[() => !!width || 'argh!']"
          )

        v-col(cols="12" sm="6" md="2")
          v-text-field(
            v-model="height"
            :label="lang.screener.height"
            hide-details
            outlined
            suffix="px"
            :rules="[() => !!height || 'argh!']"
          )

        v-col(cols="12" md="4")
          BarColor(
            :text="lang.screener.background"
            :val="['color', 'background', 'basic']"
          )

        v-col(cols="12" sm="2" md="2")
          v-btn-toggle.my-1(
            v-model="mode"
            mandatory
            color="#fa0"
          )
            v-btn(
              outlined
              aria-label="PNG format"
            ) png

            v-btn(
              outlined
              aria-label="JPEG format"
            ) jpeg

            v-btn(
              outlined
              aria-label="BMP format"
            ) bmp

        v-col(cols="12" sm="8" md="1")

        v-col(cols="12" sm="2" md="1")
          v-btn(
            fab
            @click="takeImage"
            aria-label="Take image"
          )
            v-icon {{ icons.capture }}
</template>

<script lang="ts">
import en from '../../../assets/json/locales/en/editor.json';
import ru from '../../../assets/json/locales/ru/editor.json';

import Vue from 'vue';
import {
  VSheet,
  VContainer,
  VRow,
  VCol,
  VTextField,
  VBtnToggle,
  VBtn,
  VIcon,
  VAlert
} from 'vuetify/lib';

import { mdiCameraImage } from '@mdi/js';

import BarColor from './BarColors.vue';

export default Vue.extend({
  data() {
    return {
      icons: {
        capture: mdiCameraImage
      },

      mode: 0,

      width: 1920,
      height: 1080,

      locales: { en, ru }
    }
  },

  computed: {
    lang(): object {
      return (this.locales as any)[(this.$root as any).locale];
    }
  },

  methods: {
    takeImage() {
      const
        avatar: any = this.$root.$refs.avatar,
        ratio       = avatar.width / avatar.height;

      let
        width  = this.width,
        height = this.height,

        canvas = document.createElement('canvas');


      // Canvas setting

      canvas.width  = width;
      canvas.height = height;


      // Setting at center

      width  = canvas.width,
      height = width / ratio;

      if (height > canvas.height) {
        height = canvas.height;
        width  = canvas.height * ratio;
      }


      width  *= 1.25;

      const
        xOffset = (canvas.width - width) / 2,
        yOffset = canvas.height - (height * 1.125);

      height *= 1.25;


      // Drawing image over background at bottom-center

      let ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      ctx.fillStyle = (this.$root as any).color.background.basic;

      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(avatar, xOffset, yOffset, width, height);


      // Creating file

      let e = document.createElement('a');

      const format = ['png', 'jpeg', 'bmp'][this.mode]

      e.style.display = 'none';
      e.download      = 'TFs-' + (this.$root as any).propers.name + '.' + format;
      e.href          = canvas.toDataURL('image/' + format);


      // Download file

      document.body.appendChild(e);

      e.click();

      document.body.removeChild(e);
    }
  },

  components: {
    BarColor,

    VSheet,
    VContainer,
    VRow,
    VCol,
    VTextField,
    VBtnToggle,
    VBtn,
    VIcon,
    VAlert
  }
});
</script>