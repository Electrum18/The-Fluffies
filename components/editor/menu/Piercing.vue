<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.piercing.title') }}
    v-expansion-panel-content
      BarColor(
        :text="$t('editor.menu.piercing.color')"
        val="piercings_basic"
        :shade="4 / 5"
      )

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.piercing.ears.left') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="piercings_left_enable"
      )

      v-btn-toggle(
        v-model="leftPiercings"
        dense
        mandatory
        color="primary"
      )
        v-btn(
          outlined
          :disabled="!getProper.piercings_left_enable"
          :aria-label="$t('editor.one')"
        ) {{ $t('editor.one') }}

        v-btn(
          outlined
          :disabled="!getProper.piercings_left_enable"
          :aria-label="$t('editor.two')"
        ) {{ $t('editor.two') }}

        v-btn(
          outlined
          :disabled="!getProper.piercings_left_enable"
          :aria-label="$t('editor.three')"
        ) {{ $t('editor.three') }}

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.piercing.ears.right') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="piercings_right_enable"
      )

      v-btn-toggle(
        v-model="rightPiercings"
        dense
        mandatory
        color="primary"
      )
        v-btn(
          outlined
          :disabled="!getProper.piercings_right_enable"
          :aria-label="$t('editor.one')"
        ) {{ $t('editor.one') }}

        v-btn(
          outlined
          :disabled="!getProper.piercings_right_enable"
          :aria-label="$t('editor.two')"
        ) {{ $t('editor.two') }}

        v-btn(
          outlined
          :disabled="!getProper.piercings_right_enable"
          :aria-label="$t('editor.three')"
        ) {{ $t('editor.three') }}

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

import BarSwitch from '../BarSwitches'
import BarColor from '../BarColors'

export default {
  components: {
    BarSwitch,
    BarColor
  },

  data() {
    return {
      leftPiercings: 0,
      rightPiercings: 0
    }
  },

  computed: {
    ...mapGetters('avatar', ['getProper'])
  },

  watch: {
    leftPiercings(val) {
      this.setPiercing(val, 'left')
    },

    rightPiercings(val) {
      this.setPiercing(val, 'right')
    },

    'getProper.piercings_left_enable'(val) {
      this.setPiercing(this.leftPiercings, 'left')
    },

    'getProper.piercings_right_enable'(val) {
      this.setPiercing(this.rightPiercings, 'right')
    }
  },

  methods: {
    ...mapMutations('avatar', ['setProper']),

    setPropers(side, upper, middle, lower) {
      this.setProper({
        path: 'piercings_' + side + '_upper',
        value: upper
      })

      this.setProper({
        path: 'piercings_' + side + '_middle',
        value: middle
      })

      this.setProper({
        path: 'piercings_' + side + '_lower',
        value: lower
      })
    },

    setPiercing(val, side) {
      if (this.getProper['piercings_' + side + '_enable']) {
        if (val === 0) {
          this.setPropers(side, false, false, true)
        } else if (val === 1) {
          this.setPropers(side, false, true, true)
        } else if (val === 2) {
          this.setPropers(side, true, true, true)
        }
      } else {
        this.setPropers(side, false, false, false)
      }
    }
  }
}
</script>
