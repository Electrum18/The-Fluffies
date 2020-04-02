<template lang="pug">
  div
    v-btn.d-none.d-sm-inline-flex(
      dark
      rounded
      :href="localePath('/')"
      :title="$t('editor.back')"
      :aria-label="$t('editor.back')"
    )
      v-icon(left) {{ icons.mdiChevronLeft }}
      | {{ $t('editor.back') }}

    v-btn.d-inline-flex.d-sm-none(
      dark
      rounded
      fab
      small
      :href="localePath('/')"
      :title="$t('editor.back')"
      :aria-label="$t('editor.back')"
    )
      v-icon {{ icons.mdiChevronLeft }}
</template>

<script>
import { mdiChevronLeft } from '@mdi/js'

export default {
  data() {
    return {
      icons: {
        mdiChevronLeft
      }
    }
  }
}
</script>
