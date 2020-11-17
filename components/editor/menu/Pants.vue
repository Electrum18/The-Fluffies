<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.pants.title') }}
    v-expansion-panel-content
      BarColor(
        :text="$t('editor.menu.pants.color')"
        val="pants_basic"
        :shade="4 / 5"
      )

      v-divider.my-4

      BarList(target="pants")
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
