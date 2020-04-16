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
      v-card(outlined)
        v-card-title {{ $t('editor.saves.save') }}
          v-spacer
          v-btn.mx-n2(
            fab
            small
            @click="close()"
            :aria-label="$t('editor.menu.close')"
            )
            v-icon {{ icons.mdiKeyboardBackspace }}

        v-divider

        v-card-actions
          v-spacer
          v-btn(
            :title="$t('editor.saves.create')"
            outlined
            :aria-label="$t('editor.saves.create')"
            @click="createSave()"
            ) {{ $t('editor.saves.create') }}

      v-card(light).my-4
        v-list
          v-list-item-group(
            v-model="slot"
            mandatory
            active-class="orange--text"
          )
            template(v-for="(save, i) in saves")
              v-list-item(
                :key="save.globals.name + i"
              )
                v-list-item-content
                  v-list-item-title {{ i }} • {{ save.globals.name }}

                v-list-item-action.mx-n2.my-0
                  v-btn(
                    icon
                    :title="$t('editor.saves.delete')"
                    :aria-label="$t('editor.saves.delete')"
                    v-if="saves.length > 1"
                    @click="removeSave(i)"
                  )
                    v-icon {{ icons.mdiDelete }}

              v-divider.light(
                v-if="i + 1 < saves.length"
                :key="i"
              )
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

import { mdiKeyboardBackspace, mdiDelete } from '@mdi/js'

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      saves: null,
      slot: 0,

      icons: {
        mdiKeyboardBackspace,
        mdiDelete
      }
    }
  },

  computed: {
    ...mapGetters('avatar', ['getGlobal', 'getDefault'])
  },

  watch: {
    slot(val) {
      const avatars = JSON.parse(localStorage.getItem('avatars'))

      if (avatars[val]) {
        this.setAvatar(avatars[val])

        localStorage.setItem('slot', val + '')
      } else if (val !== 0) {
        this.slot = 0
      }
    },

    'getGlobal.name'(name) {
      this.saves[this.slot].name = name
    }
  },

  mounted() {
    this.slot = this.getSlot()
    this.saves = this.getSave()
  },

  methods: {
    ...mapMutations('interface', ['setPage']),
    ...mapActions('avatar', ['setAvatar']),

    close() {
      this.setPage(false)
    },

    isEmpty(val) {
      return val === undefined || val === null
    },

    getSlot() {
      const slot = +localStorage.getItem('slot')

      if (slot) {
        return slot
      } else {
        localStorage.setItem('slot', '0')

        return 0
      }
    },

    compability(avatar) {
      if (!avatar) return

      const { getDefault, isEmpty } = this

      const keys = Object.keys(avatar)

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]

        const value = avatar[key]
        const valueRef = getDefault[key]

        // If key does not exist
        if (isEmpty(valueRef)) {
          delete avatar[key]

          // If value does not exist
        } else if (isEmpty(value)) {
          avatar[key] = valueRef

          continue
        }

        if (key === 'globals') {
          const keys2 = Object.keys(value)

          for (let i = 0; i < keys2.length; i++) {
            const key2 = keys2[i]

            if (key2 === 'horn_behind_NO_EARS') continue
            if (key2 === 'horn_behind_AFTER_EARS') continue

            const global = getDefault.globals[key2]

            // If key does not exist
            if (isEmpty(global)) {
              delete value[key2]

              // If value does not exist
            } else if (isEmpty(value[key2])) {
              value[key2] = global
            }
          }

          const refKeys = Object.keys(getDefault.globals)

          for (let i = 0; i < refKeys.length; i++) {
            const key2 = refKeys[i]

            if (key2 === 'horn_behind_NO_EARS') continue
            if (key2 === 'horn_behind_AFTER_EARS') continue

            if (isEmpty(value[key2])) {
              value[key2] = global
            }
          }
        }

        if (key === 'color') {
          const keys2 = Object.keys(value)

          for (let i = 0; i < keys2.length; i++) {
            const key2 = keys2[i]

            const color = getDefault.color[key2]
            const val2 = value[key2]

            // If key does not exist
            if (isEmpty(color)) {
              delete value[key2]

              // If value does not exist
            } else if (isEmpty(val2)) {
              value[key2] = color
            } else if (isEmpty(val2.h) || isEmpty(val2.s) || isEmpty(val2.l)) {
              value[key2] = color
            }
          }

          const refKeys = Object.keys(getDefault.color)

          for (let i = 0; i < refKeys.length; i++) {
            const key2 = refKeys[i]
            const val2 = value[key2]
            const val3 = getDefault.color[key2]

            if (isEmpty(val2)) {
              value[key2] = val3
            } else if (isEmpty(val2.h) || isEmpty(val2.s) || isEmpty(val2.l)) {
              value[key2] = val3
            }
          }
        }
      }
    },

    getSave() {
      let avatars = localStorage.getItem('avatars')

      if (avatars && avatars.length) {
        avatars = JSON.parse(avatars)

        this.compability(avatars[this.slot])
        this.setAvatar(avatars[this.slot])

        return avatars
      } else {
        localStorage.setItem('avatars', JSON.stringify([this.getDefault]))

        return [this.getDefault]
      }
    },

    createSave() {
      const parsedData = JSON.parse(localStorage.getItem('avatars'))

      parsedData.push(this.getDefault)

      localStorage.setItem('avatars', JSON.stringify(parsedData))

      // Apply changes

      this.slot = parsedData.length - 1
      this.saves = this.getSave()
    },

    removeSave(slot) {
      const parsedData = JSON.parse(localStorage.getItem('avatars'))

      parsedData.splice(slot, 1)

      localStorage.setItem('avatars', JSON.stringify(parsedData))

      // Fix slot (index)

      if (slot === this.slot || slot === 0) this.slot = 0

      localStorage.setItem('slot', this.slot + '')

      // Apply changes

      this.saves = this.getSave()
    }
  }
}
</script>
