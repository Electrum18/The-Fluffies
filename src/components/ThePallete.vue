<template lang="pug">
  #color_pallete(:style="opened ? open : close")
    p color picker

    svg#close(viewBox="0 0 42 42" @click="opened = 0")
      path(fill="#f35" d="M28 21L40 9a5 5 0 1 0-7-8L21 14 9 1a5 5 0 0 0-8 8l13 12L1 33a5 5 0 1 0 8 7l12-12 12 12a5 5 0 0 0 7 0c2-2 2-5 0-7L28 21z")

    p.h {{ name }}
    #body
      svg(viewBox="-10 -10 220 220" preserveAspectRatio="xMidYMin meet")
        g#picker(
          fill="none" stroke-width="15"
          transform="translate(100, 100)" style="pointer-events: all"
          @mousedown="hold = 1"
          @mousemove="angColor($event)"
          @mouseup="hold = 0"
          @mouseleave="hold = 0"
        )
          path(d="M 0,-100 A 100,100 0 0,1 86.6,-50"    stroke="url(#redyel)")
          path(d="M 86.6,-50 A 100,100 0 0,1 86.6,50"   stroke="url(#yelgre)")
          path(d="M 86.6,50 A 100,100 0 0,1 0,100"      stroke="url(#grecya)")
          path(d="M 0,100 A 100,100 0 0,1 -86.6,50"     stroke="url(#cyablu)")
          path(d="M -86.6,50 A 100,100 0 0,1 -86.6,-50" stroke="url(#blumag)")
          path(d="M -86.6,-50 A 100,100 0 0,1 0,-100"   stroke="url(#magred)")

        defs
          linearGradient#redyel(gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1")
              stop(offset="0%" stop-color="#ff0000")
              stop(offset="100%" stop-color="#ffff00")

          linearGradient#yelgre(gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1")
              stop(offset="0%" stop-color="#ffff00")
              stop(offset="100%" stop-color="#00ff00")

          linearGradient#grecya(gradientUnits="objectBoundingBox" x1="1" y1="0" x2="0" y2="1")
              stop(offset="0%" stop-color="#00ff00")
              stop(offset="100%" stop-color="#00ffff")

          linearGradient#cyablu(gradientUnits="objectBoundingBox" x1="1" y1="1" x2="0" y2="0")
              stop(offset="0%" stop-color="#00ffff")
              stop(offset="100%" stop-color="#0000ff")

          linearGradient#blumag(gradientUnits="objectBoundingBox" x1="0" y1="1" x2="0" y2="0")
              stop(offset="0%" stop-color="#0000ff")
              stop(offset="100%" stop-color="#ff00ff")

          linearGradient#magred(gradientUnits="objectBoundingBox" x1="0" y1="1" x2="1" y2="0")
              stop(offset="0%" stop-color="#ff00ff")
              stop(offset="100%" stop-color="#ff0000")

      #box(
        ref="colorBox"
        @mousedown="hold = 1"
        @mousemove="padColor($event)"
        @mouseup="hold = 0"
        @mouseleave="hold = 0"
      )
        svg(viewBox="0 0 1 1" preserveAspectRatio="xMidYMin meet")
          rect(width="1" height="1" fill="url(#boxSatur)")
          rect(width="1" height="1" fill="url(#boxValue)")
          defs
            linearGradient#boxValue(gradientUnits="objectBoundingBox" x1="0" y1="1" x2="0" y2="0")
              stop(offset="0%" stop-color="#000")
              stop(offset="100%" stop-color="#000" stop-opacity="0")

            linearGradient#boxSatur(gradientUnits="objectBoundingBox" x1="1" y1="0" x2="0" y2="0")
              stop#color(offset="0%" :stop-color="color.abs")
              stop(offset="100%" stop-color="#fff")

        svg#color_box(viewBox="-8 -8 16 16" :style="pos")
          circle(r="10" stroke="#000" stroke-width="5" stroke-opacity=0.75 fill-opacity=0
            style="transition: all 0.25s ease-in-out 0s" :style="color.stroke")

      svg#color_circle(viewBox="-8 -8 16 16" :style="ang.style")
        circle(r="10" stroke="#000" stroke-width="5" stroke-opacity=0.75 fill-opacity=0)

      #color(:style="{ background: color.basic }")
</template>

