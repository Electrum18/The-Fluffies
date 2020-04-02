<template lang="pug">
  v-select.lang-bar-size(
    v-model="current"
    :items="items"
    width=100
    solo
    :label="'Change language'"
  )
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'

export default {
  setup(props, { root: { $i18n } }) {
    const opened = ref(false)

    const items = ref(['eng', 'rus'])

    const enumItems = reactive({ en: 0, ru: 1 })
    const getLang = reactive({ eng: 'en', rus: 'ru' })

    const current = computed({
      get: () => items.value[enumItems[$i18n.locale]],
      set: (locale) => $i18n.setLocale(getLang[locale])
    })

    return {
      opened,
      items,
      enumItems,
      getLang,
      current
    }
  }
}
</script>

<style lang="sass">
.lang-bar-size.v-input
  max-width: 80px!important

  .v-input__icon
    min-width: 11px!important
    width: 11px!important
</style>
