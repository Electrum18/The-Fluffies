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
        Avatar(:raise="avatarPos")

        v-row.mx-0
          ButtonBack(:disable="getPage === 'recorderRender'")

          v-spacer

          v-icon.ma-1.recording(v-if="rendering" color="red") {{ icons.mdiRecord }}

          div.d-none.d-sm-flex
            v-chip.mx-1(label) {{ quality }}p • {{ FPS }} FPS
            v-chip.ml-1.mr-3(label)
              | {{ $t('editor.frame') }} {{ frame + 1 }} {{ $t('editor.of') }} {{ frames }}

          div.d-flex.d-sm-none
            v-chip.mx-1(label) {{ quality }} • {{ FPS }}
            v-chip.ml-1.mr-3(label)
              | {{ frame + 1 }} {{ $t('editor.of') }} {{ frames }}

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

      v-btn.mx-3(
        fab
        dark
        small
        style="pointer-events: auto"
        :aria-label="$t('editor.animate')"
        @click="openPage('Animate')"
      )
        v-icon {{ icons.mdiMovieOpen }}

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
            @click.stop="item.wind !== undefined ? toggleWind() : openPage(item.text['en'])"
          )
            v-list-item-icon(right): v-icon(v-text="item.icon")
            v-list-item-content
              v-list-item-title(v-text="item.text[$i18n.locale]")

            v-list-item-icon(v-if="item.wind !== undefined")
              v-icon(v-if="item.wind.value" color="primary") {{ icons.mdiCheckboxMarked }}
              v-icon(v-else color="grey lighten-2") {{ icons.mdiCheckboxBlankOutline }}

    v-icon.pointer.d-none.d-sm-flex(v-if="tapping") {{ icons.mdiCursorDefaultClick }}
    v-icon.pointer2.d-flex.d-sm-none(v-if="tapping") {{ icons.mdiGestureTapHold }}
</template>

<script>
import { ref, computed, reactive, toRefs } from '@vue/composition-api'

import {
  mdiMenu,
  mdiContentSave,
  mdiMovieOpen,
  mdiCamera,
  mdiVideoVintage,
  mdiRecord,
  mdiWeatherWindy,
  mdiCheckboxMarked,
  mdiCheckboxBlankOutline,
  mdiCursorDefaultClick,
  mdiGestureTapHold
} from '@mdi/js'

import i18nHead from '~/assets/ts/i18nHead.ts'

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { root: { $store } }) {
    const { getters, commit } = $store

    const icons = reactive({
      mdiMenu,
      mdiContentSave,
      mdiMovieOpen,
      mdiCamera,
      mdiVideoVintage,
      mdiRecord,
      mdiWeatherWindy,
      mdiCheckboxMarked,
      mdiCheckboxBlankOutline,
      mdiCursorDefaultClick,
      mdiGestureTapHold
    })

    const wind = ref(true)

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
        text: { en: 'Wind', ru: 'Ветер' },
        icon: icons.mdiWeatherWindy,
        wind
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

    function toggleWind() {
      wind.value = !wind.value

      commit('interface/setWind', wind.value)
    }

    const store = reactive({
      frame: computed(() => getters['avatar/getFrame']),
      frames: computed(() => getters['avatar/getFrames'].length),

      FPS: computed(() => getters['interface/getFPS']),
      animate: computed(() => getters['interface/getAnimate']),
      quality: computed(() => getters['interface/getQuality']),
      rendering: computed(() => getters['interface/getRendering']),
      tapping: computed(() => getters['interface/getTapping'])
    })

    const { getPage, openPage, openedList } = pagesControl(getters, commit)

    const avatarPos = computed(() => {
      if (getPage.value === 'Animate') {
        return store.animate
          ? { size: 'calc(100vmin - 74px)', bottom: '74px' }
          : { size: '70vmin', bottom: '260px' }
      }
    })

    if (process.client) commit('avatar/setSaveIndex', localStorage.getItem('defaultIndex') || 0)

    return {
      getPage,
      openPage,
      openedList,

      wind,
      toggleWind,

      ...toRefs(store),

      icons,
      list,
      avatarPos,

      Feedback: ref(false)
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

@keyframes drag
  0%
    right: 40vmin
    transform: scale(0)

  15%
    right: 40vmin
    transform: scale(1.2)

  66%
    right: 15vmin
    transform: scale(1.2)

  75%
    right: 15vmin
    transform: scale(0)

  100%
    right: 15vmin
    transform: scale(0)

@keyframes drag2
  0%
    right: 40vmin
    transform: scale(0)

  15%
    right: 40vmin
    transform: scale(1.5)

  66%
    right: 15vmin
    transform: scale(1.5)

  75%
    right: 15vmin
    transform: scale(0)

  100%
    right: 15vmin
    transform: scale(0)

.header
  position: fixed
  opacity: 0
  pointer-events: none
  width: 0
  height: 0

.recording
  animation: recording 3s linear infinite

.pointer
  position: absolute!important
  right: 15vmin
  top: 100px
  animation: drag 2s ease-in-out infinite

.pointer2
  position: absolute!important
  right: 15vmin
  top: 100px
  animation: drag2 2s ease-in-out infinite
</style>
