<template lang="pug">
  div
    Menu(:open="getPage === 'Avatar'")
    MenuHairs(:open="getPage === 'Hairs'")
    MenuTails(:open="getPage === 'Tails'")

    Saves(:open="getPage === 'Saves'")
    Screener(:open="getPage === 'Capture'")

    Animator(:open="getPage === 'Animate'")
    AnimatorSaves(:open="getPage === 'AnimateSaves'")

    Recorder(:open="getPage === 'Record'")
    RecorderProcess(:open="getPage === 'recorderRender'")

    Position(:open="getPage === 'Position'")

    v-main
      v-container(fluid)
        Avatar

        v-row.mx-0
          ButtonBack(:disable="getPage === 'recorderRender'")

          v-spacer

          v-icon.ma-1.recording(v-if="rendering" color="red") {{ icons.mdiRecord }}

          div.d-none.d-sm-flex
            v-chip.mx-1(label) {{ quality }}p • {{ FPS }} FPS
            v-chip.ml-1.mr-2(label)
              | {{ $t('editor.frame') }} {{ frame + 1 }} {{ $t('editor.of') }} {{ frames }}

          div.d-flex.d-sm-none
            v-chip.mx-1(label) {{ quality }} • {{ FPS }}
            v-chip.mx-1.mr-2(label)
              | {{ frame + 1 }} {{ $t('editor.of') }} {{ frames }}

          NetworkStatus

        v-row.mx-0.mt-2
          v-spacer

          v-btn-toggle.d-none.d-sm-flex(
            v-model="editMode"
            dense
            mandatory
            dark
            color="primary"
          )
            v-btn(outlined :aria-label="$t('editor.mode.head')") {{ $t('editor.mode.head') }}
            v-btn(outlined :aria-label="$t('editor.mode.body')") {{ $t('editor.mode.body') }}

          v-btn-toggle.d-flex.d-sm-none(
            v-model="editMode"
            dense
            mandatory
            dark
            color="primary"
          )
            v-btn(outlined :aria-label="$t('editor.mode.head')" small) {{ $t('editor.mode.head') }}
            v-btn(outlined :aria-label="$t('editor.mode.body')" small) {{ $t('editor.mode.body') }}

    // Bottom interface

    v-app-bar(
      app
      bottom
      color="transparent"
      flat
      style="pointer-events: none"
    )
      v-progress-linear.white-stripes(
        :value="100"

        striped
        absolute
        bottom
        height=6
        color="#222"
      )

      Welcome
      Account
      Chat

      .px-2

      Version.d-none.d-sm-inline-flex

      v-spacer

      div.d-flex.d-sm-none
        v-btn.mx-3.mt-5(
          fab
          dark
          small
          style="pointer-events: auto"
          :aria-label="$t('editor.animate')"
          @click="openPage('Animate')"
        )
          v-icon {{ icons.mdiMovieOpen }}

      div.d-none.d-sm-flex
        v-btn.mx-3.mt-5(
          rounded
          dark
          style="pointer-events: auto"
          :aria-label="$t('editor.animate')"
          @click="openPage('Animate')"
        )
          v-icon(left) {{ icons.mdiMovieOpen }}
          | {{ $t('editor.animate') }}

      v-spacer.mx-12.d-none.d-sm-inline-flex
      v-spacer.d-inline-flex.d-sm-none

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
  mdiGestureTapHold,
  mdiArrowAll
} from '@mdi/js'

import i18nHead from '~/assets/ts/i18nHead.ts'

import Account from '~/components/editor/Account'
import Menu from '~/components/editor/Menu'
import MenuHairs from '~/components/editor/MenuHairs'
import MenuTails from '~/components/editor/MenuTails'
import Saves from '~/components/editor/Saves'
import Screener from '~/components/editor/Screener'
import Animator from '~/components/editor/Animator'
import AnimatorSaves from '~/components/editor/AnimatorSaves'
import Recorder from '~/components/editor/Recorder'
import RecorderProcess from '~/components/editor/RecorderProcess'
import Position from '~/components/editor/Position'
import Chat from '~/components/editor/Chat'
import Avatar from '~/components/editor/Avatar'
import ButtonBack from '~/components/editor/ButtonBack'
import Welcome from '~/components/editor/Welcome'

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
      mdiGestureTapHold,
      mdiArrowAll
    })

    const wind = ref(true)

    const list = ref([
      {
        text: { en: 'Avatar', ru: 'Аватар' },
        icon: '$vuetify.icons.values.pony'
      },
      {
        text: { en: 'Position', ru: 'Позиция' },
        icon: icons.mdiArrowAll
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

    if (process.client) commit('avatar/setSaveIndex', localStorage.getItem('defaultIndex') || 0)

    const editMode = computed({
      get: () => getters['interface/getEditMode'],
      set(value) {
        commit('interface/setEditMode', value)
      }
    })

    return {
      getPage,
      openPage,
      openedList,

      wind,
      toggleWind,

      ...toRefs(store),

      icons,
      list,

      Feedback: ref(false),

      editMode
    }
  },

  components: {
    Account,

    Menu,
    MenuHairs,
    MenuTails,
    Saves,
    Screener,

    Animator,
    AnimatorSaves,

    Recorder,
    RecorderProcess,

    Position,

    Chat,
    Avatar,
    ButtonBack,

    Version,
    NetworkStatus,

    Welcome
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

.white-stripes.v-progress-linear--striped
  z-index: 0

  .v-progress-linear__determinate
    background-image: linear-gradient(135deg, #fffe 25%, #0000 0, #0000 50%, #fffe 0, #fffe 75%, #0000 0, #0000)!important
</style>
