<template lang="pug">
  div
    v-btn.d-none.d-sm-inline-flex(
      :disabled="disable"
      :dark="!disable"

      rounded
      :href="localePath('/')"
      :title="$t('editor.back')"
      :aria-label="$t('editor.back')"
    )
      v-icon(left) {{ icons.mdiChevronLeft }}
      | {{ $t('editor.back') }}

    v-btn.d-inline-flex.d-sm-none(
      :disabled="disable"
      :dark="!disable"

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
import { reactive } from '@vue/composition-api'

import { mdiChevronLeft } from '@mdi/js'

export default {
  props: {
    disable: {
      type: Boolean,
      default: false
    }
  },

  setup() {
    const icons = reactive({
      mdiChevronLeft
    })

    return {
      icons
    }
  }
}
</script>
