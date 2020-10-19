<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.clothing.title') }}
    v-expansion-panel-content
      BarSwitch(
        :text="$t('editor.enable')"
        val="clothing_enable"
      )

      BarColor(
        :text="$t('editor.menu.clothing.color')"
        val="clothing_basic"
        :shade="4 / 5"
        off="clothing_enable"
      )

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

      v-divider.my-4

      BarList(target="clothing" off="clothing_enable")
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
