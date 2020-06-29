<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.ears.title') }}
    v-expansion-panel-content
      BarSwitch.my-2(
        :text="$t('editor.menu.ears.tassels')"
        val="tassels"
      )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.ears.second.title') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="ear_second_color"
      )

      BarColor(
        :text="$t('editor.menu.ears.second.color')"
        val="ear_basic"
        :shade="4 / 5"
        off="ear_second_color"
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
