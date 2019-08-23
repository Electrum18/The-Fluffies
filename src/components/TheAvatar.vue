<template lang="pug">
  #avatar.transition(v-press-hold="[MouseMove, Click]")
    svg(viewBox="0 -112 1024 1024" :style="mirror.style")
      g.scale
        g.HairBack(:style="[$root.headRotate, $root.hair.side.basic]")
          Mane(name="hairTail" style="transform: scale(-1, 1) translate(-100%)"
            mask="url(#mask_Out_Head2)")

          Mane(name="hairTailSecond"
            :hide="!$root.mane.second.enable"
            :is-not-stroke="$root.mane.second.notLines"
            style="transform: scale(-1, 1) translate(-100%)"
            mask="url(#mask_In_Hair_Tail)")

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

          g.HairBack3(style="transform: scale(-1, 1)"
            :style="$root.hair.side.alt" mask="url(#mask_no_RightEar_alt)")
            Mane(name="hairNape")
            Mane(name="hairNapeSecond" mask="url(#mask_In_Hair_Nape)"
              :hide="!$root.mane.second.enable"
              :is-not-stroke="$root.mane.second.notLines")

          Fur(name="head")

        g.Neck(:style="$root.furTint")
          Fur(name="chest")

          Fur.inner(name="neck" :style="$root.furStroke")

          Fur(name="neckBack_right" not-fill='yes')
          Fur(name="neckFront_left" not-fill='yes')

        g.HairBack2(:style="$root.headRotateHair" mask="url(#mask_Out_Head2)")
          Mane(name="hairTailFront" mask="url(#mask_no_RightEar_alt)")
          Mane(name="hairTailSecondFront"
            :hide="!$root.mane.second.enable"
            :is-not-stroke="$root.mane.second.notLines"
            mask="url(#mask_In_Hair_Tail)")

        g.Head(:style="[$root.headRotate, $root.furTint]")
          Fur.inner3(name="head2" alt='yes' :style="$root.furStroke")

        g.Hair2(:style="[$root.headRotate, $root.hair.side.basic]")
          Mane(name="hair" style="transform: scale(-1, 1) translate(-100%)")
          Mane(name="hairSecond" mask="url(#mask_In_Hair)"
            :hide="!$root.mane.second.enable"
            :is-not-stroke="$root.mane.second.notLines"
            style="transform: scale(-1, 1) translate(-100%)")

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
            ellipse#eyeIrisLeft(:fill="$root.eyeLeftGradient" ref="eyeIrisLeft")
            ellipse#eyePupilLeft(fill="#111" ref="eyePupilLeft")
            g
              ellipse#eyeGlareLeft( fill="#fff" ref="eyeGlareLeft")
              ellipse#eyeGlare2Left(fill="#fff" ref="eyeGlare2Left")

          Fur.inner4.move(name="eyeLeftLidDownFill" mask="url(#mask_Head)" :style="[$root.faceMove, $root.furStroke]")
          Fur.inner4.move(name="eyeLeftLidUpFill"   mask="url(#mask_Head)" :style="[$root.faceMove, $root.furStroke]")

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

        mask#mask_In_Hair(x="0" y="0" width="1024" height="1024")
          Clip(name="hairClip" fill="#fff" stroke-width=8 stroke="#000")

        mask#mask_In_Hair_Nape(x="0" y="0" width="1024" height="1024")
          Clip(name="hairNapeClip" fill="#fff" stroke-width=8 stroke="#000")

        mask#mask_In_Hair_Tail(x="0" y="0" width="1024" height="1024")
          Clip(name="hairTailClip" fill="#fff" stroke-width=8 stroke="#000")
          Clip(name="headClip"     fill="#000" stroke="#000" width="9.5")
          Clip(name="earRightClip" fill="#000" stroke="#000" width="9.5")

        linearGradient#grad_Eyes_Left(x1="0%" y1="100%" x2="0%" y2="0%")
          stop#1(offset="25%"  :style="{ 'stop-color': $root.eyes.color.left.basic, 'stop-opacity': 1 }")
          stop#2(offset="100%" :style="{ 'stop-color': $root.eyes.color.left.shade, 'stop-opacity': 1 }")

        linearGradient#grad_Eyes_Right(x1="0%" y1="100%" x2="0%" y2="0%")
          stop#1(offset="25%"  :style="{ 'stop-color': $root.eyes.color.right.basic, 'stop-opacity': 1 }")
          stop#2(offset="100%" :style="{ 'stop-color': $root.eyes.color.right.shade, 'stop-opacity': 1 }")
</template>

