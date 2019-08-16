<template lang="pug">
  #avatar.transition(
    :style="[ready, mirror.style]"

    v-press-hold="mouseMove"
  )
    svg(viewBox="0 -112 1024 1024")
      g.scale
        g.HairBack(:style="[$root.headRotate, $root.hairSide]")
          Mane(name="hairTail" style="transform: scale(-1, 1) translate(-100%)"
            mask="url(#mask_Out_Head2)")

        g.Head(:style="[$root.headRotate, $root.furTint]")
          g.moveEar(:style="$root.earsMove")
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

          g.HairBack3(style="transform: scale(-1, 1)" :style="$root.hairSideAlt")
            Mane(name="hairNape")

          Fur(name="head")

        g.Neck(:style="$root.furTint")
          Fur(name="chest")

          Fur.inner(name="neck" :style="$root.furStroke")

          Fur(name="neckBack_right" not-fill='yes')
          Fur(name="neckFront_left" not-fill='yes')

        g.HairBack2(:style="$root.headRotateHair" mask="url(#mask_Out_Head2)")
          Mane(name="hairTailFront" mask="url(#mask_no_RightEar_alt)")

        g.Head(:style="[$root.headRotate, $root.furTint]")
          Fur.inner3(name="head2" alt='yes' :style="$root.furStroke")

        g.Hair2(:style="[$root.headRotate, $root.hairSide]")
          Mane(name="hair" style="transform: scale(-1, 1) translate(-100%)")

        g.Head(:style="[$root.headRotate, $root.furTint]")
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

          path#eyeLeftLashesUpper.outer.move(d fill-opacity="0" ref="eyeLeftLashesUpper"
            :style="[$root.faceMove, { stroke: '#222' }]")
          path#eyeLeftLashesMiddle.outer.move(d fill-opacity="0" ref="eyeLeftLashesMiddle"
            :style="[$root.faceMove, { stroke: '#222' }]")
          path#eyeLeftLashesLower.outer.move(d fill-opacity="0" ref="eyeLeftLashesLower"
            :style="[$root.faceMove, { stroke: '#222' }]")

          path#eyeLeft.eyes.move(d fill="#fff" mask="url(#mask_Head)" ref="eyeLeft" :style="$root.faceMove")

          path#eyeLeftBrow.outer.move(d fill-opacity="0" ref="eyeLeftBrow"
            :style="[$root.leftBrowWidth, $root.leftBrowHeight, { stroke: '#222' }]" mask="url(#mask_Head)")

          g.eyes.inside.Left(:style="$root.faceMove")
            ellipse#eyeIrisLeft( fill="url(#grad_Eyes)" ref="eyeIrisLeft")
            ellipse#eyePupilLeft(fill="#111"            ref="eyePupilLeft")
            g
              ellipse#eyeGlareLeft( fill="#fff" ref="eyeGlareLeft")
              ellipse#eyeGlare2Left(fill="#fff" ref="eyeGlare2Left")

          Fur.inner4.move(name="eyeLeftLidDownFill" mask="url(#mask_Head)" :style="[$root.faceMove, $root.furStroke]")
          Fur.inner4.move(name="eyeLeftLidUpFill"   mask="url(#mask_Head)" :style="[$root.faceMove, $root.furStroke]")

          path#eyeLeftLidDown.outer.move(d fill-opacity="0" mask="url(#mask_Head)"
            :style="[$root.faceMove, $root.furTint]" ref="eyeLeftLidDown")
          path#eyeLeftLidUp.outer.move(  d fill-opacity="0" mask="url(#mask_Head)"
            :style="[$root.faceMove, { stroke: '#222' }]" ref="eyeLeftLidUp")

          Fur(name="nose" stroke-width=7 :style="$root.furStroke")
          Fur(name="chinAngle" not-fill='yes')
          Fur(name="chin"      not-fill='yes' mask="url(#mask_Out_Head)")

          Fur.move(name="bridge" :style="$root.faceMove")

          g(mask="url(#mask_In_Head)" :style="$root.faceMove")
            path#mouth.move(d fill="#c47" stroke-width=7 ref="mouth")

            g(mask="url(#mask_In_Mouth)")
              path#tongue.mode(    d fill="#e83" stroke-width=5 stroke="#d72" ref="tongue")
              path#teethUpper.mode(d fill="#ffe" stroke-width=3 stroke="#ccb" ref="teethUpper")
              path#teethLower.mode(d fill="#ffe" stroke-width=3 stroke="#ccb" ref="teethLower")

            path#fangsLeft.move( d fill="#ffe" stroke-width=3 stroke="#ccb" ref="fangsLeft")
            path#fangsRight.move(d fill="#ffe" stroke-width=3 stroke="#ccb" ref="fangsRight")

            Fur.move(name="mouthOuter"  stroke-width=7 not-fill='yes')

          Fur.move(name="nostrilLeft" stroke-width=7 :style="$root.faceMove"
            mask="url(#mask_In_Nose)")

          Fur.move(name="nostrilRight" stroke-width=7 :style="$root.faceMove")

          g(mask="url(#mask_In_Head)" :style="$root.faceMove")
            path#mouthZone.Zone.move(d fill="#c47" ref="mouthZone")

          path#eyeRight.eyes.move(d fill="#fff" mask="url(#mask_Head)" :style="$root.faceMove" ref="eyeRight")

          g.eyes.inside.Right(:style="$root.faceMove")
            ellipse#eyeIrisRight( fill="url(#grad_Eyes)" ref="eyeIrisRight")
            ellipse#eyePupilRight(fill="#111"            ref="eyePupilRight")
            g
              ellipse#eyeGlareRight( fill="#fff" ref="eyeGlareRight")
              ellipse#eyeGlare2Right(fill="#fff" ref="eyeGlare2Right")

          Fur.inner4.move(name="eyeRightLidDownFill" mask="url(#mask_Head)"
            :style="[$root.faceMove, $root.furStroke]")
          Fur.inner4.move(name="eyeRightLidUpFill"   mask="url(#mask_Head)"
            :style="[$root.faceMove, $root.furStroke]")

          path#eyeRightLidDown.outer.move(d fill-opacity="0" mask="url(#mask_Head)"
            :style="[$root.faceMove, $root.furTint]" ref="eyeRightLidDown")
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
          Mane(name="hairFront"     :style="$root.hairSideFront")
          Mane(name="hairNapeFront" :style="$root.hairSideFront")

      defs
        mask#mask_Head(x="0" y="0" width="1024" height="1024")
          Clip(name="headClip" fill="#fff" stroke="#000" width="9.5" :style="$root.faceMoveReverse")

        mask#mask_Out_Head(x="0" y="0" width="1024" height="1024")
          rect(width="100%" height="100%" fill="#fff")
          Clip(name="headClip" fill="#000" stroke="#fff" width="9.5")

        mask#mask_Out_Head2(x="0" y="0" width="1024" height="1024")
          rect(width="100%" height="100%" fill="#fff")
          Clip(name="headClip"     fill="#000" stroke="#000" width="9.5")
          Clip(name="earRightClip" fill="#000" stroke="#000" width="9.5")

        mask#mask_In_Head(x="0" y="0" width="1024" height="1024")
          Clip(name="headClip" fill="#fff" stroke="#fff" width="9.5")
          Clip(name="noseClip" fill="#fff" stroke="#fff" width="9.5")

        mask#mask_In_Nose(x="0" y="0" width="1024" height="1024")
          Clip(name="noseClip" fill="#fff" stroke="#fff" width="14")

        mask#mask_no_RightEar(x="0" y="0" width="1024" height="1024")
          rect(width="100%" height="100%" fill="#fff")
          Clip(name="earRightClip" fill="#000" stroke="#000" :style="$root.earsClip")

        mask#mask_no_RightEar_alt(x="0" y="0" width="1024" height="1024")
          rect(width="100%" height="100%" fill="#fff")
          Clip(name="earRightClip" fill="#000" stroke="#000" :style="$root.earsClipAlt")

        mask#mask_Eyes(x="0" y="0" width="2024" height="2024")
          path#eyeLeftClip.eyes.Left(  :d="$root.path.eyeLeftClip"  fill="#fff")
          path#eyeRightClip.eyes.Right(:d="$root.path.eyeRightClip" fill="#fff")

          g(:style="$root.faceMoveReverse")
            Clip(name="headClip" fill="#0000" stroke="#000" width="10")
            circle(cx="512" cy="512" r="512" stroke="#000" stroke-width="517" fill="#0000")

        mask#mask_In_Mouth(x="0" y="0" width="1024" height="1024")
          Clip(name="mouthClip" fill="#fff" stroke="#000" width="6.5")

        linearGradient#grad_Eyes(x1="0%" y1="100%" x2="0%" y2="0%")
          stop#1(offset="25%"  :style="{ 'stop-color': $root.eyes.color.basic, 'stop-opacity': 1 }")
          stop#2(offset="100%" :style="{ 'stop-color': $root.eyes.color.shade, 'stop-opacity': 1 }")
