<template lang="pug">
  div(style="position: relative")
    p.sm(v-if="name.length > 0") {{ name }}

    #sliderBox(
      @mousedown="hold = true"
      @mousemove="padMove"
      @mouseup="hold = false"
      @mouseleave="hold = false"
      ref="pad"
    )
      svg(width="100%" height="100%" viewBox="0 -10 755 755" preserveAspectRatio="none")
        path(v-if="type === 2" :style="colorStroke"
          d="M301 765c-17 0-31-14-31-30V496c0-6-5-11-10-11H21c-17 0-31-14-31-30V21c0-17 14-31 31-31h714c16 0 30 14 30 31v714c0 16-14 30-30 30H301z")

        rect(v-else x="0" y="0" rx="25" ry="25" width="755" height="755" :style="colorStroke")

      slot

      #tapPoint(:style="pos")

    p.X      {{ yname }} #[span#number(:style="color") {{ val.y }}]
    p.sm.num {{ xname }} #[span#number(:style="color") {{ val.x }}]
</template>

<script lang="coffee">
  export default
    props: ["name", "color", "colorStroke", "x", "y", "xname", "yname", "type"]

    data: ->
      pos: {}
      hold: no

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
        if not @hold then return

        BCR = @$refs.pad.getBoundingClientRect()

        X =     (event.pageX - BCR.left) / BCR.width
        Y = 1 - (event.pageY - BCR.top)  / BCR.height

        if (X < 0) then X = 0
        if (Y < 0) then Y = 0

        if @type is 2
          if X < 0.35 and Y < 0.35
            if Y < X then X = 0.35 else Y = 0.35

          @val.x = 10 + Math.round X * 115
          @val.y = 5  + Math.round Y * 120

          @pos = transform: "translate(#{ (X * 770) - 50 }%, #{ 380 - 750 * Y }%)"

        else
          @val.x = Math.round X * 100
          @val.y = Math.round Y * 100

          @pos = transform: "translate(#{ X * 730 }%, #{ -740 * Y + 670 }%)"

    mounted: ->
      @val =
        x: @$root[@parse.x[0]][@parse.x[1]][@parse.x[2]]
        y: @$root[@parse.y[0]][@parse.y[1]][@parse.y[2]]

      valX = @val.x
      valY = @val.y

      if @type is 2
           @pos = transform: "translate(#{ (valX * 7.7) - 50 }%, #{ 380 - 7.5 * valY * 0.8 }%)"
      else @pos = transform: "translate(#{ valX * 7.2 }%, #{ -7.4 * valY + 670 }%)"
</script>
