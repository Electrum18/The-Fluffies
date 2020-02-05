<template lang="pug">
  div
    v-expansion-panels(focusable)
      v-expansion-panel

        // Eyes

        v-expansion-panel-header.title {{ lang.menu.eyes.title }}
        v-expansion-panel-content
          BarColor(:text="lang.menu.eyes.color" :val="['color', 'eyes', 'left', 'basic']")

          BarSwitch(
            :text="lang.menu.eyes.heterochromia"
            :val="['propers', 'eyes', 'right', 'enable']"
            )

          BarColor(
            :text="lang.menu.eyes['color right']"
            :val="['color', 'eyes', 'right', 'basic']"
            :off="['propers', 'eyes', 'right', 'enable']"
          )

          v-divider.my-4

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.scale"
              :val="['propers', 'eyes', 'iris', 'scale']"
              max=125
              min=50
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes.pupils }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.width"
              :val="['propers', 'eyes', 'pupils', 'width']"
              max=100
              min=10
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes.position }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.horizontal"
              :val="['propers', 'eyes', 'position', 'horiz']"
              max=100
              min=-100
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.vertical"
              :val="['propers', 'eyes', 'position', 'verti']"
              max=100
              min=-100
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes["left eyelids"] }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.upper"
              :val="['propers', 'eyes', 'eyelids', 'left', 'up']"
              max=100
              min=0
              :compare="['propers', 'eyes', 'eyelids', 'left', 'down']"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.lower"
              :val="['propers', 'eyes', 'eyelids', 'left', 'down']"
              max=100
              min=0
              :compare="['propers', 'eyes', 'eyelids', 'left', 'up']"
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes["right eyelids"] }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.upper"
              :val="['propers', 'eyes', 'eyelids', 'right', 'up']"
              max=100
              min=0
              :compare="['propers', 'eyes', 'eyelids', 'right', 'down']"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.lower"
              :val="['propers', 'eyes', 'eyelids', 'right', 'down']"
              max=100
              min=0
              :compare="['propers', 'eyes', 'eyelids', 'right', 'up']"
            )


          v-divider.my-4

          BarSwitch(
            :text="lang.menu.eyes.eyebrows.title"
            :val="['propers', 'eyes', 'brows', 'show']"
          )

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.eyes.eyebrows.left }}

          v-card(outlined :disabled="off(['propers', 'eyes', 'brows', 'show'])").my-2
            BarSlider(
              :text="lang.menu.eyes.eyebrows.width"
              :val="['propers', 'eyes', 'brows', 'left', 'width']"
              max=150
              min=50
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.height"
              :val="['propers', 'eyes', 'brows', 'left', 'height']"
              max=100
              min=-100
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.evil"
              :val="['propers', 'eyes', 'brows', 'left', 'evil']"
              max=100
              min=0
              :compare="['propers', 'eyes', 'brows', 'left', 'wide']"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.wide"
              :val="['propers', 'eyes', 'brows', 'left', 'wide']"
              max=100
              min=0
              :compare="['propers', 'eyes', 'brows', 'left', 'evil']"
            )


          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes.eyebrows.right }}

          v-card(
            outlined
            :disabled="off(['propers', 'eyes', 'brows', 'show'])"
          ).my-2
            BarSlider(
              :text="lang.menu.eyes.eyebrows.width"
              :val="['propers', 'eyes', 'brows', 'right', 'width']"
              max=150
              min=50
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.height"
              :val="['propers', 'eyes', 'brows', 'right', 'height']"
              max=100
              min=-100
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.evil"
              :val="['propers', 'eyes', 'brows', 'right', 'evil']"
              max=100
              min=0
              :compare="['propers', 'eyes', 'brows', 'right', 'wide']"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.wide"
              :val="['propers', 'eyes', 'brows', 'right', 'wide']"
              max=100
              min=0
              :compare="['propers', 'eyes', 'brows', 'right', 'evil']"
            )


      // Glasses

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.glasses.title }}
        v-expansion-panel-content
          BarSwitch(
            :text="lang.enable"
            :val="['propers', 'glasses', 'enable']"
          )

          v-divider.my-4

          BarColor(
            :text="lang.menu.glasses.color.lenses"
            :val="['color', 'glasses', 'lenses']"
            :off="['propers', 'glasses', 'enable']"
          )

          BarColor(
            :text="lang.menu.glasses.color.frame"
            :val="['color', 'glasses', 'frame']"
            :off="['propers', 'glasses', 'enable']"
          )

          v-divider.my-4

          v-card(
            outlined
            :disabled="off(['propers', 'glasses', 'enable'])"
          ).my-2
            BarSlider(
              :text="lang.menu.glasses.width"
              :val="['propers', 'glasses', 'width']"
              max=150
              min=50
            )

          v-divider.my-4

          BarList(
            target="glasses"
            :list="$root.propers.glasses.info"
            :off="['propers', 'glasses', 'enable']"
          )

      // Mane

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.mane.title }}
        v-expansion-panel-content
          BarColor(
            :text="lang.menu.mane.color"
            :val="['color', 'hair', 'basic']"
            :shade="3 / 4"
          )

          v-divider.my-4

          v-card(outlined)
            v-card(light)
              v-card-title.body-1.font-weight-bold {{ $root.propers.hair.name[$root.locale] }}

            v-divider

            v-card-actions
              v-spacer
              v-btn(
                @click="openManes()"
                :aria-label="lang.menu.mane.change"
              ) {{ lang.menu.mane.change }}
              v-spacer

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.mane.second.title }}

          BarSwitch(
            :text="lang.enable"
            :val="['propers', 'hair', 'second', 'enable']"
          )

          BarSwitch(
            :text="lang.menu.mane.second.ends"
            :val="['propers', 'hair', 'second', 'isends']"
            :off="['propers', 'hair', 'second', 'enable']"
          )

          BarColor(
            :text="lang.menu.mane.second.color"
            :val="['color', 'hair', 'second']"
            :off="['propers', 'hair', 'second', 'enable']"
          )


      // Fur

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.fur.title }}
        v-expansion-panel-content
          BarColor(
            :text="lang.menu.fur.color"
            :val="['color', 'fur', 'basic']"
            :shade="3 / 4"
          )

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.fur.stripes.title }}

          BarSwitch(
            :text="lang.enable"
            :val="['propers', 'stripes', 'enable']"
          )

          BarColor(
            :text="lang.menu.fur.stripes.color"
            :val="['color', 'stripes', 'basic']"
            :off="['propers', 'stripes', 'enable']"
          )


      // Horns

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.horn.title }}
        v-expansion-panel-content
          BarSwitch(
            :text="lang.enable"
            :val="['propers', 'horn', 'enable']"
          )

          BarSwitch(
            :text="lang.menu.horn.changeling"
            :val="['propers', 'horn', 'changeling']"
            :off="['propers', 'horn', 'enable']"
          )

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.horn.rear.title }}

          BarSwitch(
            :text="lang.enable"
            :val="['propers', 'horn', 'rear']"
          )

          BarColor(
            :text="lang.menu.horn.rear.set"
            :val="['color', 'hornRear', 'basic']"
            :shade="4 / 5"
            :off="['propers', 'horn', 'rear']"
          )

          v-divider.my-4

          BarList(
            target="horn"
            :list="$root.propers.horn.info"
            :off="['propers', 'horn', 'rear']"
          )


      // Mouth

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.mouth.title }}
        v-expansion-panel-content
          BarSwitch(
            :text="lang.menu.mouth.fangs"
            :val="['propers', 'fangs']"
          )

          v-divider.my-4

          BarColor(
            :text="lang.menu.mouth.mouth"
            :val="['color', 'jaw', 'basic']"
          )

          BarColor(
            :text="lang.menu.mouth.tongue"
            :val="['color', 'tongue', 'basic']"
            :shade="9 / 10"
          )


      // Emotion

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.emotion.title }}
        v-expansion-panel-content
          .py-2

          p.subtitle-2 {{ lang.menu.emotion.mouth }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.emotion.open"
              :val="['propers', 'jaw', 'open']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.emotion.sad"
              :val="['propers', 'jaw', 'sad']"
              max=100
              min=0
            )

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.emotion.teeth }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.emotion.upper"
              :val="['propers', 'teeth', 'upper']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.emotion.lower"
              :val="['propers', 'teeth', 'lower']"
              max=100
              min=0
            )


      // Ears

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.ears.title }}
        v-expansion-panel-content
          BarSwitch.my-2(
            :text="lang.menu.ears.tassels"
            :val="['propers', 'tassels']"
          )


      // Piercing

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.piercing.title }}
        v-expansion-panel-content
          BarColor(
            :text="lang.menu.piercing.color"
            :val="['color', 'piercings', 'basic']"
            :shade="4 / 5"
          )

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.piercing.ears.left }}

          BarSwitch(
            :text="lang.enable"
            :val="['propers', 'piercings', 'left', 'enable']"
          )

          v-btn-toggle(
            v-model="leftPiercings"
            dense
            mandatory
            color="#fa0"
          )
            v-btn(
              outlined
              :disabled="off(['propers', 'piercings', 'left', 'enable'])"
              :aria-label="lang.one"
            ) {{ lang.one }}

            v-btn(
              outlined
              :disabled="off(['propers', 'piercings', 'left', 'enable'])"
              :aria-label="lang.two"
            ) {{ lang.two }}

            v-btn(
              outlined
              :disabled="off(['propers', 'piercings', 'left', 'enable'])"
              :aria-label="lang.three"
            ) {{ lang.three }}

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.piercing.ears.right }}

          BarSwitch(
            :text="lang.enable"
            :val="['propers', 'piercings', 'right', 'enable']"
          )

          v-btn-toggle(
            v-model="rightPiercings"
            dense
            mandatory
            color="#fa0"
          )
            v-btn(
              outlined
              :disabled="off(['propers', 'piercings', 'right', 'enable'])"
              :aria-label="lang.one"
            ) {{ lang.one }}

            v-btn(
              outlined
              :disabled="off(['propers', 'piercings', 'right', 'enable'])"
              :aria-label="lang.two"
            ) {{ lang.two }}

            v-btn(
              outlined
              :disabled="off(['propers', 'piercings', 'right', 'enable'])"
              :aria-label="lang.three"
            ) {{ lang.three }}


      // Hooves

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.hooves.title }}
        v-expansion-panel-content
          BarSwitch(
            :text="lang.enable"
            :val="['propers', 'hooves', 'enable']"
          )


          .py-2

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.hooves.left }}

          v-divider.my-4


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.shoulder }}

          v-card(outlined :disabled="off(['propers', 'hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['propers', 'hooves', 'left', 'shoulder', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['propers', 'hooves', 'left', 'shoulder', 'angle']"
              max=180
              min=-180
            )


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.elbow }}

          v-card(outlined :disabled="off(['propers', 'hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['propers', 'hooves', 'left', 'elbow', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['propers', 'hooves', 'left', 'elbow', 'angle']"
              max=180
              min=-180
            )


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.wrist }}

          v-card(outlined :disabled="off(['propers', 'hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['propers', 'hooves', 'left', 'wrist', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['propers', 'hooves', 'left', 'wrist', 'angle']"
              max=180
              min=-180
            )


          .py-2

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.hooves.right }}

          v-divider.my-4


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.shoulder }}

          v-card(outlined :disabled="off(['propers', 'hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['propers', 'hooves', 'right', 'shoulder', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['propers', 'hooves', 'right', 'shoulder', 'angle']"
              max=180
              min=-180
            )


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.elbow }}

          v-card(outlined :disabled="off(['propers', 'hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['propers', 'hooves', 'right', 'elbow', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['propers', 'hooves', 'right', 'elbow', 'angle']"
              max=180
              min=-180
            )


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.wrist }}

          v-card(outlined :disabled="off(['propers', 'hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['propers', 'hooves', 'right', 'wrist', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['propers', 'hooves', 'right', 'wrist', 'angle']"
              max=180
              min=-180
            )


      // Neck

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.neck.title }}
        v-expansion-panel-content
          BarSwitch(
            :text="lang.menu.neck.collar.enable"
            :val="['propers', 'collar', 'enable']"
          )

          BarColor(
            :text="lang.menu.neck.collar.color"
            :shade="3 / 5"
            :val="['color','collar', 'basic']"
            :off="['propers', 'collar', 'enable']"
          )

          v-divider.my-4

          BarSwitch(
            text="bowtie"
            :val="['propers', 'bowtie', 'enable']"
          )

          BarColor(
            text="bowtie"
            :shade="5 / 6"
            :val="['color','bowtie', 'basic']"
            :off="['propers', 'bowtie', 'enable']"
          )


    .py-12
    .py-2

    // Bottom menu

    .abs
      v-card(light tile)
        v-container
          v-row
            v-btn.my-2(
              icon
              large
              :color="gender.color"
              @click="changeGender"
              aria-label="Change gender"
            )
              v-icon(large) mdi-{{ gender.icon }}

            v-text-field(
              v-model="name"
              :label="lang.name.label"
              hide-details
              style="padding-left: 0!important; padding-right: 6px !important"
            )

          v-row
            v-spacer
            v-btn.mx-2.transition(
              dark
              rounded
              :color="warnColor"
              @click="close()"
              aria-label="Close editor"
            ) {{ lang.menu.close }}

