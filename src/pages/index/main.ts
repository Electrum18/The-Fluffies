import Vue from "vue"
import Vuetify from "vuetify"

import App from "./App.vue"

import IconEnglish from "../../components/IconEnglish.vue"
import IconRussian from "../../components/IconRussian.vue"

import Headers from "../../assets/json/locales/headers.json"

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify({
    icons: {
      values: {
        english: { component: IconEnglish },
        russian: { component: IconRussian }
      }
    }
  }),

  data: {
    locale: "en",
    Headers
  },

  watch: {
    locale(lang: string): void {
      var
        Headers: { [index: string]: { [index: string]: string } } = this.Headers,

        descriptions: string = Headers.descriptions[this.locale],
        keywords: string     = Headers.keywords[this.locale];

      document.documentElement.lang = lang;
      document.title = Headers.titles[this.locale];

      document
        .querySelector("meta[name='description']")!
        .setAttribute("content", descriptions);

      document
        .querySelector("meta[property='og:description']")!
        .setAttribute("content", descriptions);

      document
        .querySelector("meta[name='keywords']")!
        .setAttribute("content", keywords);

      document
        .querySelector("meta[property='og:keywords']")!
        .setAttribute("content", keywords);
    }
  },

  /*mounted: ->
    if "serviceWorker" of navigator
      navigator.serviceWorker
        .register "/sw.js"
        .then ->
          console.log "Service worker: %c ONLINE ",  "background: #444; color: #8f4"

          navigator.serviceWorker.ready.then (worker) ->
            worker.sync.register "syncdata"

        .catch -> console.log "Service worker: %c OFFLINE ", "background: #444; color: #f44"*/

  render: (h) => h(App)

}).$mount("#app");
