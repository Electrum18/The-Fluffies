import Vue from "vue"
import Vuetify from 'vuetify'
import VueResource from "vue-resource"

import App from "./App.vue"

import IconEnglish from "../../components/IconEnglish.vue"
import IconRussian from "../../components/IconRussian.vue"
import IconPony from '../../components/IconPony.vue'

import AvatarConfig from "./config.json"
import Headers from "../../assets/json/locales/headers.json"

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
  vuetify: new Vuetify
    icons:
      values:
        pony:
          component: IconPony

        english:
          component: IconEnglish

        russian:
          component: IconRussian

  data: {
    ang: 0
    horiz: 0
    degress: 0

    locale: "en"

    loadings: []

    frames: [
      { degress: 90 },
      { degress: 0 }
    ]

    ...AvatarConfig

    Headers
  }

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
    locale: (lang) ->
      document.documentElement.lang = lang
      document.title = @Headers.titles[@locale]

      document
        .querySelector "meta[name='description']"
        .setAttribute "content", @Headers.descriptions[@locale]

      document
        .querySelector "meta[property='og:description']"
        .setAttribute "content", @Headers.descriptions[@locale]

      document
        .querySelector "meta[name='keywords']"
        .setAttribute "content", @Headers.keywords[@locale]

      document
        .querySelector "meta[property='og:keywords']"
        .setAttribute "content", @Headers.keywords[@locale]


  mounted: ->
    self = this

    @male = window.location.search[3] is "m"

    # Get JSON data to client and execute

    @get ["hair", "info"], "/data/pony/hairNames.json", ->
      self.hair.info = self.hair.info.hairs

    @get ["glasses", "info"], "/data/pony/glassesNames.json", ->
      self.glasses.info = self.glasses.info.glasses


  render: (h) -> h App

.$mount "#app"
