<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.glasses.title') }}
    v-expansion-panel-content
      BarColor(
        :text="$t('editor.menu.glasses.color.lenses')"
        val="glasses_lenses"
      )

      BarColor(
        :text="$t('editor.menu.glasses.color.frame')"
        val="glasses_frame"
      )

      v-divider.my-4

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.glasses.width')"
          val="glasses_width"
          max=150
          min=50
        )

      v-divider.my-4

      BarList(target="glasses")
</template>

<script>
import BarSwitch from '../BarSwitches'
import BarSlider from '../BarSliders'
import BarColor from '../BarColors'
import BarList from '../BarLists'

export default {
  components: {
    BarSwitch,
    BarSlider,
    BarColor,
    BarList
  }
}
</script>
