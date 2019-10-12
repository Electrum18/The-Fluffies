import Vue from "vue"
import App from "./App.vue"
import VueResource from "vue-resource"

Vue.config.productionTip = false

Vue.use VueResource

Vue.directive "press-hold",
  bind: (elem, binding) ->
    hold = no

    holding = (val) ->
      if binding.value[1]
        binding.value[1] val

      hold = yes

      if binding.value[2]
        binding.value[2] hold

    unholding = ->
      hold = no

      if binding.value[2]
        binding.value[2] hold

    event = (val) ->
      if hold
        if binding.value[0]
             binding.value[0] val
        else binding.value val

    elem.addEventListener "mousedown", holding, { passive: yes }
    elem.addEventListener "mouseup", unholding, { passive: yes }
    elem.addEventListener "mouseleave", unholding, { passive: yes }
    elem.addEventListener "mousemove", event, { passive: yes }

    elem.addEventListener "touchstart", holding, { passive: yes }
    elem.addEventListener "touchend", unholding, { passive: yes }
    elem.addEventListener "touchcancel", unholding, { passive: yes }
    elem.addEventListener "touchmove", event, { passive: yes }


Vue.directive "scroll",
  bind: (elem, binding) ->
    event = (e) ->
      if e.type isnt "wheel" then return

      delta = -Math.abs(e.deltaY) * (120 / e.deltaY)

      if binding.value[0]
           binding.value[0] delta
      else binding.value delta

    elem.addEventListener "wheel", event
    elem.addEventListener "mousewheel", event
    elem.addEventListener "DOMMouseScroll", event

