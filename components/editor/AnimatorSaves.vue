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

        v-card-actions
          v-spacer
          v-btn(
            outlined
            @click="createSave()"
            :disabled="savesLength >= maxLength"
            :title="$t('editor.saves.create')"
            :aria-label="$t('editor.saves.create')"
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
                :key="save.name + i"
                :disabled="i >= 10"
              )
                v-list-item-content
                  v-list-item-title {{ i + 1 }} • {{ save.name }}

                v-list-item-action.mx-n2.my-0
                  v-btn(
                    icon
                    v-if="saves.length > 1 && i < 10"
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
import { reactive, ref, onMounted, watch, computed } from '@vue/composition-api'

import { mdiKeyboardBackspace, mdiDelete, mdiPatreon } from '@mdi/js'

function Saves(getters, commit) {
  let animationSlot = 0

  if (process.client) animationSlot = localStorage.getItem('animationSlot')

  const saves = ref(null)
  const slot = ref(+animationSlot)

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
  const defaults = computed(() => getters['avatar/getDefault'])

  function getSave() {
    if (!process.client) return

    function compability(target, reference) {
      const object = {}
      const keys = Object.keys(reference)

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]

        if (target[key] === undefined) {
          object[key] = reference[key]
        } else {
          object[key] = target[key]
        }

        if (typeof object[key] === 'object') {
          object[key] = compability(object[key], reference[key])
        }
      }

      return object
    }

    let animations = localStorage.getItem('animations')

    if (animations && animations.length) {
      animations = JSON.parse(animations)

      for (let i = 0; i < animations.length; i++) {
        const animation = animations[i]

        for (let j = 0; j < animation.frames.length; j++) {
          const { frame } = animation.frames[j]

          const { angle, horiz, degress } = frame

          const defaults2 = {
            angle,
            horiz,
            degress,

            ...defaults.value.propers
          }

          animation.frames[j].frame = compability(frame, defaults2)
        }
      }

      localStorage.setItem('animations', JSON.stringify(animations))

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

  function getSlot(maxLength) {
    if (!process.client) return

    const slotIn = +localStorage.getItem('animationSlot')

    if (slotIn !== undefined && slotIn !== null && slotIn <= maxLength.value) {
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

  const maxLength = ref(10)
  const savesLength = computed(() => (saves.value ? saves.value.length : 0))

  onMounted(() => {
    slot.value = getSlot(maxLength)
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

    maxLength,
    savesLength,

    defaultFrames,
    defaults,
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { root: { $store } }) {
    const { getters, commit } = $store

    const icons = reactive({
      mdiKeyboardBackspace,
      mdiDelete,
      mdiPatreon
    })

    return {
      ...Saves(getters, commit),

      icons,

      setPage: (page) => commit('interface/setPage', page)
    }
  }
}
</script>
