<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.pants.title') }}
    v-expansion-panel-content
      BarSwitch(
        :text="$t('editor.enable')"
        val="pants_enable"
      )

      BarColor(
        :text="$t('editor.menu.pants.color')"
        val="pants_basic"
        :shade="4 / 5"
        off="pants_enable"
      )

      v-divider.my-4

      BarList(target="pants" off="pants_enable")
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
