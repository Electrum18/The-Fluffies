<template lang="pug">
  v-card(outlined :disabled="enable").my-2
    v-row
      div.body-1.py-2(style="margin-left: 24px!important") {{ text }}
      v-spacer
      v-switch.mx-4.my-1(
        v-model="check"
        color="primary"
        hide-details
      )
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    text: {
      type: String,
      default: '',
      required: true
    },

    val: {
      type: String,
      default: '',
      required: true
    },

    off: {
      type: String,
      default: undefined
    },

    global: {
      type: [Boolean, undefined],
      default: undefined
    }
  },

  computed: {
    ...mapGetters('avatar', ['getGlobal']),

    enable() {
      return this.off ? !this.getGlobal[this.off] : false
    },

    check: {
      get() {
        return this.getGlobal[this.val]
      },

      set(setVal) {
        this.setGlobal({
          path: this.val,
          value: setVal
        })
      }
    }
  },

  methods: {
    ...mapMutations('avatar', ['setGlobal'])
  }
}
</script>