</template>

<script lang="ts">
import { getProp, setProp } from '../../../assets/ts/nested'

import BarList   from './BarLists.vue'
import BarColor  from './BarColors.vue'
import BarSwitch from './BarSwitches.vue'
import BarSlider from './BarSliders.vue'

import en from '../../../assets/json/locales/en/editor.json'
import ru from '../../../assets/json/locales/ru/editor.json'

import Vue from 'vue'
import {
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelHeader,
  VExpansionPanelContent,
  VCard,
  VCardTitle,
  VCardActions,
  VContainer,
  VRow,
  VBtn,
  VBtnToggle,
  VIcon,
  VTextField,
  VSpacer,
  VDivider
} from 'vuetify/lib'

export default Vue.extend({
  data() {
    return {
      leftPiercings:  0,
      rightPiercings: 0,

      gender: {
        color: '',
        icon: ''
      },

      parent: null,

      locales: { en, ru }
    }
  },

  watch: {
    leftPiercings(val: any)  { this.setPiercing(val, ['piercings', 'left' ]); },
    rightPiercings(val: any) { this.setPiercing(val, ['piercings', 'right']); },

    '$root.propers.male'(male: boolean) {
      if (male) {
        this.gender.color = 'blue';
        this.gender.icon  = 'gender-male';
      } else {
        this.gender.color = 'pink';
        this.gender.icon  = 'gender-female';
      }
    }
  },

  computed: {
    lang(): any {
      return (this.locales as any)[(this.$root as any).locale];
    },

    name: {
      get(): any {
        return (this.$root as any).propers.name;
      },

      set(val: string) {
        (this.$root as any).propers.name = val;
      }
    },

    warnColor() {
      if ((this.$root as any).warning.close) return 'red';
    }
  },

  methods: {
    off(val: string[]): boolean { return !getProp(this.$root as any, val) },

    changeGender() {
      (this.$root as any).propers.male = !(this.$root as any).propers.male
    },

    setPiercing(val: number, target: string[]) {
      if (val === 0) {
        setProp((this.$root as any).propers, target, {
          enable: true,
          upper: false,
          middle: false,
          lower: true
        });

      } else if (val === 1) {
        setProp((this.$root as any).propers, target, {
          enable: true,
          upper: false,
          middle: true,
          lower: true
        });

      } else if (val === 2) {
        setProp((this.$root as any).propers, target, {
          enable: true,
          upper: true,
          middle: true,
          lower: true
        });
      }
    },

    openManes() {
      const parent: any = this.$parent.$parent.$parent;

      parent.opened.Hairs  = !parent.opened.Hairs;
      parent.opened.Avatar = !parent.opened.Avatar;
    },

    close() {
      const parent: any = this.$parent.$parent.$parent;

      parent.opened.Avatar  = !parent.opened.Avatar;
    }
  },

  mounted() {
    if ((this.$root as any).male) {
      this.gender.color = 'blue';
      this.gender.icon  = 'gender-male';
    } else {
      this.gender.color = 'pink';
      this.gender.icon  = 'gender-female';
    }
  },

  components: {
    BarList,
    BarColor,
    BarSwitch,
    BarSlider,

    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelHeader,
    VExpansionPanelContent,
    VCard,
    VCardTitle,
    VCardActions,
    VContainer,
    VRow,
    VBtn,
    VBtnToggle,
    VIcon,
    VTextField,
    VSpacer,
    VDivider
  }
});
</script>

<style lang="sass">
  button.transition
    transition: background 200ms linear

  .abs
    position: absolute
    bottom: 0
    z-index: 1
    width: 100%
</style>