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
import { reactive, ref, onMounted, watch, computed } from '@vue/composition-api'

import { mdiKeyboardBackspace, mdiDelete } from '@mdi/js'

function Saves(getters, commit) {
  const saves = ref(null)
  const slot = ref(0)

  watch(
    () => slot.value,
    (value) => {
      if (!process.client) return

      const animations = JSON.parse(localStorage.getItem('animations'))

      if (animations && animations[value]) {
        commit('avatar/setFrames', animations[value])
        commit('avatar/setAnimationSavesSlot', value)

        localStorage.setItem('animationSlot', value + '')
      } else if (value !== 0) {
        slot.value = 0
      }
    }
  )

  const defaultFrames = computed(() => getters['avatar/getDefaultFrames'])

  function getSave() {
    if (!process.client) return

    let animations = localStorage.getItem('animations')

    if (animations && animations.length) {
      animations = JSON.parse(animations)

      commit('avatar/setFrames', animations[slot.value])

      return animations
    } else {
      const save = {
        name: 'Greetings!',
        frames: defaultFrames.value
      }

      localStorage.setItem('animations', JSON.stringify([save]))

      return [save]
    }
  }

  function getSlot() {
    if (!process.client) return

    const slotIn = +localStorage.getItem('animationSlot')

    if (slotIn) {
      return slotIn
    } else {
      localStorage.setItem('animationSlot', '0')

      return 0
    }
  }

  function createSave() {
    if (!process.client) return

    const parsedData = JSON.parse(localStorage.getItem('animations'))

    const save = {
      name: 'Greetings!',
      frames: defaultFrames.value
    }

    parsedData.push(save)

    localStorage.setItem('animations', JSON.stringify(parsedData))

    // Apply changes

    slot.value = parsedData.length - 1
    saves.value = getSave()
  }

  function removeSave(slotIn) {
    if (!process.client) return

    const parsedData = JSON.parse(localStorage.getItem('animations'))

    parsedData.splice(slotIn, 1)

    localStorage.setItem('animations', JSON.stringify(parsedData))

    // Fix slot (index)

    if (slotIn === slot.value || slotIn === 0) slot.value = 0

    localStorage.setItem('animationSlot', slot.value + '')

    // Apply changes

    saves.value = getSave()
  }

  onMounted(() => {
    slot.value = getSlot()
    saves.value = getSave()
  })

  const globals = reactive(() => getters['avatar/getGlobal'])

  if (process.client) {
    watch(
      () => (globals.value ? globals.value.name : ''),
      () => {
        if (saves.value) saves.value[slot.value].name = name
      }
    )
  }

  return {
    saves,
    slot,

    defaultFrames,
    globals,

    getSave,
    createSave,
    removeSave
  }
}

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { root: { $store } }) {
    const { getters, commit } = $store

    const icons = reactive({
      mdiKeyboardBackspace,
      mdiDelete
    })

    return {
      ...Saves(getters, commit),

      icons,

      setPage: (page) => commit('interface/setPage', page)
    }
  }
}
</script>
