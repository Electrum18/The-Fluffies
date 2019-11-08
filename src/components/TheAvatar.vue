<template lang="pug">
  #avatar.transition(v-press-hold="[MouseMove, Click, Holding]")
    canvas(ref="head")
    canvas(ref="hair")
    canvas(ref="neck")
    canvas(ref="head3")
    canvas(ref="eyeLeft")
    canvas(ref="head4")
    canvas(ref="eyeLeftBrow")
    canvas(ref="head5")
    canvas(ref="chin")
    canvas(ref="head6")
    canvas(ref="eyeRight")
    canvas(ref="head7")
    canvas(ref="eyeRightBrow")
    canvas(ref="hair2")
    canvas(ref="head2")
    canvas(ref="head8")
</template>

<script lang="coffee">
  import abs from "abs-svg-path"
  import parse from "parse-svg-path"
  import curvify from "curvify-svg-path"

  import Elems from "../pages/editor/pony/elems.json"

  export default
    data: ->
      quality: 0.6  # range from 0 to 1

      elems: Elems

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

      math:
        nose:   pow: "nose"
        bridge: pow: "nose"
        mouth:  pow: "nose"
        fangsLeft:  pow: "nose"
        fangsRight: pow: "nose"
        nostrilLeft:  pow: "nose"
        nostrilRight: pow: "nose"
        tongue:     pow: "nose"
        teethUpper: pow: "nose"
        teethLower: pow: "nose"
        eyeLeftLashesUpper:  pow: 1.5
        eyeLeftLashesMiddle: pow: 1.5
        eyeLeftLashesLower:  pow: 1.5

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

      ctx: []  # Context of canvases

      horiz: 0

      x: 12.5 / 90  # Horizontal of angle in 0 to 1 range
      y: 0          # Vertical of angle in 0 to 1 range

      angle: 0  # Calculated angle for transformation

      last:  # Last calculated variables for deltas
        x: 0
        y: 0
        angle: 0
        horiz: 0

        eyes:
          position:
            horiz: 50
            verti: 50

           brows:
            left:
              height: 0

            right:
              height: 0

          focus: 100

      paths: {}  # Imported and parsed svg's
      state: {}  # Using for "if" attribute in "elems" config

      mirror: no  # Avatar isnt mirrored in this time

    watch:
      x: (num) -> @mirror = num < 0

      mirror: () ->
        for key, i in @elems.keys
          @ctx[i].translate @ctx[i].canvas.width * (2 / 3), 0
          @ctx[i].scale -1, 1

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

      "$parent.male": -> @animate()

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
          @state.piercings.left  = val.left
          @state.piercings.right = val.right

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

        horiz  = -(@y * (1 - Math.abs(@x))) ** 7
        @horiz = if horiz < 0 then horiz / 3 else horiz

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
            newPaths = []

            for path, i in obj
              newPath = curvify abs parse path

              for points, j in newPath  # Paths scale decreaser
                for point, k in points
                  if k > 0
                       newPath[j][k] = point * self.quality
                  else newPath[j][k] = point

              newPaths[i] = newPath

            if not self.paths[set]
              self.paths[set] = { keys: [] }

            if set is "hairs" and not self.paths[set][self.$root.hair.name]
              self.paths[set].keys.push self.$root.hair.name
              self.paths[set][self.$root.hair.name] = { keys: [] }

            keyIn = keyIn.replace "Main", ""

            if set is "hairs"
                self.paths[set][self.$root.hair.name][keyIn] = newPaths
                self.paths[set][self.$root.hair.name].keys.push keyIn

            else
              self.paths[set][keyIn] = newPaths
              self.paths[set].keys.push keyIn

          else
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
                  newPart[j] = @calc point, b[i][j], range
            else newPart[j] = point

          newPath[i] = newPart

        return newPath


      animate: ->
        if not @paths.body then return
        if not @paths.hairs then return
        if not @paths.emotions then return

        mirror = @mirror
        ctx   = @ctx;   elems = @elems
        last  = @last;  horiz = @horiz
        angle = @angle; state = @state

        self = this

        absAngle = if @x < 0 then -@x else @x
        toRad    = Math.PI / 180

        state.earFront = if absAngle < 1 / 3 and horiz > 0.1 then off else on
        state.earBack  = !state.earFront

        for key, i in elems.keys
          ctx[i].clearRect 0, 0, ctx[i].canvas.width, ctx[i].canvas.height

          if key in ["head", "head2", "head3", "head4", "head5", "head6", "head7", "head8", "chin",
            "hair", "hair2", "eyeLeft", "eyeRight", "eyeLeftBrow", "eyeRightBrow"
          ]
            ctx[i].translate  (ctx[i].canvas.width / 2) * (2 / 3),  ctx[i].canvas.height / 2 * (4 / 5)
            ctx[i].rotate -last.angle * toRad
            ctx[i].rotate       angle * toRad
            ctx[i].translate -(ctx[i].canvas.width / 2) * (2 / 3), -ctx[i].canvas.height / 2 * (4 / 5)

            if key in ["head", "head2"]
              ctx[i].translate 0, (horiz - last.horiz) * 20

            else if key in ["head3", "head4", "head5", "head6", "head7", "head8"]
              ctx[i].translate 0, (last.horiz - horiz) * 20

            else if key in ["eyeLeft", "eyeRight"]
              mirrored = if mirror then -1 else 1

              ctx[i].translate(
                (-((last.eyes.position.horiz - 50) / 1.5) * mirrored),
                last.horiz * 20 + ((last.eyes.position.verti - 50) / 1.5)
              )

              ctx[i].translate(
                (((state.eyes.position.horiz - 50) / 1.5) * mirrored),
                -horiz * 20 - ((state.eyes.position.verti - 50) / 1.5)
              )

            else if key is "eyeLeftBrow"
              lastH  = parseInt last.eyes.brows.left.height  / 7
              stateH = parseInt state.eyes.brows.left.height / 7

              ctx[i].translate 0, (last.horiz - horiz) * 20 + (lastH - stateH)

            else if key is "eyeRightBrow"
              lastH  = parseInt last.eyes.brows.right.height  / 7
              stateH = parseInt state.eyes.brows.right.height / 7

              ctx[i].translate 0, (last.horiz - horiz) * 20 + (lastH - stateH)

            if key is "head8"
              last.angle = angle
              last.horiz = horiz
              last.eyes.position.horiz = state.eyes.position.horiz
              last.eyes.position.verti = state.eyes.position.verti
              last.eyes.scale          = state.eyes.iris.scale
              last.eyes.position.focus = state.eyes.position.focus
              last.eyes.brows.left.height  = state.eyes.brows.left.height
              last.eyes.brows.right.height = state.eyes.brows.right.height

        newFurs  = []

        draw = ->
          for key, i in elems.keys
            array = elems[key]

            for elem in array
              if not newFurs[elem.type] then continue

              if elem.type in ["eyeLeftLashesUpper", "eyeLeftLashesMiddle",
                "eyeLeftLashesLower"] and absAngle > 0.9 then continue

              if elem.if
                if typeof elem.if isnt "string"
                  if elem.if[2] and elem.if[2][1]
                    if not state[elem.if[0]][elem.if[1]][elem.if[2]] then continue

                  else if not state[elem.if[0]][elem.if[1]] then continue

                else if not state[elem.if] then continue

              if elem.clip
                ctx[i].save()
                ctx[i].beginPath()

                for clip in elem.clip
                  if clip[0] is "!"
                    clear = yes
                    clip  = clip.replace "!", ""

                  else clear = no

                  if clear
                    ctx[i].rect 0, 0, ctx[i].canvas.width, ctx[i].canvas.height

                  if clip not in ["tail", "back", "front"]
                    ctx[i].translate 0, -last.horiz * 20

                  if clip is "earRight"
                    ctx[i].translate 0, last.horiz * 40

                  if key in ["eyeLeft", "eyeRight"]
                    mirrored = if mirror then 1 else -1

                    ctx[i].translate(
                      (((last.eyes.position.horiz - 50) / 1.5) * mirrored),
                      last.horiz * 20 + ((last.eyes.position.verti - 50) / 1.5)
                    )

                  for part in newFurs[clip]
                    if part[0] is "C"
                         ctx[i].bezierCurveTo part[1], part[2], part[3], part[4], part[5], part[6]
                    else ctx[i].moveTo part[1], part[2]

                  if clip not in ["tail", "back", "front"]
                    ctx[i].translate 0, horiz * 20

                  if clip is "earRight"
                    ctx[i].translate 0, -horiz * 40

                  if key in ["eyeLeft", "eyeRight"]
                    mirrored = if mirror then 1 else -1

                    ctx[i].translate(
                      (-((state.eyes.position.horiz - 50) / 1.5) * mirrored),
                      -horiz * 20 - ((state.eyes.position.verti - 50) / 1.5)
                    )

                ctx[i].closePath()
                ctx[i].clip(if clear then "evenodd")

              if elem.fill
                if typeof elem.fill is "object"
                  if elem.fill.length is 3
                    if elem.fill[0] is "eyes" and mirror
                      if elem.fill[1] is "left"
                        second = "right"

                      else if elem.fill[1] is "right"
                        second = "left"

                      else second = elem.fill[1]
                    else second = elem.fill[1]

                    color = self.color[elem.fill[0]][second][elem.fill[2]]

                  else if elem.fill.length is 2
                    color = self.color[elem.fill[0]][elem.fill[1]]

                else color = elem.fill

                if elem.type is "hornSecond" and !state.horn.notLines
                  color = "transparent"

                ctx[i].fillStyle = color

              else ctx[i].fillStyle = "transparent"

              if elem.stroke
                if elem.stroke[1][0][1] and elem.stroke[1][1][1]
                  color = self.color[elem.stroke[1][0]][elem.stroke[1][1]]

                else color = elem.stroke[1]

                if elem.type is "hornSecond" and state.horn.notLines
                  color = "transparent"

                ctx[i].strokeStyle = color
                ctx[i].lineWidth   = elem.stroke[0] * self.quality

                if elem.type is "eyeLeftBrow"
                  ctx[i].lineWidth += (state.eyes.brows.left.width - 100) / 10

                else if elem.type is "eyeRightBrow"
                  ctx[i].lineWidth += (state.eyes.brows.right.width - 100) / 10

              else ctx[i].strokeStyle = "transparent"

              for part in newFurs[elem.type]
                if part[0] is "C"
                  ctx[i].bezierCurveTo part[1], part[2], part[3], part[4], part[5], part[6]
                else
                  ctx[i].beginPath()
                  ctx[i].moveTo part[1], part[2]

              ctx[i].fill()
              ctx[i].stroke()
              ctx[i].restore()


        findValue = (path) ->
          if path[3]
            range = self.state[path[0]][path[1]][path[2]][path[3]] / 100

          else if path[2]
            range = self.state[path[0]][path[1]][path[2]] / 100

          else range = self.state[path[0]][path[1]] / 100


        schemeMorph = (schemeNames, range) ->
          pathsSheme = schemeNames[0]

          if pathsSheme[0][1][1]
            self.morph(
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

            self.morph(
              self.morph(path1[frame], path1[frame + 1], range),
              self.morph(path2[frame], path2[frame + 1], range),

            findValue schemeNames[1])

        for key in @paths.body.keys
          paths = @paths.body[key]
          mul = 1

          if @math[key] and @math[key].pow is "nose"
            if absAngle > 0.26
              pow = 1.5
            else
              pos = 1
              mul = 1.55

          else if @math[key] and @math[key].pow and @math[key].pow isnt "nose"
            pow = @math[key].pow
          else
            pow =  1

          fullRange = ((1 - (absAngle ** (1 / pow)) * mul) * (paths.length - 1))

          frame = fullRange | 0
          range = (fullRange - frame)

          scheme = @scheme[key]

          if scheme
               newFurs[key] = schemeMorph scheme, range
          else newFurs[key] = @morph paths[frame], paths[frame + 1], range


        for key in @paths.hairs[self.$root.hair.name].keys
          paths = @paths.hairs[self.$root.hair.name][key]
          pow = if @math[key] then @math[key].pow else 1

          fullRange = (1 - (absAngle ** (1 / pow))) * (paths.length - 1)

          frame = fullRange | 0
          range = fullRange - frame

          newFurs[key] = @morph paths[frame], paths[frame + 1], range

        window.requestAnimationFrame draw


    mounted: ->
      @elems.keys = []
      @elems.keys = Object.keys @elems
      @elems.keys.pop()  # Removes "keys" value in array of keys

      # Creating an array of contexts

      for key, i in @elems.keys
        ctx = @$refs[key].getContext "2d"

        ctx.canvas.width  = Math.round(1024 * @quality * 1.5)
        ctx.canvas.height = Math.round(1024 * @quality * 1.25)

        ctx.lineCap  = "round"
        ctx.lineJoin = "round"
        ctx.translate 1024 * 0.15, 112 * @quality  * 2

        @ctx[i] = ctx


      # Init watching states

      @state.earFront = on
      @state.earBack  = off

      @state.eyes    = @$root.eyes
      @state.fangs   = @$root.fangs
      @state.tassels = @$root.tassels
      @state.horn    = @$root.horn

      @state.horn.enableBasic = @$root.horn.enable and !@$root.horn.changeling
      @state.horn.enableChnlg = @$root.horn.enable and @$root.horn.changeling

      @state.stripes        = {}
      @state.stripes.enable = @$root.stripes.enable

      @state.hair        = {}
      @state.hair.second = @$root.mane.second
      @state.hair.isSecond = on

      @state.jaw      = {}
      @state.jaw.open = @$root.jaw.open
      @state.jaw.sad  = @$root.jaw.sad

      @state.piercings  = @$root.piercings

      piercingsTypes = ["ring", "point"]

      for type in piercingsTypes
        @state.piercings[type] = curvify abs parse @state.piercings[type]

        for paths, i in @state.piercings[type]
          for path, j in paths
            if j > 0
              @state.piercings[type][i][j] = Math.round path


      self = this


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