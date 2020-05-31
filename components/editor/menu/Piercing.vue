<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.piercing.title') }}
    v-expansion-panel-content
      BarColor(
        :text="$t('editor.menu.piercing.color')"
        val="piercings_basic"
        :shade="4 / 5"
      )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.piercing.ears.left') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="piercings_left_enable"
      )

      v-btn-toggle(
        v-model="leftPiercings"
        dense
        mandatory
        color="primary"
      )
        v-btn(
          outlined
          :disabled="!globals.piercings_left_enable"
          :aria-label="$t('editor.one')"
        ) {{ $t('editor.one') }}

        v-btn(
          outlined
          :disabled="!globals.piercings_left_enable"
          :aria-label="$t('editor.two')"
        ) {{ $t('editor.two') }}

        v-btn(
          outlined
          :disabled="!globals.piercings_left_enable"
          :aria-label="$t('editor.three')"
        ) {{ $t('editor.three') }}

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.piercing.ears.right') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="piercings_right_enable"
      )

      v-btn-toggle(
        v-model="rightPiercings"
        dense
        mandatory
        color="primary"
      )
        v-btn(
          outlined
          :disabled="!globals.piercings_right_enable"
          :aria-label="$t('editor.one')"
        ) {{ $t('editor.one') }}

        v-btn(
          outlined
          :disabled="!globals.piercings_right_enable"
          :aria-label="$t('editor.two')"
        ) {{ $t('editor.two') }}

        v-btn(
          outlined
          :disabled="!globals.piercings_right_enable"
          :aria-label="$t('editor.three')"
        ) {{ $t('editor.three') }}

</template>

<script>
import { computed, watch, ref } from '@vue/composition-api'

import BarSwitch from '../BarSwitches'
import BarColor from '../BarColors'

function Left(globals, setPiercing) {
  const leftPiercings = ref(0)

  watch(
    () => leftPiercings.value,
    (value) => setPiercing(value, 'left')
  )

  watch(
    () => globals.value.piercings_left_enable,
    () => setPiercing(leftPiercings.value, 'left')
  )

  return { leftPiercings }
}

function Right(globals, setPiercing) {
  const rightPiercings = ref(0)

  watch(
    () => rightPiercings.value,
    (value) => setPiercing(value, 'right')
  )

  watch(
    () => globals.value.piercings_right_enable,
    () => setPiercing(rightPiercings.value, 'right')
  )

  return { rightPiercings }
}

export default {
  components: {
    BarSwitch,
    BarColor
  },

  setup(_, { root: { $store } }) {
    const globals = computed(() => $store.getters['avatar/getGlobal'])

    function setGlobals(side, upper, middle, lower) {
      $store.commit('avatar/setGlobal', {
        path: 'piercings_' + side + '_upper',
        value: upper
      })

      $store.commit('avatar/setGlobal', {
        path: 'piercings_' + side + '_middle',
        value: middle
      })

      $store.commit('avatar/setGlobal', {
        path: 'piercings_' + side + '_lower',
        value: lower
      })
    }

    function setPiercing(val, side) {
      if (globals.value['piercings_' + side + '_enable']) {
        if (val === 0) {
          setGlobals(side, false, false, true)
        } else if (val === 1) {
          setGlobals(side, false, true, true)
        } else if (val === 2) {
          setGlobals(side, true, true, true)
        }
      } else {
        setGlobals(side, false, false, false)
      }
    }

    return {
      ...Left(globals, setPiercing),
      ...Right(globals, setPiercing),

      globals,

      setGlobals,
      setPiercing
    }
  }
}
</script>
