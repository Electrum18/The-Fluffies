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
    }
  },

  computed: {
    ...mapGetters('avatar', ['getProper']),

    value: {
      get() {
        return this.getProper[this.val]
      },

      set(setVal) {
        this.setProper({
          path: this.val,
          value: setVal
        })

        // Compare part

        if (this.compare) {
          const getted = this.getProper[this.compare]

          if (100 - getted <= setVal) {
            this.setProper({
              path: this.compare,
              value: 100 - setVal
            })
          }
        }
      }
    }
  },

  methods: {
    ...mapMutations('avatar', ['setProper'])
  }
}
</script>

<style lang="sass">
.value
  user-select: none
  border-radius: 4px
</style>
