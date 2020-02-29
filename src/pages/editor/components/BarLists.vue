<template lang="pug">
  v-card(light :disabled="enable")
    v-list(two-line)
      v-list-item-group(
        v-model="selected"
        mandatory
        active-class="orange--text"
      )
        template(v-if="list.length" v-for="(element, i) in list")
          v-list-item(
            @click="setElementName(element.name)"
            :key="element.name[$root.locale]"
          )
            v-list-item-content(:style="style(element)")
              v-list-item-title {{ element.name[$root.locale] }}
              v-list-item-subtitle {{ locale.by[$root.locale] }} {{ element.author }}

              v-list-item-action(v-if="element.warning").mx-0.my-1
                v-chip(
                  small
                  outlined
                  label
                  color="red lighten-1"
                ) {{ element.warning[$root.locale] }}

          v-divider.border--light(
            v-if="i < list.length - 1"
            :key="i"
          )
</template>

<script lang="ts">
import { getProp } from '../../../assets/ts/nested';

import Vue from 'vue';
import {
  VCard,
  VList,
  VListItem,
  VListItemTitle,
  VListItemSubtitle,
  VListItemContent,
  VListItemGroup,
  VListItemAction,
  VBottomSheet,
  VChip,
  VDivider
} from 'vuetify/lib';

export default Vue.extend({
  props: {
    target: String,
    list: [Array, Object],
    off: Array
  },

  data() {
    return {
      selected: 0,

      locale: {
        by: {
          en: 'author: ',
          ru: 'автор: '
        }
      }
    }
  },

  watch: {
    list(val) {
      const
        root: any   = this.$root,
        rootElement = root.propers[this.target];

      for (let i = 0, len = val.length; i < len; i++) {
        const element = val[i];

        if (element.name['en'] == rootElement.name['en']) {
          this.selected = i;
        }
      }
    }
  },


  computed: {
    enable(): boolean {
      if (this.off) {
        const root: any = this.$root;

        return !getProp(root, this.off as string[]) as boolean;
      } else {
        return false;
      }
    }
  },

  methods: {
    setElementName(name: string) {
      const root: any = this.$root;

      root.propers[this.target].name = name
    },

    style(elem: any): object {
      return elem.warning ? { 'padding-bottom': '4px' } : { 'padding-bottom': '12px' }
    }
  },

  mounted() {
    const
      list        = this.list,
      root: any   = this.$root,
      rootElement = root.propers[this.target];

    for (let i = 0; i < list.length; i++) {
      const element = list[i];

      if (element.name['en'] == rootElement.name['en']) {
        this.selected = i;
      }
    }
  },

  components: {
    VCard,
    VList,
    VListItem,
    VListItemTitle,
    VListItemSubtitle,
    VListItemContent,
    VListItemGroup,
    VListItemAction,
    VBottomSheet,
    VChip,
    VDivider
  }
});
</script>

<style lang="sass">
hr.border--light
  border-color: rgba(0, 0, 0, 0.12)!important
</style>