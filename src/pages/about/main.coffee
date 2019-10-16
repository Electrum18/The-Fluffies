import Vue from 'vue'
import App from './App.vue'
import VueResource from "vue-resource"

Vue.config.productionTip = false

Vue.use VueResource

new Vue
  render: (h) -> h App

  data:
    dark: false

.$mount '#app'
