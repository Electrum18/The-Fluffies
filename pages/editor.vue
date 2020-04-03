<template lang="pug">
  div
    h1.header {{ $t('meta.title.editor') }}

    Menu(:open="getPage === 'Avatar'")
    MenuHairs(:open="getPage === 'Hairs'")
    Saves(:open="getPage === 'Saves'")
    Screener(:open="getPage === 'Capture'")
    Animator(:open="getPage === 'Animate'")

    v-content
      v-container(fluid)
        Avatar(:animating="getPage === 'Animate'" :smaller="animate")
        ButtonBack
        NetworkStatus

    // Bottom interface

    v-app-bar(
      app
      bottom
      color="transparent"
      flat
      style="pointer-events: none"
    )
      Locale.locale

      Chat

      .px-2

      Version.d-none.d-sm-inline-flex

      v-spacer

      // List popup menu

      v-menu(auto v-model="openedList")
        template(v-slot:activator="{ on }")
          v-btn(
            fab
            dark
            style="pointer-events: auto"
            v-on="on"
            :aria-label="$t('editor.list')"
          )
            v-icon(large) {{ icons.mdiMenu }}

        v-list(dense)
          v-list-item(
            v-for="(item, i) in list"
            :key="i"
            @click.stop="openPage(item.text['en'])"
            :disabled="item.disabled"
          )
            v-list-item-icon(right): v-icon(v-text="item.icon")
            v-list-item-content
              v-list-item-title(v-text="item.text[$i18n.locale]")
</template>

<script>
import { ref, computed, reactive } from '@vue/composition-api'

import { mdiMenu, mdiContentSave, mdiMovieOpen, mdiCamera } from '@mdi/js'

import i18nHead from '~/assets/js/i18nHead'

import Menu from '~/components/editor/Menu'
import MenuHairs from '~/components/editor/MenuHairs'
import Saves from '~/components/editor/Saves'
import Screener from '~/components/editor/Screener'
import Animator from '~/components/editor/Animator'
import Chat from '~/components/editor/Chat'
import Avatar from '~/components/editor/Avatar'
import ButtonBack from '~/components/editor/ButtonBack'

import Version from '~/components/Version'
import Locale from '~/components/Locale'
import NetworkStatus from '~/components/NetworkStatus'

function pagesControl({ getters, commit }) {
  const getPage = computed(() => getters['interface/getPage'])

  const openedList = ref(false)

  function openPage(name) {
    commit('interface/setPage', name)

    openedList.value = false
  }

  return {
    getPage,
    openPage,
    openedList
  }
}

export default {
  layout: 'editor',

  setup(props, { root: { $store } }) {
    const { getPage, openPage, openedList } = pagesControl($store)

    const icons = reactive({
      mdiMenu,
      mdiContentSave,
      mdiMovieOpen,
      mdiCamera
    })

    const list = [
      {
        text: { en: 'Avatar', ru: 'Аватар' },
        icon: '$vuetify.icons.values.pony'
      },
      {
        text: { en: 'Saves', ru: 'Сохранения' },
        icon: icons.mdiContentSave
      },
      {
        text: { en: 'Animate', ru: 'Анимация' },
        icon: icons.mdiMovieOpen,
        disabled: true
      },
      {
        text: { en: 'Capture', ru: 'Запечатлеть' },
        icon: icons.mdiCamera
      }
    ]

    const animate = ref(false)

    return {
      icons,
      list,
      openedList,
      getPage,
      openPage,
      animate
    }
  },

  components: {
    Menu,
    MenuHairs,
    Saves,
    Screener,
    Animator,
    Chat,
    Avatar,
    ButtonBack,

    Version,
    Locale,
    NetworkStatus
  },

  head() {
    return i18nHead(this, 'editor')
  }
}
</script>

<style lang="sass">
html
  overflow: auto!important

.header
  position: fixed
  opacity: 0
  pointer-events: none

.locale
  position: absolute
  bottom: 56px
  pointer-events: auto
</style>
