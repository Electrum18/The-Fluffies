import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import CompositionApi from '@vue/composition-api';

import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(CompositionApi);
Vue.use(Vuetify);

new Vue({
  vuetify: new Vuetify(),

  render: h => h(App)
})
.$mount('#app');
