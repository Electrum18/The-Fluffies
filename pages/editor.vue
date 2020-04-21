<template lang="pug">
  div
    h1.header {{ $t('meta.title.editor') }}

    Menu(:open="getPage === 'Avatar'")
    MenuHairs(:open="getPage === 'Hairs'")
    Saves(:open="getPage === 'Saves'")
    Screener(:open="getPage === 'Capture'")
    Animator(:open="getPage === 'Animate'")
    AnimatorSaves(:open="getPage === 'AnimateSaves'")
    Recorder(:open="getPage === 'Record'")
    RecorderProcess(:open="getPage === 'recorderRender'")

    v-content
      v-container(fluid)
        Avatar(:animating="getPage === 'Animate'" :smaller="animate")

        v-row.mx-0
          ButtonBack(:disable="getPage === 'recorderRender'")
          v-spacer
          v-icon.ma-1.recording(v-if="rendering" color="red") {{ icons.mdiRecord }}
          v-chip.mx-1(label) {{ quality }}p • {{ FPS }} FPS
          v-chip.ml-1.mr-3(label)
            | {{ $t('editor.frame') }} {{ frame + 1 }} {{ $t('editor.of') }} {{ frames }}

          NetworkStatus.my-1

    // Bottom interface

    v-app-bar(
      app
      bottom
      color="transparent"
      flat
      style="pointer-events: none"
    )
      Chat

      .px-2

      Version.d-none.d-sm-inline-flex

      v-spacer

      // List popup menu

      v-menu(transition="slide-x-reverse-transition" v-model="openedList")
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
          )
            v-list-item-icon(right): v-icon(v-text="item.icon")
            v-list-item-content
              v-list-item-title(v-text="item.text[$i18n.locale]")
</template>

<script>
import { ref, computed, reactive, toRefs } from '@vue/composition-api'

import {
  mdiMenu,
  mdiContentSave,
  mdiMovieOpen,
  mdiCamera,
  mdiVideoVintage,
  mdiRecord
} from '@mdi/js'

import i18nHead from '~/assets/js/i18nHead'

import Menu from '~/components/editor/Menu'
import MenuHairs from '~/components/editor/MenuHairs'
import Saves from '~/components/editor/Saves'
import Screener from '~/components/editor/Screener'
import Animator from '~/components/editor/Animator'
import AnimatorSaves from '~/components/editor/AnimatorSaves'
import Recorder from '~/components/editor/Recorder'
import RecorderProcess from '~/components/editor/RecorderProcess'
import Chat from '~/components/editor/Chat'
import Avatar from '~/components/editor/Avatar'
import ButtonBack from '~/components/editor/ButtonBack'

import Version from '~/components/Version'
import NetworkStatus from '~/components/NetworkStatus'

function pagesControl(getters, commit) {
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
    const { getters, commit } = $store

    const icons = reactive({
      mdiMenu,
      mdiContentSave,
      mdiMovieOpen,
      mdiCamera,
      mdiVideoVintage,
      mdiRecord
    })

    const list = ref([
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
        icon: icons.mdiMovieOpen
      },
      {
        text: { en: 'Record', ru: 'Записать' },
        icon: icons.mdiVideoVintage
      },
      {
        text: { en: 'Capture', ru: 'Запечатлеть' },
        icon: icons.mdiCamera
      }
    ])

    const store = reactive({
      frame: computed(() => getters['avatar/getFrame']),
      frames: computed(() => getters['avatar/getFrames'].length),

      FPS: computed(() => getters['interface/getFPS']),
      animate: computed(() => getters['interface/getAnimate']),
      quality: computed(() => getters['interface/getQuality']),
      rendering: computed(() => getters['interface/getRendering'])
    })

    return {
      ...pagesControl(getters, commit),
      ...toRefs(store),

      icons,
      list
    }
  },

  components: {
    Menu,
    MenuHairs,
    Saves,
    Screener,

    Animator,
    AnimatorSaves,

    Recorder,
    RecorderProcess,

    Chat,
    Avatar,
    ButtonBack,

    Version,
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

@keyframes recording
  0%
    opacity: 1

  40%
    opacity: 1

  45%
    opacity: 0

  55%
    opacity: 0

  60%
    opacity: 1

  100%
    opacity: 1

.header
  position: fixed
  opacity: 0
  pointer-events: none
  width: 0
  height: 0

.recording
  animation: recording 3s linear infinite
</style>
