<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.glasses.title') }}
    v-expansion-panel-content
      BarSwitch(
        :text="$t('editor.enable')"
        val="glasses_enable"
      )

      v-divider.my-4

      BarColor(
        :text="$t('editor.menu.glasses.color.lenses')"
        val="glasses_lenses"
        off="glasses_enable"
      )

      BarColor(
        :text="$t('editor.menu.glasses.color.frame')"
        val="glasses_frame"
        off="glasses_enable"
      )

      v-divider.my-4

      v-card(outlined :disabled="!getProper.glasses_enable").my-2
        BarSlider(
          :text="$t('editor.menu.glasses.width')"
          val="glasses_width"
          max=150
          min=50
        )

      v-divider.my-4

      BarList(target="glasses" off="glasses_enable")
</template>

<script>
import { mapGetters } from 'vuex'

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
  },

  computed: {
    ...mapGetters('avatar', ['getProper'])
  }
}
</script>
