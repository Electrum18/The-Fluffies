<template lang="pug">
  v-navigation-drawer(
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

        v-card-title.py-1.subtitle-2 {{ $t('editor.saves.limit') }}
          v-spacer
          span {{ savesLength }} {{ $t('editor.saves.of') }} {{ maxLength }}

        v-row(justify="center")
          v-btn.mx-3.my-1(
            small
            outlined
            disabled
            color="blue-grey lighten-4"
            :title="$t('editor.saves.patreon.basic')"
            :aria-label="$t('editor.saves.patreon.basic')"
          ) + 15
            v-icon(right) {{ icons.mdiPatreon }}

          v-btn.mx-3.my-1(
            small
            outlined
            disabled
            color="yellow accent-4"
            :title="$t('editor.saves.patreon.huge')"
            :aria-label="$t('editor.saves.patreon.huge')"
          ) + 35
            v-icon(right) {{ icons.mdiPatreon }}

        v-divider

        v-card-title.py-1.subtitle-2 {{ $t('editor.saves.create') }}

        v-row(justify="center")
          v-btn.my-1(
            small
            text
            color="primary"
            @click="createSave(0)"
            :disabled="savesLength >= maxLength"
            :title="$t('editor.saves.pony')"
            :aria-label="$t('editor.saves.pony')"
          ) {{ $t('editor.saves.pony') }}

          v-btn.my-1(
            small
            text
            color="primary"
            @click="createSave(1)"
            :disabled="savesLength >= maxLength"
            :title="$t('editor.saves.zebra')"
            :aria-label="$t('editor.saves.zebra')"
          ) {{ $t('editor.saves.zebra') }}

          v-btn.my-1(
            small
            text
            color="primary"
            @click="createSave(2)"
            :disabled="savesLength >= maxLength"
            :title="$t('editor.saves.deer')"
            :aria-label="$t('editor.saves.deer')"
          ) {{ $t('editor.saves.deer') }}

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
                :disabled="i >= 10"
              )
                v-list-item-content
                  v-list-item-title {{ i + 1 }} • {{ save.globals.name }}

                v-list-item-action.mx-n2.my-0
                  v-btn(
                    v-if="saves.length > 1 && i < 10"
                    icon
                    @click="removeSave(i)"
                    :title="$t('editor.saves.delete')"
                    :aria-label="$t('editor.saves.delete')"
                  )
                    v-icon {{ icons.mdiDelete }}

              v-divider.light(
                v-if="i + 1 < saves.length"
                :key="i"
              )
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'

import { mdiKeyboardBackspace, mdiDelete, mdiPatreon } from '@mdi/js'

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

      defaultIndex: 0,

      maxLength: 10,

      icons: {
        mdiKeyboardBackspace,
        mdiDelete,
        mdiPatreon
      }
    }
  },

  computed: {
    ...mapGetters('avatar', ['getGlobal', 'getDefault']),

    savesLength() {
      return this.saves !== null ? this.saves.length : 0
    }
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

      if (slot && slot <= this.maxLength) {
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

        const defaultObj = JSON.parse(JSON.stringify(getDefault))

        defaultObj.globals = defaultObj.globals[this.defaultIndex]
        defaultObj.color = defaultObj.color[this.defaultIndex]

        const valueRef = defaultObj[key]

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

            const global = defaultObj.globals[key2]

            // If key does not exist
            if (isEmpty(global)) {
              delete value[key2]

              // If value does not exist
            } else if (isEmpty(value[key2])) {
              value[key2] = global
            }
          }

          const refKeys = Object.keys(defaultObj.globals)

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

            const color = defaultObj.color[key2]
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

          const refKeys = Object.keys(defaultObj.color)

          for (let i = 0; i < refKeys.length; i++) {
            const key2 = refKeys[i]
            const val2 = value[key2]
            const val3 = defaultObj.color[key2]

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

        // this.compability(avatars[this.slot])
        this.setAvatar(avatars[this.slot])

        return avatars
      } else {
        const { frame, globals, color } = this.getDefault

        const save = { frame, globals: globals[this.defaultIndex], color: color[this.defaultIndex] }

        localStorage.setItem('avatars', JSON.stringify([save]))

        this.setAvatar(save)

        return [save]
      }
    },

    createSave(index) {
      const parsedData = JSON.parse(localStorage.getItem('avatars'))

      const { frame, globals, color } = this.getDefault

      const save = { frame, globals: globals[index], color: color[index] }

      parsedData.push(save)

      localStorage.setItem('avatars', JSON.stringify(parsedData))

      // Apply changes

      this.defaultIndex = index
      this.slot = parsedData.length - 1
      this.saves = this.getSave()
    },

    removeSave(slot) {
      const parsedData = JSON.parse(localStorage.getItem('avatars'))

      parsedData.splice(slot, 1)

      localStorage.setItem('avatars', JSON.stringify(parsedData))

      // Fix slot (index)

      this.slot = 0

      localStorage.setItem('slot', this.slot + '')

      // Apply changes

      this.saves = this.getSave()
    }
  }
}
</script>
