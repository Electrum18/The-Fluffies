<template lang="pug">
  #avatar.transition(v-press-hold="[MouseMove, Click, Holding]")
    canvas(width="1024" height="1024" ref="head")
    canvas(width="1024" height="1024" ref="hair")
    canvas(width="1024" height="1024" ref="neck")
    canvas(width="1024" height="1024" ref="head2")
    canvas(width="1024" height="1024" ref="eyeLeft")
    canvas(width="1024" height="1024" ref="head3")
    canvas(width="1024" height="1024" ref="eyeLeftBrow")
    canvas(width="1024" height="1024" ref="head4")
    canvas(width="1024" height="1024" ref="chin")
    canvas(width="1024" height="1024" ref="head5")
    canvas(width="1024" height="1024" ref="eyeRight")
    canvas(width="1024" height="1024" ref="head6")
    canvas(width="1024" height="1024" ref="eyeRightBrow")
    canvas(width="1024" height="1024" ref="hair2")
    canvas(width="1024" height="1024" ref="head7")
</template>

<script lang="coffee">
  import abs from "abs-svg-path"
  import parse from "parse-svg-path"
  import curvify from "curvify-svg-path"

  import Elems from "../pages/editor/pony/elems.json"

  export default
    data: ->
      elems: Elems

      color:
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
        nose:   pow: 1.5
        bridge: pow: 1.5
        mouth:  pow: 1.5
        fangsLeft:  pow: 1.5
        fangsRight: pow: 1.5
        nostrilLeft:  pow: 1.5
        nostrilRight: pow: 1.5
        tongue:       pow: 1.5
        eyeLeftLashesUpper:  pow: 1.5
        eyeLeftLashesMiddle: pow: 1.5
        eyeLeftLashesLower:  pow: 1.5

      scheme:
        mouth: [["basic", "openJaw"], ["jaw", "open"]]
        eyeLeftLidUp: [["basic", "eyelidLeftDown"], ["jaw", "open"]]

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
          scale: 100
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
          @ctx[i].translate @ctx[i].canvas.width, 0
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
          @color.eyes = val.color
          @state.eyes = val

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
              newPaths[i] = curvify abs parse path

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

      animate: ->
        ctx   = @ctx
        elems = @elems
        last  = @last
        horiz = @horiz
        angle = @angle
        state = @state

        self = this

        absAngle = if @x < 0 then -@x else @x
        toRad    = Math.PI / 180

        for key, i in elems.keys
          ctx[i].clearRect 0, 0, ctx[i].canvas.width, ctx[i].canvas.height

          if key in ["head", "head2", "head3", "head4", "head5", "head6", "head7", "chin",
            "hair", "hair2", "eyeLeft", "eyeRight", "eyeLeftBrow", "eyeRightBrow"
          ]
            ctx[i].translate  ctx[i].canvas.width / 2,  ctx[i].canvas.height / 2

            ctx[i].rotate -last.angle * toRad
            ctx[i].rotate       angle * toRad

            ctx[i].translate -ctx[i].canvas.width / 2, -ctx[i].canvas.height / 2

            if key is "head"
              ctx[i].translate 0, -last.horiz * 30
              ctx[i].translate 0,       horiz * 30

            else if key in ["head2", "head3", "head4", "head5", "head6", "head7"]
              ctx[i].translate 0, last.horiz * 30
              ctx[i].translate 0,     -horiz * 30

            else if key in ["eyeLeft", "eyeRight"]
              ctx[i].translate -((last.eyes.position.horiz - 50) / 1.5),
                last.horiz * 30 +  (last.eyes.position.verti - 50)

              ctx[i].translate ((state.eyes.position.horiz - 50) / 1.5),
                -horiz * 30 - (state.eyes.position.verti - 50)

            else if key is "eyeLeftBrow"
              ctx[i].translate 0, last.horiz * 30 + (parseInt last.eyes.brows.left.height  / 5)
              ctx[i].translate 0,     -horiz * 30 - (parseInt state.eyes.brows.left.height / 5)

            else if key is "eyeRightBrow"
              ctx[i].translate 0, last.horiz * 30 + (parseInt last.eyes.brows.right.height  / 5)
              ctx[i].translate 0,     -horiz * 30 - (parseInt state.eyes.brows.right.height / 5)

            if key is "head7"
              last.angle = angle
              last.horiz = horiz
              last.eyes.position.horiz = state.eyes.position.horiz
              last.eyes.position.verti = state.eyes.position.verti
              last.eyes.scale          = state.eyes.iris.scale
              last.eyes.brows.left.height  = state.eyes.brows.left.height
              last.eyes.brows.right.height = state.eyes.brows.right.height

        newFurs  = []

        calc = (a, b, range) ->
          Math.floor(a + (b - a) * range)

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

                  ctx[i].translate 0, last.horiz * 30

                  if key in ["eyeLeft", "eyeRight"]
                    ctx[i].translate -((last.eyes.position.horiz - 50) / 1.5),
                      last.eyes.position.verti - 50

                  for part in newFurs[clip]
                    if part[0] is "C"
                      ctx[i].bezierCurveTo part[1], part[2], part[3], part[4], part[5], part[6]
                    else
                      ctx[i].moveTo part[1], part[2]

                  ctx[i].translate 0, -horiz * 30

                  if key in ["eyeLeft", "eyeRight"]
                    ctx[i].translate ((state.eyes.position.horiz - 50) / 1.5),
                      -(state.eyes.position.verti - 50)

                ctx[i].closePath()
                ctx[i].clip(if clear then "evenodd")

              if elem.fill
                if elem.fill[0][1] && elem.fill[1][1]
                  color = self.color[elem.fill[0]][elem.fill[1]]

                else color = elem.fill

                if elem.type is "hornSecond" and !state.horn.notLines
                  color = "transparent"

                ctx[i].fillStyle = color

              else ctx[i].fillStyle = "transparent"

              if elem.stroke
                if elem.stroke[1][0][1] && elem.stroke[1][1][1]
                  color = self.color[elem.stroke[1][0]][elem.stroke[1][1]]

                else color = elem.stroke[1]

                if elem.type is "hornSecond" and state.horn.notLines
                  color = "transparent"

                ctx[i].strokeStyle = color
                ctx[i].lineWidth   = elem.stroke[0]

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


        for key in @paths.body.keys
          paths = @paths.body[key]
          pow = if @math[key] then @math[key].pow else 1

          fullRange = (1 - (absAngle ** (1 / pow))) * (paths.length - 1)

          frame = fullRange | 0
          range = fullRange - frame

          if @scheme[key]
            elemsScheme = []

            for pathsSheme in @scheme[key][0]
              console.log pathsSheme, @paths.emotions

              if pathsSheme is "basic"
                   pathsSheme = paths
              else pathsSheme = @paths.emotions[pathsSheme]

              elemsScheme.push morph pathsSheme[frame], pathsSheme[frame + 1], range

            range = @state[@scheme[key][1][0]][@scheme[key][1][1]] / 100

            newFurs[key] = morph elemsScheme[0], elemsScheme[1], range

          else newFurs[key] = morph paths[frame], paths[frame + 1], range


        for key in @paths.hairs[self.$root.hair.name].keys
          paths = @paths.hairs[self.$root.hair.name][key]
          pow = if @math[key] then @math[key].pow else 1

          fullRange = (1 - (absAngle ** (1 / pow))) * (paths.length - 1)

          frame = fullRange | 0
          range = fullRange - frame

          newFurs[key] = morph paths[frame], paths[frame + 1], range

        window.requestAnimationFrame draw

    mounted: ->
      @elems.keys = []
      @elems.keys = Object.keys @elems
      @elems.keys.pop()  # Removes "keys" value in array of keys


      # Creating an array of contexts

      for key, i in @elems.keys
        ctx = @$refs[key].getContext "2d"
        ctx.lineCap  = "round"
        ctx.lineJoin = "round"
        ctx.translate 0, 112

        @ctx[i] = ctx


      # Init watching states

      @state.eyes    = @$root.eyes
      @state.fangs   = @$root.fangs
      @state.tassels = @$root.tassels
      @state.horn    = @$root.horn

      @state.stripes        = {}
      @state.stripes.enable = @$root.stripes.enable

      @state.hair        = {}
      @state.hair.second = @$root.mane.second

      @state.jaw      = {}
      @state.jaw.open = @$root.jaw.open
      @state.jaw.sad  = @$root.jaw.sad


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

        console.log self.paths
        self.animate()
</script>