<template lang="pug">
  v-navigation-drawer.menu-drawer(
    v-model="open"
    dark
    fixed
    right
    temporary
    touchless
    :permanent="open"
    hide-overlay
  )
    v-container
      BarColor.ma-0(
        :text="$t('editor.screener.background')"
        val="background_basic"
      )

    v-expansion-panels(focusable)
      Eyes
      Brows
      Glasses
      Mane
      Fur
      Nose
      Horns
      Mouth
      Emotion
      Ears
      Piercing
      Hooves
      Neck
      Wings

    .abs
      v-card(light tile)
        v-container
          v-row
            v-btn.my-2(
              icon
              large
              :color="gender.color"
              @click="changeGender"
              :aria-label="$t('editor.menu.change_gender')"
            )
              v-icon(large) {{ gender.icon }}

            v-text-field.name-input(
              v-model="name"
              :label="$t('editor.name.label')"
              hide-details
            )

          v-row
            v-spacer
            v-btn.mx-2(
              dark
              rounded
              @click="close()"
              :aria-label="$t('editor.menu.close_editor')"
            ) {{ $t('editor.menu.close') }}

</template>

<script>
import { computed } from '@vue/composition-api'

import { mdiGenderMale, mdiGenderFemale } from '@mdi/js'

import Eyes from './menu/Eyes'
import Brows from './menu/Brows'
import Glasses from './menu/Glasses'
import Mane from './menu/Mane'
import Fur from './menu/Fur'
import Nose from './menu/Nose'
import Horns from './menu/Horns'
import Mouth from './menu/Mouth'
import Emotion from './menu/Emotion'
import Ears from './menu/Ears'
import Piercing from './menu/Piercing'
import Hooves from './menu/Hooves'
import Neck from './menu/Neck'
import Wings from './menu/Wings'

import BarColor from './BarColors'

function Gender({ commit }, globals) {
  const gender = computed(() => {
    return globals.value.male
      ? { color: 'blue', icon: mdiGenderMale }
      : { color: 'pink', icon: mdiGenderFemale }
  })

  function changeGender() {
    commit('avatar/setGlobal', { path: 'male', value: !globals.value.male })

    const slot = +localStorage.getItem('slot')
    const save = JSON.parse(localStorage.getItem('avatars'))

    save[slot].globals.male = globals.value.male

    localStorage.setItem('avatars', JSON.stringify(save))
  }

  return {
    gender,
    changeGender
  }
}

export default {
  components: {
    Eyes,
    Brows,
    Glasses,
    Mane,
    Fur,
    Nose,
    Horns,
    Mouth,
    Emotion,
    Ears,
    Piercing,
    Hooves,
    Neck,
    Wings,

    BarColor
  },

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  setup(_, { root: { $store } }) {
    const globals = computed(() => $store.getters['avatar/getGlobal'])

    const name = computed({
      get: () => globals.value.name,
      set: (value) => {
        $store.commit('avatar/setGlobal', { path: 'name', value })

        const slot = +localStorage.getItem('slot')
        const save = JSON.parse(localStorage.getItem('avatars'))

        save[slot].globals.name = value

        localStorage.setItem('avatars', JSON.stringify(save))
      }
    })

    return {
      ...Gender($store, globals),

      globals,
      name,

      close: () => $store.commit('interface/setPage', false)
    }
  }
}
</script>

<style lang="sass">
.abs
  position: absolute
  bottom: 0
  z-index: 1
  width: 100%

.btn-max
  width: 100%!important

.name-input
  padding-left: 0!important
  padding-right: 6px!important

.menu-drawer .v-navigation-drawer__content
  height: calc(100% - 120px)
</style>
