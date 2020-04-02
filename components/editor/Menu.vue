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
import { mapGetters, mapMutations } from 'vuex'

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
    Neck
  },

  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    ...mapGetters('avatar', ['getProper']),

    name: {
      get() {
        return this.getProper.name
      },

      set(val) {
        this.setProper({ path: 'name', value: val })
      }
    },

    gender() {
      if (this.getProper.male) {
        return {
          color: 'blue',
          icon: mdiGenderMale
        }
      } else {
        return {
          color: 'pink',
          icon: mdiGenderFemale
        }
      }
    }
  },

  methods: {
    ...mapMutations('avatar', ['setProper']),
    ...mapMutations('interface', ['setPage']),

    changeGender() {
      this.setProper({
        path: 'male',
        value: !this.getProper.male
      })
    },

    close() {
      this.setPage(false)
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
