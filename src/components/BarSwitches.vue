<template lang="pug">
  v-card(outlined :disabled="enable").my-2
    v-row
      div.body-1.py-2(style="margin-left: 24px!important") {{ text }}
      v-spacer
      v-switch.mx-4.my-1(:color="getColor" v-model="check" hide-details)
</template>

<script lang="coffee">
  import { getProp, setProp } from "../assets/js/nested.coffee"

  export default
    props:
      text: String
      val: String
      color: String
      off:
        type: [String, Boolean]
        default: off

    computed:
      getColor: ->
        if @color
          getProp @$root, @color

        else "#fa0"

      check:
        get:       -> getProp @$root, @val
        set: (val) -> setProp @$root, @val, val

      enable: ->
        if typeof @off is "boolean"
          return @off
        else
          return not getProp @$root, @off
</script>