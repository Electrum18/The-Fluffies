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

      v-navigation-drawer(
        v-model="opened.Saves"
        dark
        fixed
        right
        temporary
        touchless
        :permanent="opened.Saves"
        hide-overlay
      )
        Saves

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
            v-icon(left) {{ icons.left }}
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
            v-icon {{ icons.left }}

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
            v-tooltip(v-model="hint.edit" left allow-overflow)
              template(v-slot:activator="{ none }")
                v-btn(
                  fab
                  style="pointer-events: auto"
                  v-on="on"
                  aria-label="Open list"
                )
                  v-icon(large) {{ icons.menu }}
              span.ml-zero
                v-icon(left) {{ icons.alert }}
                | {{ lang.hints.edit }}

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
import Screener from './components/TheScreener.vue';
import Avatar from './components/TheAvatar.vue';
import Chat  from './components/TheChat.vue';
import Menu  from './components/TheMenu.vue';
import Hairs from './components/TheMenuHairs.vue';
import Saves from './components/TheSaves.vue';

import en from '../../assets/json/locales/en/editor.json';
import ru from '../../assets/json/locales/ru/editor.json';

import Vue from 'vue';
import {
  VApp,
  VNavigationDrawer,
  VBottomSheet,
  VContent,
  VContainer,
  VBtn,
  VIcon,
  VCol,
  VScrollXTransition,
  VAppBar,
  VChip,
  VSpacer,
  VMenu,
  VList,
  VListItem,
  VListItemIcon,
  VListItemContent,
  VListItemTitle,
  VAlert,
  VProgressCircular,
  VTooltip
} from 'vuetify/lib';

import {
  mdiContentSave,
  mdiMovieOpen,
  mdiCamera,
  mdiMenu,
  mdiAlertCircleOutline,
  mdiChevronLeft
} from '@mdi/js';

export default Vue.extend({
  data() {
    return {
      icons: {
        left: mdiChevronLeft,
        menu: mdiMenu,
        alert: mdiAlertCircleOutline
      },

      opened: {
        Avatar: false,
        Hairs: false,
        Capture: false,
        List: false,
        Saves: false
      },

      hint: {
        edit: true
      },

      loadings: [],
      background: '',

      list: [
        {
          text: {
            en: 'Avatar',
            ru: 'Аватар'
          },

          icon: '$vuetify.icons.values.pony'
        }, {
          text: {
            en: 'Saves',
            ru: 'Сохранения'
          },

          icon: mdiContentSave
        }, {
          text: {
            en: 'Animate',
            ru: 'Анимация'
          },

          icon: mdiMovieOpen,
          disabled: true
        }, {
          text: {
            en: 'Capture',
            ru: 'Запечатлеть'
          },

          icon: mdiCamera
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
    '$root.loadings'(val) { this.loadings = val },
    '$root.color.background.basic'(val) { this.background = val }
  },

  mounted() {
    this.loadings   = (this.$root as any).loadings;
    this.background = (this.$root as any).color.background.basic;

    const overlay = document.getElementById('overlay') as HTMLElement;
    const style = overlay.style;

    style.opacity = '0';
    style['pointer-events' as any] = 'none';

    setTimeout(() => { this.hint.edit = false; }, 3000);
  },

  components: {
    Screener,
    Avatar,
    Chat,
    Menu,
    Hairs,
    Saves,

    VApp,
    VNavigationDrawer,
    VBottomSheet,
    VContent,
    VContainer,
    VBtn,
    VIcon,
    VCol,
    VScrollXTransition,
    VAppBar,
    VChip,
    VSpacer,
    VMenu,
    VList,
    VListItem,
    VListItemIcon,
    VListItemContent,
    VListItemTitle,
    VAlert,
    VProgressCircular,
    VTooltip
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

  .ml-zero
    margin-left: -8px!important

  .hide
    opacity: 0!important
    height: 0!important


  // Loader

  @keyframes transparent
    0%
      opacity: 100%

    50%
      opacity: 33%

    100%
      opacity: 100%

  #overlay
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background: #fff
    transition: opacity 0.5s

    #avatar
      position: absolute
      left: 50%
      bottom: 0%
      transform: translate(-50%, 0%)

      svg
        animation: transparent 2s ease-in-out infinite
        width: 99vmin
</style>
