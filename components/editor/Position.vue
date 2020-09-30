<template lang="pug">
  v-bottom-sheet(v-model="opened" inset hide-overlay)
    v-sheet.text-center(dark)
      v-container
        v-row
          v-col(cols="6" sm="6" md="3" lg="3" xl="3")
            v-slider(
              v-model="horiz"
              color="primary"
              hide-details
              min=-100
              max=100
              thumb-label
              :thumb-size="24"
              :label="$t('editor.position.horizontal')"
            )

          v-col(cols="6" sm="6" md="3" lg="3" xl="3")
            v-slider(
              v-model="verti"
              color="primary"
              hide-details
              min=-100
              max=100
              thumb-label
              :thumb-size="24"
              :label="$t('editor.position.vertical')"
            )

          v-col(cols="6" sm="6" md="3" lg="3" xl="3")
            v-slider(
              v-model="scale"
              color="primary"
              hide-details
              min=0.5
              max=2
              step=0.1
              thumb-label
              :thumb-size="24"
              :label="$t('editor.position.scale')"
            )

          v-col(cols="6" sm="6" md="3" lg="3" xl="3")
            v-slider(
              v-model="angle"
              color="primary"
              hide-details
              min=-180
              max=180
              thumb-label
              :thumb-size="24"
              :label="$t('editor.position.angle')"
            )
</template>

<script>
import { computed, reactive, toRefs } from '@vue/composition-api'

export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { root: { $store } }) {
    const { getters, commit } = $store

    const opened = computed({
      get: () => props.open,
      set: () => commit('interface/setPage', false)
    })

    const store = reactive({
      globals: computed(() => getters['avatar/getGlobal'])
    })

    const horiz = computed({
      get: () => getters['avatar/getPosHoriz'],
      set: (val) => {
        commit('avatar/setPosHoriz', val)
        commit('avatar/setProper', { path: 'position_horizontal', value: val })
      }
    })

    const verti = computed({
      get: () => getters['avatar/getPosVerti'],
      set: (val) => {
        commit('avatar/setPosVerti', val)
        commit('avatar/setProper', { path: 'position_vertical', value: val })
      }
    })

    const scale = computed({
      get: () => getters['avatar/getPosScale'],
      set: (val) => {
        commit('avatar/setPosScale', val)
        commit('avatar/setProper', { path: 'position_scale', value: val })
      }
    })

    const angle = computed({
      get: () => getters['avatar/getPosAngle'],
      set: (val) => {
        commit('avatar/setPosAngle', val)
        commit('avatar/setProper', { path: 'position_angle', value: val })
      }
    })

    return {
      ...toRefs(store),

      opened,

      horiz,
      verti,
      scale,
      angle
    }
  }
}
</script>
