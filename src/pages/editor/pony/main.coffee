import Vue from "vue"
import Vuetify from 'vuetify'
import VueResource from "vue-resource"

import App from "./App.vue"
import IconPony from '../../../components/IconPony.vue'

Vue.config.productionTip = false

Vue.use Vuetify
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


new Vue
  vuetify: new Vuetify(
    icons:
      values:
        pony:
          component: IconPony
  )

  render: (h) -> h App

  data:
    ang: 0
    horiz: 0
    degress: 0

    name: "Defaulty"
    male: no

    loadings: []

    hair:
      name: "Spiky to side"
      info: {}

    tassels: on
    fangs: on
    horn:
      enable: off
      changeling: no
      notlines: off

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
      pupils: { width: 10 }

      position:
        horiz: 0
        verti: 0

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

    mane:
      second:
        enable: yes
        isends: no

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
      color:
        basic: "#ffcc00"
        shade: "#cca300"

      left:
        enable: off
        upper: off
        middle: off
        lower: on

      right:
        enable: on
        upper: off
        middle: off
        lower: on

    background:
      color:
        basic: "#ffffff"

    frames: [
      { degress: 90 },
      { degress: 0 }
    ]

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

  watch:
    male: (val) ->
      url = window.location.pathname

      if val
        window.history.replaceState {}, "", url + "?g=m"
      else
        window.history.replaceState {}, "", url + "?g=f"

  mounted: ->
    self = this

    @male = window.location.search is "?g=m"

    # Get JSON data to client and execute

    @get ["hair", "info"], "/data/pony/hairNames.json", ->
      self.hair.info = self.hair.info.hairs

.$mount "#app"
