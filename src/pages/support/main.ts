import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import App from './App.vue'

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(),

  data() {
    return {
      locale: 'en'
    }
  },

  mounted() {
    // Find & set locale

    const
      rus: string[] = ['ru', 'be', 'uk', 'lt', 'hy', 'kk'],
      lang: string = navigator.language;

    this.locale = rus.indexOf(lang[0] + lang[1]) >= 0 ? 'ru' : 'en';
  },

  render: h => h(App)
})
.$mount('#app');
