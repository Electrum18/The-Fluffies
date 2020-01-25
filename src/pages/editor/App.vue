<template lang="pug">
  #app
    v-app#inspire(:style="{ background: background }")
      v-navigation-drawer(
        v-model="opened.Avatar"
        dark
        fixed
        right
        temporary
        touchless
        :permanent="opened.Avatar"
        hide-overlay
      )
        Menu

      v-navigation-drawer(
        v-model="opened.Hairs"
        dark
        fixed
        right
        temporary
        touchless
        :permanent="opened.Hairs"
        hide-overlay
      )
        Hairs

      v-bottom-sheet(v-model="opened.Capture" inset=true)
        Screener


      v-content#content
        v-container(fluid)
          Avatar

          v-btn.d-none.d-sm-inline-flex(
            dark
            rounded
            href="/"
            :title="lang.back"
            :aria-label="lang.back"
          )
            v-icon(left) mdi-chevron-left
            | {{ lang.back }}

          v-btn.d-inline-flex.d-sm-none(
            dark
            rounded
            fab
            small
            href="/"
            :title="lang.back"
            :aria-label="lang.back"
          )
            v-icon mdi-chevron-left

          v-col(cols="12" sm="6" md="4")
            v-scroll-x-transition(group)
              v-alert(
                dark
                v-for="(load, i) in loadings"
                :key="'loader' + i"
              )
                v-progress-circular(
                  indeterminate
                  color="#fa0"
                  style="margin-right: 16px"
                )
                | {{ load }}


      // Bottom interface

      v-app-bar(
        app
        bottom
        color="transparent"
        flat
        dark
        style="pointer-events: none"
      )
        Chat

        div.px-6.d-none.d-sm-inline-flex(style="user-select: none")
          v-chip {{ lang.version }}
            v-chip.v-avatar--right(
              style="background-image: linear-gradient(to right, #f46, #f2a); margin-right: -12px"
            ) dragon fruit

        v-spacer

        // List popup menu

        v-menu(auto v-model="opened.List")
          template(v-slot:activator="{ on }")
            v-btn(
              fab
              style="pointer-events: auto"
              v-on="on"
              aria-label="Open list"
            )
              v-icon(large) mdi-menu

          v-list(dense)
            v-list-item(
              v-for="(item, i) in list"
              :key="i"
              @click.stop="opened[item.text['en']] = !opened[item.text['en']]; opened.List = false"
              :disabled="item.disabled"
            )
              v-list-item-icon(right): v-icon(v-text="item.icon")
              v-list-item-content
                v-list-item-title(v-text="item.text[$root.locale]")
</template>

<script lang="ts">
import Screener from "../../components/TheScreener.vue"
import Avatar from "../../components/TheAvatar.vue"
import Chat  from "../../components/TheChat.vue"
import Menu  from "../../components/TheMenu.vue"
import Hairs from "../../components/TheMenuHairs.vue"

import en from "../../assets/json/locales/en/editor.json"
import ru from "../../assets/json/locales/ru/editor.json"

import Vue from "vue"

export default Vue.extend({
  data() {
    return {
      opened: {
        Avatar: false,
        Hairs: false,
        Capture: false,
        List: false
      },

      loadings: [],
      background: "",

      list: [
        {
          text: {
            en: "Avatar",
            ru: "Аватар"
          },

          icon: "$vuetify.icons.values.pony"
        }, {
          text: {
            en: "Animate",
            ru: "Анимация"
          },

          icon: "mdi-movie-open",
          disabled: true
        }, {
          text: {
            en: "Capture",
            ru: "Запечатлеть"
          },

          icon: "mdi-camera"
        }
      ],

      locales: { en, ru }
    }
  },

  computed: {
    lang(): object {
      return (this.locales as any)[(this.$root as any).locale];
    }
  },

  watch: {
    "$root.loadings"(val) { this.loadings = val },
    "$root.color.background.basic"(val) { this.background = val }
  },

  mounted() {
    this.loadings   = (this.$root as any).loadings;
    this.background = (this.$root as any).color.background.basic;
  },

  components: {
    Screener,
    Avatar,
    Chat,
    Menu,
    Hairs
  }
});
</script>

<style lang="sass">
  html
    overflow: auto!important

  body
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat
    background-size: 16px

  .grad .v-badge__badge, button.grad
    background-image: linear-gradient(to right, #fa2, #f64)

  .inputs .v-input__control
    height: 0

  .hide
    opacity: 0!important
    height: 0!important
</style>
