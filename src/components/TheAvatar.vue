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

            Shadow(name="earLeftTassel")
            Shadow(name="earRightTassel")

            Shadow(name="earLeftInsideFront")
            Shadow(name="earRightInsideFront")

            Shadow(name="earLeftTasselFront")
            Shadow(name="earRightTasselFront")

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

  import Animate from "../assets/js/morphs/animate.coffee"
  import Hair from "../assets/js/morphs/hair.coffee"
  import Eyes from "../assets/js/morphs/eyes.coffee"

  export default
    data: ->
      morph: require("polymorph-js").interpolate

      body: {}
      furs:
        male: {}

      hairs: {}
      emotions: {}

      calcPaths: {}

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

      "$parent.male": -> @animate()

      "$root.mane.second.isEnds": -> @hair()

    computed:
      AbsoluteDegress: -> if @degress < 0 then -@degress else @degress

      EyesStyle: ->
        if @$root.eyes.changeling then @$root.eyes.color.right.basic else "#fff"

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

        @$root.horiz   = @horiz
        @$root.ang     = (@y * 90 * Math.abs(@x)) / 4
        @$root.degress = @degress

        @animate()
        @hair()
        @eyes()

        @last.x = e.pageX
        @last.y = e.pageY

      ApplySvg: (text) ->
        pathTo = text.split /(?=[A-Z])/
        elem   = @$root.$refs

        if elem[text].tagName isnt "path" then return

        if pathTo[pathTo.length - 1] is "Front" or
           pathTo[pathTo.length - 1] is "Zone" then return

        keys = @keys
        furs = @furs

        give = (inPath, i, isMale) ->
          if i < pathTo.length
            name = pathTo[i].toLowerCase()

            give inPath[name], i + 1

          else
            if Array.isArray inPath
              furs[text] = inPath
              keys[keys.length] = text

              if isMale
                furs.male[text] = inPath

              if text is "mouth"
                furs.mouthOuter = furs.mouth

            else
              if inPath.male
                give inPath.male["basic"], i, yes

              give inPath["basic"], i

        give @body, 0

      animate: ->
        refs  = @$root.$refs
        clips = @$root.path

        Animate this, refs, clips

      eyes: ->
        refs = @$root.$refs

        if !refs["eyeLeft"] or !refs["eyeRight"] then @eyes()

        left  = refs["eyeLeft"].getBBox()
        right = refs["eyeRight"].getBBox()

        Eyes this, left, right, refs

      hair: ->
        refs  = @$root.$refs
        clips = @$root.path

        Hair this, refs, clips

    mounted: ->
      @$root.$refs = { @$root.$refs..., @$refs... }

      self = this

      # Get JSON data to client and execute

      @get "body", "/data/pony/body.json", ->

        # SVG parsing - import

        for key of self.$root.$refs
          if key not in ["mouthOuter", "hair", "hairNape", "hairTail"]
            if key is "neckFront_left" or key is "hornSecond" or
              /^(.(?!Front|Second|SecondFront|Shadow|FrontShadow))*$/m.test key
                self.ApplySvg key

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