</template>

<script lang="coffee">
  import Clip from "./avatar/Clips.vue"
  import Fur  from "./avatar/Furs.vue"
  import Mane from "./avatar/Manes.vue"

  import * as bodyFirst from "./../assets/data/pony/body.json"
  import * as hair from "./../assets/data/pony/hair.json"
  import * as emotion from "./../assets/data/pony/emotions.json"

  { interpolate } = require "polymorph-js"

  body = bodyFirst.default

  export default
    data: ->
      ready:
        bottom: ""
        transition: ""

      interpolate: interpolate

      furs:     {}
      hairs:    hair.default
      emotions: emotion.default

      degress: 10

      keys: new Array()

      mirror:
        basic: no  # Avatar isnt mirrored in this time
        style:
          left: "50%"
          transform: "translate(-50%) scale(1, 1)"

    watch:
      "mirror.basic": (e) ->
        @mirror.style.transform =
          "translate(-50%) scale(#{ if e then -1 else 1 }, 1)"

      "$parent.editor.opened": (val) ->
        @mirror.style.left = if val then "33%" else "50%"

      degress: (num) ->
        if num < 0
             @mirror.basic = yes
        else @mirror.basic = no

      "$root.hair": -> @hair()

    computed:
      absoluteDegress: -> if @degress < 0 then -@degress else @degress

    methods:
      mouseMove: (e) ->
        if not e.pageX then e = e.touches[0]

        if @ready.transition isnt "all 0s, left .25s"
          @ready.transition = "all 0s, left .25s"

        BCR = @$el.getBoundingClientRect()

        ang = Math.atan2(
          e.pageX - (BCR.left + BCR.width  / 2),
          e.pageY - (BCR.top  + BCR.height / 2)
        ) * 180 / Math.PI

        percent =               (e.pageX / (BCR.left + BCR.width / 2) - 1) * 1.5
        horiz   = -(e.pageY - (BCR.top)) / (BCR.left + BCR.width / 2)      + 1

        if percent >  1 then percent =  1 else
          if percent < -1 then percent = -1

        @degress = percent * 90

        horiz =
          if horiz < -1 then horiz = -1 else
            if horiz > 1 then horiz = 1 else horiz

        if percent < 0 then percent = -percent
        if ang < 0 then ang = -ang

        if horiz < 0 then horiz = horiz / 2

        @$root.horiz   = horiz * (1 - percent) ** 7
        @$root.ang     = -((ang - 90) * percent) / 2
        @$root.degress = @degress

        @animate()
        @eyes()
        @hair()
      
      applySvg: (text) ->
        pathTo = text.split /(?=[A-Z])/
        elem   = @$root.$refs

        if elem[text].parentElement.tagName isnt "g" or
           elem[text].tagName               isnt "path" then return

        if pathTo[pathTo.length - 1] is "Front" or
           pathTo[pathTo.length - 1] is "Zone" then return

        furs = @furs
        keys = @keys

        give = (inPath, i) ->
          if i < pathTo.length
            name = pathTo[i].toLowerCase()

            give inPath[name], i + 1

          else
            if Array.isArray inPath
              furs[text] = inPath

              keys[keys.length] = text

              if text = "mouth"
                furs.mouthOuter = furs.mouth

            else give inPath["basic"], i

        give body, 0

      animate: ->
        clips  = @$root.path
        refs   = @$root.$refs

        for key in @keys
          paths = @furs[key]
          fullRange = @degress / 90 * (paths.length - 1)

          if key in ["nose", "bridge", "mouth", "fangsLeft", "fangsRight",
            "nostrilLeft", "nostrilRight"]

            if @degress > 0
              if @degress > 30
                   fullRange = (@absoluteDegress / 90) ** 0.7 * (paths.length - 1)
              else fullRange = (@absoluteDegress / 90) ** 1.55  * (paths.length - 1) * 2.5
            else
              if @degress > -30
                   fullRange = (@absoluteDegress / 90) ** 1.55  * (paths.length - 1) * 2.5
              else fullRange = (@absoluteDegress / 90) ** 0.7 * (paths.length - 1)

          else if key in ["eyeLeftLashesUpper", "eyeLeftLashesMiddle",
            "eyeLeftLashesLower" ]

            if @degress > 0
              if @degress > 30
                   fullRange = (@absoluteDegress / 90) ** 0.25 * (paths.length - 1)
              else fullRange = (@absoluteDegress / 90) ** 0.75 * (paths.length - 1) * 1.75
            else
              if @degress > -30
                   fullRange = (@absoluteDegress / 90) ** 0.75 * (paths.length - 1) * 1.75
              else fullRange = (@absoluteDegress / 90) ** 0.25 * (paths.length - 1)

          frame = Math.floor fullRange
          range = fullRange - frame

          if frame < 0
            frame = paths.length - 1 + frame
            range = 1 - range

          else frame = paths.length - 2 - frame

          if frame < 0 then frame = 0; range = 1

          isEyelid  =
            [ "eyeLeftLidUp",  "eyeLeftLidUpFill",  "eyeLeftLidDown",  "eyeLeftLidDownFill",
              "eyeRightLidUp", "eyeRightLidUpFill", "eyeRightLidDown", "eyeRightLidDownFill" ]

          lashes =
            left:  ["eyeLeftLashesUpper",  "eyeLeftLashesMiddle",  "eyeLeftLashesLower" ]
            right: ["eyeRightLashesUpper", "eyeRightLashesMiddle", "eyeRightLashesLower"]

          # Set ear to "front or not"

          if key in ["earRightInside", "earRightPinna", "earRight",
            "earRightTasselInside", "earRightTassel"]

            key2 = key

            if @$root.horiz <= 0 or @absoluteDegress >= 45
              if key in ["earRightTassel", "earRightTasselInside"] and not @$root.tassels
                refs[key + "Front"].setAttribute "d", ""
                refs[key].setAttribute "d", ""

              else
                animHoriz = @interpolate [paths[frame + 1], paths[frame]]

                refs[key2 + "Front"].setAttribute "d", animHoriz range
                refs[key2].setAttribute "d", ""

            else
              if key in ["earRightTassel", "earRightTasselInside"] and not @$root.tassels
                refs[key + "Front"].setAttribute "d", ""
                refs[key].setAttribute "d", ""

              else
                animHoriz = @interpolate [paths[frame + 1], paths[frame]]

                refs[key + "Front"].setAttribute "d", ""
                refs[key].setAttribute "d", animHoriz range

          else if key in isEyelid
            eyelids  = @$root.eyes.eyelids
            refs     = @$root.$refs
            emotions = @emotions.eyelid

            ids = isEyelid.indexOf key

            eyelid = [
              { val: eyelids.left.up,    target: emotions.left.down      }
              { val: eyelids.left.up,    target: emotions.left.up.fill   }
              { val: eyelids.left.down,  target: emotions.left.up.basic  }
              { val: eyelids.left.down,  target: refs["eyeLeft"].getAttribute "d" }
              { val: eyelids.right.up,   target: emotions.right.down     }
              { val: eyelids.right.up,   target: emotions.right.up.fill  }
              { val: eyelids.right.down, target: emotions.right.up.basic }
              { val: eyelids.right.down, target: refs["eyeRight"].getAttribute "d" }
            ]

            if @degress >= 0
              id = if ids < 4 then ids + 4 else ids - 4

              target = eyelid[id].target
              val    = eyelid[ids].val
              elem   = isEyelid[id]

              if val > 0 or key in ["eyeLeftLidUp", "eyeRightLidUp"]
                if typeof target isnt "string"
                  animSecond = @interpolate [target[frame + 1], target[frame]]
                  target     = animSecond range

                animSecond = @interpolate [@furs[elem][frame + 1], @furs[elem][frame]]
                animSumm   = @interpolate [animSecond(range), target]

                refs[elem].setAttribute "d", animSumm val / 100

              else refs[elem].setAttribute "d", ""

            else
              target = eyelid[ids].target
              val    = eyelid[ids].val

              if eyelid[ids].val > 0 or key in ["eyeLeftLidUp", "eyeRightLidUp"]
                if typeof target isnt "string"
                  animSecond = @interpolate [target[frame + 1], target[frame]]
                  target     = animSecond range

                animHoriz = @interpolate [paths[frame + 1], paths[frame]]
                animSumm = @interpolate [animHoriz(range), target]

                refs[key].setAttribute "d", animSumm val / 100

              else refs[key].setAttribute "d", ""

          else if key in ["earLeftTasselInside", "earLeftTassel"]
            if @$root.tassels
              animHoriz = @interpolate [paths[frame + 1], paths[frame]]

              refs[key].setAttribute "d", animHoriz range

            else refs[key].setAttribute "d", ""

          else if key in ["fangsLeft", "fangsRight"]
            if @$root.fangs
              animHoriz = @interpolate [paths[frame + 1], paths[frame]]

              refs[key].setAttribute "d", animHoriz range

            else refs[key].setAttribute "d", ""

          else if key is "mouth"
            if @$root.catlike
              animHoriz =
                @interpolate [
                  @emotions.catlike.jaw[frame + 1],
                  @emotions.catlike.jaw[frame]
                ]

            else animHoriz = @interpolate [paths[frame + 1], paths[frame]]

            jaw  = @$root.jaw
            type = if @$root.catlike then "catlike" else "basic"

            animSad =
              @interpolate [
                @emotions.sad.jaw[type].closed[frame + 1],
                @emotions.sad.jaw[type].closed[frame]
              ]

            animOpen =
              @interpolate [
                @emotions.open.jaw[type][frame + 1],
                @emotions.open.jaw[type][frame]
              ]

            animOpenSad =
              @interpolate [
                @emotions.sad.jaw[type].open[frame + 1],
                @emotions.sad.jaw[type].open[frame]
              ]

            animSumm     = @interpolate [animHoriz(range), animSad range    ]
            animSummOpen = @interpolate [animOpen(range),  animOpenSad range]
            animMouth    =
              @interpolate [
                animSumm(jaw.sad / 100),
                animSummOpen jaw.sad / 100
              ]

            refs[key].setAttribute          "d", animMouth jaw.open / 100
            refs["mouthOuter"].setAttribute "d", animSumm  jaw.sad  / 100

            clips[key + "Clip"] = animMouth jaw.open / 100

          else if key in lashes.left
            if fullRange >= 1.9 or not @$root.eyes.lashes.show
              refs[key].setAttribute "d", ""

              continue

            val     = @$root.eyes.eyelids.left.up
            closed = body.eye.left.lashes

            index = lashes.left.indexOf key
            parts = ["upper", "middle", "lower"]
            path  = closed[parts[index]].closed

            animHoriz = @interpolate [paths[frame + 1], paths[frame]]

            animLashesDown = @interpolate [path[frame + 1], path[frame]]
            animLashesSumm =
              @interpolate [animHoriz(range), animLashesDown range]

            if @degress >= 0 then val = @$root.eyes.eyelids.right.up

            refs[key].setAttribute "d", animLashesSumm val / 100

          else if key in lashes.right
            if not @$root.eyes.lashes.show
              refs[key].setAttribute "d", ""

              continue

            val    = @$root.eyes.eyelids.right.up
            closed = body.eye.right.lashes

            index = lashes.right.indexOf key
            parts = ["upper", "middle", "lower"]
            path  = closed[parts[index]].closed

            animHoriz = @interpolate [paths[frame + 1], paths[frame]]

            animLashesDown = @interpolate [path[frame + 1], path[frame]]
            animLashesSumm =
              @interpolate [animHoriz(range), animLashesDown range]

            if @degress >= 0 then val = @$root.eyes.eyelids.left.up

            refs[key].setAttribute "d", animLashesSumm val / 100

          else if key in ["eyeLeftBrow", "eyeRightBrow"]
            side    = if key  is "eyeLeftBrow" then "left" else "right"
            sideAlt = if side is "left"        then "right" else "left"

            brow = @$root.eyes.brows
            eye  = body.eye

            evil = eye[side].brow.evil
            wide = eye[side].brow.wide

            val =
              evil: if @degress >= 0 then brow[sideAlt].evil else brow[side].evil
              wide: if @degress >= 0 then brow[sideAlt].wide else brow[side].wide

            animHoriz = @interpolate [paths[frame + 1], paths[frame]]

            animBrowEvil = @interpolate [evil[frame + 1], evil[frame]]
            animBrowSumm =
              @interpolate [animHoriz(range), animBrowEvil range]

            animBrowWide  = @interpolate [wide[frame + 1], wide[frame]]
            animBrowSumm2 =
              @interpolate [animBrowSumm(val.evil / 100), animBrowWide range]

            refs[key].setAttribute "d", if brow.show then animBrowSumm2 val.wide / 100 else ""

          else
            animHoriz = @interpolate [paths[frame + 1], paths[frame]]

            refs[key].setAttribute "d", animHoriz range


          # Teeth position

          if key is "tongue"
            refs[key].setAttribute "style",
              "transform: translate(0%, #{ -(2 - @$root.jaw.open / 50) }%)"

          else if key is "teethUpper"
            refs[key].setAttribute "style",
              "transform: translate(0%, #{ -(4 - @$root.teeth.upper / 25) }%)"

          else if key is "teethLower"
            refs[key].setAttribute "style",
              "transform: translate(0%, #{ 4 - @$root.teeth.lower / 25 }%)"


          # Set clip paths

          else if key in ["head", "nose", "eyeLeft", "eyeRight"]
            animHoriz = @interpolate [paths[frame + 1], paths[frame]]

            clips[key + "Clip"] = animHoriz range

          else if key in ["earLeft", "earRight"] and @$root.earClipEnabled
            animHoriz = @interpolate [paths[frame + 1], paths[frame]]

            clips[key + "Clip"] = animHoriz range


      eyes: ->
        refs = @$root.$refs

        bbox =
          left:  refs.eyeLeft.getBBox()
          right: refs.eyeRight.getBBox()

        scale = @$root.eyes.iris.scale / 100
        posit = @$root.eyes.position

        shift =
          y: posit.verti - 50  # What?
          x: posit.horiz - 50

        derp = posit.derp

        if @degress < 0 then shift.x = -shift.x; derp = -derp

        middle =
          left:
            x: bbox.left.x + bbox.left.width  / 2 - 10 + shift.x - (25 - posit.focus / 4)
            y: bbox.left.y + bbox.left.height / 2 + 16 - shift.y + (derp / 1.5)

          right:
            x: bbox.right.x + bbox.right.width  / 2 + 10 + shift.x + (25 - posit.focus / 4)
            y: bbox.right.y + bbox.right.height / 2 + 16 - shift.y - (derp / 1.5)

        set = (obj) ->
          obj.elem.setAttribute "cx", obj.cx
          obj.elem.setAttribute "cy", obj.cy
          obj.elem.setAttribute "rx", obj.rx
          obj.elem.setAttribute "ry", obj.ry

        absolute = 0

        if @$root.eyes.position.mode is "absolute"
          absolute = -@absoluteDegress / 2


        # Iris

        set
          elem: refs.eyeIrisLeft

          cx: middle.left.x + absolute
          cy: middle.left.y

          rx: 7.5  * scale + "%"
          ry: 13.5 * scale + "%"

        set
          elem: refs.eyeIrisRight

          cx: middle.right.x + (@absoluteDegress / 3) + absolute
          cy: middle.right.y

          rx: 7.5  * scale + "%"
          ry: 13.5 * scale + "%"


        # Pupils

        set
          elem: refs.eyePupilLeft

          cx: middle.left.x - 10 + absolute
          cy: middle.left.y

          rx: 6  * @$root.eyes.pupils.width  * scale / 100 + "%"
          ry: 10 * @$root.eyes.pupils.height * scale / 100 + "%"

        set
          elem: refs.eyePupilRight

          cx: middle.right.x + 10 + (@absoluteDegress / 3) + absolute
          cy: middle.right.y

          rx: 6  * @$root.eyes.pupils.width  * scale / 100 + "%"
          ry: 10 * @$root.eyes.pupils.height * scale / 100 + "%"


        # Glares

        ang = if @degress < 0 then 45 else -45
        pos = if @degress < 0 then 15 else -15

        set
          elem: refs.eyeGlareLeft

          cx: middle.left.x - (pos - (@absoluteDegress / 3) * scale) + absolute
          cy: middle.left.y - (85 * scale)

          rx: 3   * scale + "%"
          ry: 5.5 * scale + "%"

        refs.eyeGlareLeft.setAttribute "style",
          "transform: rotate(#{ ang }deg); transform-origin: " +
            "#{ middle.left.x - (pos - (@absoluteDegress / 3) * scale) + absolute }px " +
            "#{ middle.left.y - (85 * scale) }px"

        set
          elem: refs.eyeGlare2Left

          cx: middle.left.x + (pos * 2) + (@absoluteDegress / 3) + absolute
          cy: middle.left.y - (60 * scale)

          rx: 1.25 * scale + "%"
          ry: 2    * scale + "%"

        refs.eyeGlare2Left.setAttribute "style",
          "transform: rotate(#{ ang }deg); transform-origin: " +
            "#{ middle.left.x + (pos * 2) + (@absoluteDegress / 3) + absolute }px " +
            "#{ middle.left.y - (60 * scale) }px"


        set
          elem: refs.eyeGlareRight

          cx: middle.right.x - (pos - (@absoluteDegress / 3) * scale) + absolute
          cy: middle.right.y - (85 * scale)

          rx: 3   * scale + "%"
          ry: 5.5 * scale + "%"

        refs.eyeGlareRight.setAttribute "style",
          "transform: rotate(#{ ang }deg); transform-origin: " +
            "#{ middle.right.x - (pos - (@absoluteDegress / 3) * scale) + absolute }px " +
            "#{ middle.right.y - (85 * scale) }px"

        set
          elem: refs.eyeGlare2Right

          cx: middle.right.x + (pos * 2) + (@absoluteDegress / 3) + absolute
          cy: middle.right.y - (60 * scale)

          rx: 1.25 * scale + "%"
          ry: 2    * scale + "%"

        refs.eyeGlare2Right.setAttribute "style",
          "transform: rotate(#{ ang }deg); transform-origin: " +
            "#{ middle.right.x + (pos * 2) + (@absoluteDegress / 3) + absolute }px " +
            "#{ middle.right.y - (60 * scale) }px"

      hair: ->
        refs      = @$root.$refs
        hairPaths = @hairs[@$root.hair]

        elems   = ["hair", "hairNape", "hairTail"]
        imports = [
          hairPaths.front.main,
          hairPaths.back.main,
          hairPaths.tail.main
        ]

        for elem, i in elems
          paths     = imports[i]
          fullRange = @degress / 90 * 2

          frame = Math.floor fullRange
          range = fullRange - frame

          setBehind = ->
            refs[elem].setAttribute "d", animHoriz range
            refs[elem + "Front"].setAttribute "d", ""

          setFront = ->
            refs[elem + "Front"].setAttribute "d", animHoriz range
            refs[elem].setAttribute "d", ""

          setClear = ->
            refs[elem].setAttribute "d", ""
            refs[elem + "Front"].setAttribute "d", ""

          frame = 2 + frame

          if frame > 3 then frame = 3; range = 1

          if not paths[frame] then setClear(); continue

          animHoriz = @interpolate [paths[frame], paths[frame + 1]]

          if elem is "hair" then setFront()
          else if elem is "hairTail" and @$root.hair isnt "Curly ends" and @degress > 0
            setFront()

          else if @$root.hair is "Curly ends"
            if elem is "hairTail" and @degress > 0 then setFront() else
            if elem is "hairNape" and @degress < 0 then setFront()
            else setBehind()

          else setBehind()

        if @degress < 0 and @$root.hair not in ["Spiky to side", "Big Bang"]
          @$root.hairSide      = transform: "scale(-1, 1)"
          @$root.hairSideAlt   = transform: ""
          @$root.hairSideFront = transform: ""

        else
          @$root.hairSide      = transform: ""
          @$root.hairSideAlt   = transform: "scale(-1, 1)"
          @$root.hairSideFront = transform: "scale(-1, 1) translate(-100%)"

    mounted: ->
      @$root.$refs = { @$root.$refs..., @$refs...}

      @ready.bottom = "0%"
      @ready.transition = "all 0s, left .25s"


      # SVG parsing - import

      for key of @$root.$refs
        if key not in [ "mouthOuter", "hair", "hairFront", "hairNape",
          "hairNapeFront", "hairTail", "hairTailFront" ]

          @applySvg(key)


      # Set multi watcher

      eyes     = @$root.eyes
      pupils   = eyes.pupils
      position = eyes.position
      eyelids  = eyes.eyelids
      brows    = eyes.brows

      @$watch (->
        [
          eyes.iris.scale,
          pupils.width, pupils.height,

          position.horiz, position.verti, position.focus, position.derp,

          position.mode
        ].join()

      ), -> @eyes(); return

      @$watch (->
        [ eyes.iris.scale

          pupils.width, pupils.height
          position.horiz, position.verti

          position.focus, position.derp
          position.mode
        ].join()

      ), -> @eyes(); return

      @$watch (->
        [ eyelids.left.up,  eyelids.left.down,
          eyelids.right.up, eyelids.right.down,

          @$root.tassels, @$root.fangs, @$root.catlike,

          @$root.jaw.open, @$root.jaw.sad,
          @$root.teeth.upper, @$root.teeth.lower,

          @$root.earClipEnabled,

          eyes.lashes.show,

          brows.show,
          brows.left.height, brows.right.height,
          brows.left.evil,   brows.right.evil,
          brows.left.wide,   brows.right.wide
        ].join()

      ), -> @animate(); return

      @animate()
      @eyes()
      @hair()

    components: {
      Clip
      Fur
      Mane
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
