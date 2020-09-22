<template lang="pug">
  v-card(light :disabled="enable")
    v-list(two-line)
      v-list-item-group(
        v-model="selected"
        mandatory
        active-class="primary--text"
      )
        template(v-for="(element, i) in list")
          v-list-item(
            @click="setElementName(element.name)"
            :key="element.name[locLang] + i"
            :disabled="listOf && offline && !getCached(element)"
          )
            v-list-item-content(:style="style(element)")
              v-list-item-title {{ element.name[locLang] }}
              v-list-item-subtitle {{ locale.by[locLang] }} {{ element.author }}
                v-icon.mx-2(
                  v-if="getCached(element)"
                  color="green"
                  small
                ) {{ icons.mdiCloudCheck }}

              v-list-item-action(v-if="element.warning").mx-0.my-1
                v-chip(
                  small
                  outlined
                  label
                  color="yellow darken-2"
                ) {{ element.warning[locLang] }}

          v-divider.border--light(
            v-if="i < list.length - 1"
            :key="i"
          )
</template>

<script>
import Vue from 'vue'
import { computed, ref, watch, reactive } from '@vue/composition-api'

import { mdiCloudCheck } from '@mdi/js'

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

function listState(globals, target, isListOf) {
  const selected = ref(0)

  const preList = computed(() => globals.value[target + '_info'])
  const rootName = computed(() => globals.value[target + '_name_en'])

  const list = ref([])

  function setIndex(listInput) {
    for (let i = 0; i < listInput.length; i++) {
      if (listInput[i].name.en === rootName.value) selected.value = i
    }
  }

  watch(
    () => preList.value,
    (value) => {
      if (isListOf !== undefined) setIndex(value)

      for (let i = 0; i < preList.value.length; i++) {
        Vue.set(list.value, i, preList.value[i])
      }

      if (list.value.length < 1) list.value = preList.value
    },
    { immediate: true }
  )

  return {
    selected,
    preList,
    list,
    rootName,
    setIndex
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
      mdiCloudCheck
    })

    const locale = reactive({
      by: {
        en: 'author: ',
        ru: 'автор: '
      }
    })

    function style({ warning }) {
      return { 'padding-bottom': warning ? '4px' : '12px' }
    }

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

    const globals = computed(() => getters['avatar/getGlobal'])

    return {
      ...listState(globals, target, isListOf),
      ...checkCached(getters, isListOf),

      locale,
      icons,
      style,
      setElementName,

      enable: computed(() => (off ? !globals.value[off] : false)),
      offline: computed(() => root.isOffline),
      locLang: computed(() => $i18n.locale)
    }
  }
}
</script>

<style lang="sass">
hr.border--light
  border-color: rgba(0, 0, 0, 0.12)!important
</style>
