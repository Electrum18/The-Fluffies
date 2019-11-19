import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import VueResource from "vue-resource"

Vue.config.productionTip = false

Vue.use Vuetify
Vue.use VueResource

new Vue({
  vuetify: new Vuetify(),

  render: (h) -> h App

}).$mount '#app'
