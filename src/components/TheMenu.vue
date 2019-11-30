<template lang="pug">
  div
    v-expansion-panels
      v-expansion-panel

        // Eyes

        v-expansion-panel-header.title Eyes
        v-expansion-panel-content
          BarColor(text="iris" val="EyesColorLeftBasic")
          BarSwitch(
            text="divide right"
            val="EyesColorRightEnable"
            color="EyesColorRightBasic"
            )

          BarColor(
            text="right iris"
            val="EyesColorRightBasic"
            off="EyesColorRightEnable"
          )

          v-divider.my-4

          v-card(outlined).my-2
            BarSlider(
              text="scale"
              val="EyesIrisScale"
              max=125
              min=50
              color="EyesColorRightBasic"
            )

          v-divider.my-4


          p.subtitle-2 Pupils

          v-card(outlined).my-2
            BarSlider(
              text="width"
              val="EyesPupilsWidth"
              max=100
              min=10
              color="EyesColorRightBasic"
            )

          v-divider.my-4


          p.subtitle-2 Position

          v-card(outlined).my-2
            BarSlider(
              text="horizontal"
              val="EyesPositionHoriz"
              max=100
              min=-100
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              text="vertical"
              val="EyesPositionVerti"
              max=100
              min=-100
              color="EyesColorRightBasic"
            )

          v-divider.my-4


          p.subtitle-2 Left eyelids

          v-card(outlined).my-2
            BarSlider(
              text="up"
              val="EyesEyelidsLeftUp"
              max=100
              min=0
              compare="EyesEyelidsLeftDown"
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              text="down"
              val="EyesEyelidsLeftDown"
              max=100
              min=0
              compare="EyesEyelidsLeftUp"
              color="EyesColorRightBasic"
            )

          v-divider.my-4


          p.subtitle-2 Right eyelids

          v-card(outlined).my-2
            BarSlider(
              text="up"
              val="EyesEyelidsRightUp"
              max=100
              min=0
              compare="EyesEyelidsRightDown"
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              text="down"
              val="EyesEyelidsRightDown"
              max=100
              min=0
              compare="EyesEyelidsRightUp"
              color="EyesColorRightBasic"
            )


          v-divider.my-4

          BarSwitch(
            text="eyebrows"
            val="EyesBrowsShow"
            color="EyesColorRightBasic"
          )


          v-divider.my-4

          p.subtitle-2 Left eyebrow

          v-card(outlined :disabled="off('EyesBrowsShow')").my-2
            BarSlider(
              text="width"
              val="EyesBrowsLeftWidth"
              max=150
              min=50
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              text="height"
              val="EyesBrowsLeftHeight"
              max=100
              min=-100
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              text="evil"
              val="EyesBrowsLeftEvil"
              max=100
              min=0
              compare="EyesBrowsLeftWide"
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              text="wide"
              val="EyesBrowsLeftWide"
              max=100
              min=0
              compare="EyesBrowsLeftEvil"
              color="EyesColorRightBasic"
            )


          v-divider.my-4


          p.subtitle-2 Right eyebrow

          v-card(outlined :disabled="off('EyesBrowsShow')").my-2
            BarSlider(
              text="width"
              val="EyesBrowsRightWidth"
              max=150
              min=50
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              text="height"
              val="EyesBrowsRightHeight"
              max=100
              min=-100
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              text="evil"
              val="EyesBrowsRightEvil"
              max=100
              min=0
              compare="EyesBrowsRightWide"
              color="EyesColorRightBasic"
            )

            v-divider

            BarSlider(
              text="wide"
              val="EyesBrowsRightWide"
              max=100
              min=0
              compare="EyesBrowsRightEvil"
              color="EyesColorRightBasic"
            )


      // Mane

      v-expansion-panel
        v-expansion-panel-header.title Mane
        v-expansion-panel-content
          BarColor(text="hair" val="ManeColorBasic" :shade="6 / 8")

          v-divider.my-4

          v-card(outlined)
            v-card(light)
              v-card-title {{ $root.hair.name }}

            v-divider

            v-card-actions
              v-btn(
                @click="open()"
                aria-label="Change hairstyle"
              ) change hairstyle

          v-divider.my-4

          p.subtitle-2 Second color & ends

          BarSwitch(
            text="enable"
            val="ManeSecondEnable"
            color="ManeColorSecond"
          )

          BarSwitch(
            text="ends"
            val="ManeSecondIsends"
            off="ManeSecondEnable"
            color="ManeColorSecond"
          )

          BarColor(
            text="second"
            val="ManeColorSecond"
            off="ManeSecondEnable"
          )


      // Fur

      v-expansion-panel
        v-expansion-panel-header.title Fur
        v-expansion-panel-content
          BarColor(text="fur" val="FurColorBasic" :shade="6 / 8")

          v-divider.my-4

          p.subtitle-2 Stripes

          BarSwitch(
            text="enable"
            val="StripesEnable"
            color="StripesColorBasic"
          )

          BarColor(
            text="stripes"
            val="StripesColorBasic"
            off="StripesEnable"
          )


      // Horn

      v-expansion-panel
        v-expansion-panel-header.title Horn
        v-expansion-panel-content
          BarSwitch(text="enable" val="HornEnable")
          BarSwitch(
            text="changeling"
            val="HornChangeling"
            off="HornEnable"
          )

          v-divider.my-4

          BarSwitch(
            text="second color"
            val="HornNotlines"
            off="HornEnable"
            color="FurColorSecond"
          )

          BarColor(
            text="set"
            val="FurColorSecond"
            off="HornEnable"
          )


      // Mouth

      v-expansion-panel
        v-expansion-panel-header.title Mouth
        v-expansion-panel-content
          BarColor(text="mouth"  val="JawColorBasic")
          BarColor(text="tongue" val="TongueColorBasic" :shade="9 / 10")


      // Emotion

      v-expansion-panel
        v-expansion-panel-header.title Emotion
        v-expansion-panel-content
          BarSwitch(text="fangs" val="Fangs")

          v-divider.my-4

          p.subtitle-2 Jaw

          v-card(outlined).my-2
            BarSlider(text="open", val="JawOpen", max=100, min=0)

            v-divider

            BarSlider(text="sad", val="JawSad", max=100, min=0)

          v-divider.my-4

          p.subtitle-2 Teeth

          v-card(outlined).my-2
            BarSlider(text="upper", val="TeethUpper", max=100, min=0)

            v-divider

            BarSlider(text="lower", val="TeethLower", max=100, min=0)


      // Ears

      v-expansion-panel
        v-expansion-panel-header.title Ears
        v-expansion-panel-content
          BarSwitch.my-2(text="tassels" val="Tassels")


      // Piercing

      v-expansion-panel
        v-expansion-panel-header.title Piercing
        v-expansion-panel-content
          BarColor(text="piercings" val="PiercingsColorBasic" :shade="4 / 5")

          v-divider.my-4

          p.subtitle-2 Left ear

          BarSwitch(
            text="enable"
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
              aria-label="One"
            ) one

            v-btn(
              outlined
              :color="$root.piercings.color.basic"
              :disabled="off('PiercingsLeftEnable')"
              aria-label="Two"
            ) two

            v-btn(
              outlined
              :color="$root.piercings.color.basic"
              :disabled="off('PiercingsLeftEnable')"
              aria-label="Three"
            ) three

          v-divider.my-4

          p.subtitle-2 Right ear

          BarSwitch(
            text="enable"
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
              aria-label="One"
            ) one

            v-btn(
              outlined
              :color="$root.piercings.color.basic"
              :disabled="off('PiercingsRightEnable')"
              aria-label="Two"
            ) two

            v-btn(
              outlined
              :color="$root.piercings.color.basic"
              :disabled="off('PiercingsRightEnable')"
              aria-label="Three"
            ) three

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
            label="Avatar name"
            hide-details
            style="padding-left: 0!important; padding-right: 6px !important"
          )

</template>

<script lang="coffee">
  import { getProp, setProp } from "../assets/js/nested.coffee"

  import BarColor  from "./BarColors.vue"
  import BarSwitch from "./BarSwitches.vue"
  import BarSlider from "./BarSliders.vue"

  export default
    data: ->
      leftPiercings:  0
      rightPiercings: 0

      gender:
        color: ""
        icon: ""

      parent: null


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