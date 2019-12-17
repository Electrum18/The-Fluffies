<template lang="pug">
  v-col
    v-row
      div.body-2.px-3 {{ text }}
      v-spacer
      div.body-2.mx-2.px-1.value(
        style="user-select: none"
        :style="{ background: getColor.slice(0, 7) }"
      ) {{ value }}

    v-slider.inputs2(
      v-model="value"
      style="margin: 0"
      hide-details=true
      :color="getColor.slice(0, 7)"
      :max="max"
      :min="min"
    )
</template>

<script lang="coffee">
  import { getProp, setProp } from "../assets/js/nested.coffee"

  export default
    props:
      text: String
      max: String
      min: String
      val: String
      color: String
      compare:
        type: [String, Boolean]
        default: off

    computed:
      getColor: ->
        if @color
          getProp @$root, @color

        else "#fa0"

      value:
        get:       -> getProp @$root, @val
        set: (val) ->
          setProp @$root, @val, val

          if typeof @compare is "boolean"
            return @compare
          else
            if 100 - getProp(@$root, @compare) <= val
              setProp @$root, @compare, 100 - val
</script>

<style lang="sass">
  .value
    background: #fa0
    border-radius: 4px
</style>