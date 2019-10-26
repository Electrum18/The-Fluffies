<template lang="pug">
  #app(:style="{ background: $root.background.color.basic }")
    Avatar

    #vignette

    p#version version #[span carrot]

    Social
    Chat
    Screener

    #menu
      #back(:style="editor.style.back")
      #info(:style="editor.style.info")
        svg(viewBox="0 0 512 512" :style="editor.style.content" @click="male = !male")
          path(fill="#f5a" d="M376 290a170 170 0 1 0-140 49v57h-40a20 20 0 1 0 0 40h40v56a20 20 0 0 0 40 0v-56h40a20 20 0 1 0 0-40h-40v-57c37-5 72-21 100-49zm-212-28A130 130 0 1 1 348 78a130 130 0 0 1-184 184z"
            :style="editor.style.female")

        svg(viewBox="-50 0 550 550" :style="editor.style.content" @click="male = !male")
          path(fill="#5af" d="M499 19v-1l-1-1v-2l-1-2-1-1v-1l-7-7h-1l-1-1-2-1h-2l-1-1h-1l-4-1h-98a23 23 0 0 0 0 47h41L315 151a195 195 0 1 0 34 34L453 80v41a23 23 0 0 0 47 0V24l-1-5zM195 453a148 148 0 1 1 0-297 148 148 0 0 1 0 297z"
            :style="editor.style.male")

        input#text(type="text" placeholder="set a name" value="Defaulty" v-model="name" :style="editor.style.content")

      // Avatar editor panel bars
      #wrapper(:style="editor.style.bars")
        MenuBars

      #color_pallete(:style="pallete.opened ? pallete.open : pallete.close")
        p color picker

        svg#close(viewBox="0 0 42 42" @click="pallete.opened = 0")
          path(fill="#f35" d="M28 21L40 9a5 5 0 1 0-7-8L21 14 9 1a5 5 0 0 0-8 8l13 12L1 33a5 5 0 1 0 8 7l12-12 12 12a5 5 0 0 0 7 0c2-2 2-5 0-7L28 21z")

        p.h {{ pallete.name }}

        #body
          svg(
            viewBox="-10 -10 220 220"
            preserveAspectRatio="xMidYMin meet"
            style="pointer-events: all"

            v-press-hold="angColor"
          )
            g#picker(
              fill="none" stroke-width="15"
              transform="translate(100, 100)"
              style="pointer-events: none"
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

            v-press-hold="padColor"
          )
            svg(viewBox="0 0 1 1" preserveAspectRatio="xMidYMin meet")
              rect(width="1" height="1" fill="url(#boxSatur)")
              rect(width="1" height="1" fill="url(#boxValue)")
              defs
                linearGradient#boxValue(gradientUnits="objectBoundingBox" x1="0" y1="1" x2="0" y2="0")
                  stop(offset="0%" stop-color="#000")
                  stop(offset="100%" stop-color="#000" stop-opacity="0")

                linearGradient#boxSatur(gradientUnits="objectBoundingBox" x1="1" y1="0" x2="0" y2="0")
                  stop#color(offset="0%" :stop-color="pallete.color.abs")
                  stop(offset="100%" stop-color="#fff")

            svg#color_box(viewBox="-8 -8 16 16" :style="pallete.pos")
              circle(r="10" stroke="#000" stroke-width="5" stroke-opacity=0.75 fill-opacity=0
                style="transition: all 0.25s ease-in-out 0s" :style="pallete.color.stroke")

          svg#color_circle(viewBox="-8 -8 16 16" :style="pallete.ang.style")
            circle(r="10" stroke="#000" stroke-width="5" stroke-opacity=0.75 fill-opacity=0)

          #color(:style="{ background: pallete.color.basic }")

        p.h(:style="pallete.hex.style" style="transition: color .25s") {{ pallete.hex.text }}
          input(pattern="[a-fA-F\d]+" maxlength="7" v-model="pallete.color.basic")

        .line

        div(style="position: relative")

          p.sm lightness

          .colors(:style="getLight(50)" @click="setLight(50)")
          .colors(:style="getLight(40)" @click="setLight(40)")
          .colors(:style="getLight(30)" @click="setLight(30)")
          .colors(:style="getLight(20)" @click="setLight(20)")
          .colors(:style="getLight(10)" @click="setLight(10)")

          p.sm saturation

          .colors(:style="getSatur(100)" @click="setSatur(100)")
          .colors(:style="getSatur(75)" @click="setSatur(75)")
          .colors(:style="getSatur(50)" @click="setSatur(50)")
          .colors(:style="getSatur(25)" @click="setSatur(25)")
          .colors(:style="getSatur(0)" @click="setSatur(0)")

      // Menu of Models - list

      #MoM-bars(:style="menuOfModels.style.back")
        svg(viewBox="64 0 128 128")
          circle(
            r="256" stroke="#222" stroke-width="100"
            fill-opacity=0
            style="pointer-events: stroke"

            v-scroll="scroll"
          )

        MoMBar(v-for="(hair, i) in $root.hair.info" :key="hair + i" :id="i" :elem="hair")

      #menu-circle(:style="circle.style")
        #shading(@click="$root.shading.enable = !$root.shading.enable")
          svg(viewBox="-15 -12 100 100" style="transform: translate(50%, -50%) rotate(102.5deg)")
            path(fill="#eee" d="M0 36a36 36 0 1 0 73 0 36 36 0 0 0-73 0zM23 6c13-8 31-3 41 12 9 15 6 34-6 42-13 9-32 3-41-12-10-15-7-34 6-42z")

        #capture(@click="openCaptureMenu")
          svg(viewBox="-108 -58 716 716" style="transform: translate(50%, -50%) rotate(63.33deg)")
            path(fill="#eee" d="M527 131a70 70 0 0 0-52-21h-64l-14-39c-4-10-11-18-20-24-10-7-20-10-30-10H201c-10 0-20 3-30 10-9 6-16 14-19 24l-15 39H73c-20 0-37 7-52 21a70 70 0 0 0-21 52v256c0 20 7 37 21 51 15 14 32 22 52 22h402c20 0 37-8 52-22 14-14 21-31 21-51V183c0-20-7-38-21-52zM364 401c-25 25-55 38-90 38s-65-13-90-38-38-55-38-90c0-36 13-66 38-91s55-37 90-37 65 12 90 37 38 55 38 91c0 35-13 65-38 90z")
            path(fill="#eee" d="M274 228c-23 0-42 8-58 25a79 79 0 0 0-24 58c0 22 8 42 24 58s35 24 58 24 42-8 58-24 24-36 24-58c0-23-8-42-24-58a79 79 0 0 0-58-25z")

        #menu-avatar(@click="openEditorMenu")
          svg(viewBox="-4 -12 136 136" style="transform: translate(50%, -50%) rotate(-12.5deg)")
            path(fill="#eee" d="M64 106c-6 0-12-1-18-4-2 13-8 20-8 20 28 14 52 1 52 1s-6-8-8-21c-6 3-12 4-18 4z")
            path(fill="#eee" d="M102 47c2-13 0-32-9-34-7-2-11 6-12 13 9 4 17 11 21 21z")
            path(fill="#eee" d="M26 47c-1-13 0-32 9-34 7-2 11 6 12 13-9 4-17 11-21 21z")
            path(fill="#eee" d="M29,64a35,35 0 1,0 70,0a35,35 0 1,0 -70,0")

        #animate
          svg(viewBox="-88 -56 672 672" style="transform: translate(50%, -50%) rotate(26.66deg)")
            path(fill="#f66" d="M71 332v165c0 8 7 15 15 15h372c8 0 15-7 15-15V332H71zM330 223l-70 78h75l70-78zM458 223h-12l-70 78h97v-63c0-8-7-15-15-15zM216 223l-70 78h73l70-78zM243 66l-66 29-41 128h-32l36-112-92 41c-7 4-11 13-7 20l30 69v60h35l70-78h-19l41-18 45-139zM280 49l-45 139 65-29 45-139zM439 81L407 9c-3-8-12-11-20-8l-5 3-45 139 95-42a15 15 0 0 0 7-20z")

      #menu-button(@click="menuButtonPress")
        svg(width="100%" height="100%" viewBox="0 0 128 128" preserveAspectRatio="none")
          path#button.transition(:style="button.color.main"
            d="M128 64A64 64 0 1 1 0 64a64 64 0 0 1 128 0z" fill="#fff" filter="url(#mask_Shadow)")
          defs
            filter#mask_Shadow(x="-50%" y="-50%" width="200%" height="200%")
              feOffset(result="offOut" in="SourceAlpha" dx="0" dy="0")
              feColorMatrix(result="matrixOut" in="offOut" type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0")
              feGaussianBlur(result="blurOut" in="matrixOut" stdDeviation="10")
              feBlend(in="SourceGraphic" in2="blurOut" mode="normal")

        svg#bars(viewBox="-8.5 -8.5 40 40" :style="button.bars"
          style="transition: transform .2s ease, opacity .2s ease")
          path(fill="#333" :style="button.color.icons"
            d="M24 3c0-.6-.4-1-1-1H1c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h22c.6 0 1-.4 1-1V3zM24 11c0-.6-.4-1-1-1H1c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h22c.6 0 1-.4 1-1v-2zM24 19c0-.6-.4-1-1-1H1c-.6 0-1 .4-1 1v2c0 .6.4 1 1 1h22c.6 0 1-.4 1-1v-2z")

        svg#close(viewBox="-9 -9.5 40 40" :style="button.cross"
          style="transition: transform .2s ease, opacity .2s ease")
          path(fill="#333" :style="button.color.icons"
            d="M14.1 11.3a.5.5 0 0 1 0-.7l7.5-7.5c.2-.2.3-.5.3-.7s-.1-.5-.3-.7L20.2.3a1 1 0 0 0-.7-.3 1 1 0 0 0-.7.3l-7.5 7.5c-.2.2-.5.2-.7 0L3.1.3C2.9.1 2.6 0 2.4 0s-.5.1-.7.3L.3 1.7c-.2.2-.3.5-.3.7s.1.5.3.7l7.5 7.5c.2.2.2.5 0 .7L.3 18.8c-.2.2-.3.5-.3.7s.1.5.3.7l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3l7.5-7.5c.2-.2.5-.2.7 0l7.5 7.5c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.2-.2.3-.5.3-.7s-.1-.5-.3-.7l-7.5-7.5z")

        svg#back2(viewBox="-130 -120 725 725" :style="button.back"
          style="transition: transform .2s ease, opacity .2s ease")
          path(fill="#333" :style="button.color.icons"
            d="M383 227L164 8c-5-5-12-8-19-8s-14 3-19 8l-16 16a27 27 0 0 0 0 38l183 184-184 184a27 27 0 0 0 0 38l16 16c6 5 12 8 19 8s14-3 20-8l219-219a27 27 0 0 0 0-38z")

    #loadings
      transition-group(name="loadings")
        .bar(v-for="text in $root.loadings" :key="text")
          svg(viewBox="-8 -8 16 16").loader
            circle(r="5" stroke="#fa0" stroke-width="2"
              fill-opacity=0
              style="pointer-events: stroke"
            )

          p {{ text }}

    canvas#hairC( width="1024" height="1024")
    canvas#headC( width="1024" height="1024")
    canvas#hair2C( width="1024" height="1024")
    canvas#neckC( width="1024" height="1024")
    canvas#head2C(width="1024" height="1024")
    canvas#chinC( width="1024" height="1024")
    canvas#head3C(width="1024" height="1024")
    canvas#hair3C(width="1024" height="1024")
    canvas#head4C(width="1024" height="1024")
