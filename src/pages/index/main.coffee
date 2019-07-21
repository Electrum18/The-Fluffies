import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue
  render: (h) -> h App

  data:
    dark: false

  mounted: ->
    document.dispatchEvent new Event 'render-event'

.$mount '#app'