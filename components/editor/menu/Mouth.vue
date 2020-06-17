<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.mouth.title') }}
    v-expansion-panel-content
      BarSwitch(
        :text="$t('editor.menu.mouth.fangs')"
        val="fangs"
      )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.emotion.teeth') }}

      BarSwitch(
        :text="$t('editor.menu.mouth.sharp')"
        val="sharp_teeth"
      )

      v-divider.my-4

      BarColor(
        :text="$t('editor.menu.mouth.mouth')"
        val="jaw_basic"
      )

      BarColor(
        :text="$t('editor.menu.mouth.tongue')"
        val="tongue_basic"
        :shade="9 / 10"
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
