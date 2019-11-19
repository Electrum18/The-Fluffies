<template lang="pug">
  #avatar.transition(v-press-hold="[MouseMove, Click, Hold]")
    canvas(:id="$parent.name" :style="editorOpened" ref="avatar")
</template>

<script lang="coffee">
  import abs from "abs-svg-path"
  import parse from "parse-svg-path"
  import curvify from "curvify-svg-path"

  import Elems from "../pages/editor/pony/elems.json"

  export default
    data: ->
      quality: 0.6  # range from 0 to 1

      editorOpened: left: "50%"

      layers: Elems

      male: no

      color:
        eyes:
          left:
            basic: @$root.eyes.color.left.basic
            shade: @$root.eyes.color.left.shade
            stroke:
              stroke: @$root.eyes.color.left.stroke

          right:
            enable: @$root.eyes.color.right.enable
            basic: @$root.eyes.color.right.basic
            shade: @$root.eyes.color.right.shade
            stroke:
              stroke: @$root.eyes.color.right.stroke

        fur:
          basic:  @$root.fur.color.basic
          shade:  @$root.fur.color.shade
          second: @$root.fur.color.second

        stripes:
          basic: @$root.stripes.color.basic

        hair:
          basic:  @$root.mane.color.basic
          shade:  @$root.mane.color.shade
          second: @$root.mane.color.second

        jaw:
          basic: @$root.jaw.color.basic

        tongue:
          basic: @$root.tongue.color.basic
          shade: @$root.tongue.color.shade

        piercings:
          basic: @$root.piercings.color.basic
          shade: @$root.piercings.color.shade

      math:
        nose:   pow: "nose"
        bridge: pow: "nose"
        mouth:  pow: "nose"
        fangsLeft:  pow: "nose"
        fangsRight: pow: "nose"
        nostrilLeft:  pow: "nose"
        nostrilRight: pow: "nose"
        maleNose:   pow: "nose"
        maleBridge: pow: "nose"
        tongue:     pow: 1.25
        teethUpper: pow: 1.25
        teethLower: pow: 1.25
        eyeLeftBrow: pow: 0.75

      scheme:
        mouth: [[[["basic", "openJaw"], ["jaw", "open"]], [["sadJawClosed", "sadJawOpen"], ["jaw", "open"]]], ["jaw", "sad"]]
        eyeLeftPupil: [[
          [["eyesLeftSizeNarrowPupil", "eyesLeftSizePupil"], ["eyes", "pupils", "width"]],
          [["eyesLeftNarrowPupil",                 "basic"], ["eyes", "pupils", "width"]]
        ], ["eyes", "iris", "scale"]]

        eyeRightPupil: [[
          [["eyesRightSizeNarrowPupil", "eyesRightSizePupil"], ["eyes", "pupils", "width"]],
          [["eyesRightNarrowPupil",                  "basic"], ["eyes", "pupils", "width"]]
        ], ["eyes", "iris", "scale"]]

        eyeLeftIris:  [["eyesLeftSizeIris",  "basic"], ["eyes", "iris", "scale"]]
        eyeRightIris: [["eyesRightSizeIris", "basic"], ["eyes", "iris", "scale"]]
        eyeLeftLidUp: [["basic", "eyelidLeftDown"], ["eyes", "eyelids", "left", "up"]]
        eyeRightLidUp: [["basic", "eyelidRightDown"], ["eyes", "eyelids", "right", "up"]]
        eyeLeftLidUpFill: [["basic", "eyelidLeftUpFill"], ["eyes", "eyelids", "left", "up"]]
        eyeRightLidUpFill: [["basic", "eyelidRightUpFill"], ["eyes", "eyelids", "right", "up"]]
        eyeLeftLidDownFill: [["basic", "eyelidLeftDownFill"], ["eyes", "eyelids", "left", "down"]]
        eyeRightLidDownFill: [["basic", "eyelidRightDownFill"], ["eyes", "eyelids", "right", "down"]]
        eyeLeftLashesUpper: [["basic", "eyelashesLeftUpper"], ["eyes", "eyelids", "left", "up"]]
        eyeLeftLashesMiddle: [["basic", "eyelashesLeftMiddle"], ["eyes", "eyelids", "left", "up"]]
        eyeLeftLashesLower: [["basic", "eyelashesLeftLower"], ["eyes", "eyelids", "left", "up"]]
        eyeRightLashesUpper: [["basic", "eyelashesRightUpper"], ["eyes", "eyelids", "right", "up"]]
        eyeRightLashesMiddle: [["basic", "eyelashesRightMiddle"], ["eyes", "eyelids", "right", "up"]]
        eyeRightLashesLower: [["basic", "eyelashesRightLower"], ["eyes", "eyelids", "right", "up"]]
        eyeLeftBrow: [[
          [["basic", "eyebrowLeftEvil"], ["eyes", "brows", "left", "evil"]],
          [["basic", "eyebrowLeftWide"], ["eyes", "brows", "left", "wide"]]
        ], ["eyes", "brows", "left", "wide"]]

        eyeRightBrow: [[
          [["basic", "eyebrowRightEvil"], ["eyes", "brows", "right", "evil"]],
          [["basic", "eyebrowRightWide"], ["eyes", "brows", "right", "wide"]]
        ], ["eyes", "brows", "right", "wide"]]

      ctx: {}  # Context of canvas

      horiz: 0

      x: 12.5 / 90  # Horizontal of angle in -1 to 1 range
      y: 0          # Vertical of angle in 0 to 1 range

      angle: 0  # Calculated angle for transformation

      last:  # Last calculated variables for deltas
        x: 0
        y: 0
        time: Date.now()
        FPS: 60

      paths: {}  # Imported and parsed svg's
      state: {}  # Using for "if" attribute in "elems" config

      calculated: {}  # Calculated paths

      mirror: no  # Avatar isnt mirrored in this time
      changed: no # check for optimization

      mouse:
        hold: no

    watch:
      x: (num) -> @mirror = num < 0

      mirror: (val) ->
        state = @state

        sideLeft  = state.piercings.right
        sideRight = state.piercings.left

        state.piercings =
          left: sideLeft
          right: sideRight

      "$parent.editor.opened": (val) ->
        @editorOpened.left = if val then "40%" else "50%"

      "$root.hair.name": (name) ->
        if @paths.hairs[name] then @animate()
        else
          self = this
          hairName = name.toLowerCase().replace /\W/g, "_"

          @get "hairs", "/data/pony/hairs/" + hairName + ".json", (val) ->
            self.parseSVGbasic val[name], "hairs"
            self.animate()

      "$root.fur.color":
        handler: (val) ->
          @color.fur.basic  = val.basic
          @color.fur.shade  = val.shade
          @color.fur.second = val.second

          @animate()

        deep: yes

      "$parent.male":
        handler: (val) ->
          @male = val

          @animate()

        deep: yes

      "$root.horn":
        handler: (val) ->
          @state.horn = val

          @state.horn.enableBasic = @$root.horn.enable and !@$root.horn.changeling
          @state.horn.enableChnlg = @$root.horn.enable and @$root.horn.changeling

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
          @color.stripes.basic  = val.color.basic

          @animate()

        deep: yes

      "$root.mane":
        handler: (val) ->
          @state.hair.second = val.second
          @color.hair        = val.color

          @state.hair.isSecond = !val.second.isEnds and val.second.enable

          @animate()

        deep: yes

      "$root.jaw":
        handler: (val) ->
          @state.jaw.open  = val.open
          @state.jaw.sad   = val.sad
          @color.jaw.basic = val.color.basic

          @animate()

        deep: yes

      "$root.tongue":
        handler: (val) ->
          @color.tongue = val.color

          @animate()

        deep: yes

      "$root.eyes":
        handler: (val) ->
          if not val.color.right.enable
            val.color.right.basic = val.color.left.basic

          @color.eyes = val.color
          @state.eyes = val

          @animate()

        deep: yes

      "$root.piercings":
        handler: (val) ->
          state = @state

          if @x < 0
            sideLeft  = val.right
            sideRight = val.left
          else
            sideLeft  = val.left
            sideRight = val.right

          state.piercings =
            left: sideLeft
            right: sideRight

          @color.piercings = val.color

          @animate()

        deep: yes

      "$root.teeth":
        handler: (val) ->
          @state.teeth = val

          @animate()

        deep: yes

    methods:
      get: (target, url, callback = no) ->
        self    = this
        loader  = @$root.loadings
        capital = target[0].toUpperCase() + target.slice 1

        if target is "hairs"
             loader.push "#{capital} | #{@$root.hair.name}"
        else loader.push capital

        @$http.get(window.location.origin + url).then (res) ->
          loader.splice loader.indexOf capital, 1

          if callback
            setTimeout ->
              callback(res.body)
            , 100

        , (err) ->
          # Trying get again if not loaded

          setTimeout ->
            loader.splice loader.indexOf capital, 1
            self.get(target, url, callback)
          , 5e3


      Click: (e) ->
        if not e.pageX
          if e.touches then e = e.touches[0] else return

        @last.x = e.pageX
        @last.y = e.pageY

      Hold: (e) ->
        @mouse.hold = e

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

        @horiz  = -(@y * (1 - Math.abs(@x))) ** 7

        @$root.horiz = @horiz
        @$root.ang   = (@y * 90 * Math.abs(@x)) / 4

        @angle = @$root.ang

        @$root.degress = @x * 90

        @animate()

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

            if not self.paths[set]
              self.paths[set] = { keys: [] }

            if set is "hairs" and not self.paths[set][self.$root.hair.name]
              self.paths[set].keys.push self.$root.hair.name
              self.paths[set][self.$root.hair.name] = { keys: [] }


            # Adding elements to a variable

            keyIn = keyIn.replace "Main", ""

            if set is "hairs"
                self.paths[set][self.$root.hair.name][keyIn] = newPaths
                self.paths[set][self.$root.hair.name].keys.push keyIn

            else
              self.paths[set][keyIn] = newPaths
              self.paths[set].keys.push keyIn

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
              calc = @calc point, b[i][j], range

              if calc then newPart[j] = calc else continue

            else newPart[j] = point

          newPath[i] = newPart

        return newPath


      draw: ->

        # Caching

        last = @last; quality = @quality; ctx = @ctx


        ###FPS   = 1000 / (Date.now() - last.time)
        delta = (FPS + last.FPS) / 2


        if delta < 45 and @mouse.hold
          @quality = (quality + (delta / 60)) / 2

          ctx.canvas.width  = Math.round(1024 * quality * 1.5)
          ctx.canvas.height = Math.round(1024 * quality * 1.25)

          last.time = Date.now()
          last.FPS  = FPS

          window.requestAnimationFrame @draw
          return


        last.FPS = FPS###


        if not @changed
          # Does not redraw with the same elements

          last.time = Date.now()

          window.requestAnimationFrame @draw
          return


        # Caching

        x = @x

        calculated = @calculated
        male  = @male;  state  = @state; getColor = @color
        horiz = @horiz; angle  = @angle; mirror   = @mirror


        absAngle = if x < 0 then -x else x
        toRad    = Math.PI / 180


        capitalize = (text) ->
          text.charAt(0).toUpperCase() + text.slice(1)


        # Ear display calculation

        state.earFront = if absAngle < 1 / 3 and horiz > 0.1 then off else on
        state.earBack  = !state.earFront


        if mirror
          posX   = 5 / 6
          scaleX = -1
        else
          posX   = 1 / 6
          scaleX = 1

        ctx.clearRect 0, 0, ctx.canvas.width, ctx.canvas.height


        rotatable = ["head", "head2", "chin", "hair", "eyeLeft", "eyeLeftBrow", "eyeRight", "eyeRightBrow",
          "teethUpper", "teethLower"]

        for elems in @layers  # Getting an array of elements from an array of layers
          layer = elems[0]


          # Layer set & reset position

          ctx.setTransform scaleX, 0, 0, 1, ctx.canvas.width * posX, 112 * quality * 2

          # Layer transformation

          if layer in rotatable
            ctx.translate  (ctx.canvas.width / 2) * (2 / 3),  ctx.canvas.height / 2 * (4 / 5)
            ctx.rotate angle * toRad
            ctx.translate -(ctx.canvas.width / 2) * (2 / 3), -ctx.canvas.height / 2 * (4 / 5)

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

            ctx.translate 0, -horiz * 20 * quality - parseInt(state.eyes.brows[side].height / 7)

          else if layer is "head2"
            ctx.translate 0, horiz * 10 * quality

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

            if elem.type in ["eyeLeftLashesUpper", "eyeLeftLashesMiddle",
              "eyeLeftLashesLower"] and (absAngle > 0.9 or male) then continue

            if elem.type in ["eyeRightLashesUpper", "eyeRightLashesMiddle",
              "eyeRightLashesLower"] and male then continue

            if elem.if
              if typeof elem.if isnt "string"
                if elem.if[2] and elem.if[2][1]
                  if not state[elem.if[0]][elem.if[1]][elem.if[2]] then continue

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
                  ctx.translate 0, -horiz * 20 * quality

                else if clip is "earRight"
                  ctx.translate 0, horiz * 10 * quality

                else if clip in ["eyeLeft", "eyeRight"]
                  mirrored = if mirror then -1 else 1

                  ctx.translate(
                    -(((state.eyes.position.horiz - 50) / 1.5) * mirrored),
                    ((state.eyes.position.verti - 50) / 1.5)
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

                for part in calculated[clip]
                  if part[0] is "C"
                    ctx.bezierCurveTo part[1] * quality, part[2] * quality, part[3] * quality,
                      part[4] * quality, part[5] * quality, part[6] * quality

                  else ctx.moveTo part[1] * quality, part[2] * quality


                # Clipping resetting transformation

                if clip is "head0"
                  ctx.translate 0, horiz * 20 * quality

                else if clip is "earRight"
                  ctx.translate 0, -horiz * 10 * quality

                else if clip in ["eyeLeft", "eyeRight"]
                  mirrored = if mirror then -1 else 1

                  ctx.translate(
                    (((state.eyes.position.horiz - 50) / 1.5) * mirrored),
                    -((state.eyes.position.verti - 50) / 1.5)
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


              if elem.type is "hornSecond" and !state.horn.notLines
                color = "transparent"

              ctx.fillStyle = color

            else ctx.fillStyle = "transparent"


            # Stroke calulations

            if elem.stroke

              # Finding a path for a stroke variable

              if elem.stroke[1][0][1] and elem.stroke[1][1][1]
                color = getColor[elem.stroke[1][0]][elem.stroke[1][1]]

              else color = elem.stroke[1]

              if elem.type is "hornSecond" and state.horn.notLines
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

            else ctx.strokeStyle = "transparent"


            # Checking for male elements

            if calculated["male" + capitalize(elem.type)] and male
                 type = "male" + capitalize(elem.type)
            else type = elem.type


            # Drawing the elements themselves

            for part in calculated[type]
              if part[0] is "C"
                ctx.bezierCurveTo part[1] * quality, part[2] * quality, part[3] * quality,
                part[4] * quality, part[5] * quality, part[6] * quality
              else
                ctx.beginPath()
                ctx.moveTo part[1] * quality, part[2] * quality


            # Apply context settings

            ctx.fill()
            ctx.stroke()
            ctx.restore()

        @changed  = no
        @last.time = Date.now()

        window.requestAnimationFrame @draw


      animate: ->
        if not @paths.body then return
        if not @paths.hairs then return
        if not @paths.emotions then return

        state = @state; math = @math; morph = @morph; x = @x  # Caching

        self = this

        findValue = (path) ->
          if path[2]
            if x < 0
              if path[2] is "left"
                path2 = "right"
              else if path[2] is "right"
                path2 = "left"

              else path2 = path[2]
            else path2 = path[2]

          if path[3]
            range = self.state[path[0]][path[1]][path2][path[3]] / 100

          else if path[2]
            range = self.state[path[0]][path[1]][path2] / 100

          else range = self.state[path[0]][path[1]] / 100

          return range


        schemeMorph = (schemeNames, range) ->
          pathsSheme = schemeNames[0]

          if pathsSheme[0][1][1]  # If scheme multiple
            morph(
              schemeMorph(pathsSheme[0], range),
              schemeMorph(pathsSheme[1], range),

            findValue schemeNames[1])

          else
            if pathsSheme[0] is "basic"
                 path1 = paths
            else path1 = self.paths.emotions[pathsSheme[0]]

            if pathsSheme[1] is "basic"
                 path2 = paths
            else path2 = self.paths.emotions[pathsSheme[1]]

            morph(
              morph(path1[frame], path1[frame + 1], range),
              morph(path2[frame], path2[frame + 1], range),

            findValue schemeNames[1])


        calculated = []  # Create value for redraw

        absAngle = if @x < 0 then -@x else @x


        # Calculation of elements for drawing

        for key in @paths.body.keys  # Body part
          paths = @paths.body[key]
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

          scheme = @scheme[key]

          if scheme  # If config have scheme
               calculated[key] = schemeMorph scheme, range
          else calculated[key] = morph paths[frame], paths[frame + 1], range


        for key in @paths.hairs[self.$root.hair.name].keys  # Hair part
          paths = @paths.hairs[self.$root.hair.name][key]
          pow = if math[key] then math[key].pow else 1

          fullRange = (1 - (absAngle ** (1 / pow))) * (paths.length - 1)

          frame = fullRange | 0
          range = fullRange - frame

          calculated[key] = morph paths[frame], paths[frame + 1], range


        @calculated = calculated  # Paths apply
        @changed    = yes


    mounted: ->

      # Quality calculatoin relative screen size

      X = window.screen.width
      Y = window.screen.height

      vmin = if X < Y then X else Y

      @quality = (vmin / 1024) - 0.2


      # Setting context

      ctx = @$refs.avatar.getContext "2d"

      ctx.canvas.width  = Math.round(1024 * @quality * 1.5)
      ctx.canvas.height = Math.round(1024 * @quality * 1.25)

      ctx.lineCap  = "round"
      ctx.lineJoin = "round"

      @ctx = ctx


      # Init watching states

      state = @state

      state.earFront = on
      state.earBack  = off

      state.eyes    = @$root.eyes
      state.fangs   = @$root.fangs
      state.tassels = @$root.tassels
      state.horn    = @$root.horn

      state.horn.enableBasic = @$root.horn.enable and !@$root.horn.changeling
      state.horn.enableChnlg = @$root.horn.enable and @$root.horn.changeling

      state.stripes        = {}
      state.stripes.enable = @$root.stripes.enable

      state.hair        = {}
      state.hair.second = @$root.mane.second
      state.hair.isSecond = on

      state.jaw      = {}
      state.jaw.open = @$root.jaw.open
      state.jaw.sad  = @$root.jaw.sad

      state.teeth = @$root.teeth

      state.piercings  = @$root.piercings


      self = this

      @last.time = Date.now()

      window.requestAnimationFrame @draw # Start drawings


      # Define ref to root for screener component

      @$root.$refs = { @$root.$refs..., @$refs... }

      ###toLeft = no

      setInterval ->
        if not toLeft
          if self.x < 0.99
            self.x += 0.02
          else
            toLeft = yes

        else
          if self.x > -0.99
            self.x -= 0.02
          else
            toLeft = no

        self.animate()
      , 1000 / 60###


      # Get JSON data to client and execute

      @get "body", "/data/pony/body.json", (val) ->
        self.parseSVGbasic val, "body"
        self.animate()


      # Load first hair

      hairName = @$root.hair.name.toLowerCase().replace /\W/g, "_"

      @get "hairs", "/data/pony/hairs/" + hairName + ".json", (val) ->
        self.parseSVGbasic val[self.$root.hair.name], "hairs"
        self.animate()


      @get "emotions", "/data/pony/emotions.json", (val) ->
        self.parseSVGbasic val, "emotions"
        self.animate()
</script>