</template>

<script lang="coffee">
  import MoMBar from "../../../components/MoMBars.vue"
  import Screener from "../../../components/TheScreener.vue"
  import MenuBars from "../../../components/TheMenuBars.vue"
  import Avatar from "../../../components/TheAvatar.vue"
  import Social from "../../../components/TheSocial.vue"
  import Chat from "../../../components/TheChat.vue"

  export default
    data: ->
      name: "Defaulty"
      male: no

      pallete:
        name: ""
        opened: no
        target: ""

        x: 0,
        y: 0

        hex:
          text: "hex"
          style:
            color: "#bbb"

        ang:
          basic: 0
          style: {}

        color:
          basic: ""
          abs: ""

        open:
          top: "0%"
          opacity: 1
          "pointer-events": "all"

        close:
          top: "-40vmax"
          opacity: 0
          "pointer-events": "none"

      button:
        mode: ""
        type: "menu"
        dark: no

        bars: { transform: "scale(1)", opacity: 1 }
        cross: { transform: "scale(0)", opacity: 0 }
        back: { transform: "scale(0)", opacity: 0 }

        color:
          main: { fill: "#fff" }
          icons: { fill: "#333" }

      circle:
        opened: no
        style: { transform: "translate(50%, 50%) scale(0)" }

      editor:
        opened: no

        style:
          back:
            bottom: "6vmin"
            right: "6vmin"
            width: "9vmin"
            height: "9vmin"

            "border-radius": "50%"

          bars:
            opacity: 0
            top: "-10%"
            "pointer-events": "none"

          info: ""

          content:
            opacity: 0

          male:
            transform: "translate(50%, 50%) scale(0)"
            opacity: 0

          female:
            transform: "translate(0%, 0%) scale(1)"
            opacity: 1

      screener:
        opened: no

      menuOfModels:
        angle: 0

        style:
          bar: { left: "110%" }
          back: { right: "0vmax" }

    watch:
      male: (val) ->
        url = window.location.pathname

        if val
          @editor.style.male =
            transform: "translate(0%, 0%) scale(1)"
            opacity: 1

          @editor.style.female =
            transform: "translate(50%, 50%) scale(0)"
            opacity: 0

          window.history.replaceState {}, "", url + "?gender=male"

        else
          @editor.style.female =
            transform: "translate(0%, 0%) scale(1)"
            opacity: 1

          @editor.style.male =
            transform: "translate(50%, 50%) scale(0)"
            opacity: 0

          window.history.replaceState {}, "", url + "?gender=female"

      "pallete.opened": ->
        t     = @pallete.target
        color = @$root[t[0]][t[1]][t[2]]

        if color[t[3]] then color = color[t[3]]

        HSL   = @hexToHsl color

        @pallete.ang.basic = HSL[0]
        @pallete.x         = HSL[1]
        @pallete.y         = HSL[2] / (1 - (HSL[1] / 2))
        @pallete.color.basic  = color

      "pallete.ang.basic": (ang) ->
        @pallete.ang.style = transform: "translate(-50%, -1075%) rotate(#{ ang * 360 }deg)"
        @setPadColor()

      "pallete.x": (e) ->
        @setPadColor()
        @setPadPoint e, @pallete.y

      "pallete.y": (e) ->
        @setPadColor()
        @setPadPoint @pallete.x, e

      "pallete.color.basic": (color) ->
        if color[0] isnt "#"
          @pallete.color.basic = "#" + color.substr 1

        if color.length < 7
          @pallete.hex.text  = "invalid hex"
          @pallete.hex.style = color: "#f50"
          return

        else
          @pallete.hex.text  = "hex"
          @pallete.hex.style = color: "#bbb"

        t = @pallete.target

        r = parseInt(color[1] + color[2], 16)
        g = parseInt(color[3] + color[4], 16)
        b = parseInt(color[5] + color[6], 16)

        toHex = (c) ->
          hex = Math.round(c).toString 16

          if hex.length is 1 then "0" + hex else hex

        if @$root[t[0]][t[1]][t[2]][t[3]]
             @$root[t[0]][t[1]][t[2]][t[3]] = color
        else @$root[t[0]][t[1]][t[2]]       = color

        mul = 0.75

        if      t[0] is "piercings" then mul = 0.8
        else if t[0] is "tongue"    then mul = 0.9
        else if t[0] is "eyes"      then mul = 0.66

        if t[2] isnt "second"
          if @$root[t[0]][t[1]].shade
            @$root[t[0]][t[1]].shade =
              "#" + toHex(r * mul) + toHex(g * mul) + toHex b * mul

          if @$root[t[0]][t[1]][t[2]].shade
            @$root[t[0]][t[1]][t[2]].shade =
              "#" + toHex(r * mul) + toHex(g * mul) + toHex b * mul

        if name is "eyes" then @eyes.color.stroke = stroke: @eyes.color.basic

      "circle.opened": (e) ->
        if e
             @circle.style = transform: "translate(50%, 50%) scale(1)"
        else @circle.style = transform: "translate(50%, 50%) scale(0)"

      "button.mode": (mode) ->
        if mode is "close"
          @button.bars  = transform: "scale(0)", opacity: 0
          @button.cross = transform: "scale(1)", opacity: 1
          @button.back  = transform: "scale(0)", opacity: 0

        else if mode is "back"
          @button.bars  = transform: "scale(0)", opacity: 0
          @button.cross = transform: "scale(0)", opacity: 0
          @button.back  = transform: "scale(1)", opacity: 1

        else
          @button.bars  = transform: "scale(1)", opacity: 1
          @button.cross = transform: "scale(0)", opacity: 0
          @button.back  = transform: "scale(0)", opacity: 0

      "button.dark": (dark) ->
        if dark
          @button.color =
            main:  fill: "#333"
            icons: fill: "#fff"
        else
          @button.color =
            main:  fill: "#fff"
            icons: fill: "#333"

      hair: (val) -> @earClipEnabled = if val is "Float" then no else yes

    methods:
      setLight: (val) -> @pallete.y = val / 50
      getLight: (val) ->
        background: "hsl(#{@pallete.ang.basic * 360}, #{@pallete.x * 100}%, " +
          (val + val * (1 - @pallete.x)) + "%)"

      setSatur: (val) -> @pallete.x = val / 100
      getSatur: (val) ->
        background: "hsl(#{@pallete.ang.basic * 360}, #{val}%, " +
          (@pallete.y * 50 + (50 - val / 2) * @pallete.y) + "%)"

      padColor: (event) ->
        if not event.pageX then event = event.touches[0]

        BCR = @$refs.colorBox.getBoundingClientRect()

        X = (event.pageX - BCR.left) / BCR.width
        Y = (event.pageY - BCR.top)  / BCR.height

        if X > 1 then X = 1 else
        if X < 0 then X = 0

        if Y > 1 then Y = 1 else
        if Y < 0 then Y = 0

        @pallete.x =     X
        @pallete.y = 1 - Y

      setPadColor: ->
        @pallete.color.abs   = @hslToHex(@pallete.ang.basic, 1, 0.5)
        @pallete.color.basic =
          @hslToHex(@pallete.ang.basic, @pallete.x, @pallete.y * (1 - (@pallete.x / 2)))

      setPadPoint: (X, Y) ->
        if X < 0 then X = 0
        if Y < 0 then Y = 0

        @pallete.pos =
          transform: "translate(#{ (X * 1900) - 1000 }%, #{ -(Y * 1900) + 900 }%)"

        if Y <= 0.5
            @pallete.color.stroke = stroke: "#eee"
        else @pallete.color.stroke = stroke: "#111"

      angColor: (event) ->
        if not event.pageX then event = event.touches[0]

        BCR = @$refs.colorBox.getBoundingClientRect()

        Xmid = BCR.left + BCR.width  / 2
        Ymid = BCR.top  + BCR.height / 2

        ang = Math.atan2(event.pageY - Ymid, event.pageX - Xmid) * 180 / Math.PI + 90;

        if ang < 0 then ang = ang + 360

        @pallete.ang.basic = ang / 360

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

      menuButtonPress: ->
        @pallete.opened = no

        if @button.type is "menu"
          @circle.opened = !@circle.opened

          @button.dark = !@button.dark

          if @button.dark
               @button.mode = "close"
          else @button.mode = ""

        else if @button.type is "back"
          @button.type = "opened"
          @button.mode = "close"

          @menuOfModels.style.bar  = left: "110%"
          @menuOfModels.style.back = right: "0vmax"

          editor = @editor

          setTimeout (->
            editor.style.bars =
              opacity: 1
              top: "0%"
              "pointer-events": "all"
          ), 250

        else
          @button.type = "menu"
          @button.mode = ""

          @screener.opened    = no
          @editor.style.bars =
            opacity: 0
            top: "-10%"
            "pointer-events": "none"

          @editor.style.content =
            opacity: 0

          editor = @editor

          setTimeout (->
            editor.opened     = no
            editor.style.back =
              bottom: "6vmin"
              right:  "6vmin"
              width:  "9vmin"
              height: "9vmin"
              "border-radius": "50%"

            editor.style.info = off

            return
          ), 250

      menuButtonOpenStatus: ->
        @circle.opened = !@circle.opened
        @button.dark   = !@button.dark
        @button.type   = "opened"

      openCaptureMenu: ->
        @menuButtonOpenStatus()

        @screener.opened = yes

      openEditorMenu: ->
        @menuButtonOpenStatus()

        editor = @editor

        setTimeout (->
          editor.style.bars =
            opacity: 1
            top: "0%"
            "pointer-events": "all"

          return
        ), 250

        @editor.opened     = yes
        @editor.style.back =
          bottom: "52%"
          right:  "45%"
          width:  "92.5%"
          height: "100%"
          "border-radius": "0%"

        @editor.style.info =
          width:  "90%"

        @editor.style.content =
          opacity: 1

      openMenuOfModels: ->
        @menuOfModels.style.bar  = left:  "62%"
        @menuOfModels.style.back = right: "50vmax"
        @editor.style.bars       = opacity: 0, top: "-10%"

        @button.mode = "back"
        @button.type = "back"

      scroll: (delta) ->
        ang = @menuOfModels.angle

        if ang <= 0 and delta > 0
          @menuOfModels.angle = 0

        else if ang < (@$root.hair.info.length - 1) * 1.5 or delta > 0
          @menuOfModels.angle -= delta / 80  # 1.5 degress

    mounted: ->
      getParameterByName = (name) ->
        name = name.replace /[\[\]]/g, '\\$&'

        results = new RegExp '[?&]' + name + '(=([^&#]*)|&|#|$)'
          .exec window.location.href

        if not results    then return null
        if not results[2] then return ''

        return decodeURIComponent results[2].replace /\+/g, ' '

      if getParameterByName("gender") is "male"
          @male = yes
      else @male = no

    components: {
      Avatar
      Screener
      Chat
      Social
      MenuBars
      MoMBar
    }
</script>

<style src="./style.sass" lang="sass" />
