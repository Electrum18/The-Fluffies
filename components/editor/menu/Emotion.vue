<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.emotion.title') }}
    v-expansion-panel-content
      .py-2

      p.subtitle-2 {{ $t('editor.menu.emotion.mouth') }}

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.emotion.open')"
          val="jaw_open"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.emotion.sad')"
          val="jaw_sad"
          max=100
          min=0
        )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.emotion.tongue') }}

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.emotion.raise')"
          val="tongue_raised"
          max=100
          min=0
        )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.emotion.teeth') }}

      v-card(outlined).my-2
        BarSlider(
          :text="$t('editor.menu.emotion.upper')"
          val="teeth_upper"
          max=100
          min=0
        )

        v-divider

        BarSlider(
          :text="$t('editor.menu.emotion.lower')"
          val="teeth_lower"
          max=100
          min=0
        )
</template>

<script>
import BarSlider from '../BarSliders'

export default {
  components: {
    BarSlider
  }
}
</script>
