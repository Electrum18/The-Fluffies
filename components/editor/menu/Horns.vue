<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.horn.title') }}
    v-expansion-panel-content

      p.subtitle-2.mt-4 {{ $t('editor.menu.horn.second.title') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="horn_second_color"
      )

      BarColor(
        :text="$t('editor.menu.horn.second.color')"
        val="horn_basic"
        :shade="4 / 5"
        off="horn_second_color"
      )

      v-divider.my-4

      BarList(target="horn_front")

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.horn.rear.title') }}

      BarColor(
        :text="$t('editor.menu.horn.rear.set')"
        val="horn_rear_basic"
        :shade="4 / 5"
      )

      v-divider.my-4

      BarList(target="horn")
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
