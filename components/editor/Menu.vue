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
    v-expansion-panels(focusable)
      Eyes
      Glasses
      Mane
      Fur
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
import Glasses from './menu/Glasses'
import Mane from './menu/Mane'
import Fur from './menu/Fur'
import Horns from './menu/Horns'
import Mouth from './menu/Mouth'
import Emotion from './menu/Emotion'
import Ears from './menu/Ears'
import Piercing from './menu/Piercing'
import Hooves from './menu/Hooves'
import Neck from './menu/Neck'
import Wings from './menu/Wings'

function Gender({ commit }, globals) {
  const gender = computed(() => {
    return globals.value.male
      ? { color: 'blue', icon: mdiGenderMale }
      : { color: 'pink', icon: mdiGenderFemale }
  })

  function changeGender() {
    commit('avatar/setGlobal', { path: 'male', value: !globals.value.male })
  }

  return {
    gender,
    changeGender
  }
}

export default {
  components: {
    Eyes,
    Glasses,
    Mane,
    Fur,
    Horns,
    Mouth,
    Emotion,
    Ears,
    Piercing,
    Hooves,
    Neck,
    Wings
  },

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { root: { $store } }) {
    const globals = computed(() => $store.getters['avatar/getGlobal'])

    const name = computed({
      get: () => globals.value.name,
      set: (value) => $store.commit('avatar/setGlobal', { path: 'name', value })
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
