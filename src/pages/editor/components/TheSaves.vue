<template lang="pug">
  v-container
    v-card(outlined)
      v-card-title {{ lang.saves.save }}
        v-spacer
        v-btn.mx-n2.transition(
          fab
          small
          :color="warnColor"
          @click="close()"
          aria-label="Close list"
        )
          v-icon mdi-keyboard-backspace

      v-divider

      v-card-actions
        v-spacer
        v-btn(
          :title="lang.saves.create"
          outlined
          :aria-label="lang.saves.create"
          @click="createSave()"
        ) {{ lang.saves.create }}

    v-card(light).my-4
      v-list
        v-list-item-group(
          v-model="slot"
          mandatory
          active-class="orange--text"
        )
          template(v-for="(save, i) in saves")
            v-list-item(
              :key="save.propers.name + i"
            )
              v-list-item-content
                v-list-item-title {{ i }} • {{ save.propers.name }}

              v-list-item-action.mx-n2.my-0
                v-btn(
                  icon
                  :title="lang.saves.delete"
                  :aria-label="lang.saves.delete"
                  v-if="saves.length > 1"
                  @click="removeSave(i)"
                )
                  v-icon mdi-delete

            v-divider.light(
              v-if="i + 1 < saves.length"
              :key="i"
            )
</template>

<script lang="ts">
import en from '../../../assets/json/locales/en/editor.json'
import ru from '../../../assets/json/locales/ru/editor.json'

import Vue from 'vue'
import {
  VContainer,
  VCard,
  VCardTitle,
  VCardActions,
  VSpacer,
  VBtn,
  VIcon,
  VDivider,
  VList,
  VListItem,
  VListItemTitle,
  VListItemGroup,
  VListItemContent,
  VListItemAction
} from 'vuetify/lib'

export default Vue.extend({
  data() {
    return {
      saves: null,
      slot: 0,

      locales: { en, ru }
    }
  },

  watch: {
    slot(val) {
      const root: any = this.$root,

        { propers, color, angle, horiz, degress }: any = (this.saves as any)[+this.slot];

      root.propers = propers;
      root.color = color;
      root.ang = angle,
      root.horiz = horiz;
      root.degress = degress;

      root.saveChanged = true;
      root.slot = this.slot;

      localStorage.setItem('slot', this.slot + '');
    }
  },

  computed: {
    lang(): any {
      return (this.locales as any)[(this.$root as any).locale];
    },

    warnColor() {
      if ((this.$root as any).warning.close) return 'red';
    }
  },

  methods: {
    close() {
      const parent: any = this.$parent.$parent.$parent;

      parent.opened.Saves  = !parent.opened.Saves;
    },

    createSave() {
      const parsedData: any[] = JSON.parse(localStorage.getItem('avatars') as string),
        root: any = this.$root,

        { propers, color } = root.default;

      parsedData.push({
        propers,
        color,
        angle: root.ang,
        horiz: root.horiz,
        degress: root.degress
      });

      localStorage.setItem('avatars', JSON.stringify(parsedData));

      this.saves = parsedData as any;
    },

    removeSave(i: number) {
      const parsedData: any[] = JSON.parse(localStorage.getItem('avatars') as string);

      parsedData.splice(i, 1);

      localStorage.setItem('avatars', JSON.stringify(parsedData));

      this.saves = parsedData as any;

      if (i == this.slot) this.slot = 0;

      localStorage.setItem('slot', this.slot + '');
    }
  },

  mounted() {
    this.slot = +(localStorage.getItem('slot') as string);
    this.saves = JSON.parse(localStorage.getItem('avatars') as string);
  },

  components: {
    VContainer,
    VCard,
    VCardTitle,
    VCardActions,
    VSpacer,
    VBtn,
    VIcon,
    VDivider,
    VList,
    VListItem,
    VListItemTitle,
    VListItemGroup,
    VListItemContent,
    VListItemAction
  }
})
</script>

<style lang="sass">
  button.transition
    transition: background 200ms linear
</style>