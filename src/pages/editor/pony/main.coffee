import Vue from "vue"
import App from "./App.vue"
import VueResource from "vue-resource"

Vue.config.productionTip = false

Vue.use VueResource

Vue.directive "press-hold",
  bind: (elem, binding) ->
    hold = no

    holding =   -> hold = yes
    unholding = -> hold = no

    event = (val) ->
      if hold then binding.value val else return

    elem.addEventListener "mousedown", holding, { passive: yes }
    elem.addEventListener "mouseup", unholding, { passive: yes }
    elem.addEventListener "mouseleave", unholding, { passive: yes }
    elem.addEventListener "mousemove", event, { passive: yes }

    elem.addEventListener "touchstart", holding, { passive: yes }
    elem.addEventListener "touchend", unholding, { passive: yes }
    elem.addEventListener "touchcancel", unholding, { passive: yes }
    elem.addEventListener "touchmove", event, { passive: yes }

new Vue
  render: (h) -> h App

  data:
    ang: 0
    horiz: 0
    degress: 0

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

    jaw: { open: 0, sad: 0 }
    teeth: { upper: 100, lower: 100 }

    eyes:
      color:
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

      lashes: { show: yes }

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

    mane:
      second:
        enable: yes
        notLines: yes

      color:
        basic: "#666666"
        shade: "#4d4d4d"
        second: "#555555"

    fur:
      color:
        basic: "#cccccc"
        shade: "#999999"

    piercings:
      ring: "M8.7 3.3h-21.3c-3 0-5.4-2.4-5.4-5.3s2.4-5.3 5.3-5.3H8.7C11.6-7.3 14-4.9 14-2s-2.4 5.3-5.3 5.3z",
      point: "M-14,-2a12,12 0 1,0 24,0a12,12 0 1,0 -24,0",

      left: [],
      right: [{ type: "ring", color: "#ffcc00", shade: "#bf9900" }]

    path:
      headClip: ""
      noseClip: ""

      eyeLeftClip: ""
      eyeRightClip: ""

      earLeftClip: ""
      earRightClip: ""

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
      if @eyes.lashes.show then background: @eyes.color.basic else false

    furCheckedEyebrows: ->
      if @eyes.brows.show then background: @eyes.color.basic else false

    ifIsRelative: ->
      if @eyes.position.mode is "relative" then background: @eyes.color.basic else false

    ifIsAbsolute: ->
      if @eyes.position.mode is "absolute" then background: @eyes.color.basic else false

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

    eyesStroke: -> stroke: @eyes.color.basic
    eyesSet: -> background: @eyes.color.basic

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
