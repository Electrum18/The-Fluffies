<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.fur.title') }}
    v-expansion-panel-content
      BarColor(
        :text="$t('editor.menu.fur.color')"
        val="fur_basic"
        :shade="3 / 4"
      )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.fur.stripes.title') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="stripes_enable"
      )

      BarColor(
        :text="$t('editor.menu.fur.stripes.color')"
        val="stripes_basic"
        off="stripes_enable"
      )
</template>

<script>
import BarSwitch from '../BarSwitches'
import BarColor from '../BarColors'

export default {
  components: {
    BarSwitch,
    BarColor
  }
}
</script>