<script lang="coffee">
  import Clip from "./avatar/Clips.vue"
  import Fur  from "./avatar/Furs.vue"
  import Mane from "./avatar/Manes.vue"

  export default
    data: ->
      interpolate: require("polymorph-js").interpolate

      body: {}
      furs: {}
      hairs: {}
      emotions: {}

      degress: 10
      horiz: 0

      keys: new Array()

      x: 0.1111  # 10 degress (100% / 90deg)
      y: 0

      last:
        x: 0
        y: 0

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

      "$root.hair.name": (val) ->
        if @hairs[val] then @hair()
        else
          self = this
          hairName = @$root.hair.name.toLowerCase().replace /\W/g, "_"

          @get "hairs", "/data/pony/hairs/" + hairName + ".json", ->
            self.hair()

      "$root.hair.info": -> @hair()

      "$root.eyes":
        handler: -> @eyes()
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

    computed:
      AbsoluteDegress: -> if @degress < 0 then -@degress else @degress

    methods:
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

        @$root.horiz   = @horiz
        @$root.ang     = (@y * 90 * Math.abs(@x)) / 4
        @$root.degress = @degress

        @animate()
        @eyes()
        @hair()

        @last.x = e.pageX
        @last.y = e.pageY

      ApplySvg: (text) ->
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

        give @body, 0

      animate: ->
        clips  = @$root.path
        refs   = @$root.$refs

        for key in @keys
          paths  = @furs[key]
          length = paths.length - 1
          fullRange = (@degress / 90) * length

          absPercent = @AbsoluteDegress / 90

          if key in ["nose", "bridge", "mouth", "fangsLeft", "fangsRight",
            "nostrilLeft", "nostrilRight"]

            if @degress > 0
              if @degress > 30
                   fullRange = absPercent ** 0.7  * length
              else fullRange = absPercent ** 1.55 * length * 2.5
            else
              if @degress > -30
                   fullRange = absPercent ** 1.55 * length * 2.5
              else fullRange = absPercent ** 0.7  * length

          else if key in ["eyeLeftLashesUpper", "eyeLeftLashesMiddle",
            "eyeLeftLashesLower" ]

            if @degress > 0
              if @degress > 30
                   fullRange = absPercent ** 0.25 * length
              else fullRange = absPercent ** 0.75 * length * 1.75
            else
              if @degress > -30
                   fullRange = absPercent ** 0.75 * length * 1.75
              else fullRange = absPercent ** 0.25 * length

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

            if @$root.horiz <= 0 or @AbsoluteDegress >= 45
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
            closed = @body.eye.left.lashes

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
            closed = @body.eye.right.lashes

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
            eye  = @body.eye

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

        absolute = x: 0, y: 0

        if @$root.eyes.position.mode is "absolute"
          absolute =
            x: -@AbsoluteDegress / 1.5
            y: if @horiz < 0 then @horiz * 30 * 2 else @horiz * 30

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


        # Iris

        set
          elem: refs.eyeIrisLeft

          cx: middle.left.x + absolute.x
          cy: middle.left.y + absolute.y

          rx: 7.5  * scale + "%"
          ry: 13.5 * scale + "%"

        set
          elem: refs.eyeIrisRight

          cx: middle.right.x + (@AbsoluteDegress / 3) + absolute.x
          cy: middle.right.y + absolute.y

          rx: 7.5  * scale + "%"
          ry: 13.5 * scale + "%"


        # Pupils

        set
          elem: refs.eyePupilLeft

          cx: middle.left.x - 10 + absolute.x
          cy: middle.left.y + absolute.y

          rx: 6  * @$root.eyes.pupils.width  * scale / 100 + "%"
          ry: 10 * @$root.eyes.pupils.height * scale / 100 + "%"

        set
          elem: refs.eyePupilRight

          cx: middle.right.x + 10 + (@AbsoluteDegress / 3) + absolute.x
          cy: middle.right.y + absolute.y

          rx: 6  * @$root.eyes.pupils.width  * scale / 100 + "%"
          ry: 10 * @$root.eyes.pupils.height * scale / 100 + "%"


        # Glares

        ang = if @degress < 0 then 45 else -45
        pos = if @degress < 0 then 15 else -15

        set
          elem: refs.eyeGlareLeft

          cx: middle.left.x - (pos - (@AbsoluteDegress / 3) * scale) + absolute.x
          cy: middle.left.y - (85 * scale) + absolute.y

          rx: 3   * scale + "%"
          ry: 5.5 * scale + "%"

        refs.eyeGlareLeft.setAttribute "style",
          "transform: rotate(#{ ang }deg); transform-origin: " +
            "#{ middle.left.x - (pos - (@AbsoluteDegress / 3) * scale) + absolute.x }px " +
            "#{ middle.left.y - (85 * scale) + absolute.y }px"

        set
          elem: refs.eyeGlare2Left

          cx: middle.left.x + (pos * 2) + (@AbsoluteDegress / 3) + absolute.x
          cy: middle.left.y - (60 * scale) + absolute.y

          rx: 1.25 * scale + "%"
          ry: 2    * scale + "%"

        refs.eyeGlare2Left.setAttribute "style",
          "transform: rotate(#{ ang }deg); transform-origin: " +
            "#{ middle.left.x + (pos * 2) + (@AbsoluteDegress / 3) + absolute.x }px " +
            "#{ middle.left.y - (60 * scale) + absolute.y }px"


        set
          elem: refs.eyeGlareRight

          cx: middle.right.x - (pos - (@AbsoluteDegress / 3) * scale) + absolute.x
          cy: middle.right.y - (85 * scale) + absolute.y

          rx: 3   * scale + "%"
          ry: 5.5 * scale + "%"

        refs.eyeGlareRight.setAttribute "style",
          "transform: rotate(#{ ang }deg); transform-origin: " +
            "#{ middle.right.x - (pos - (@AbsoluteDegress / 3) * scale) + absolute.x }px " +
            "#{ middle.right.y - (85 * scale) + absolute.y }px"

        set
          elem: refs.eyeGlare2Right

          cx: middle.right.x + (pos * 2) + (@AbsoluteDegress / 3) + absolute.x
          cy: middle.right.y - (60 * scale) + absolute.y

          rx: 1.25 * scale + "%"
          ry: 2    * scale + "%"

        refs.eyeGlare2Right.setAttribute "style",
          "transform: rotate(#{ ang }deg); transform-origin: " +
            "#{ middle.right.x + (pos * 2) + (@AbsoluteDegress / 3) + absolute.x }px " +
            "#{ middle.right.y - (60 * scale) + absolute.y }px"

      hair: ->
        hair = @$root.hair

        if !hair.info[hair.id] then return

        refs      = @$root.$refs
        hairPaths = @hairs[hair.name]

        elems   = [
          "hair", "hairSecond",
          "hairNape", "hairNapeSecond",
          "hairTail", "hairTailSecond"
        ]

        imports = [
          hairPaths.front.main,
          hairPaths.front.second,
          hairPaths.back.main,
          hairPaths.back.second,
          hairPaths.tail.main,
          hairPaths.tail.second
        ]

        fixPath = hairPaths.fix

        fixing = [
          fixPath.front.main,
          fixPath.front.second,
          fixPath.back.main,
          fixPath.back.second,
          fixPath.tail.main,
          fixPath.tail.second
        ]

        for elem, i in elems
          paths     = imports[i]
          fullRange = @degress / 90 * 2

          frame = Math.floor fullRange
          range = fullRange - frame
          mirroring = hair.info[hair.id].mirroring

          if fixing[i].x
               origin = origin: fixing[i]
          else origin = origin: x: 0, y: 0

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

          if paths.length is 0 then setClear(); continue

          animHoriz =
            if frame > 1 and mirroring
              @interpolate [paths[4 - frame], paths[3 - frame]], origin
            else
              @interpolate [paths[frame], paths[frame + 1]], origin

          if elem in ["hair", "hairNape", "hairTail"]
            @$root.path[elem + "Clip"] = animHoriz range

          if elem in ["hair", "hairSecond"] then setFront()
          else if elem in ["hairTail", "hairTailSecond"] and hair isnt "Curly ends" and @degress > 0
            setFront()

          else if hair.name in ["Curly ends"]
            if elem in ["hairTail", "hairTailSecond"] and @degress > 0 then setFront() else
            if elem in ["hairNape", "hairNapeSecond"] and @degress < 0 then setFront()
            else setBehind()

          else setBehind()

        side = hair.side

        if @degress < 0 and not mirroring
          side.basic = transform: "scale(-1, 1)"
          side.alt   = transform: ""
          side.front = transform: ""

        else
          side.basic = transform: ""
          side.alt   = transform: "scale(-1, 1)"
          side.front = transform: "scale(-1, 1) translate(-100%)"

    mounted: ->
      @$root.$refs = { @$root.$refs..., @$refs...}

      self = this


      # Get JSON data to client and execute

      @get "body", "/data/pony/body.json", ->

        # SVG parsing - import

        for key of self.$root.$refs
          if key not in [
            "mouthOuter",
            "hair", "hairFront",
            "hairSecond", "hairSecondFront",
            "hairNape", "hairNapeFront",
            "hairNapeSecond", "hairNapeSecondFront",
            "hairTail", "hairTailFront",
            "hairTailSecond", "hairTailSecondFront"
          ]

            self.ApplySvg(key)

        self.animate()
        self.eyes()


      # Load first hair

      hairName = @$root.hair.name.toLowerCase().replace /\W/g, "_"

      @get "hairs", "/data/pony/hairs/" + hairName + ".json", -> self.hair()

      @get "emotions", "/data/pony/emotions.json", ->
        self.animate()
        self.eyes()


      # Set multi watcher

      @$watch (->
        [ @$root.tassels, @$root.fangs, @$root.catlike,

          @$root.jaw.open, @$root.jaw.sad,
          @$root.teeth.upper, @$root.teeth.lower,

          @$root.earClipEnabled,

          @$root.eyes.lashes.show
        ].join()

      ), -> @animate(); return

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
