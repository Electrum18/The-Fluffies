<template lang="pug">
  div
    v-expansion-panels
      v-expansion-panel

        // Eyes

        v-expansion-panel-header.title {{ lang.menu.eyes.title }}
        v-expansion-panel-content
          BarColor(:text="lang.menu.eyes.color" val="EyesColorLeftBasic")
          BarSwitch(
            :text="lang.menu.eyes.heterochromia"
            val="EyesColorRightEnable"
            color="EyesColorRightBasic"
            )

          BarColor(
            :text="lang.menu.eyes['color right']"
            val="EyesColorRightBasic"
            off="EyesColorRightEnable"
          )

          v-divider.my-4

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.scale"
              val="EyesIrisScale"
              max=125
              min=50
              color="EyesColorRightBasic"
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes.pupils }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.width"
              val="EyesPupilsWidth"
              max=100
              min=10
              color="EyesColorRightBasic"
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes.position }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.horizontal"
              val="EyesPositionHoriz"
              max=100
              min=-100
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.vertical"
              val="EyesPositionVerti"
              max=100
              min=-100
              color="EyesColorRightBasic"
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes["left eyelids"] }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.upper"
              val="EyesEyelidsLeftUp"
              max=100
              min=0
              compare="EyesEyelidsLeftDown"
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.lower"
              val="EyesEyelidsLeftDown"
              max=100
              min=0
              compare="EyesEyelidsLeftUp"
              color="EyesColorRightBasic"
            )

          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes["right eyelids"] }}

          v-card(outlined).my-2
            BarSlider(
              :text="lang.menu.eyes.upper"
              val="EyesEyelidsRightUp"
              max=100
              min=0
              compare="EyesEyelidsRightDown"
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.lower"
              val="EyesEyelidsRightDown"
              max=100
              min=0
              compare="EyesEyelidsRightUp"
              color="EyesColorRightBasic"
            )


          v-divider.my-4

          BarSwitch(
            :text="lang.menu.eyes.eyebrows.title"
            val="EyesBrowsShow"
            color="EyesColorRightBasic"
          )

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.eyes.eyebrows.left }}

          v-card(outlined :disabled="off('EyesBrowsShow')").my-2
            BarSlider(
              :text="lang.menu.eyes.eyebrows.width"
              val="EyesBrowsLeftWidth"
              max=150
              min=50
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.height"
              val="EyesBrowsLeftHeight"
              max=100
              min=-100
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.evil"
              val="EyesBrowsLeftEvil"
              max=100
              min=0
              compare="EyesBrowsLeftWide"
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.wide"
              val="EyesBrowsLeftWide"
              max=100
              min=0
              compare="EyesBrowsLeftEvil"
              color="EyesColorRightBasic"
            )


          v-divider.my-4


          p.subtitle-2 {{ lang.menu.eyes.eyebrows.right }}

          v-card(outlined :disabled="off('EyesBrowsShow')").my-2
            BarSlider(
              :text="lang.menu.eyes.eyebrows.width"
              val="EyesBrowsRightWidth"
              max=150
              min=50
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.height"
              val="EyesBrowsRightHeight"
              max=100
              min=-100
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.evil"
              val="EyesBrowsRightEvil"
              max=100
              min=0
              compare="EyesBrowsRightWide"
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              :text="lang.menu.eyes.eyebrows.wide"
              val="EyesBrowsRightWide"
              max=100
              min=0
              compare="EyesBrowsRightEvil"
              color="EyesColorRightBasic"
            )


      // Mane

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.mane.title }}
        v-expansion-panel-content
          BarColor(:text="lang.menu.mane.color" val="ManeColorBasic" :shade="6 / 8")

          v-divider.my-4

          v-card(outlined)
            v-card(light)
              v-card-title.body-1.font-weight-bold {{ $root.hair.name[$root.locale] }}

            v-divider

            v-card-actions
              v-btn(
                @click="open()"
                :aria-label="lang.menu.mane.change"
              ) {{ lang.menu.mane.change }}

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.mane.second.title }}

          BarSwitch(
            :text="lang.enable"
            val="ManeSecondEnable"
            color="ManeColorSecond"
          )

          BarSwitch(
            :text="lang.menu.mane.second.ends"
            val="ManeSecondIsends"
            off="ManeSecondEnable"
            color="ManeColorSecond"
          )

          BarColor(
            :text="lang.menu.mane.second.color"
            val="ManeColorSecond"
            off="ManeSecondEnable"
          )


      // Fur

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.fur.title }}
        v-expansion-panel-content
          BarColor(:text="lang.menu.fur.color" val="FurColorBasic" :shade="6 / 8")

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.fur.stripes.title }}

          BarSwitch(
            :text="lang.enable"
            val="StripesEnable"
            color="StripesColorBasic"
          )

          BarColor(
            :text="lang.menu.fur.stripes.color"
            val="StripesColorBasic"
            off="StripesEnable"
          )


      // Horn

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.horn.title }}
        v-expansion-panel-content
          BarSwitch(:text="lang.enable" val="HornEnable")
          BarSwitch(
            :text="lang.menu.horn.changeling"
            val="HornChangeling"
            off="HornEnable"
          )

          v-divider.my-4

          BarSwitch(
            :text="lang.menu.horn.second"
            val="HornNotlines"
            off="HornEnable"
            color="FurColorSecond"
          )

          BarColor(
            :text="lang.menu.horn.set"
            val="FurColorSecond"
            off="HornEnable"
          )


      // Mouth

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.mouth.title }}
        v-expansion-panel-content
          BarSwitch(:text="lang.menu.mouth.fangs" val="Fangs")

          v-divider.my-4

          BarColor(:text="lang.menu.mouth.mouth"  val="JawColorBasic")
          BarColor(:text="lang.menu.mouth.tongue" val="TongueColorBasic" :shade="9 / 10")


      // Emotion

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.emotion.title }}
        v-expansion-panel-content

          p.subtitle-2 {{ lang.menu.emotion.mouth }}

          v-card(outlined).my-2
            BarSlider(:text="lang.menu.emotion.open", val="JawOpen", max=100, min=0)

            v-divider

            BarSlider(:text="lang.menu.emotion.sad", val="JawSad", max=100, min=0)

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.emotion.teeth }}

          v-card(outlined).my-2
            BarSlider(:text="lang.menu.emotion.upper", val="TeethUpper", max=100, min=0)

            v-divider

            BarSlider(:text="lang.menu.emotion.lower", val="TeethLower", max=100, min=0)


      // Ears

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.ears.title }}
        v-expansion-panel-content
          BarSwitch.my-2(:text="lang.menu.ears.tassels" val="Tassels")


      // Piercing

      v-expansion-panel
        v-expansion-panel-header.title {{ lang.menu.piercing.title }}
        v-expansion-panel-content
          BarColor(:text="lang.menu.piercing.color" val="PiercingsColorBasic" :shade="4 / 5")

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.piercing.ears.left }}

          BarSwitch(
            :text="lang.enable"
            val="PiercingsLeftEnable"
            color="PiercingsColorBasic"
          )

          v-btn-toggle(
            v-model="leftPiercings"
            dense
            mandatory
          )
            v-btn(
              outlined
              :color="$root.piercings.color.basic"
              :disabled="off('PiercingsLeftEnable')"
              :aria-label="lang.one"
            ) {{ lang.one }}

            v-btn(
              outlined
              :color="$root.piercings.color.basic"
              :disabled="off('PiercingsLeftEnable')"
              :aria-label="lang.two"
            ) {{ lang.two }}

            v-btn(
              outlined
              :color="$root.piercings.color.basic"
              :disabled="off('PiercingsLeftEnable')"
              :aria-label="lang.three"
            ) {{ lang.three }}

          v-divider.my-4

          p.subtitle-2 {{ lang.menu.piercing.ears.right }}

          BarSwitch(
            :text="lang.enable"
            val="PiercingsRightEnable"
            color="PiercingsColorBasic"
          )

          v-btn-toggle(
            v-model="rightPiercings"
            dense
            mandatory
          )
            v-btn(
              outlined
              :color="$root.piercings.color.basic"
              :disabled="off('PiercingsRightEnable')"
              :aria-label="lang.one"
            ) {{ lang.one }}

            v-btn(
              outlined
              :color="$root.piercings.color.basic"
              :disabled="off('PiercingsRightEnable')"
              :aria-label="lang.two"
            ) {{ lang.two }}

            v-btn(
              outlined
              :color="$root.piercings.color.basic"
              :disabled="off('PiercingsRightEnable')"
              :aria-label="lang.three"
            ) {{ lang.three }}

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

</template>

<script lang="coffee">
  import { getProp, setProp } from "../assets/js/nested.coffee"

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
      leftPiercings:  (val) -> @setPiercing val, "PiercingsLeft"
      rightPiercings: (val) -> @setPiercing val, "PiercingsRight"

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

      open: ->
        @$parent.$parent.$parent.opened.Hairs  = !@$parent.$parent.$parent.opened.Hairs
        @$parent.$parent.$parent.opened.Avatar = !@$parent.$parent.$parent.opened.Avatar


    mounted: ->
      if @$root.male
        @gender.color = "blue"
        @gender.icon  = "gender-male"
      else
        @gender.color = "pink"
        @gender.icon  = "gender-female"

    components: {
      BarColor
      BarSwitch
      BarSlider
    }
</script>