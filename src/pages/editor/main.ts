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
    degress: 12.5,

    locale: 'en',
    warning: { close: false },

    loadings: [],

    slot: localStorage.getItem('slot') || '0',

    propers: PropertiesConfig,
    color: ColorConfig,

    saveChanged: false,

    default: {
      ang: 0,
      horiz: 0,
      degress: 12.5,

      propers: PropertiesConfig,
      color: ColorConfig
    }
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
    // Find & set locale

    const
      rus: string[] = ['ru', 'be', 'uk', 'lt', 'hy', 'kk'],
      lang: string = navigator.language;

    this.locale = rus.indexOf(lang[0] + lang[1]) >= 0 ? 'ru' : 'en';


    // Get JSON data to client and execute

    this.getNamesList('hair');
    this.getNamesList('glasses');
    this.getNamesList('horn');

    // Local storage for saving

    if (!localStorage.getItem('slot')) {
      localStorage.setItem('slot', this.slot);
    }

    const avatars: any[] = JSON.parse(localStorage.getItem('avatars') as string)

    if (!avatars || !avatars[0]) {
      const { propers, color, ang, horiz, degress } = this.default,
        avatars = [{
          propers,
          color,
          angle: ang,
          horiz,
          degress
        }];

      localStorage.setItem('avatars', JSON.stringify(avatars));
    }

    const parsedSave: object[] = JSON.parse(localStorage.getItem('avatars') as string),

    { propers, color, angle, horiz, degress }: any = parsedSave[+this.slot];

    this.propers = propers;
    this.color = color;
    this.ang = angle,
    this.horiz = horiz;
    this.degress = degress;

    this.saveChanged = true;
  },

  render: h => h(App)
})
.$mount('#app');
