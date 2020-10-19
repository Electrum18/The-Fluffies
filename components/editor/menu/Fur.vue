<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.fur.title') }}
    v-expansion-panel-content
      BarColor(
        :text="$t('editor.menu.fur.color')"
        val="fur_basic"
        :shade="3 / 4"
      )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.fur.stripes.title') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="stripes_enable"
      )

      BarColor(
        :text="$t('editor.menu.fur.stripes.color')"
        val="stripes_basic"
        off="stripes_enable"
      )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.fur.fluff.title') }}

      BarSwitch(
        :text="$t('editor.menu.fur.fluff.cheeks')"
        val="fluff_cheeks"
      )

      BarSwitch(
        :text="$t('editor.menu.fur.fluff.ears')"
        val="fluff_ears"
      )

      BarSwitch(
        :text="$t('editor.menu.fur.fluff.chest')"
        val="fluff_chest"
      )

      BarSwitch(
        :text="$t('editor.menu.fur.fluff.neck')"
        val="fluff_neck"
      )

      BarSwitch(
        :text="$t('editor.menu.fur.fluff.paws')"
        val="fluff_hooves"
      )

      BarColor(
        :text="$t('editor.menu.fur.fluff.color')"
        val="fluff_basic"
        :shade="4/5"
      )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.fur.second.title') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="fur_second_color"
      )

      BarColor(
        :text="$t('editor.menu.fur.second.color')"
        val="fur_second_basic"
        :shade="3/4"
        off="fur_second_color"
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
