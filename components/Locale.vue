<template lang="pug">
  v-btn.right(
    icon
    tile
    :title="langTitle"
    :aria-label="langTitle"
    @click="changeLang"
  )
    v-icon(large :style="hideEnglish") $vuetify.icons.values.english
    v-icon(large :style="hideRussian") $vuetify.icons.values.russian
</template>

<script>
import { computed } from '@vue/composition-api'
export default {
  setup(_, { root: { $i18n } }) {
    const langTitle = computed(() => {
      return $i18n.locale === 'ru' ? 'English' : 'Русский'
    })

    const hideEnglish = computed(() => {
      return { display: $i18n.locale !== 'ru' ? 'none' : undefined }
    })

    const hideRussian = computed(() => {
      return { display: $i18n.locale === 'ru' ? 'none' : undefined }
    })

    function changeLang() {
      $i18n.setLocale($i18n.locale === 'ru' ? 'en' : 'ru')
    }

    return {
      langTitle,
      hideEnglish,
      hideRussian,
      changeLang
    }
  }
}
</script>

<style lang="sass">
button.right
  margin: -8px 72px -8px 0!important

.lang-icon svg
  width: 46px!important
</style>
