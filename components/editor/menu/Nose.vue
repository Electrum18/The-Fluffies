<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.nose.title') }}
    v-expansion-panel-content
      BarSwitch(
        :text="$t('editor.menu.nose.canine.title')"
        val="canine_nose_enable"
      )

      BarColor(
        :text="$t('editor.menu.nose.canine.color')"
        :shade="2 / 3"
        val="canine_nose_basic"
        off="canine_nose_enable"
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
