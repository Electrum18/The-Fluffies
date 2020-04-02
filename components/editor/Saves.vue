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
                :key="save.propers.name + i"
              )
                v-list-item-content
                  v-list-item-title {{ i }} • {{ save.propers.name }}

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
    ...mapGetters('avatar', ['getProper', 'getDefault'])
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

    'getProper.name'(name) {
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

    getSlot() {
      const slot = +localStorage.getItem('slot')

      if (slot) {
        return slot
      } else {
        localStorage.setItem('slot', '0')

        return 0
      }
    },

    getSave() {
      let avatars = localStorage.getItem('avatars')

      if (avatars && avatars.length) {
        avatars = JSON.parse(avatars)

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
