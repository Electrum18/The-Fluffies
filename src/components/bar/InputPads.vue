<template lang="pug">
  div(style="position: relative")
    p.sm(v-if="name.length > 0") {{ name }}

    #sliderBox(
      v-press-hold="padMove"

      ref="pad"
    )
      svg(width="100%" height="100%" viewBox="0 -10 755 755" preserveAspectRatio="none")
        rect(x="0" y="0" rx="25" ry="25" width="755" height="755" :style="{ stroke: color }")

      slot

      #tapPoint(:style="pos")

    p.X      {{ yname }} #[span#number(:style="{ background: color }") {{ val.y }}]
    p.sm.num {{ xname }} #[span#number(:style="{ background: color }") {{ val.x }}]
</template>

<script lang="coffee">
  export default
    props: ["name", "color", "x", "y", "xname", "yname"]

    data: ->
      pos: {}

      parse:
        x: @x.match(/\w+/g)
        y: @y.match(/\w+/g)

      val:
        x: 0
        y: 0

    watch:
      "val.x": (val) ->
        @$root[@parse.x[0]][@parse.x[1]][@parse.x[2]] = val

      "val.y": (val) ->
        @$root[@parse.y[0]][@parse.y[1]][@parse.y[2]] = val

    methods:
      padMove: (event) ->
        BCR = @$refs.pad.getBoundingClientRect()

        X =     (event.pageX - BCR.left) / BCR.width
        Y = 1 - (event.pageY - BCR.top)  / BCR.height

        if (X < 0) then X = 0
        if (Y < 0) then Y = 0

        @val.x = Math.round X * 100
        @val.y = Math.round Y * 100

        @pos = transform: "translate(#{ -40 + X * 740 }%, #{ -740 * Y + 670 }%)"

    mounted: ->
      @val =
        x: @$root[@parse.x[0]][@parse.x[1]][@parse.x[2]]
        y: @$root[@parse.y[0]][@parse.y[1]][@parse.y[2]]

      valX = @val.x
      valY = @val.y

      @pos = transform: "translate(#{ valX * 6.5 }%, #{ -7.4 * valY + 670 }%)"
</script>
