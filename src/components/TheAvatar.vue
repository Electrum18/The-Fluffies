<template lang="pug">
  #avatar.transition(v-press-hold="[MouseMove, Click, Holding]")
    svg(viewBox="0 -112 1024 1024" :style="mirror.style")
      g.scale
        g.HairBack(:style="[$root.headRotate, $root.hair.side.basic]" :filter="$root.Shading")
          Mane(name="hairTail" style="transform: scale(-1, 1) translate(-100%)"
            mask="url(#mask_Out_Head2)")

          Mane(name="hairTailSecond" :filter="$root.Shading"
            :hide="!$root.mane.second.enable"
            :is-not-stroke="$root.mane.second.notLines"
            style="transform: scale(-1, 1) translate(-100%)"
            mask="url(#mask_In_Hair_Tail)")

        g.Head(:style="[$root.headRotate, $root.furTint]" :filter="$root.Shading")
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

        g.Neck(:style="$root.furTint" :filter="$root.Shading")
          Fur(name="chest")

          Fur.inner(name="neck" :style="$root.furStroke")

          Fur(name="neckBack_right" not-fill='yes')
          Fur(name="neckFront_left" not-fill='yes')

        g.HairBack2(:style="$root.headRotateHair" mask="url(#mask_Out_Head2)")
          Mane(name="hairTailFront" mask="url(#mask_no_RightEar_alt)" :filter="$root.Shading")
          Mane(name="hairTailSecondFront"
            :hide="!$root.mane.second.enable"
            :is-not-stroke="$root.mane.second.notLines"
            mask="url(#mask_In_Hair_Tail)")

        g.Head(:style="[$root.headRotate, $root.furTint]" :filter="$root.Shading")
          Fur.inner3(name="head2" alt='yes' :style="$root.furStroke")

        g.Hair2(:style="[$root.headRotate, $root.hair.side.basic]" :filter="$root.Shading")
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

        g.Hair(:style="$root.headRotate"
          mask="url(#mask_no_RightEar)" :filter="$root.Shading"
        )
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

        mask#mask_In_Head(x="-512" y="-512" width="1024" height="1024")
          Clip(name="headClip" fill="#fff" stroke="#fff" width="9.5")
          Clip(name="noseClip" fill="#fff" stroke="#fff" width="9.5")

        mask#mask_In_Nose(x="-512" y="-512" width="1024" height="1024")
          Clip(name="noseClip" fill="#fff" stroke="#fff" width="14")

        mask#mask_no_RightEar(x="-512" y="-512" width="1024" height="1024")
          rect(width="100%" height="100%" fill="#fff")
          Clip(name="earRightClip" fill="#000" stroke="#000" :style="$root.earsClip")

        mask#mask_no_RightEar_alt(x="-512" y="-512" width="1024" height="1024")
          rect(width="100%" height="100%" fill="#fff")
          Clip(name="earRightClip" fill="#000" stroke="#000" :style="$root.earsClipAlt")

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

        linearGradient#grad_Ambient(x1="0%" y1="100%" x2="0%" y2="0%")
          stop(offset="0%"   style="stop-color: #000; stop-opacity: 1 ")
          stop(offset="100%" style="stop-color: #fff; stop-opacity: 0 ")

        filter#filter_shadow(x="0" y="0" width="200%" height="200%")
          feOffset(result="offOut" in="SourceGraphic" dx="0" dy="20")
          feColorMatrix(result="matrixOut" in="offOut" type="matrix"
            values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.5 0")
          feGaussianBlur(result="blurOut" in="matrixOut" stdDeviation="10")
          feBlend(in="SourceGraphic" in2="blurOut" mode="normal")
</template>

<script lang="coffee">
  import Clip from "./avatar/Clips.vue"
  import Fur  from "./avatar/Furs.vue"
  import Mane from "./avatar/Manes.vue"

  export default
    data: ->
      interpolate: require("polymorph-js").interpolate

      body: {}
      furs:
        male: {}

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

      worker:
        animate: undefined
        hair:    undefined

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
        @eyes()
        @hair()

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

      calc: (name, callback) ->
        if Array.isArray name
          name2 = name[1]
          name  = name[0]

        if @$parent.male and @furs.male[name]
          if name2
               part = @furs.male[name][name2]
          else part = @furs.male[name]
        else
          if name2 and @furs[name]
               part = @furs[name][name2]
          else part = @furs[name]

        self = this
        root = @$root

        set = (name, second) ->
          if second
            if self.$parent.male and self.furs.male[name] and self.furs.male[name][second]
              if name2
                   part = self.furs.male[name][name2][second]
              else part = self.furs.male[name][second]
            else
              if name2
                   part = self.furs[name][name2][second]
              else part = self.furs[name][second]

          length = part.length - 1
          fullRange = self.x * length

          absPercent = self.AbsoluteDegress / 90

          if name is "chin"
            if self.degress > 0
              if self.degress > 30
                   fullRange = absPercent ** 0.75 * length
              else fullRange = absPercent ** 2.5  * length * 6.8
            else
              if self.degress > -30
                   fullRange = absPercent ** 2.5  * length * 6.8
              else fullRange = absPercent ** 0.75 * length

          else if name in ["nose", "bridge", "mouth", "fangs", "nostril", "teeth"]
            if self.degress > 0
              if self.degress > 30
                   fullRange = absPercent ** 0.5 * length
              else fullRange = absPercent ** 2   * length * 5.15
            else
              if self.degress > -30
                   fullRange = absPercent ** 2   * length * 5.15
              else fullRange = absPercent ** 0.5 * length

          else if name in ["eyeLeftLashesUpper", "eyeLeftLashesMiddle",
            "eyeLeftLashesLower" ]

            if self.degress > 0
              if self.degress > 30
                   fullRange = absPercent ** 0.25 * length
              else fullRange = absPercent ** 0.75 * length * 1.75
            else
              if self.degress > -30
                   fullRange = absPercent ** 0.75 * length * 1.75
              else fullRange = absPercent ** 0.25 * length


          frame = Math.floor fullRange
          range = fullRange - frame

          if frame < 0
            frame = part.length - 1 + frame
            range = 1 - range

          else frame = part.length - 2 - frame

          if frame < 0 then frame = 0; range = 1
          if not second then second = ""
          if not  name2 then  name2 = ""

          if callback then path = callback frame, part, name + name2 + second, fullRange

          if path and path.range isnt undefined then range = path.range

          pathData =
            if path and path.path then path.path range else
              if path and path.origin
                   self.interpolate([part[frame + 1], part[frame]], origin: path.origin) range
              else self.interpolate([part[frame + 1], part[frame]]) range

          elem = root.$refs[name + name2 + second]

          if root.$refs[name + name2 + second + "Front"]
            elemFront = root.$refs[name + name2 + second + "Front"]

          if path and path.front
            elemFront.setAttribute "d", pathData
            elem.setAttribute "d", ""

          else if path and path.clear
            elem.setAttribute "d", ""
            if elemFront then elemFront.setAttribute "d", ""

          else
            elem.setAttribute "d", pathData
            if elemFront then elemFront.setAttribute "d", ""

          if path and path.clip
            root.path[name + name2 + second + "Clip"] = pathData

        if Array.isArray part then setTimeout (-> set name)
        else
          if not part then return

          keys = Object.keys part

          for key in keys
            set name, key

      animate: ->
        @worker.animate.postMessage
          furs: @furs
          keys: @keys
          x: @x
          AbsoluteDegress: @AbsoluteDegress
          degress: @degress
          emotions: @emotions
          male: @$parent.male

          root:
            tassels: @$root.tassels
            eyes: @$root.eyes
            fangs: @$root.fangs
            catlike: @$root.catlike
            jaw: @$root.jaw
            horn: @$root.horn

          body: @body

          d:
            eyeLeft:  @$root.$refs["eyeLeft"].getAttribute "d"
            eyeRight: @$root.$refs["eyeRight"].getAttribute "d"

      eyes: ->
        refs = @$root.$refs

        bbox =
          left:  refs.eyeLeft.getBBox()
          right: refs.eyeRight.getBBox()

        if bbox.left.x is 0 or bbox.left.x is 0
          self = this
          setTimeout (-> self.eyes()), 100
          return

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


        if not @$root.eyes.changeling

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

        else
          elems =
            [ "eyePupilLeft",   "eyeGlareLeft",  "eyeGlare2Left",
              "eyePupilRight", "eyeGlareRight", "eyeGlare2Right" ]

          for elem in elems
            set
              elem: refs[elem]

              cx: 0, cy: 0
              rx: 0, ry: 0

      hair: ->
        @worker.hair.postMessage
          hair: @$root.hair
          hairs: @hairs
          mane: @$root.mane
          x: @x
          degress: @degress

    mounted: ->
      @$root.$refs = { @$root.$refs..., @$refs... }

      self = this

      clips = @$root.path
      refs  = @$root.$refs

      animate = new Worker "../workers/animate.js"
      animate.addEventListener "message", ($) ->
        $ = $.data

        if $.type is "refs"
          refs[$.key].setAttribute "d", $.path
        else
          clips[$.key] = $.path

        # Teeth position

        if $.key is "tongue"
          refs[$.key].setAttribute "style",
            "transform: translate(0%, #{ -(2 - self.$root.jaw.open / 50) }%)"

        else if $.key is "teethUpper"
          refs[$.key].setAttribute "style",
            "transform: translate(0%, #{ -(4 - self.$root.teeth.upper / 25) }%)"

        else if $.key is "teethLower"
          refs[$.key].setAttribute "style",
            "transform: translate(0%, #{ 4 - self.$root.teeth.lower / 25 }%)"

        # Set clip paths

        else if $.key in ["head", "nose", "eyeLeft", "eyeRight", "horn"]
          clips[$.key + "Clip"] = $.path

        else if $.key in ["earLeft", "earRight"] and self.$root.earClipEnabled
          clips[$.key + "Clip"] = $.path

      , false

      hair = new Worker "../workers/hair.js"
      hair.addEventListener "message", ($) ->
        $ = $.data

        if $.type is "refs"
          refs[$.key].setAttribute "d", $.path
        else
          clips[$.key] = $.path

      @worker.animate = animate
      @worker.hair    = hair


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
          @$root.horn.changeling
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
