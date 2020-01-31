import Vue from "vue"
import Vuetify from 'vuetify/lib'

import App from "./App.vue"

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(),

  data: {
    locale: "en",
  },

  mounted() {
    const rus: string[] = ["ru", "be", "uk", "lt", "hy", "kk"];

    this.locale = rus.includes(navigator.language) ? "ru" : "en";
  },

  /*
  mounted() {
      if "serviceWorker" of navigator
        navigator.serviceWorker
          .register "/sw.js"
          .then ->
            console.log "Service worker: %c ONLINE ",  "background: #444; color: #8f4"

            navigator.serviceWorker.ready.then (worker) ->
              worker.sync.register "syncdata"

          .catch -> console.log "Service worker: %c OFFLINE ", "background: #444; color: #f44"
  */

  render: h => h(App)
})
.$mount("#app");