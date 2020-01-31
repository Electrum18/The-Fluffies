<template lang="pug">
  v-card(outlined :disabled="enable").my-2
    v-row
      div.body-1.py-2(style="margin-left: 24px!important") {{ text }}
      v-spacer
      v-switch.mx-4.my-1(
        v-model="check"
        color="#fa0"
        hide-details
      )
</template>

<script lang="ts">
import Vue from 'vue'
import { getProp, setProp } from "../../../assets/ts/nested"
import {
  VCard,
  VRow,
  VSpacer,
  VSwitch
} from 'vuetify/lib'

export default Vue.extend({
  props: {
    text: String,
    val: Array,
    off: Array
  },

  computed: {
    enable(): boolean {
      if (this.off) {
        const root: any = this.$root;

        return !getProp(root, this.off as string[]) as boolean;
      } else {
        return false;
      }
    },

    check: {
      get(): boolean {
        const root: any = this.$root;

        return getProp(root, this.val as string[]) as boolean;
      },

      set(setVal: boolean) {
        const root: any = this.$root;

        setProp(root, this.val as string[], setVal);
      }
    }
  },

  components: {
    VCard,
    VRow,
    VSpacer,
    VSwitch
  }
});
</script>