new Vue
  render: (h) -> h App

  data:
    ang: 0
    horiz: 0
    degress: 0

    shading:
      enable: on
      active: on

    loadings: []

    hair:
      name: "Spiky to side"
      id: 3

      info: {}
      side:
        basic: { transform: "" }
        front: { transform: "scale(-1, 1) translate(-100%)" }
        alt: { transform: "scale(-1, 1)" }

    tassels: on
    fangs: on
    catlike: off
    horn:
      enable: off
      notLines: off
      changeling: no

    jaw:
      open: 0
      sad: 0
      color:
        basic: "#cc4477"

    tongue:
      color:
        basic: "#ee8833"
        shade: "#dd7722"

    stripes:
      enable: off
      color:
        basic: "#777777"

    teeth: { upper: 100, lower: 100 }

    eyes:
      color:
        left:
          basic: "#ffcc00"
          shade: "#a88700"
          stroke: { stroke: "#ffcc00" }

        right:
          enable: off
          basic: "#ffcc00"
          shade: "#a88700"
          stroke: { stroke: "#ffcc00" }

      iris: { scale: 100 }
      pupils: { width: 10, height: 100 }

      position:
        horiz: 50, verti: 50
        focus: 100, derp: 0
        mode: "absolute"

      eyelids:
        left: { up: 0, down: 0 }
        right: { up: 0, down: 0 }

      brows:
        show: yes

        left:
          width: 100
          height: 0
          evil: 0
          wide: 0

        right:
          width: 100
          height: 0
          evil: 0
          wide: 0

      changeling: no

    mane:
      second:
        enable: yes
        notLines: yes
        isEnds: no

      color:
        basic: "#666666"
        shade: "#4d4d4d"
        second: "#555555"

    fur:
      color:
        basic: "#cccccc"
        shade: "#999999"
        second: "#dddddd"

    piercings:
      ring: "M8.7 3.3h-21.3c-3 0-5.4-2.4-5.4-5.3s2.4-5.3 5.3-5.3H8.7C11.6-7.3 14-4.9 14-2s-2.4 5.3-5.3 5.3z",
      point: "M-14,-2a12,12 0 1,0 24,0a12,12 0 1,0 -24,0",

      left: [],
      right: [{ type: "ring", color: "#ffcc00", shade: "#cca300" }]

    background:
      color:
        basic: "#ffffff"

    path:
      neckClip: ""

      headClip: ""
      noseClip: ""

      hornClip: ""

      eyeLeftClip: ""
      eyeRightClip: ""

      earLeftClip: ""
      earRightClip: ""
      earRightFrontClip: ""

      mouthClip: ""

      hairClip: ""
      hairNapeClip: ""
      hairTailClip: ""

    earClipEnabled: yes

  computed:
    faceMoveReverse: ->
      transform: "translateY(#{ @horiz * 6 }%)"

    faceMove: -> transform: "translateY(#{ -@horiz * 6 }%)"
    earsMove: -> transform: "translateY(#{ @horiz * 2 }%)"
    earsClip: -> transform: "translateY(#{ @horiz * 2 }%) " + @hair.side.basic.transform

    earsClipAlt: ->
      transform: "translateX(100%) translateY(#{ @horiz * 2 }%) " + @hair.side.alt.transform

    headRotate: -> transform: "rotate(#{ @ang }deg)"
    headRotateHair: -> transform: "rotate(#{ @ang }deg) scale(-1, 1)"
    furStroke: -> stroke: @fur.color.basic
    furTint: -> stroke: @fur.color.shade

    furCheckedEyelashes: ->
      if @eyes.lashes.show then background: @eyes.color.left.basic else false

    furCheckedEyebrows: ->
      if @eyes.brows.show then background: @eyes.color.left.basic else false

    furCheckedChangeling: ->
      if @eyes.changeling then background: @eyes.color.left.basic else false

    ifIsRelative: ->
      if @eyes.position.mode is "relative" then background: @eyes.color.left.basic else false

    ifIsAbsolute: ->
      if @eyes.position.mode is "absolute" then background: @eyes.color.left.basic else false

    leftBrowHeight: ->
      val = if @degress < 0
           @eyes.brows.left.height
      else @eyes.brows.right.height

      transform: "translateY(#{ -@horiz * 6 - val / 50 }%)"

    rightBrowHeight: ->
      val = if @degress < 0
           @eyes.brows.right.height
      else @eyes.brows.left.height

      transform: "translateY(#{ -@horiz * 6 - val / 50 }%)"

    leftBrowWidth: ->
      val = if @degress < 0
           @eyes.brows.left.width
      else @eyes.brows.right.width

      "stroke-width": 2.5 + val / 20

    rightBrowWidth: ->
      val = if @degress < 0
           @eyes.brows.right.width
      else @eyes.brows.left.width

      "stroke-width": 2.5 + val / 20

    eyesStroke: -> stroke: @eyes.color.left.basic
    eyesSet: -> background: @eyes.color.left.basic

    eyesCheckedRightDivide: ->
      if @eyes.color.right.enable then background: @eyes.color.right.basic else false

    eyeLeftGradient: ->
      if @$root.eyes.changeling then "url(#grad_Eyes_Changeling)"
      else if @degress < 0 then "url(#grad_Eyes_Left)" else "url(#grad_Eyes_Right)"

    eyeRightGradient: ->
      if @$root.eyes.changeling then "url(#grad_Eyes_Changeling)"
      else if @degress < 0 then "url(#grad_Eyes_Right)" else "url(#grad_Eyes_Left)"

    Shading: ->
      if @shading.enable and @shading.active then "url(#filter_shadow)" else no

    stipesShow: -> if @stripes.enable then false else opacity: 0

  methods:
    get: (target, url, callback) ->
      self = this

      @$http.get(window.location.origin + url).then (res) ->
        if target[1]
          self[target[0]][target[1]] = { self[target[0]][target[1]]..., res.body... }

        else self[target] =  { self[target]..., res.body... }

        setTimeout ->
          callback()
        , 100

      , (err) ->
        # Trying get again if not loaded

        setTimeout ->
          self.get(target, url, callback)
        , 5e3

    createLeftRing: -> @piercings.left.push    { type: "ring",  color: "#ffcc00", shade: "#ccaa22" }
    createLeftPoint: -> @piercings.left.push   { type: "point", color: "#ffcc00", shade: "#ccaa22" }
    createRightRing: -> @piercings.right.push  { type: "ring",  color: "#ffcc00", shade: "#ccaa22" }
    createRightPoint: -> @piercings.right.push { type: "point", color: "#ffcc00", shade: "#ccaa22" }

  mounted: ->
    self = this


    # Get JSON data to client and execute

    @get ["hair", "info"], "/data/pony/hairNames.json", ->
      self.hair.info = self.hair.info.hairs

.$mount "#app"
