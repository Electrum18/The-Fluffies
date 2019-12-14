import Vue from "vue"
import Vuetify from "vuetify"

import App from "./App.vue"

import IconEnglish from "../../components/IconEnglish.vue"
import IconRussian from "../../components/IconRussian.vue"

import Headers from "../../assets/json/locales/headers.json"

Vue.config.productionTip = false

Vue.use Vuetify

new Vue
  vuetify: new Vuetify
    icons:
      values:
        english:
          component: IconEnglish

        russian:
          component: IconRussian

  data: -> {
    locale: "en"
    Headers
  }

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

  render: (h) -> h App

.$mount "#app"
