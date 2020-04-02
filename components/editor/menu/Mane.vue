<template lang="pug">
  v-expansion-panel
    v-expansion-panel-header.title {{ $t('editor.menu.mane.title') }}
    v-expansion-panel-content
      BarColor(
        :text="$t('editor.menu.mane.color')"
        val="hair_basic"
        :shade="3 / 4"
      )

      v-divider.my-4

      v-card(outlined)
        v-card(light)
          v-card-title.body-1.font-weight-bold {{ getProper['hair_name_' + $i18n.locale] }}

        v-divider

        v-card-actions
          v-spacer
          v-btn.btn-max.text-truncate(
            @click="openManes()"
            :aria-label="$t('editor.menu.mane.change')"
          ) {{ $t('editor.menu.mane.change') }}
          v-spacer

      v-divider.my-4

      p.subtitle-2 {{ $t('editor.menu.mane.second.title') }}

      BarSwitch(
        :text="$t('editor.enable')"
        val="hair_second"
      )

      BarColor(
        :text="$t('editor.menu.mane.second.color')"
        val="hair_second"
        off="hair_second"
      )
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

  computed: {
    ...mapGetters('avatar', ['getProper'])
  },

  methods: {
    ...mapMutations('interface', ['setPage']),

    openManes() {
      this.setPage('Hairs')
    }
  }
}
</script>
