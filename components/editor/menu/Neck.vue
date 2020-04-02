<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.neck.title') }}
    v-expansion-panel-content
      BarSwitch(
        :text="$t('editor.menu.neck.collar.enable')"
        val="collar_enable"
      )

      BarColor(
        :text="$t('editor.menu.neck.collar.color')"
        :shade="3 / 5"
        val="collar_basic"
        off="collar_enable"
      )

      v-divider.my-4

      BarSwitch(
        :text="$t('editor.menu.neck.bowtie.enable')"
        val="bowtie_enable"
      )

      BarColor(
        :text="$t('editor.menu.neck.bowtie.color')"
        :shade="5 / 6"
        val="bowtie_basic"
        off="bowtie_enable"
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
