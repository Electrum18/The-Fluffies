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

      p.subtitlle-2 {{ $t('editor.menu.piercing.ears') }}

      BarList(target="piercing_ears")
</template>

<script>
import BarColor from '../BarColors'
import BarList from '../BarLists'

export default {
  components: {
    BarColor,
    BarList
  }
}
</script>
