<template lang="pug">
  v-col
    v-row
      div.body-2.px-3 {{ text }}
      v-spacer
      div.body-2.mx-2.px-1.value.primary {{ value }}

    v-slider.inputs2.ma-0(
      v-model="value"
      color="primary"
      hide-details=true
      :max="max"
      :min="min"
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

    min: {
      type: String,
      default: '0'
    },

    max: {
      type: String,
      default: '100'
    },

    compare: {
      type: String,
      default: undefined
    },

    global: {
      type: [Boolean, undefined],
      default: undefined
    }
  },

  computed: {
    ...mapGetters('avatar', ['getProper', 'getGlobal']),

    getting() {
      return this.global ? this.getGlobal : this.getProper
    },

    value: {
      get() {
        return this.getting[this.val]
      },

      set(setVal) {
        this.setting({
          path: this.val,
          value: setVal
        })

        this.setPlayChangedFrame()

        // Compare part

        if (this.compare) {
          const getted = this.getProper[this.compare]

          if (100 - getted <= setVal) {
            this.setting({
              path: this.compare,
              value: 100 - setVal
            })
          }
        }
      }
    }
  },

  methods: {
    ...mapMutations('avatar', ['setProper', 'setGlobal']),
    ...mapMutations('interface', ['setPlayChangedFrame']),

    setting(commit) {
      this.global ? this.setGlobal(commit) : this.setProper(commit)
    }
  }
}
</script>

<style lang="sass">
.value
  user-select: none
  border-radius: 4px
</style>
