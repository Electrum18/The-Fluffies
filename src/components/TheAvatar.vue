<template lang="pug">
  #avatar(v-press-hold="[MouseMove, Click, Hold]")
    canvas(:id="$root.name" ref="avatar")
</template>

<script lang="coffee">

  # Libraries

  import abs from "abs-svg-path"
  import parse from "parse-svg-path"
  import curvify from "curvify-svg-path"


  # Configs

  import Elems from "../pages/editor/configs/elems.json"
  import IS from "../pages/editor/configs/interpolationScheme.json"
  import Powers from "../pages/editor/configs/power.json"


  # Scripts

  import { findValue } from "./Avatar/animate.ts"

  export default
    data: ->
      quality: 0.5  # range from 0 to 1
      vmin: undefined

      male: no


      # Configs

      color: @$root.color
      state: @$root.propers # Using for "if" attribute in "elems" config

      layers: Elems
      math: Powers
      interpolationScheme: IS


      ctx: {}  # Context of canvas

      horiz: 0
      angle: 0  # Calculated angle for transformation

      x: 12.5 / 90  # Horizontal of angle in -1 to 1 range
      y: 0          # Vertical of angle in 0 to 1 range

      last:  # Last calculated variables for deltas
        x: 0
        y: 0
        time: 0

      paths: {}  # Imported and parsed svg references
      calculated: {}  # Calculated paths

      mirror: no  # Avatar isnt mirrored in this time
      executeAnimation: no # check for optimization
      afterChange: 0
      fullQuality: yes
      changedQuality: no

    watch:
      x: (num) -> @mirror = num < 0

      "$root.propers.hair.name": (name) ->
        if /Dreads/.test name['en']
          @state.hair.isDreads = yes
          @state.hair.isBasic  = no
        else
          @state.hair.isDreads = no
          @state.hair.isBasic  = yes


        if @paths.hairs[name['en']]
          @fullQuality = no
          @executeAnimation = yes
        else
          self = this
          hairName = name['en'].toLowerCase().replace /\W/g, "_"

          @getPartsJSON "hairs", "hairs/" + hairName + ".json"

      "$root.propers.glasses.name": (name) ->
        if @paths.glasses[name['en']]
          @fullQuality = no
          @executeAnimation = yes
        else
          self = this
          glassesName = name['en'].toLowerCase().replace /\W/g, "_"

          @getPartsJSON "glasses", "glasses/" + glassesName + ".json"


      "$root.propers.horn.name": (name) ->
        if @paths.horn[name['en']]
          @fullQuality = no
          @executeAnimation = yes
        else
          self = this
          hornsName = name['en'].toLowerCase().replace /\W/g, "_"

          @getPartsJSON "horn", "horns/" + hornsName + ".json"

      "$root.propers":
        handler: (val) ->
          @state = val

          {
            horn: refHorn,
            hair: { second: refSecond },
            eyes: { right: refEyesRight },
            piercings: refPiercings
          } = val

          { horn, hair, piercings } = @state


          # Horns

          horn.isBasic = refHorn.enable and !refHorn.changeling
          horn.isChnlg = refHorn.enable and refHorn.changeling

          lessThan45 = @x <= 0.5

          horn.behind          = lessThan45  and refHorn.rear
          horn.behindAfterEars = !lessThan45 and refHorn.rear


          # Hair

          hair.isSecond = !refSecond.isends and refSecond.enable
          hair.isEnds   =  refSecond.isends and refSecond.enable


          # Eyes

          if not refEyesRight.enable
            { right, left } = @color.eyes

            right.basic = left.basic


          @fullQuality = no
          @executeAnimation = yes

        deep: yes

      "$root.color":
        handler: (val) ->
          @color = val

          if not @state.eyes.right.enable
            @color.eyes.right.basic = val.eyes.left.basic

          @fullQuality = no
          @executeAnimation = yes

        deep: yes

    methods:
      getPartsJSON: (target, url) ->
        self    = this
        loader  = @$root.loadings
        capital = target[0].toUpperCase() + target.slice 1

        if target in ["glasses", "horn"]
          loader.push "#{capital} - #{@state[target].name['en']}"
        else if target is "hairs"
          loader.push "#{capital} - #{@state.hair.name['en']}"
        else
          loader.push capital

        @$http
          .get(window.location.origin + "/data/" + url)
          .then (res) ->
            loader.splice loader.indexOf capital, 1

            self.parseSVGbasic res.body, target

            self.fullQuality = no
            self.executeAnimation = yes

          , (err) ->
            # Trying get again if not loaded

            setTimeout ->
              loader.splice loader.indexOf capital, 1

              self.getPartsJSON(target, url)
            , 5e3


      Click: (e) ->
        if not e.pageX
          if e.touches then e = e.touches[0] else return

        @last.x = e.pageX
        @last.y = e.pageY

      Hold: (val) ->
        if val
          @last.time = Date.now()
        else if Date.now() - @last.time < 150
          @$root.warning.close = yes

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

        @$root.horiz = @horiz = -(@y * (1 - Math.abs(@x))) ** 7
        @$root.ang   = @angle = (@y * 90 * Math.abs(@x)) / 4

        @$root.degress = @x * 90

        @state.hornsBehind   = @x <= 0.5 and @state.horn.rear
        @state.hornsAterEars = @x > 0.5  and @state.horn.rear

        if @x is 0 then @x = 0.01  # Bug prevention


        @fullQuality = no
        @executeAnimation = yes

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
            # If there are items in the branch

            newPaths = []

            for path, i in obj
              newPath = curvify abs parse path

              # Paths scale decreaser

              for points, j in newPath
                for point, k in points
                  if k > 0
                       newPath[j][k] = point
                  else newPath[j][k] = point

              newPaths[i] = newPath


            # Creating an object to export to a variable

            paths = self.paths
            keyIn = keyIn.replace "Main", ""

            if not paths[set] then paths[set] = { keys: [] }

            if set in ["hairs", "glasses", "horn"]
              set2 = if set is "hairs" then "hair" else set
              name = self.state[set2].name['en']

              if not paths[set][name]
                paths[set].keys.push name
                paths[set][name] = { keys: [] }


              # Adding elements to a variable

              key = if set is "hairs" then keyIn else set + capitalize keyIn

              paths[set][name][key] = newPaths
              paths[set][name].keys.push key

            else
              paths[set][keyIn] = newPaths
              paths[set].keys.push keyIn

          else # Going deeper to branch
            keys = Object.keys obj

            if not keyIn then keyIn  = ""

            for key, i in keys
              give obj[key], unCapitalize keyIn + capitalize key

        give get


      calc: (a, b, range) ->
        Math.floor(a + (b - a) * range)


      morph: (a, b, range) ->
        newPath = []

        for part, i in a
          newPart = []

          for point, j in part
            if j > 0
              if not b then continue

              calc = @calc point, b[i][j], range

              if calc then newPart[j] = calc | 0 else continue

            else newPart[j] = point

          newPath[i] = newPart

        return newPath


      draw: ->

        # Caching

        last = @last; quality = @quality; ctx = @ctx

        x = @x

        calculated = @calculated
        state = @state; getColor = @color
        horiz = @horiz; angle = @angle; mirror = @mirror
        hooves = @state.hooves


        absAngle = if x < 0 then -x else x
        toRad    = Math.PI / 180


        capitalize = (text) ->
          text.charAt(0).toUpperCase() + text.slice(1)


        # Ear display calculation

        state.ear.isFront = if absAngle < 1 / 3 and horiz > 0.1 then off else on
        state.ear.isBack  = !state.earFront


        if mirror
          posX   = 3 / 4
          scaleX = -1
        else
          posX   = 1 / 4
          scaleX = 1

        ctx.clearRect 0, 0, ctx.canvas.width, ctx.canvas.height


        rotatable = [
          "head", "head2", "chin", "hair", "glasses",
          "eyeLeft", "eyeLeftBrow", "eyeRight", "eyeRightBrow",
          "teethUpper", "teethLower"
        ]

        for elems in @layers  # Getting an array of elements from an array of layers
          layer = elems[0]

          if hooves.enable
            height = 80
          else
            height = 112


          # Layer set & reset position

          ctx.setTransform scaleX, 0, 0, 1, ctx.canvas.width * posX, height * quality * 2


          elbowL    = hooves.left.elbow.rise
          shoulderL = hooves.left.shoulder.rise
          wristL    = hooves.left.wrist.rise

          elbowR    = hooves.right.elbow.rise
          shoulderR = hooves.right.shoulder.rise
          wristR    = hooves.right.wrist.rise


          # Layer transformation

          if layer in rotatable
            ctx.translate  (ctx.canvas.width / 2) * (1 / 2),  ctx.canvas.height / 2 * (4 / 5)
            ctx.rotate angle * toRad
            ctx.translate -(ctx.canvas.width / 2) * (1 / 2), -ctx.canvas.height / 2 * (4 / 5)


          else if layer in ["leftForearm", "leftTibia", "leftWrist"]
            ctx.translate -(absAngle ** 0.25) * 150 * quality, 0

            ctx.translate ((ctx.canvas.width / 2) * (1 / 2)) + 65 * (quality * 1.5),
              ctx.canvas.height / 2 * (4 / 5) + 325 * (quality * 1.5)

            ctx.rotate hooves.left.shoulder.angle * toRad

            ctx.translate -((ctx.canvas.width / 2) * (1 / 2)) - 65 * (quality * 1.5),
              -ctx.canvas.height / 2 * (4 / 5) - 325 * (quality * 1.5)

          else if layer in ["rightForearm", "rightTibia", "rightWrist"]
            ctx.translate -(absAngle ** 0.25) * 33 * quality, 0

            ctx.translate  (ctx.canvas.width / 2) * (1 / 2) - 65 * (quality * 1.5),
              ctx.canvas.height / 2 * (4 / 5) + 325 * (quality * 1.5)

            ctx.rotate hooves.right.shoulder.angle * toRad

            ctx.translate -(ctx.canvas.width / 2) * (1 / 2) + 65 * (quality * 1.5),
              -ctx.canvas.height / 2 * (4 / 5) - 325 * (quality * 1.5)


          if layer in ["leftTibia", "leftWrist"]
            ctx.translate ((ctx.canvas.width / 2) * (1 / 2)) + 71 * (quality * 1.4),
              ctx.canvas.height / 2 * (4 / 5) + (350 - (shoulderL * 2.22)) * (quality * 1.4)

            ctx.rotate hooves.left.elbow.angle * toRad

            ctx.translate -((ctx.canvas.width / 2) * (1 / 2)) - 71 * (quality * 1.4),
              -ctx.canvas.height / 2 * (4 / 5) - (350 - (shoulderL * 2.22)) * (quality * 1.4)

          else if layer in ["rightTibia", "rightWrist"]
            ctx.translate  (ctx.canvas.width / 2) * (1 / 2) - 71 * (quality * 1.4),
              ctx.canvas.height / 2 * (4 / 5) + (350 - (shoulderR * 2.22)) * (quality * 1.4)

            ctx.rotate hooves.right.elbow.angle * toRad

            ctx.translate -(ctx.canvas.width / 2) * (1 / 2) + 71 * (quality * 1.4),
              -ctx.canvas.height / 2 * (4 / 5) - (350 - (shoulderR * 2.22)) * (quality * 1.4)


          if layer is "leftWrist"
            ctx.translate  (ctx.canvas.width / 2) * (1 / 2) + 86 * (quality * 1.4),
              ctx.canvas.height / 2 * (4 / 5) + (350 - ((elbowL * 2.5) + (shoulderL * 1.65))) * (quality * 1.4)

            ctx.rotate hooves.left.wrist.angle * toRad

            ctx.translate -(ctx.canvas.width / 2) * (1 / 2) - 86 * (quality * 1.4),
              -ctx.canvas.height / 2 * (4 / 5) - (350 - ((elbowL * 2.5) + (shoulderL * 1.65))) * (quality * 1.4)

          else if layer is "rightWrist"
            ctx.translate  (ctx.canvas.width / 2) * (1 / 2) - 86 * (quality * 1.4),
              ctx.canvas.height / 2 * (4 / 5) + (350 - ((elbowR * 2.5) + (shoulderR * 1.65))) * (quality * 1.4)

            ctx.rotate hooves.right.wrist.angle * toRad

            ctx.translate -(ctx.canvas.width / 2) * (1 / 2) + 86 * (quality * 1.4),
              -ctx.canvas.height / 2 * (4 / 5) - (350 - ((elbowR * 2.5) + (shoulderR * 1.65))) * (quality * 1.4)


          if layer is "head"
            ctx.translate 0, -horiz * 20 * quality

          else if layer is "eyeLeftBrow"
            if x < 0
                 side = "right"
            else side = "left"

            ctx.translate 0, -horiz * 20 * quality - parseInt(state.eyes.brows[side].height / 7)

          else if layer is "eyeRightBrow"
            if x < 0
                 side = "left"
            else side = "right"

            ctx.translate 0,
              -horiz * 20 * quality - parseInt(state.eyes.brows[side].height / 7)

          else if layer is "head2"
            ctx.translate 0,
              horiz * 10 * quality

          else if layer is "leftTibia"
            ctx.translate 0, -(shoulderL - elbowL) * 3 * quality

          else if layer is "rightTibia"
            ctx.translate 0, -(shoulderR - elbowR) * 3 * quality

          else if layer is "leftWrist"
            ctx.translate ((15 * (1 - (wristL / 100))) * (((shoulderL / 500) + (elbowL / 120)) * (1 - (wristL / 200)))),
              -(shoulderL + elbowL - (wristL * 2)) * 3 * quality

          else if layer is "rightWrist"
            ctx.translate -((15 * (1 - (wristR / 100))) * (((shoulderR / 500) + (elbowR / 120)) * (1 - (wristR / 200)))),
              -(shoulderR + elbowR - (wristR * 2)) * 3 * quality


          if layer in ["eyeLeft", "eyeRight"]
            mirrored = if mirror then -1 else 1

            ctx.translate(
              (((state.eyes.position.horiz - 50) / 1.5) * mirrored),
              (-horiz * 20 * quality) - ((state.eyes.position.verti - 50) / 1.5)
            )

          else if layer is "teethUpper"
            ctx.translate(
              ((100 - state.teeth.upper) / 3) * absAngle,
              (-horiz * 20 * quality) - ((100 - state.teeth.upper) / 3)
            )

          else if layer is "teethLower"
            ctx.translate(
              -((100 - state.teeth.lower) / 3) * absAngle,
              (-horiz * 20 * quality) + ((100 - state.teeth.lower) / 3)
            )


          # Work with array of elements

          for elem in elems[1]

            # Permission check for drawing an element

            if not calculated[elem.type] then continue

            if elem.type is "eyeLeftLashes"  and (absAngle > 0.9 or state.male) then continue
            if elem.type is "eyeRightLashes" and state.male then continue


            if elem.if
              if typeof elem.if isnt "string"
                if elem.if[2] and elem.if[2][1]
                  if not state[elem.if[0]][elem.if[1]][elem.if[2]] then continue

                  if elem.if[0] is "piercings"
                    if mirror
                      sidePiercing = { left: "right", right: "left" }
                    else
                      sidePiercing = { left: "left", right: "right" }

                    if not state[elem.if[0]][sidePiercing[elem.if[1]]][elem.if[2]] then continue
                    else if not state[elem.if[0]][sidePiercing[elem.if[1]]].enable then continue

                else if not state[elem.if[0]][elem.if[1]] then continue

              else if not state[elem.if] then continue

            # Clip calulations

            if elem.clip
              ctx.save()
              ctx.beginPath()

              for clip in elem.clip  # Getting a clip array
                if clip[0] is "!"
                  clear = yes
                  clip  = clip.replace "!", ""

                else clear = no

                if clear
                  ctx.rect 0, 0, ctx.canvas.width, ctx.canvas.height


                # Clipping transformation

                if clip is "head0"
                  ctx.translate 0, -horiz * 12 * quality

                else if clip is "earRight"
                  ctx.translate 0, horiz * 10 * quality

                else if clip in ["eyeLeft", "eyeRight"]
                  mirrored = if mirror then -1 else 1

                  ctx.translate(
                    -((((state.eyes.position.horiz - 100) + 50) / 1.5) * mirrored),
                    (((state.eyes.position.verti - 100) + 50) / 1.5)
                  )

                else if layer is "teethUpper"
                  ctx.translate(
                    -((100 - state.teeth.upper) / 3) * absAngle,
                    ((100 - state.teeth.upper) / 3)
                  )

                else if layer is "teethLower"
                  ctx.translate(
                    ((100 - state.teeth.lower) / 3) * absAngle,
                    -((100 - state.teeth.lower) / 3)
                  )


                # Creating clipping path

                if calculated[clip]
                  for part in calculated[clip]
                    if part[0] is "C"
                      ctx.bezierCurveTo part[1] * quality, part[2] * quality, part[3] * quality,
                        part[4] * quality, part[5] * quality, part[6] * quality

                    else ctx.moveTo part[1] * quality, part[2] * quality


                # Clipping resetting transformation

                if clip is "head0"
                  ctx.translate 0, horiz * 12 * quality

                else if clip is "earRight"
                  ctx.translate 0, -horiz * 10 * quality

                else if clip in ["eyeLeft", "eyeRight"]
                  mirrored = if mirror then -1 else 1

                  ctx.translate(
                    (((state.eyes.position.horiz) / 3) * mirrored),
                    -((state.eyes.position.verti) / 3)
                  )

                else if layer is "teethUpper"
                  ctx.translate(
                    ((100 - state.teeth.upper) / 3) * absAngle,
                    -((100 - state.teeth.upper) / 3)
                  )

                else if layer is "teethLower"
                  ctx.translate(
                    -((100 - state.teeth.lower) / 3) * absAngle,
                    ((100 - state.teeth.lower) / 3)
                  )


              ctx.closePath()
              ctx.clip(if clear then "evenodd")


            # Fill calulations

            if elem.fill

              # Finding a path for a fill variable

              if typeof elem.fill is "object"
                if elem.fill.length is 3
                  if elem.fill[0] is "eyes" and mirror
                    if elem.fill[1] is "left"
                      second = "right"

                    else if elem.fill[1] is "right"
                      second = "left"

                    else second = elem.fill[1]
                  else second = elem.fill[1]

                  color = getColor[elem.fill[0]][second][elem.fill[2]]

                else if elem.fill.length is 2
                  color = getColor[elem.fill[0]][elem.fill[1]]

              else color = elem.fill


              if elem.type is "hornSecond" and !state.horn.notlines
                color = "transparent"

              ctx.fillStyle = color

            else ctx.fillStyle = "transparent"


            # Stroke calulations

            if elem.stroke

              # Finding a path for a stroke variable

              if elem.stroke[1][0][1] and elem.stroke[1][1][1]
                color = getColor[elem.stroke[1][0]][elem.stroke[1][1]]

              else color = elem.stroke[1]

              if elem.type is "hornSecond" and state.horn.notlines
                color = "transparent"


              # Stroke setting

              ctx.strokeStyle = color
              ctx.lineWidth   = elem.stroke[0] * quality

              if elem.type is "eyeLeftBrow"
                if x < 0
                     side = "right"
                else side = "left"

                ctx.lineWidth += (state.eyes.brows[side].width - 100) / 10

              else if elem.type is "eyeRightBrow"
                if x < 0
                     side = "left"
                else side = "right"

                ctx.lineWidth += (state.eyes.brows[side].width - 100) / 10

              else if elem.type is "glassesLeft"
                ctx.lineWidth += (state.glasses.width - 100) / 10

              else if elem.type is "glassesRight"
                ctx.lineWidth += (state.glasses.width - 100) / 10

              else if elem.type is "glassesNose"
                ctx.lineWidth += (state.glasses.width - 100) / 10

            else ctx.strokeStyle = "transparent"


            # Checking for male elements

            if calculated["male" + capitalize(elem.type)] and state.male
                 type = "male" + capitalize(elem.type)
            else type = elem.type


            # Drawing the elements themselves

            for part, i in calculated[type]
              if part[0] is "C"
                ctx.bezierCurveTo part[1] * quality, part[2] * quality, part[3] * quality,
                  part[4] * quality, part[5] * quality, part[6] * quality
              else
                if i > 0
                  ctx.fill()
                  ctx.stroke()

                ctx.beginPath()
                ctx.moveTo part[1] * quality, part[2] * quality


            # Apply context settings

            ctx.fill()
            ctx.stroke()
            ctx.restore()


      animate: ->
        if not @executeAnimation
          # Does not calculate with the same paths

          delay = 10

          if @afterChange < delay then @afterChange++

          @fullQuality = @afterChange >= delay

          @executeAnimation = @fullQuality and @quality < 1

          window.requestAnimationFrame @animate
          return


        if not @fullQuality
          @quality = @vmin / 1024 / 2
        else
          @quality = 1


        ctx = @ctx

        ctx.canvas.width  = Math.round(1024 * @quality * 2)
        ctx.canvas.height = Math.round(1024 * @quality * 1.25)

        ctx.lineCap  = "round"
        ctx.lineJoin = "round"



        state = @state; math = @math; morph = @morph; x = @x  # Caching
        emotions = @paths.emotions


        self = this

        schemeMorph = (schemeNames, range) ->
          pathsSheme = schemeNames[0]

          if pathsSheme[0][1][1]  # If scheme multiple
            morph(
              schemeMorph(pathsSheme[0], range),
              schemeMorph(pathsSheme[1], range),

              findValue(state, x, schemeNames[1])
            )

          else
            if pathsSheme[0] is "basic" or not emotions
              path1 = paths
            else
              path1 = emotions[pathsSheme[0]]

            if pathsSheme[1] is "basic" or not emotions
              path2 = paths
            else
              path2 = emotions[pathsSheme[1]]

            morph(
              morph(path1[frame], path1[frame + 1], range),
              morph(path2[frame], path2[frame + 1], range),

              findValue(state, x, schemeNames[1])
            )


        calculated = []  # Create value for redraw

        absAngle = if @x < 0 then -@x else @x


        # Calculation of elements for drawing
        # Body part

        body = @paths.body

        if body
          for key in body.keys
            paths = body[key]
            mul = 1

            if math[key] and math[key].pow is "nose"
              if absAngle > 0.26
                pow = 1.5
              else
                pos = 1
                mul = 1.55

            else if math[key] and math[key].pow and math[key].pow isnt "nose"
              pow = math[key].pow
            else
              pow =  1

            fullRange = ((1 - (absAngle ** (1 / pow)) * mul) * (paths.length - 1))

            frame = fullRange | 0
            range = (fullRange - frame)

            interpolationScheme = @interpolationScheme[key]

            if interpolationScheme  # If config have scheme
              pathsInput = paths or @paths

              calculated[key] = schemeMorph interpolationScheme, range
            else
              calculated[key] = morph paths[frame], paths[frame + 1], range


        # Hair part

        hair = @paths.hairs

        if hair
          hair = hair[state.hair.name['en']]

          if hair
            for key in hair.keys
              paths = hair[key]
              pow = if math[key] then math[key].pow else 1

              fullRange = (1 - (absAngle ** (1 / pow))) * (paths.length - 1)

              frame = fullRange | 0
              range = fullRange - frame

              calculated[key] = morph paths[frame], paths[frame + 1], range


        # Glases part

        glasses = @paths.glasses

        if glasses
          glasses = glasses[state.glasses.name['en']]

          if glasses
            for key in glasses.keys
              paths = glasses[key]
              pow = if math[key] then math[key].pow else 1

              fullRange = (1 - (absAngle ** (1 / pow))) * (paths.length - 1)

              frame = fullRange | 0
              range = fullRange - frame

              calculated[key] = morph paths[frame], paths[frame + 1], range



        # Horns part

        horns = @paths.horn

        if horns
          horns = horns[state.horn.name['en']]

          if horns
            for key in horns.keys
              paths = horns[key]
              pow = if math[key] then math[key].pow else 1

              fullRange = (1 - (absAngle ** (1 / pow))) * (paths.length - 1)

              frame = fullRange | 0
              range = fullRange - frame

              calculated[key] = morph paths[frame], paths[frame + 1], range


        @calculated = calculated  # Paths apply

        if body and hair and glasses and horns
          @executeAnimation = no

        if not @fullQuality  # Reset timer
          @afterChange = 0

        @draw()

        window.requestAnimationFrame @animate


    mounted: ->

      # Setting context

      ctx = @$refs.avatar.getContext "2d"

      ctx.canvas.width  = Math.round(1024 * @quality * 2)
      ctx.canvas.height = Math.round(1024 * @quality * 1.25)

      ctx.lineCap = ctx.lineJoin = "round"

      @ctx = ctx


      # Quality calculatoin relative screen size

      X = window.screen.width
      Y = window.screen.height

      @vmin = if X < Y then X else Y


      window.requestAnimationFrame @animate # Start drawing and calculation


      # Define ref to root for screener component

      @$root.$refs.avatar = @$refs.avatar

      self = this

      ###calc   = @calc

      frame = 0
      tick  = 0
      maxFPS = 60
      duration = 1  # in seconds

      setInterval ->
        if tick >= 1000 then tick = 0 else tick++

        frameDuration = tick / 1000

        self.x = frameDuration

        self.fullQuality = no
        self.executeAnimation = yes
      , 1###


      asFile = (name) ->
        fileName = self.state[name].name['en']

        return fileName.toLowerCase().replace /\W/g, "_"


      # Get JSON data to client and execute

      @getPartsJSON "body",     "pony/body.json"
      @getPartsJSON "emotions", "pony/emotions.json"

      @getPartsJSON "hairs",    "hairs/"   + asFile("hair")    + ".json"
      @getPartsJSON "glasses",  "glasses/" + asFile("glasses") + ".json"
      @getPartsJSON "horn",     "horns/"   + asFile("horn")    + ".json"
</script>

<style lang="sass">
  #avatar canvas
    position: fixed
    cursor: move
    width: 100vmin
    height: 100vmin
    z-index: 0
    left: 50%
    bottom: 0%
    transform: translate(-50%) scale(2, 1.25)
</style>