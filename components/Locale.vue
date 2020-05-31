<template lang="pug">
  v-btn-toggle.right(
    v-model="current"
    mandatory
    dense
    color="lang"
  )
    v-btn(
      v-for="item in items"
      :key="item"
      small
    ) {{ item }}
</template>

<script>
import { ref, reactive, computed } from '@vue/composition-api'

export default {
  setup(_, { root: { $i18n } }) {
    const items = ref(['eng', 'rus'])

    const enumItems = reactive({ en: 0, ru: 1 })
    const getLang = reactive(['en', 'ru'])

    const current = computed({
      get: () => enumItems[$i18n.locale],
      set: (locale) => $i18n.setLocale(getLang[locale])
    })

    return {
      items,
      enumItems,
      getLang,
      current,

      opened: ref(false)
    }
  }
}
</script>

<style lang="sass">
.v-item-group.right
  margin-right: 72px
</style>
