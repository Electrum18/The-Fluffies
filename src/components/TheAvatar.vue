<template lang="pug">
  #avatar.transition(v-press-hold="[MouseMove, Click, Holding]")
    svg(viewBox="0 -112 1024 1024" :style="mirror.style" ref="avatarSvg")
      g.scale
        g.HairBack(:style="[$root.headRotate, $root.hair.side.basic]")
          Shadow(name="hairTail")

          Mane(name="hairTail" style="transform: scale(-1, 1) translate(-100%)"
            mask="url(#mask_Out_Head2)")

          Mane(name="hairTailSecond"
            :hide="!$root.mane.second.enable"
            :is-not-stroke="$root.mane.second.notLines"
            style="transform: scale(-1, 1) translate(-100%)"
            mask="url(#mask_In_Hair_Tail)")

        g.Head(:style="[$root.headRotate, $root.furTint]")
          g.moveEar(:style="$root.earsMove")
            Shadow(name="earLeftInside")
            Shadow(name="earRightInside")

            Shadow(name="earLeftTassel"  :hide="!$root.tassels")
            Shadow(name="earRightTassel" :hide="!$root.tassels")

            Shadow(name="earLeftInsideFront"  :hide="!$root.tassels")
            Shadow(name="earRightInsideFront" :hide="!$root.tassels")

            Shadow(name="earLeftTasselFront"  :hide="!$root.tassels")
            Shadow(name="earRightTasselFront" :hide="!$root.tassels")

            Fur.inner2(name="earLeftInside"  :style="$root.furStroke")
            Fur.inner2(name="earRightInside" :style="$root.furStroke")

            Fur(name="earLeftPinna"  not-fill='yes' stroke-width=7)
            Fur(name="earRightPinna" not-fill='yes' stroke-width=7)

            Fur(name="earLeft"  not-fill='yes')
            Fur(name="earRight" not-fill='yes')

            Fur.inner4(name="earLeftTasselInside"  :style="$root.furStroke" not-fill='yes' alt='yes')
            Fur.inner4(name="earRightTasselInside" :style="$root.furStroke" not-fill='yes' alt='yes')

            Fur(name="earLeftTassel"  stroke-width=7)
            Fur(name="earRightTassel" stroke-width=7)

            g#earLeftPiercing

          g.HairBack3(style="transform: scale(-1, 1)"
            :style="$root.hair.side.alt" mask="url(#mask_no_RightEar_alt)")
            Shadow(name="hairNape")

            Mane(name="hairNape")
            Mane(name="hairNapeSecond" mask="url(#mask_In_Hair_Nape)"
              :hide="!$root.mane.second.enable"
              :is-not-stroke="$root.mane.second.notLines")

          Fur(name="head")

        g.Neck(:style="$root.furTint")
          Shadow(name="neck")

          Fur(name="chest")

          Fur.inner(name="neck" :style="$root.furStroke")

          path#stripesNeckLeft.eyes.move( d :fill="$root.stripes.color.basic"
            :style="$root.stipesShow" mask="url(#mask_In_Neck)" ref="stripesNeckLeft")
          path#stripesNeckRight.eyes.move(d :fill="$root.stripes.color.basic"
            :style="$root.stipesShow" mask="url(#mask_In_Neck)" ref="stripesNeckRight")

          Fur(name="neckBack_right" not-fill='yes')
          Fur(name="neckFront_left" not-fill='yes')

        g.HairBack2(:style="$root.headRotateHair" mask="url(#mask_Out_Head2)")
          Shadow(name="hairTailFront" mask="url(#mask_no_RightEar_alt)")

          Mane(name="hairTailFront" mask="url(#mask_no_RightEar_alt)")
          Mane(name="hairTailSecondFront"
            :hide="!$root.mane.second.enable"
            :is-not-stroke="$root.mane.second.notLines"
            mask="url(#mask_In_Hair_Tail)")

        g.Head(:style="[$root.headRotate, $root.furTint]")
          Shadow(name="head2")
          Shadow(name="nose")
          Fur.inner3(name="head2" alt='yes' :style="$root.furStroke")

        g.Hair2(:style="[$root.headRotate, $root.hair.side.basic]")
          Mane(name="hair" style="transform: scale(-1, 1) translate(-100%)")
          Mane(name="hairSecond" mask="url(#mask_In_Hair)"
            :hide="!$root.mane.second.enable"
            :is-not-stroke="$root.mane.second.notLines"
            style="transform: scale(-1, 1) translate(-100%)")

        g.Head(:style="[$root.headRotate, $root.furTint]")
          //g#tattoos(:style="$root.faceMove" mask="url(#mask_Head)")
            circle(cx="512" cy="512" r="50" stroke="black" stroke-width="3" fill="red"
              :style="tattooPos(30)")

          g.moveEar(:style="$root.earsMove")
            Fur.inner2(name="earRightInsideFront" alt='yes' :style="$root.furStroke")
            Fur(       name="earRightPinnaFront"        not-fill='yes' stroke-width=7)
            Fur(       name="earRightFront"             not-fill='yes')
            Fur.inner4(name="earRightTasselInsideFront" not-fill='yes' alt='yes' :style="$root.furStroke")
            Fur(       name="earRightTasselFront" stroke-width=7)

            g#earRightPiercing
              path.piercing(
                v-for="(obj, i) in $root.piercings.right"
                :key="'piercingRightEar' + i"

                :d="obj.type === 'ring' ? $root.piercings.ring : $root.piercings.point"
                :style="obj.style"
                :fill="obj.color"
                :stroke="obj.shade"
                stroke-width="6"
              )

          path#stripesLeft.eyes.move( d :fill="$root.stripes.color.basic" mask="url(#mask_Head)"
            :style="[$root.faceMove, $root.stipesShow]" ref="stripesLeft")
          path#stripesRight.eyes.move(d :fill="$root.stripes.color.basic" mask="url(#mask_Head)"
            :style="[$root.faceMove, $root.stipesShow]" ref="stripesRight")
          path#stripesFore.eyes.move( d :fill="$root.stripes.color.basic" mask="url(#mask_Head)"
            :style="[$root.faceMove, $root.stipesShow]" ref="stripesFore")
          path#stripesCrust.eyes.move(d :fill="$root.stripes.color.basic" mask="url(#mask_Head)"
            :style="[$root.faceMove, $root.stipesShow]" ref="stripesCrust")

          path#eyeLeftLashesUpper.outer.move(d fill-opacity="0" ref="eyeLeftLashesUpper"
            :style="[$root.faceMove, { stroke: '#222' }]")
          path#eyeLeftLashesMiddle.outer.move(d fill-opacity="0" ref="eyeLeftLashesMiddle"
            :style="[$root.faceMove, { stroke: '#222' }]")
          path#eyeLeftLashesLower.outer.move(d fill-opacity="0" ref="eyeLeftLashesLower"
            :style="[$root.faceMove, { stroke: '#222' }]")

          path#eyeLeft.eyes.move(d :fill="EyesStyle" mask="url(#mask_Head)" ref="eyeLeft" :style="$root.faceMove")

          path#eyeLeftBrow.outer.move(d fill-opacity="0" ref="eyeLeftBrow"
            :style="[$root.leftBrowWidth, $root.leftBrowHeight, { stroke: '#222' }]" mask="url(#mask_Head)")

          g.eyes.inside.Left(:style="$root.faceMove")
            ellipse#eyeIrisLeft(:fill="$root.eyeLeftGradient" ref="eyeIrisLeft")
            ellipse#eyePupilLeft(fill="#111" ref="eyePupilLeft")
            g
              ellipse#eyeGlareLeft( fill="#fff" ref="eyeGlareLeft")
              ellipse#eyeGlare2Left(fill="#fff" ref="eyeGlare2Left")

          Fur.inner4.move(name="eyeLeftLidDownFill" mask="url(#mask_Head)" :style="[$root.faceMove, $root.furStroke]")
          Fur.inner4.move(name="eyeLeftLidUpFill"   mask="url(#mask_Head)" :style="[$root.faceMove, $root.furStroke]")

          path#eyeLeftLidUp.outer.move(d fill-opacity="0" mask="url(#mask_Head)"
            :style="[$root.faceMove, { stroke: '#222' }]" ref="eyeLeftLidUp")

          Fur(name="nose" stroke-width=7 :style="$root.furStroke")
          Fur(name="chinAngle" not-fill='yes')
          Fur(name="chin"      not-fill='yes' mask="url(#mask_Out_Head)")

          Fur.move(name="bridge" not-fill='yes' :style="$root.faceMove")

          g(mask="url(#mask_In_Head)" :style="$root.faceMove")
            path#mouth.move(d :fill="$root.jaw.color.basic" stroke-width=7 ref="mouth")

            g(mask="url(#mask_In_Mouth)")
              path#tongue.mode(d :fill="$root.tongue.color.basic" stroke-width=5
                :stroke="$root.tongue.color.shade" ref="tongue")

              path#teethUpper.mode(d fill="#ffe" stroke-width=3 stroke="#ccb" ref="teethUpper")
              path#teethLower.mode(d fill="#ffe" stroke-width=3 stroke="#ccb" ref="teethLower")

            path#fangsLeft.move( d fill="#ffe" stroke-width=3 stroke="#ccb" ref="fangsLeft")
            path#fangsRight.move(d fill="#ffe" stroke-width=3 stroke="#ccb" ref="fangsRight")

            Fur.move(name="mouthOuter"  stroke-width=7 not-fill='yes')

          Fur.move(name="nostrilLeft" stroke-width=7 :style="$root.faceMove"
            mask="url(#mask_In_Nose)")

          Fur.move(name="nostrilRight" stroke-width=7 :style="$root.faceMove")

          g(mask="url(#mask_In_Head)" :style="$root.faceMove")
            path#mouthZone.Zone.move(d :fill="$root.jaw.color" ref="mouthZone")

          path#eyeRight.eyes.move(d :fill="EyesStyle" mask="url(#mask_Head)" :style="$root.faceMove" ref="eyeRight")

          g.eyes.inside.Right(:style="$root.faceMove")
            ellipse#eyeIrisRight(:fill="$root.eyeRightGradient" ref="eyeIrisRight")
            ellipse#eyePupilRight(fill="#111" ref="eyePupilRight")
            g
              ellipse#eyeGlareRight( fill="#fff" ref="eyeGlareRight")
              ellipse#eyeGlare2Right(fill="#fff" ref="eyeGlare2Right")

          Fur.inner4.move(name="eyeRightLidDownFill" mask="url(#mask_Head)"
            :style="[$root.faceMove, $root.furStroke]")
          Fur.inner4.move(name="eyeRightLidUpFill"   mask="url(#mask_Head)"
            :style="[$root.faceMove, $root.furStroke]")

          path#eyeRightLidUp.outer.move(  d fill-opacity="0" mask="url(#mask_Head)"
            :style="[$root.faceMove, { stroke: '#222' }]" ref="eyeRightLidUp")

          path#eyeRightLashesUpper.outer.move(d fill-opacity="0" ref="eyeRightLashesUpper"
            :style="[$root.faceMove, { stroke: '#222' }]")
          path#eyeRightLashesMiddle.outer.move(d fill-opacity="0" ref="eyeRightLashesMiddle"
            :style="[$root.faceMove, { stroke: '#222' }]")
          path#eyeRightLashesLower.outer.move(d fill-opacity="0" ref="eyeRightLashesLower"
            :style="[$root.faceMove, { stroke: '#222' }]")

          path#eyeRightBrow.outer.move(d fill-opacity="0" ref="eyeRightBrow"
            :style="[$root.rightBrowWidth, $root.rightBrowHeight, { stroke: '#222' }]")

        g.Hair(:style="$root.headRotate" mask="url(#mask_no_RightEar)")
          Shadow(name="hairFront" :style="$root.hair.side.front")
          Shadow(name="hairNapeFront" :style="$root.hair.side.front")

          Mane(name="hairFront" :style="$root.hair.side.front")
          Mane(name="hairSecondFront" mask="url(#mask_In_Hair)"
            :hide="!$root.mane.second.enable"
            :is-not-stroke="$root.mane.second.notLines"
            :style="$root.hair.side.front")

          Mane(name="hairNapeFront" :style="$root.hair.side.front")
          Mane(name="hairNapeSecondFront" mask="url(#mask_In_Hair_Nape)"
            :hide="!$root.mane.second.enable"
            :is-not-stroke="$root.mane.second.notLines"
            :style="$root.hair.side.front")

        g.Head(:style="[$root.headRotate, $root.furTint]")
          Shadow(name="horn" :hide="!$root.horn.enable")

          Fur.move(name="horn" stroke-width=7 :hide="!$root.horn.enable")
          Fur.move(name="hornSecond" mask="url(#mask_In_Horn)"
            :hide="$root.horn.changeling || !$root.horn.enable"
            :not-fill="!$root.horn.notLines"
            :stroke-width="$root.horn.notLines ? 0 : 7"
            :second="true")

      defs
        mask#mask_Head(x="-512" y="-512" width="1024" height="1024")
          Clip(name="headClip" fill="#fff" stroke="#000" width="9.5" :style="$root.faceMoveReverse")

        mask#mask_Out_Head(x="-512" y="-512" width="1024" height="1024")
          rect(width="100%" height="100%" fill="#fff")
          Clip(name="headClip" fill="#000" stroke="#fff" width="9.5")

        mask#mask_Out_Head2(x="-512" y="-512" width="1024" height="1024")
          rect(width="100%" height="100%" fill="#fff")
          Clip(name="headClip"     fill="#000" stroke="#000" width="9.5")
          Clip(name="earRightClip" fill="#000" stroke="#000" width="9.5")
          Clip(name="earRightFrontClip" fill="#000" stroke="#000" width="9.5")

        mask#mask_In_Head(x="-512" y="-512" width="1024" height="1024")
          Clip(name="headClip" fill="#fff" stroke="#fff" width="9.5")
          Clip(name="noseClip" fill="#fff" stroke="#fff" width="9.5")

        mask#mask_In_Nose(x="-512" y="-512" width="1024" height="1024")
          Clip(name="noseClip" fill="#fff" stroke="#fff" width="14")

        mask#mask_In_Neck(x="-512" y="-512" width="1024" height="1024")
          Clip(name="neckClip" fill="#fff" stroke="#fff" width="6")

        mask#mask_no_RightEar(x="-512" y="-512" width="1024" height="1024")
          rect(width="100%" height="100%" fill="#fff")
          Clip(name="earRightClip"      fill="#000" stroke="#000" :style="$root.earsClip")
          Clip(name="earRightFrontClip" fill="#000" stroke="#000" :style="$root.earsClip")

        mask#mask_no_RightEar_alt(x="-512" y="-512" width="1024" height="1024")
          rect(width="100%" height="100%" fill="#fff")
          Clip(name="earRightClip"      fill="#000" stroke="#000" :style="$root.earsClipAlt")
          Clip(name="earRightFrontClip" fill="#000" stroke="#000" :style="$root.earsClipAlt")

        mask#mask_Eyes(x="-512" y="-512" width="1024" height="1024")
          path#eyeLeftClip.eyes.Left(  :d="$root.path.eyeLeftClip"  fill="#fff")
          path#eyeRightClip.eyes.Right(:d="$root.path.eyeRightClip" fill="#fff")

          g(:style="$root.faceMoveReverse")
            Clip(name="headClip" fill="#0000" stroke="#000" width="10")
            circle(cx="512" cy="512" r="512" stroke="#000" stroke-width="517" fill="#0000")

        mask#mask_In_Mouth(x="-512" y="-512" width="1024" height="1024")
          Clip(name="mouthClip" fill="#fff" stroke="#000" width="6.5")

        mask#mask_In_Hair(x="-512" y="-512" width="1024" height="1024")
          Clip(name="hairClip" fill="#fff" stroke-width=8 stroke="#000")

        mask#mask_In_Hair_Nape(x="-512" y="-512" width="1024" height="1024")
          Clip(name="hairNapeClip" fill="#fff" stroke-width=8 stroke="#000")

        mask#mask_In_Hair_Tail(x="-512" y="-512" width="1024" height="1024")
          Clip(name="hairTailClip" fill="#fff" stroke-width=8 stroke="#000")
          Clip(name="headClip"     fill="#000" stroke="#000" width="9.5")
          Clip(name="earRightClip" fill="#000" stroke="#000" width="9.5")
          Clip(name="earRightFrontClip" fill="#000" stroke="#000" width="9.5")

        mask#mask_In_Horn(x="-512" y="-512" width="1024" height="1024")
          Clip(name="hornClip" fill="#fff" stroke="#000" width="6.5")

        linearGradient#grad_Eyes_Left(x1="0%" y1="100%" x2="0%" y2="0%")
          stop(offset="25%"  :style="{ 'stop-color': $root.eyes.color.left.basic, 'stop-opacity': 1 }")
          stop(offset="100%" :style="{ 'stop-color': $root.eyes.color.left.shade, 'stop-opacity': 1 }")

        linearGradient#grad_Eyes_Right(x1="0%" y1="100%" x2="0%" y2="0%")
          stop(offset="25%"  :style="{ 'stop-color': $root.eyes.color.right.basic, 'stop-opacity': 1 }")
          stop(offset="100%" :style="{ 'stop-color': $root.eyes.color.right.shade, 'stop-opacity': 1 }")

        radialGradient#grad_Eyes_Changeling(cx="50%" cy="50%" r="50%" fx="50%" fy="50%")
          stop(offset="0%"   style="stop-color: #fff; stop-opacity: 1")
          stop(offset="100%" style="stop-color: #fff; stop-opacity: 0")

        filter#filter_shadow(x="-50%" y="-50%" width="200%" height="200%")
          feOffset(result="offOut" in="SourceGraphic" dx="0" dy="10")
          feColorMatrix(result="matrixOut" in="offOut" type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0")
          feGaussianBlur(result="blurOut" in="matrixOut" stdDeviation="12")
          feBlend(in="SourceGraphic" in2="blurOut" mode="normal")
</template>

<script lang="coffee">
  import Clip from "./avatar/Clips.vue"
  import Fur  from "./avatar/Furs.vue"
  import Mane from "./avatar/Manes.vue"
  import Shadow from "./avatar/Shadows.vue"

  import abs from "abs-svg-path"
  import parse from "parse-svg-path"
  import curvify from "curvify-svg-path"

  import Elems from "../pages/editor/pony/elems.json"

  export default
    data: ->
      body: {}
      furs:
        male: {}

      furs2:
        male: {}

      color:
        fur:
          basic: @$root.fur.color.basic
          shade: @$root.fur.color.shade

        stripes: @$root.stripes.color.basic

        hair:
          basic:  @$root.mane.color.basic
          shade:  @$root.mane.color.shade
          second: @$root.mane.color.second

      math:
        nose:   pow: 1.5
        bridge: pow: 1.5
        mouth:  pow: 1.5
        fangsLeft:  pow: 1.5
        fangsRight: pow: 1.5
        nostrilLeft:  pow: 1.5
        nostrilRight: pow: 1.5
        eyeLeftLashesUpper:  pow: 2
        eyeLeftLashesMiddle: pow: 2
        eyeLeftLashesLower:  pow: 2

      elems: Elems

      ctx: []  # Context of canvases

      emotions: {}

      degress: 12.5
      horiz: 0

      keys: []  # The names for the paths of an array

      x: 12.5 / 90  # Horizontal of angle in 0 to 1 range
      y: 0          # Vertical of angle in 0 to 1 range

      angle: 0  # Calculated angle for transformation

      last:  # Last calculated variables for deltas
        x: 0
        y: 0
        angle: 0
        horiz: 0

      paths: {}  # Imported and parsed svg's
      state: {}  # Using for "if" attribute in "elems" config

      mirror:
        basic: no  # Avatar isnt mirrored in this time
        style:
          left: "50%"
          transform: "translate(-50%) scale(1, 1)"

    watch:
      "mirror.basic": (e) ->
        for key, i in @elems.keys
          @ctx[i].translate @ctx[i].canvas.width, 0
          @ctx[i].scale -1, 1

        @mirror.style.transform =
          "translate(-50%) scale(#{ if e then -1 else 1 }, 1)"

      "$parent.editor.opened": (val) ->
        @mirror.style.left = if val then "33%" else "50%"

      degress: (num) ->
        if num < 0
             @mirror.basic = yes
        else @mirror.basic = no

      "$root.hair.name": (val) ->
        if @hairs[val] then @hair()
        else
          self = this
          hairName = @$root.hair.name.toLowerCase().replace /\W/g, "_"

          @get "hairs", "/data/pony/hairs/" + hairName + ".json", ->
            self.hair()

      "$root.hair.info": -> @hair()

      "$root.eyes":
        handler: (val) ->
          @state.eyes = val

          @eyes()

        deep: yes

      "$root.eyes.brows":
        handler: -> @animate()
        deep: yes

      "$root.eyes.eyelids":
        handler: -> @animate()
        deep: yes

      "$root.eyes.color.right.enable": (val) ->
        if not val
          left = @$root.eyes.color.left

          @$root.eyes.color.right.basic  = left.basic
          @$root.eyes.color.right.shade  = left.shade
          @$root.eyes.color.right.stroke = left.stroke

      "$root.eyes.color.left":
        handler: (val) ->
          if not @$root.eyes.color.right.enable
            @$root.eyes.color.right.basic  = val.basic
            @$root.eyes.color.right.shade  = val.shade
            @$root.eyes.color.right.stroke = val.stroke

        deep: yes

      "$root.fur.color":
        handler: (val) ->
          @color.fur.basic = val.basic
          @color.fur.shade = val.shade

          @animate()

        deep: yes

      "$parent.male": -> @animate()

      "$root.mane.second.isEnds": -> @hair()

      "$root.horn":
        handler: (val) ->
          @state.horn = val

          @animate()

        deep: yes

      "$root.tassels": (val) ->
        @state.tassels = val

        @animate()

      "$root.fangs": (val) ->
        @state.fangs = val

        @animate()

      "$root.stripes":
        handler: (val) ->
          @state.stripes.enable = val.enable
          @color.stripes        = val.color.basic

          @animate()

        deep: yes

      "$root.mane":
        handler: (val) ->
          @state.hair.second = val.second
          @color.hair        = val.color

          @animate()

        deep: yes

    computed:
      AbsoluteDegress: -> if @degress < 0 then -@degress else @degress

      EyesStyle: ->
        if @$root.eyes.changeling then @$root.eyes.color.right.basic else "#fff"

    methods:
      tattooPos: (ang) ->
        x = if @x < 0 then -@x else @x
        ang = if @x < 0 then 1 - ang else ang

        val = x + (ang / 90)

        scale = if val < 0 then val + 1 else 1 - val
        place = if val < 0 then val else val * 75

        transform: "translateX(#{place}%) scale(#{scale}, 1)"

      get: (target, url, callback) ->
        self   = this
        loader = @$root.loadings
        capital = target[0].toUpperCase() + target.slice 1

        if target is "hairs"
          loader.push "#{capital} | #{@$root.hair.name}"
        else
          loader.push capital

        @$http.get(window.location.origin + url).then (res) ->
          self[target] = { self[target]..., res.body... }

          loader.splice loader.indexOf capital, 1

          setTimeout ->
            callback()
          , 100

        , (err) ->

          # Trying get again if not loaded

          setTimeout ->
            self.get(target, url, callback)
          , 5e3

      Click: (e) ->
        if not e.pageX
          if e.touches then e = e.touches[0] else return

        @last.x = e.pageX
        @last.y = e.pageY

      Holding: (hold) ->
        if @$root.shading.enable
          @$root.shading.active = !hold

      MouseMove: (e) ->
        if not e.pageX
          if e.touches then e = e.touches[0] else return

        BCR = @$el.getBoundingClientRect()

        ang = Math.atan2(
          ((@x + 1 / 2) * BCR.width)  - (BCR.left + BCR.width  / 2),
          ((@y + 1 / 2) * BCR.height) - (BCR.top  + BCR.height / 2)
        ) * 180 / Math.PI

        @x += (e.pageX - @last.x) / 500
        @y += (e.pageY - @last.y) / 100

        if @x > 1 then @x = 1 else if @x < -1 then @x = -1
        if @y > 1 then @y = 1 else if @y < -1 then @y = -1

        @degress = @x * 90

        horiz  = -(@y * (1 - Math.abs(@x))) ** 7
        @horiz = if horiz < 0 then horiz / 3 else horiz

        @$root.horiz = @horiz
        @$root.ang   = (@y * 90 * Math.abs(@x)) / 4

        @angle = @$root.ang

        @$root.degress = @degress

        @animate()
        @hair()
        @eyes()

        @last.x = e.pageX
        @last.y = e.pageY

      parseSVGbasic: (get, set) ->
        self = this

        capitalize = (text) ->
          text.charAt(0).toUpperCase() + text.slice(1)

        unCapitalize = (text) ->
          text.charAt(0).toLowerCase() + text.slice(1)

        give = (obj, keyIn = no) ->
          if obj[0]
            newPaths = []

            for path, i in obj
              newPaths[i] = curvify abs parse path

            if not self.paths[set]
              self.paths[set] = { keys: [] }

              if set is "hairs"
                self.paths[set].keys.push self.$root.hair.name

                self.paths[set][self.$root.hair.name] = { keys: [] }

            if set is "hairs"
                keyIn = keyIn.replace "Main", ""

                self.paths[set][self.$root.hair.name][keyIn] = newPaths
                self.paths[set][self.$root.hair.name].keys.push keyIn

            else self.paths[set] = newPaths

          else
            keys = Object.keys obj

            if not keyIn then keyIn  = ""

            for key, i in keys
              give obj[key], unCapitalize keyIn + capitalize key

        give get

      parseSVGforBody: (text) ->
        pathTo = text.split /(?=[A-Z])/
        elem   = @$root.$refs

        if elem[text].tagName isnt "path" then return

        if pathTo[pathTo.length - 1] is "Front" or
           pathTo[pathTo.length - 1] is "Zone" then return

        keys  = @keys
        furs  = @furs
        furs2 = @furs2

        give = (inPath, i, isMale) ->
          if i < pathTo.length
            name = pathTo[i].toLowerCase()

            give inPath[name], i + 1

          else
            if Array.isArray inPath
              furs[text] = inPath

              keys[keys.length] = text

              newPaths = []

              for path, i in inPath
                newPaths[i] = curvify abs parse path

              furs2[text] = newPaths

              if isMale
                furs.male[text] = inPath

              if text is "mouth"
                furs.mouthOuter = furs.mouth

            else
              if inPath.male
                give inPath.male["main"], i, yes

              give inPath["main"], i

        give @body, 0

      animate: ->
        ctx   = @ctx
        elems = @elems

        self = this

        absPercent = @AbsoluteDegress / 90
        toRad = Math.PI / 180

        for key, i in elems.keys
          ctx[i].clearRect 0, 0, ctx[i].canvas.width, ctx[i].canvas.height

          if key in ["headC", "head2C", "chinC" , "head3C", "hairC", "hair2C", "hair3C", "head4C"]
            ctx[i].translate  ctx[i].canvas.width / 2,  ctx[i].canvas.height / 2

            if key in ["hairC", "hair2C", "hair3C"]
              ctx[i].rotate @last.angle * toRad
              ctx[i].rotate -@angle     * toRad

            else
              ctx[i].rotate -@last.angle * toRad
              ctx[i].rotate @angle       * toRad

            ctx[i].translate -ctx[i].canvas.width / 2, -ctx[i].canvas.height / 2

            if key is "headC"
              ctx[i].translate 0, -@last.horiz * 30
              ctx[i].translate 0, @horiz       * 30

            if key in ["head2C", "head3C", "head4C"]
              ctx[i].translate 0, @last.horiz * 30
              ctx[i].translate 0, -@horiz     * 30

            if key is "head4C"
              @last.angle = @angle
              @last.horiz = @horiz

        newFurs  = []

        calc = (a, b, range) ->
          Math.floor(a + (b - a) * range)

        draw = ->
          for key, i in elems.keys
            array = elems[key]

            ctx[i].lineCap  = "round"
            ctx[i].lineJoin = "round"

            for elem in array
              if elem.if
                if typeof elem.if isnt "string"
                  if not self.state[elem.if[0]][elem.if[1]] then continue

                else if not self.state[elem.if] then continue

              if elem.clip
                ctx[i].save()
                ctx[i].beginPath()

                for clip in elem.clip
                  if clip[0] is "!"
                    odd = "evenodd"
                    clip = clip.replace "!", ""

                  else odd = "nonzero"

                  for part in newFurs[clip]
                    if part[0] is "C"
                      ctx[i].bezierCurveTo part[1], part[2], part[3], part[4], part[5], part[6]
                    else
                      ctx[i].moveTo part[1], part[2]

                console.log odd

                ctx[i].closePath()
                ctx[i].clip(odd)

              if elem.fill
                if elem.fill is "fur"
                  color = self.color.fur.basic

                else if elem.fill is "stripes"
                  color = self.color.stripes

                else if elem.fill is "hair"
                  color = self.color.hair.basic

                else color = elem.fill

                ctx[i].fillStyle = color

              else ctx[i].fillStyle = "transparent"


              if elem.stroke
                if elem.stroke[1] is "fur"
                  color = self.color.fur.basic

                else if elem.stroke[1] is "fur tint"
                  color = self.color.fur.shade

                else if elem.stroke[1] is "hair tint"
                  color = self.color.hair.shade

                else color = elem.stroke[1]

                ctx[i].strokeStyle = color
                ctx[i].lineWidth   = elem.stroke[0]

              else ctx[i].strokeStyle = "transparent"

              ctx[i].beginPath()

              for part in newFurs[elem.type]
                if part[0] is "C"
                  ctx[i].bezierCurveTo part[1], part[2], part[3], part[4], part[5], part[6]
                else
                  ctx[i].moveTo part[1], part[2]

              ctx[i].fill()
              ctx[i].stroke()
              ctx[i].restore()

        morph = (a, b, range) ->
          newPath = []

          for part, i in a
            newPart = []

            for point, j in part
              if j > 0
                   newPart[j] = calc point, b[i][j], range
              else newPart[j] = point

            newPath[i] = newPart

          return newPath

        for key in @keys
          paths = @furs2[key]
          pow = if @math[key] then @math[key].pow else 1

          fullRange = (1 - (absPercent ** (1 / pow))) * (paths.length - 1)

          frame = fullRange | 0
          range = fullRange - frame

          newFurs[key] = morph paths[frame], paths[frame + 1], range

        for key in @paths.hairs[self.$root.hair.name].keys
          paths = @paths.hairs[self.$root.hair.name][key]
          pow = if @math[key] then @math[key].pow else 1

          fullRange = (1 - (absPercent ** (1 / pow))) * (paths.length - 1)

          frame = fullRange | 0
          range = fullRange - frame

          newFurs[key] = morph paths[frame], paths[frame + 1], range

        window.requestAnimationFrame draw

      eyes: ->

      hair: ->

    mounted: ->
      @$root.$refs = { @$root.$refs..., @$refs... }

      @elems.keys = []
      @elems.keys = Object.keys @elems
      @elems.keys.pop()  # Removes "keys" value in array of keys


      # Creating an array of contexts

      for key, i in @elems.keys
        @ctx[i] = document.getElementById(key).getContext "2d"
        @ctx[i].translate 0, 112

        if key in ["hairC", "hair2C", "hair3C"]
          @ctx[i].scale -1, 1
          @ctx[i].translate -1024, 0


      # Init watching states

      @state.eyes    = @$root.eyes
      @state.fangs   = @$root.fangs
      @state.tassels = @$root.tassels
      @state.horn    = @$root.horn
      @state.stripes = {}
      @state.stripes.enable = @$root.stripes.enable
      @state.hair        = {}
      @state.hair.second = @$root.mane.second


      self = this


      # Get JSON data to client and execute

      @get "body", "/data/pony/body.json", ->
        # SVG parsing - import

        for key of self.$root.$refs
          if key not in ["mouthOuter", "hair", "hairNape", "hairTail"]
            if key is "neckFront_left" or key is "hornSecond" or
              /^(.(?!Front|Second|SecondFront|Shadow|FrontShadow))*$/m.test key
                self.parseSVGforBody key

        self.animate()
        self.eyes()


      # Load first hair

      hairName = @$root.hair.name.toLowerCase().replace /\W/g, "_"

      @get "hairs", "/data/pony/hairs/" + hairName + ".json", ->
        self.parseSVGbasic self.hairs[self.$root.hair.name], "hairs"

      @get "emotions", "/data/pony/emotions.json", ->
        self.animate()
        self.eyes()


      # Set multi watcher

      @$watch (->
        [ @$root.tassels, @$root.fangs, @$root.catlike,

          @$root.jaw.open, @$root.jaw.sad,
          @$root.teeth.upper, @$root.teeth.lower,

          @$root.earClipEnabled,
          @$root.horn.changeling
        ].join()

      ), -> @animate(); return

    components: {
      Clip
      Fur
      Mane
      Shadow
    }
</script>

<style lang="sass">
  #nose, .eyes
    stroke-opacity: 0

  .Zone
    fill: transparent
    stroke: #af68
    stroke-width: 40

  #eye_Left, #eye_Right 
    mask: url("#mask_Head")

  #eyeGlare2_Left, #eyeGlare2_Right, #eyeGlare_Left, #eyeGlare_Right
    -moz-transform: rotate(30deg)
    transform: rotate(30deg)

  .inside
    transform-origin: center
    mask: url("#mask_Eyes")

  .eyes.mask
    mask: url("#mask_Head")

  .inner
    stroke: #ccc
    stroke-width: 9
    stroke-linejoin: bevel

  .inner2
    stroke: #ccc
    stroke-width: 10.5
    stroke-linejoin: bevel

  .inner3
    stroke: #ccc
    stroke-width: 20
    stroke-linejoin: bevel

  .inner4
    stroke: #ccc
    stroke-width: 7
    stroke-linejoin: bevel

  .outer
    stroke: #888
    stroke-width: 7
    stroke-linejoin: bevel
</style>
