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
            :val="['eyes', 'right', 'enable']"
            )

          BarColor(
            :text="lang.menu.eyes['color right']"
            :val="['color', 'eyes', 'right', 'basic']"
            :off="['eyes', 'right', 'enable']"
          )

          v-divider.my-4

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.scale"
              :val="['eyes', 'iris', 'scale']"
              max=125
              min=50
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes.pupils }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.width"
              :val="['eyes', 'pupils', 'width']"
              max=100
              min=10
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes.position }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.horizontal"
              :val="['eyes', 'position', 'horiz']"
              max=100
              min=-100
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.vertical"
              :val="['eyes', 'position', 'verti']"
              max=100
              min=-100
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes["left eyelids"] }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.upper"
              :val="['eyes', 'eyelids', 'left', 'up']"
              max=100
              min=0
              :compare="['eyes', 'eyelids', 'left', 'down']"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.lower"
              :val="['eyes', 'eyelids', 'left', 'down']"
              max=100
              min=0
              :compare="['eyes', 'eyelids', 'left', 'up']"
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes["right eyelids"] }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.upper"
              :val="['eyes', 'eyelids', 'right', 'up']"
              max=100
              min=0
              :compare="['eyes', 'eyelids', 'right', 'down']"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.lower"
              :val="['eyes', 'eyelids', 'right', 'down']"
              max=100
              min=0
              :compare="['eyes', 'eyelids', 'right', 'up']"
            )


          v-divider.my-4

          BarSwitch(
            :text="lang.menu.eyes.eyebrows.title"
            :val="['eyes', 'brows', 'show']"
          )

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.eyes.eyebrows.left }}

          v-card(outlined :disabled="off(['eyes', 'brows', 'show'])").my-2
            BarSlider(
              :text="lang.menu.eyes.eyebrows.width"
              :val="['eyes', 'brows', 'left', 'width']"
              max=150
              min=50
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.height"
              :val="['eyes', 'brows', 'left', 'height']"
              max=100
              min=-100
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.evil"
              :val="['eyes', 'brows', 'left', 'evil']"
              max=100
              min=0
              :compare="['eyes', 'brows', 'left', 'wide']"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.wide"
              :val="['eyes', 'brows', 'left', 'wide']"
              max=100
              min=0
              :compare="['eyes', 'brows', 'left', 'evil']"
            )


          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes.eyebrows.right }}

          v-card(outlined :disabled="off(['eyes', 'brows', 'show'])").my-2
            BarSlider(
              :text="lang.menu.eyes.eyebrows.width"
              :val="['eyes', 'brows', 'right', 'width']"
              max=150
              min=50
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.height"
              :val="['eyes', 'brows', 'right', 'height']"
              max=100
              min=-100
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.evil"
              :val="['eyes', 'brows', 'right', 'evil']"
              max=100
              min=0
              :compare="['eyes', 'brows', 'right', 'wide']"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.wide"
              :val="['eyes', 'brows', 'right', 'wide']"
              max=100
              min=0
              :compare="['eyes', 'brows', 'right', 'evil']"
            )


      // Glasses

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.glasses.title }}
        v-expansion-panel-content
          BarSwitch(
            :text="lang.enable"
            :val="['glasses', 'enable']"
          )

          v-divider.my-4

          BarColor(
            :text="lang.menu.glasses.color.lenses"
            :val="['color', 'glasses', 'lenses']"
            :off="['glasses', 'enable']"
          )

          BarColor(
            :text="lang.menu.glasses.color.frame"
            :val="['color', 'glasses', 'frame']"
            :off="['glasses', 'enable']"
          )

          v-divider.my-4

          v-card(outlined :disabled="off(['glasses', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.glasses.width"
              :val="['glasses', 'width']"
              max=150
              min=50
            )

          v-divider.my-4

          BarList(
            target="glasses"
            :list="$root.glasses.info"
            :off="['glasses', 'enable']"
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
              v-card-title.body-1.font-weight-bold {{ $root.hair.name[$root.locale] }}

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
            :val="['mane', 'second', 'enable']"
          )

          BarSwitch(
            :text="lang.menu.mane.second.ends"
            :val="['mane', 'second', 'isends']"
            :off="['mane', 'second', 'enable']"
          )

          BarColor(
            :text="lang.menu.mane.second.color"
            :val="['color', 'hair', 'second']"
            :off="['mane', 'second', 'enable']"
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
            :val="['stripes', 'enable']"
          )

          BarColor(
            :text="lang.menu.fur.stripes.color"
            :val="['color', 'stripes', 'basic']"
            :off="['stripes', 'enable']"
          )


      // Horns

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.horn.title }}
        v-expansion-panel-content
          BarSwitch(:text="lang.enable" :val="['horn', 'enable']")
          BarSwitch(
            :text="lang.menu.horn.changeling"
            :val="['horn', 'changeling']"
            :off="['horn', 'enable']"
          )

          v-divider.my-4

          BarSwitch(
            :text="lang.menu.horn.second"
            :val="['horn', 'notlines']"
            :off="['horn', 'enable']"
          )

          BarColor(
            :text="lang.menu.horn.set"
            :val="['color', 'fur', 'second']"
            :off="['horn', 'enable']"
          )

          v-divider.my-4

          p.subtitle-2 Rear horns

          BarSwitch(:text="lang.enable" :val="['horn', 'rear']")

          BarColor(
            :text="lang.menu.horn.set"
            :val="['color', 'hornRear', 'basic']"
            :shade="4 / 5"
            :off="['horn', 'rear']"
          )

          v-divider.my-4

          BarList(
            target="horn"
            :list="$root.horn.info"
            :off="['horn', 'rear']"
          )


      // Mouth

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.mouth.title }}
        v-expansion-panel-content
          BarSwitch(:text="lang.menu.mouth.fangs" :val="['fangs']")

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
            BarSlider(:text="lang.menu.emotion.open", :val="['jaw', 'open']", max=100, min=0)

            v-divider

            BarSlider(:text="lang.menu.emotion.sad", :val="['jaw', 'sad']", max=100, min=0)

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.emotion.teeth }}

          v-card(outlined).my-2
            BarSlider(:text="lang.menu.emotion.upper", :val="['teeth', 'upper']", max=100, min=0)

            v-divider

            BarSlider(:text="lang.menu.emotion.lower", :val="['teeth', 'lower']", max=100, min=0)


      // Ears

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.ears.title }}
        v-expansion-panel-content
          BarSwitch.my-2(:text="lang.menu.ears.tassels" :val="['tassels']")


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
            :val="['piercings', 'left', 'enable']"
          )

          v-btn-toggle(
            v-model="leftPiercings"
            dense
            mandatory
            color="#fa0"
          )
            v-btn(
              outlined
              :disabled="off(['piercings', 'left', 'enable'])"
              :aria-label="lang.one"
            ) {{ lang.one }}

            v-btn(
              outlined
              :disabled="off(['piercings', 'left', 'enable'])"
              :aria-label="lang.two"
            ) {{ lang.two }}

            v-btn(
              outlined
              :disabled="off(['piercings', 'left', 'enable'])"
              :aria-label="lang.three"
            ) {{ lang.three }}

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.piercing.ears.right }}

          BarSwitch(
            :text="lang.enable"
            :val="['piercings', 'right', 'enable']"
          )

          v-btn-toggle(
            v-model="rightPiercings"
            dense
            mandatory
            color="#fa0"
          )
            v-btn(
              outlined
              :disabled="off(['piercings', 'right', 'enable'])"
              :aria-label="lang.one"
            ) {{ lang.one }}

            v-btn(
              outlined
              :disabled="off(['piercings', 'right', 'enable'])"
              :aria-label="lang.two"
            ) {{ lang.two }}

            v-btn(
              outlined
              :disabled="off(['piercings', 'right', 'enable'])"
              :aria-label="lang.three"
            ) {{ lang.three }}


      // Hooves

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.hooves.title }}
        v-expansion-panel-content
          BarSwitch(
            :text="lang.enable"
            :val="['hooves', 'enable']"
          )


          .py-2

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.hooves.left }}

          v-divider.my-4


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.shoulder }}

          v-card(outlined :disabled="off(['hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['hooves', 'left', 'shoulder', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['hooves', 'left', 'shoulder', 'angle']"
              max=180
              min=-180
            )


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.elbow }}

          v-card(outlined :disabled="off(['hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['hooves', 'left', 'elbow', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['hooves', 'left', 'elbow', 'angle']"
              max=180
              min=-180
            )


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.wrist }}

          v-card(outlined :disabled="off(['hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['hooves', 'left', 'wrist', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['hooves', 'left', 'wrist', 'angle']"
              max=180
              min=-180
            )


          .py-2

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.hooves.right }}

          v-divider.my-4


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.shoulder }}

          v-card(outlined :disabled="off(['hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['hooves', 'right', 'shoulder', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['hooves', 'right', 'shoulder', 'angle']"
              max=180
              min=-180
            )


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.elbow }}

          v-card(outlined :disabled="off(['hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['hooves', 'right', 'elbow', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['hooves', 'right', 'elbow', 'angle']"
              max=180
              min=-180
            )


          .py-2

          p.subtitle-2 {{ lang.menu.hooves.wrist }}

          v-card(outlined :disabled="off(['hooves', 'enable'])").my-2
            BarSlider(
              :text="lang.menu.hooves.rise"
              :val="['hooves', 'right', 'wrist', 'rise']"
              max=100
              min=0
            )

            v-divider

            BarSlider(
              :text="lang.menu.hooves.angle"
              :val="['hooves', 'right', 'wrist', 'angle']"
              max=180
              min=-180
            )


      // Hooves

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.neck.title }}
        v-expansion-panel-content
          BarSwitch(
            :text="lang.menu.neck.collar.enable"
            :val="['collar', 'enable']"
          )

          BarColor(
            :text="lang.menu.neck.collar.color"
            :shade="3 / 5"
            :val="['color','collar', 'basic']"
            :off="['collar', 'enable']"
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

<script lang="coffee">
  import { getProp, setProp } from "../assets/js/nestedAdv.coffee"

  import BarList   from "./BarLists.vue"
  import BarColor  from "./BarColors.vue"
  import BarSwitch from "./BarSwitches.vue"
  import BarSlider from "./BarSliders.vue"

  import en from "../assets/json/locales/en/editor.json"
  import ru from "../assets/json/locales/ru/editor.json"

  export default
    data: ->
      leftPiercings:  0
      rightPiercings: 0

      gender:
        color: ""
        icon: ""

      parent: null

      locales: {
        en
        ru
      }


    watch:
      leftPiercings:  (val) -> @setPiercing val, ["piercings", 'left']
      rightPiercings: (val) -> @setPiercing val, ["piercings", 'right']

      "$root.male": (male) ->
        if male
          @gender.color = "blue"
          @gender.icon  = "gender-male"
        else
          @gender.color = "pink"
          @gender.icon  = "gender-female"

    computed:
      lang: -> return @locales[@$root.locale]
      name:
        get:       -> @$root.name
        set: (val) -> @$root.name = val

      warnColor: ->
        if @$root.warning.close
          return "red"

    methods:
      off: (val) -> not getProp @$root, val

      changeGender: -> @$root.male = !@$root.male

      setPiercing: (val, target) ->
        if val is 0
          setProp @$root, target, {
            enable: on
            upper: off
            middle: off
            lower: on
          }

        else if val is 1
          setProp @$root, target, {
            enable: on
            upper: off
            middle: on
            lower: on
          }

        else if val is 2
          setProp @$root, target, {
            enable: on
            upper: on
            middle: on
            lower: on
          }

      openManes: ->
        @$parent.$parent.$parent.opened.Hairs  = !@$parent.$parent.$parent.opened.Hairs
        @$parent.$parent.$parent.opened.Avatar = !@$parent.$parent.$parent.opened.Avatar

      close: ->
        @$parent.$parent.$parent.opened.Avatar  = !@$parent.$parent.$parent.opened.Avatar

    mounted: ->
      if @$root.male
        @gender.color = "blue"
        @gender.icon  = "gender-male"
      else
        @gender.color = "pink"
        @gender.icon  = "gender-female"

    components: {
      BarList
      BarColor
      BarSwitch
      BarSlider
    }
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