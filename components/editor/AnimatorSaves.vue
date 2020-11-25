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

        v-file-input.px-2.my-3(
          dense
          accept=".json"
          hide-details
          @change="uploadSave"
          :disabled="savesLength >= maxLength"
          :prepend-icon="icons.mdiUpload"
          :label="$t('editor.saves.upload')"
        )

        v-divider

        v-card-title.py-1.subtitle-2 {{ $t('editor.saves.limit') }}
          v-spacer
          span {{ savesLength }} {{ $t('editor.saves.of') }}
          span.px-1.py-0.mx-1.rounded(
            :style="underBadgeColor(level)"
          ) {{ maxLength }}

        v-row(justify="center")
          v-btn.mx-3.my-1(
            v-if="patronage !== 'Basic supporter' && patronage !== 'Huge supporter'"
            small
            outlined
            color="blue-grey lighten-4"
            href="https://www.patreon.com/join/the_fluffies/checkout?rid=3797254"
            :title="$t('editor.saves.patreon.basic')"
            :aria-label="$t('editor.saves.patreon.basic')"
          ) + 15
            v-icon(right) {{ icons.mdiPatreon }}

          v-btn.mx-3.my-1(
            v-if="patronage !== 'Huge supporter'"
            small
            outlined
            color="yellow accent-4"
            href="https://www.patreon.com/join/the_fluffies/checkout?rid=3797257"
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
                :disabled="i >= maxLength"
              )
                v-list-item-content
                  v-list-item-title {{ i + 1 }} • {{ save.name }}

                v-list-item-action.mx-n2.my-0
                  v-row
                    v-btn(
                      icon
                      :href="encodeSave(save)"
                      :download="save.name + '.json'"
                      :title="$t('editor.saves.download')"
                      :aria-label="$t('editor.saves.download')"
                    )
                      v-icon {{ icons.mdiDownload }}

                    v-btn.mr-2(
                      v-if="saves.length > 1 && i < maxLength"
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
import { reactive, ref, onMounted, watch, computed } from '@vue/composition-api'

import axios from 'axios'
import jwt from 'jwt-simple'

import { mdiKeyboardBackspace, mdiDelete, mdiPatreon, mdiDownload, mdiUpload } from '@mdi/js'

import secret from '~/assets/json/configs/secret.json'

function Saves(props, getters, commit) {
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

          const {
            angle,
            horiz,
            degress,
            position_horizontal: posHoriz,
            position_vertical: posVerti,
            position_scale: posScale,
            position_angle: posAngle
          } = frame

          const defaults2 = {
            angle,
            horiz,
            degress,

            position_horizontal: posHoriz,
            position_vertical: posVerti,
            position_scale: posScale,
            position_angle: posAngle,

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
        name: 'Reared up',
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
      name: 'Reared up',
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

  function uploadSave(file) {
    if (!process.client) return

    if (file) {
      const reader = new FileReader()

      reader.onload = () => {
        const parsedData = JSON.parse(localStorage.getItem('animations'))

        parsedData.push(JSON.parse(reader.result))

        localStorage.setItem('animations', JSON.stringify(parsedData))

        // Apply changes

        slot.value = parsedData.length - 1
        saves.value = getSave()
      }

      reader.readAsText(file)
    }
  }

  const level = ref(0)
  const patronage = ref(undefined)

  const maxLength = computed(() => {
    if (patronage.value === 'Basic supporter') {
      return 4 + level.value * 3
    } else if (patronage.value === 'Huge supporter') {
      return 8 + level.value * 6
    } else {
      return 3 + level.value
    }
  })

  const savesLength = computed(() => (saves.value ? saves.value.length : 0))

  onMounted(() => {
    slot.value = getSlot(maxLength)
    saves.value = getSave()

    function visibilityChange() {
      if (!document.hidden && props.open) cloudLimits()
    }

    if (process.browser) {
      document.addEventListener('visibilitychange', visibilityChange, false)
    }
  })

  const globals = reactive(() => getters['avatar/getGlobal'])

  const url = computed(() => {
    if (process.browser) {
      if (window.location.hostname === 'localhost') {
        return 'http://localhost:5001'
      } else {
        return 'https://the-fluffies.net'
      }
    } else {
      return null
    }
  })

  if (process.client) {
    watch(
      () => (globals.value ? globals.value.name : ''),
      () => {
        if (saves.value) saves.value[slot.value].name = name
      }
    )
  }

  function cloudLimits() {
    if (!props.open) return

    axios
      .get(url.value + '/user/saves/limits', { withCredentials: true })
      .then(({ data }) => {
        if (data.error) return

        const decoded = jwt.decode(data, secret.jwt || '')

        level.value = decoded.level
        patronage.value = decoded.patron
      })
      .catch(() => {})
  }

  function underBadgeColor(level) {
    if (level < 3) {
      return { background: '#9E9E9E' }
    } else if (level >= 3 && level < 5) {
      return { background: '#00BCD4' }
    } else if (level >= 5 && level < 7) {
      return { background: '#3F51B5' }
    } else if (level >= 7) {
      return { background: '#9C27B0' }
    }
  }

  watch(
    () => props.open,
    () => cloudLimits()
  )

  return {
    saves,
    slot,

    level,
    patronage,

    maxLength,
    savesLength,

    defaultFrames,
    defaults,
    globals,

    getSave,
    createSave,
    removeSave,
    uploadSave,

    cloudLimits,
    underBadgeColor,
    url
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
      mdiDelete,
      mdiPatreon,
      mdiDownload,
      mdiUpload
    })

    function encodeSave(object) {
      return 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(object))
    }

    return {
      ...Saves(props, getters, commit),

      icons,
      encodeSave,

      setPage: (page) => commit('interface/setPage', page)
    }
  }
}
</script>
