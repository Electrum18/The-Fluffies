<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.clothing.title') }}
    v-expansion-panel-content
      BarColor(
        :text="$t('editor.menu.clothing.color')"
        val="clothing_basic"
        :shade="4 / 5"
      )

      v-divider.my-4

      BarList(target="clothing")

      v-divider.my-4

      BarSwitch(
        :text="$t('editor.menu.scarf.title')"
        val="scarf"
      )

      BarColor(
        :text="$t('editor.menu.scarf.color')"
        val="scarf_basic"
        :shade="4 / 5"
        off="scarf"
      )
</template>

<script>
import BarSwitch from '../BarSwitches'
import BarColor from '../BarColors'
import BarList from '../BarLists'

export default {
  components: {
    BarSwitch,
    BarColor,
    BarList
  }
}
</script>
