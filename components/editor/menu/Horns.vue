<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.horn.title') }}
    v-expansion-panel-content
      BarSwitch(
        :text="$t('editor.enable')"
        val="horn_enable"
      )

      BarSwitch(
        :text="$t('editor.menu.horn.changeling')"
        val="horn_changeling"
        off="horn_enable"
      )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.horn.rear.title') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="horn_rear"
      )

      BarColor(
        :text="$t('editor.menu.horn.rear.set')"
        val="horn_rear_basic"
        :shade="4 / 5"
        off="horn_rear"
      )

      v-divider.my-4

      BarList(target="horn" off="horn_rear")
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
