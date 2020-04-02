<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.ears.title') }}
    v-expansion-panel-content
      BarSwitch.my-2(
        :text="$t('editor.menu.ears.tassels')"
        val="tassels"
      )
</template>

<script>
import BarSwitch from '../BarSwitches'

export default {
  components: {
    BarSwitch
  }
}
</script>