<script lang="coffee">
  export default
    data: ->
      name: ""
      hold: no
      opened: no
      target: ""

      pos: transform: "translate(-50%, -1075%) rotate(#{ 0 }deg)"

      x: 0,
      y: 0

      ang:
        basic: 0
        style: {}

      color:
        basic: ""
        abs: ""
        shade: ""

      open:
        top: "0%"
        opacity: 1
        "pointer-events": "all"

      close:
        top: "-40vmax"
        opacity: 0
        "pointer-events": "none"

    watch:
      "$parent.pallete.opened": (val) ->
        pallete = @$parent.pallete

        @name   = pallete.name
        @opened = val
        @target = pallete.target
        @color  = pallete.color

      opened: ->
        HSL = @hexToHsl @color.basic

        @ang.basic = HSL[0]
        @x         = HSL[1]
        @y         = HSL[2] / (1 - (HSL[1] / 2))

      "ang.basic": (ang) ->
        @ang.style = transform: "translate(-50%, -1075%) rotate(#{ ang * 360 }deg)"
        @setPadColor()

      x: (e) ->
        @setPadColor()
        @setPadPoint e, @y

      y: (e) ->
        @setPadColor()
        @setPadPoint @x, e

      "color.basic": (basic) ->
        target = @target

        if typeof target isnt "object"
          @$root[target].color.basic = basic
          @$root[target].color.shade = @color.shade
          @$root[target].color.set   = background: @$root[target].color.basic

          if name is "eyes" then @eyes.color.stroke = stroke: @eyes.color.basic

        else
          t = target

          @$root[t.target][t.side][t.id].color = basic
          @$root[t.target][t.side][t.id].shade = @color.shade

    method:
      padColor: (event) ->
        if not @hold then return

        BCR = @$refs.colorBox.getBoundingClientRect()

        X = (event.pageX - BCR.left) / BCR.width
        Y = (event.pageY - BCR.top)  / BCR.height

        @x =     X
        @y = 1 - Y

      setPadColor: ->
        @color.abs   = @hslToHex(@ang.basic, 1, 0.5)
        @color.basic =
          @hslToHex(@ang.basic, @x, @y * (1 - (@x / 2)))
        @color.shade =
          @hslToHex(@ang.basic, @x, @y * (1 - (@x / 2)) * 0.66)

      setPadPoint: (X, Y) ->
        if X < 0 then X = 0
        if Y < 0 then Y = 0

        @pos =
          transform: "translate(#{ (X * 1900) - 1000 }%, #{ -(Y * 1900) + 900 }%)"

        if Y <= 0.5
             @color.stroke = stroke: "#eee"
        else @color.stroke = stroke: "#111"

      angColor: (e) ->
        if not @hold then return

        BCR = @$refs.colorBox.getBoundingClientRect()

        Xmid = BCR.left + BCR.width  / 2
        Ymid = BCR.top  + BCR.height / 2

        ang = Math.atan2(e.pageY - Ymid, e.pageX - Xmid) * 180 / Math.PI + 90;

        if ang < 0 then ang = ang + 360

        @ang.basic = ang / 360

      hexToHsl: (hex) ->
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec hex

        r = parseInt(result[1], 16) / 255
        g = parseInt(result[2], 16) / 255
        b = parseInt(result[3], 16) / 255

        max = Math.max r, g, b
        min = Math.min r, g, b

        h; s; l = (max + min) / 2

        if max is min then h = s = 0  # achromatic
        else
          d = max - min
          s = if l > 0.5
              d / (2 - max - min)
          else d / (max + min)

          switch max
            when r then h = (g - b) / d + (if g < b then 6 else 0)
            when g then h = (b - r) / d + 2
            when b then h = (r - g) / d + 4

          h /= 6

        return [ h, s, l ]

      hslToHex: (h, s, l) ->
        r; g; b

        hue2rgb = (p, q, t) ->
          if t < 0 then t += 1 else
          if t > 1 then t -= 1 else
          if t < 1/6 then return p + (q - p) * 6 * t
          if t < 1/2 then return q
          if t < 2/3 then return p + (q - p) * (2/3 - t) * 6

          return p

        if s is 0 then r = g = b = l  # achromatic
        else
          q = if l < 0.5 then l * (1 + s) else l + s - l * s
          p = 2 * l - q

          r = hue2rgb p, q, h + 1/3
          g = hue2rgb p, q, h
          b = hue2rgb p, q, h - 1/3

        componentToHex = (c) ->
          hex = c.toString 16

          if hex.length is 1 then "0" + hex else hex

        r = Math.round r * 255
        g = Math.round g * 255
        b = Math.round b * 255

        if r > 255 then r = 255
        if g > 255 then g = 255
        if b > 255 then b = 255

        return "#" + componentToHex(r) + componentToHex(g) + componentToHex b
</script>