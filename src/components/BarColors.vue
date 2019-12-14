<template lang="pug">
  v-card(outlined :disabled="enable").my-2
    v-row
      div.body-2.mx-6.py-2 {{ title }}
      v-spacer
      v-menu(:close-on-content-click="false")
        template(v-slot:activator="{ on }")
          v-btn.mx-3.px-0(
            :color="value"
            v-on="on"
            style="min-width: 42px"
            aria-label="Open color picker"
          )
            v-icon(:color="darker") mdi-palette

        v-color-picker(v-model="value")
</template>

<script lang="coffee">
  import { getProp, setProp } from "../assets/js/nested.coffee"

  export default
    props:
      text: String
      val: String
      shade: Number
      off:
        type: [String, Boolean]
        default: off

    computed:
      enable: ->
        if typeof @off is "boolean"
          return @off
        else
          return not getProp @$root, @off

      title: ->
        if @$root.locale is "ru"
          return "цвет " + @text
        else
          return @text + " color"

      value:
        get: -> getProp @$root, @val
        set: (setVal) ->
          setProp @$root, @val, setVal

          if @shade
            val = @value

            R = Math.round(parseInt(val[1] + val[2], 16) * @shade).toString 16
            G = Math.round(parseInt(val[3] + val[4], 16) * @shade).toString 16
            B = Math.round(parseInt(val[5] + val[6], 16) * @shade).toString 16

            if R.length < 2 then R = "0" + R
            if G.length < 2 then G = "0" + G
            if B.length < 2 then B = "0" + B

            setProp @$root, @val.replace("Basic", "Shade"), "#" + R + G + B

      darker: ->
        val = @value

        R = parseInt(val[1] + val[2], 16)
        G = parseInt(val[3] + val[4], 16)
        B = parseInt(val[5] + val[6], 16)

        max = Math.max R, G, B
        min = Math.min R, G, B
        l = (max + min) / 2

        if l / 255 > 2 / 3
          return "black"
        else
          return "white"
</script>