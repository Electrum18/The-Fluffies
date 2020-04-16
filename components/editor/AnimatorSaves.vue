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
        v-card-title {{ $t('editor.saves.animatons') }}
          v-spacer
          v-btn.mx-n2(
            fab
            small
            @click="setPage('Animate')"
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
              v-list-item(:key="save.name + i")
                v-list-item-content
                  v-list-item-title {{ i }} • {{ save.name }}

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
import { mapGetters, mapMutations } from 'vuex'

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
    ...mapGetters('avatar', ['getDefaultFrames'])
  },

  watch: {
    slot(val) {
      const animations = JSON.parse(localStorage.getItem('animations'))

      if (animations[val]) {
        this.setFrames(animations[val])
        this.setAnimationSavesSlot(val)

        localStorage.setItem('animationSlot', val + '')
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
    ...mapMutations('avatar', ['setFrames', 'setAnimationSavesSlot']),
    ...mapMutations('interface', ['setPage']),

    isEmpty(val) {
      return val === undefined || val === null
    },

    getSlot() {
      const slot = +localStorage.getItem('animationSlot')

      if (slot) {
        return slot
      } else {
        localStorage.setItem('animationSlot', '0')

        return 0
      }
    },

    getSave() {
      let animations = localStorage.getItem('animations')

      if (animations && animations.length) {
        animations = JSON.parse(animations)

        this.setFrames(animations[this.slot])

        return animations
      } else {
        const save = {
          name: 'Greetings!',
          frames: this.getDefaultFrames
        }

        localStorage.setItem('animations', JSON.stringify([save]))

        return [save]
      }
    },

    createSave() {
      const parsedData = JSON.parse(localStorage.getItem('animations'))

      const save = {
        name: 'Greetings!',
        frames: this.getDefaultFrames
      }

      parsedData.push(save)

      localStorage.setItem('animations', JSON.stringify(parsedData))

      // Apply changes

      this.slot = parsedData.length - 1
      this.saves = this.getSave()
    },

    removeSave(slot) {
      const parsedData = JSON.parse(localStorage.getItem('animations'))

      parsedData.splice(slot, 1)

      localStorage.setItem('animations', JSON.stringify(parsedData))

      // Fix slot (index)

      if (slot === this.slot || slot === 0) this.slot = 0

      localStorage.setItem('animationSlot', this.slot + '')

      // Apply changes

      this.saves = this.getSave()
    }
  }
}
</script>
