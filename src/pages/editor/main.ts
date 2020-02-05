import Vue from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import Vuetify from 'vuetify/lib'
import VueResource from 'vue-resource'

import App from './App.vue'

import IconPony from './components/IconPony.vue'

import PropertiesConfig from './configs/properties.json'
import ColorConfig from './configs/color.json'


Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueResource);


Vue.directive('press-hold', {
  bind(elem: HTMLElement, binding: DirectiveBinding) {
    let hold: boolean = false;

    function holding (val: any) {
      if (binding.value[1]) binding.value[1](val);

      hold = true

      if (binding.value[2]) binding.value[2](hold);
    }

    function unholding() {
      hold = false

      if (binding.value[2]) binding.value[2](hold);
    }

    function event(val: any) {
      if (hold) {
        if (binding.value[0]) {
          binding.value[0](val)
        } else {
          binding.value(val)
        }
      }
    }

    elem.addEventListener('mousedown', holding, { passive: true });
    elem.addEventListener('mouseup', unholding, { passive: true });
    elem.addEventListener('mouseleave', unholding, { passive: true });
    elem.addEventListener('mousemove', event, { passive: true });

    elem.addEventListener('touchstart', holding, { passive: true });
    elem.addEventListener('touchend', unholding, { passive: true });
    elem.addEventListener('touchcancel', unholding, { passive: true });
    elem.addEventListener('touchmove', event, { passive: true });
  }
})

new Vue({
  vuetify: new Vuetify({
    icons: {
      values: {
        pony: { component: IconPony }
      }
    }
  }),

  data: {
    ang: 0,
    horiz: 0,
    degress: 0,

    locale: 'en',
    warning: { close: false },

    loadings: [],

    propers: PropertiesConfig,
    color: ColorConfig
  },

  methods: {
    getNamesList(target: string) {
      this.$http
        .get(window.location.origin + '/data/' + target + 'Names.json')
        .then(
          (res: any) => {
            let propers: any = this.propers;

            propers[target].info = res.body[target]
          },
          (err) => {
            // Trying get again if not loaded

            setTimeout (() => { this.getNamesList(target) }, 5e3)
          }
        )
    }
  },

  watch: {
    'warning.close'(val: boolean) {
      const self: any = this;

      if (val) setTimeout(() => { self.warning.close = false }, 600);
    },

    'propers.male'(val: boolean) {
      sessionStorage.setItem('gender', val ? 'male' : 'female');
    }
  },

  mounted() {
    this.propers.male = sessionStorage.getItem('gender') === 'male';


    // Find & set locale

    const rus: string[] = ['ru', 'be', 'uk', 'lt', 'hy', 'kk'];

    this.locale = rus.includes(navigator.language) ? 'ru' : 'en';


    // Get JSON data to client and execute

    this.getNamesList('hair');
    this.getNamesList('glasses');
    this.getNamesList('horn');
  },

  render: h => h(App)
})
.$mount('#app');
