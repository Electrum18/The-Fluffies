<template lang="pug">
  v-col
    v-row
      div.body-2.px-3 {{ text }}
      v-spacer
      div.body-2.mx-2.px-1.value {{ value }}

    v-slider.inputs2.ma-0(
      v-model="value"
      color="#fa0"
      hide-details=true
      :max="max"
      :min="min"
    )
</template>

<script lang="ts">
import Vue from 'vue'
import { getProp, setProp } from "../assets/js/nested"

export default Vue.extend({
  props: {
    text: String,
    max: String,
    min: String,
    val: Array,
    compare: Array
  },

  computed: {
    value: {
      get(): number {
        const root: any = this.$root;

        return getProp(root, this.val as string[]) as number;
      },

      set(setVal: number) {
        const root: any = this.$root;

        setProp(root, this.val as string[], setVal);


        // Compare part

        if (this.compare) {
          let getted: number =
            getProp(root, this.compare as string[]) as number;

          if (100 - getted <= setVal) {
            setProp(root, this.compare as string[], 100 - setVal);
          }
        }
      }
    }
  }
});
</script>

<style lang="sass">
  .value
    user-select: none
    background: #fa0
    border-radius: 4px
</style>