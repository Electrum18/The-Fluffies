import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import App from './App.vue'

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(),

  data: {
    locale: 'en'
  },

  mounted() {
    const rus: string[] = ['ru', 'be', 'uk', 'lt', 'hy', 'kk'];

    this.locale = rus.includes(navigator.language) ? 'ru' : 'en';

    /*if ('serviceWorker' in navigator) {
      const serviceWorker = navigator.serviceWorker;

      serviceWorker
        .register('/sw.js')
        .then(() => {
          console.log('Service worker: %c ONLINE ',  'background: #444; color: #8f4');

          //serviceWorker.ready
          //  .then(worker => worker.sync.register('syncdata'));
        })
        .catch(err => console.log('Service worker: %c OFFLINE ', 'background: #444; color: #f44', err))
    }*/
  },

  render: h => h(App)
})
.$mount('#app');