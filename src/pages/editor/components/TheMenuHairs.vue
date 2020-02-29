<template lang="pug">
  v-container
    v-card(outlined)
      v-card-title {{ locale.list[$root.locale] }}
        v-spacer
        v-btn.mx-n2.transition(
          fab
          small
          :color="warnColor"
          @click="close()"
          aria-label="Close list"
        )
          v-icon {{ icons.back }}

      BarList(target="hair" :list="$root.propers.hair.info")
</template>

<script lang="ts">
import Vue from 'vue';
import {
  VContainer,
  VCard,
  VCardTitle,
  VSpacer,
  VBtn,
  VIcon
} from 'vuetify/lib';

import { mdiKeyboardBackspace } from '@mdi/js';

import BarList from './BarLists.vue';

export default Vue.extend({
  data() {
    return {
      icons: {
        back: mdiKeyboardBackspace
      },

      locale: {
        list: {
          en: 'Mane list',
          ru: 'Список грив'
        },

        by: {
          en: 'author: ',
          ru: 'автор: '
        }
      }
    }
  },

  computed: {
    warnColor(): string | undefined {
      if ((this.$root as any).warning.close) return 'red';
    }
  },

  methods: {
    close() {
      const parent: any = this.$parent.$parent.$parent;

      parent.opened.Hairs  = !parent.opened.Hairs;
      parent.opened.Avatar = !parent.opened.Avatar;
    }
  },

  components: {
    BarList,

    VContainer,
    VCard,
    VCardTitle,
    VSpacer,
    VBtn,
    VIcon
  }
});
</script>

<style lang="sass">
  button.transition
    transition: background 200ms linear
</style>