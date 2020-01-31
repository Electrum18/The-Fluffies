<template lang="pug">
  v-card(light :disabled="enable")
    v-list(two-line)
      v-list-item-group(
        v-model="selected"
        active-class="orange--text"
      )
        template(v-if="list.length" v-for="(element, i) in list")
          v-list-item(
            @click="setElementName(element.name)"
            :key="element.name[$root.locale]"
          )
            v-list-item-content
              v-list-item-title {{ element.name[$root.locale] }}
              v-list-item-subtitle {{ locale.by[$root.locale] }} {{ element.author }}

          v-divider.light(
            v-if="i + 1 < element.length"
            :key="i"
          )
</template>

<script lang="ts">
import Vue from 'vue'
import { getProp } from "../../../assets/ts/nested"
import {
  VCard,
  VList,
  VListItem,
  VListItemTitle,
  VListItemSubtitle,
  VListItemContent,
  VListItemGroup,
  VBottomSheet
} from 'vuetify/lib'


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
          en: "author: ",
          ru: "автор: "
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

        if (element.name["en"] == rootElement.name["en"]) {
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
    }
  },

  mounted() {
    const
      list        = this.list,
      root: any   = this.$root,
      rootElement = root.propers[this.target];

    for (let i = 0, len = list.length; i < len; i++) {
      const element = list[i];

      if (element.name["en"] == rootElement.name["en"]) {
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
    VBottomSheet
  }
});
</script>