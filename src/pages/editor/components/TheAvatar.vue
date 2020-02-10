<template lang="pug">
  #avatar(v-press-hold="[MouseMove, Click, Hold]")
    canvas(:id="$root.name" ref="avatar")
</template>

<script lang="coffee">

  # Libraries

  import abs from "abs-svg-path"
  import parse from "parse-svg-path"
  import curvify from "curvify-svg-path"

  import { keyframes, easing } from 'popmotion'


  # Configs

  import Elems from "../configs/elems.json"
  import IS from "../configs/interpolationScheme.json"
  import Powers from "../configs/power.json"


  # Scripts

  import Animate from "./Avatar/animate.ts"
  import Draw from "./Avatar/draw.coffee"

  export default
    data: ->
      quality: 0.5  # range from 0 to 1
      vmin: undefined


      # Configs

      color: @$root.color
      state: @$root.propers # Using for "if" attribute in "elems" config

      layers: Elems
      math: Powers
      interpolationScheme: IS


      ctx: {}  # Context of canvas

      horiz: 0
      angle: 0  # Calculated angle for transformation

      x: 0  # Horizontal of angle in -1 to 1 range
      y: 0  # Vertical of angle in 0 to 1 range

      last:  # Last calculated variables for deltas
        x: 0
        y: 0
        time: 0

      paths: {}       # Imported and parsed svg references
      calculated: {}  # Calculated paths

      mirror: no            # Avatar isnt mirrored in this time
      executeAnimation: no  # Check for optimization
      afterChange: 0        # Counter after changing angle
      fullQuality: yes      # Rendering at quality equal to 1

    watch:
      x: (num) ->
        { horn } = @state

        lessThan45 = @x <= 0.5

        horn.behind          = lessThan45  and horn.rear
        horn.behindAfterEars = !lessThan45 and horn.rear

        @mirror = num < 0

      "$root.propers.hair.name": (name) ->
        if /Dreads/.test name['en']
          @state.hair.isDreads = yes
          @state.hair.isBasic  = no
        else
          @state.hair.isDreads = no
          @state.hair.isBasic  = yes

        hairs =  @paths.hairs

        if hairs and hairs[name['en']]
          @fullQuality = no
          @executeAnimation = yes
        else
          self = this
          hairName = name['en'].toLowerCase().replace /\W/g, "_"

          @getPartsJSON "hairs", "hairs/" + hairName + ".json"

      "$root.propers.glasses.name": (name) ->
        glasses = @paths.glasses

        if glasses and glasses[name['en']]
          @fullQuality = no
          @executeAnimation = yes
        else
          self = this
          glassesName = name['en'].toLowerCase().replace /\W/g, "_"

          @getPartsJSON "glasses", "glasses/" + glassesName + ".json"


      "$root.propers.horn.name": (name) ->
        horn = @paths.horn

        if horn and horn[name['en']]
          @fullQuality = no
          @executeAnimation = yes
        else
          self = this
          hornsName = name['en'].toLowerCase().replace /\W/g, "_"

          @getPartsJSON "horn", "horns/" + hornsName + ".json"

      "$root.propers":
        handler: (val) ->
          @state = val

          { horn, hair, eyes, piercings } = val


          # Horns

          horn.isBasic = horn.enable and !horn.changeling
          horn.isChnlg = horn.enable and horn.changeling

          lessThan45 = @x <= 0.5

          horn.behind          = lessThan45  and horn.rear
          horn.behindAfterEars = !lessThan45 and horn.rear

          # Hair

          hair.isSecond = !hair.second.isends and hair.second.enable
          hair.isEnds   =  hair.second.isends and hair.second.enable


          # Eyes

          if not eyes.right.enable
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

      "$root.saveChanged": (val) ->
        if val
          @horiz = @$root.horiz
          @angle = @$root.ang

          @x = @$root.degress / 90

          @$root.saveChanged = false;

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
              newPath = curvify(abs(parse(path)))

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


      draw: Draw
      animate: Animate

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

      ###
      { easeOutIn } = easing
      { jaw, eyes } = self.state

      keyframes(
        values: [
          { x: 0.3, horiz: -30, open: 100, lids: 25 },
          { x: 0.1, horiz: 0, open: 0, lids: 0 },
          { x: 0.3, horiz: -30, open: 100, lids: 25 }
        ]
        duration: 2000
        easings: easeOutIn,
        loop: Infinity
      )
      .start (val) ->
        self.x = val.x

        { position, eyelids, brows } = eyes

        position.horiz   = val.horiz
        eyelids.left.up  = val.lids
        eyelids.right.up = val.lids

        jaw.open = val.open

        self.executeAnimation = yes
      ###


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