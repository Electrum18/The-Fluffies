<template lang="pug">
  v-card(light :disabled="enable")
    v-container.pa-1
      v-item-group(v-model="selected" mandatory)
        v-row.ma-0.image-borders
          v-col.pa-1(
            v-for="(element, i) in list"
            :key="i"
            cols="6"
          )
            v-item(v-slot:default="{ active, toggle }")
              v-img.pa-0.grey.white--text.text-caption(
                :src="require('~/assets/img/' + target + '/' + i + '.png?webp')"
                aspect-ratio="1"
                @click="toggle"
                :style="[selectedBorder(active), disabled(listOf && !getCached(element))]"
              )
                v-icon.ma-1(v-if="getCached(element)" small) {{ icons.mdiContentSave }}
                p @{{ element.author }}
</template>

<script>
import Vue from 'vue'
import { computed, ref, watch, reactive } from '@vue/composition-api'

import { mdiContentSave } from '@mdi/js'

function checkCached(getters, isListOf) {
  let getterOf = ''

  if (isListOf === 'hairs') {
    getterOf = 'avatar/getHairsList'
  } else if (isListOf === 'tails') {
    getterOf = 'avatar/getTailsList'
  }

  const listOf = computed(() => {
    return isListOf !== undefined ? getters[getterOf] : []
  })

  function getCached({ name }) {
    return isListOf !== undefined ? listOf.value.includes(name.en) : false
  }

  return { listOf, getCached }
}

function listState(globals, target, commit) {
  const selected = ref(0)

  const preList = computed(() => globals.value[target + '_info'])
  const rootName = computed(() => globals.value[target + '_name_en'])

  const list = ref([])

  function setElementName(name) {
    const slot = +localStorage.getItem('slot')
    const save = JSON.parse(localStorage.getItem('avatars'))

    const { globals } = save[slot]

    commit('avatar/setGlobal', {
      path: target + '_name_en',
      value: name.en
    })

    commit('avatar/setGlobal', {
      path: target + '_name_ru',
      value: name.ru
    })

    globals[target + '_name_en'] = name.en
    globals[target + '_name_ru'] = name.ru

    localStorage.setItem('avatars', JSON.stringify(save))
  }

  watch(
    () => preList.value,
    (value) => {
      const indexes = Object.keys(value)

      for (let i = 0; i < indexes.length; i++) {
        Vue.set(list.value, i, value[indexes[i]])

        if (value[indexes[i]].name.en === rootName.value) selected.value = i
      }

      if (list.value.length < 1) list.value = value
    },
    { immediate: true }
  )

  watch(
    () => selected.value,
    (index) => setElementName(list.value[index].name)
  )

  return {
    selected,
    preList,
    list,
    rootName,
    setElementName
  }
}

export default {
  props: {
    target: {
      type: String,
      default: '',
      required: true
    },

    isListOf: {
      type: String,
      default: undefined
    },

    off: {
      type: String,
      default: undefined
    }
  },

  setup({ target, isListOf, off }, { root }) {
    const { $store, $i18n } = root
    const { getters, commit } = $store

    const icons = reactive({
      mdiContentSave
    })

    const globals = computed(() => getters['avatar/getGlobal'])

    function selectedBorder(active) {
      if (active) {
        return {
          border: '3px solid #fa0!important',
          margin: '-3px 0',
          'box-shadow': '0 0 4px 1px #fa0'
        }
      }
    }

    const offline = computed(() => root.isOffline)

    function disabled(isOffline) {
      if (offline.value && isOffline) {
        return {
          opacity: 0.5,
          'pointer-events': 'none'
        }
      }
    }

    return {
      ...listState(globals, target, commit),
      ...checkCached(getters, isListOf),

      icons,
      selectedBorder,
      disabled,

      enable: computed(() => (off ? !globals.value[off] : false)),
      offline,
      locLang: computed(() => $i18n.locale)
    }
  }
}
</script>

<style lang="sass">
.image-borders
  .v-image
    border-radius: 12px!important
    transition: margin 300ms ease, border 300ms ease, box-shadow 500ms ease
    cursor: pointer

    p
      margin: 0
      text-align: center
      background: #0006
      white-space: nowrap
      bottom: 0
      position: absolute
      width: 100%
</style>
