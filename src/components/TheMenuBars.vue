<template lang="pug">
  #MenuBars(style="position: absolute; width: 100%")
    BarModule(title="eyes" icon="yes" icon-eye="yes")
      SetColor(name="iris" title="eyes" color="eyes.color.left.basic")

      #checker
        p.h(style="width: 16vmax") custom right color

        #checkbox
          input(v-model="$root.eyes.color.right.enable" type="checkbox"
            :style="enableChecker($root.eyes.color.right.enable, $root.eyes.color.left.basic)")
          #checkmark

      SetColor(name="right iris" title="right eye" color="eyes.color.right.basic"
         :style="enableByVal($root.eyes.color.right.enable)")

      .line

      BarInput(name="scale" :color="color.eyes.left" :type="$root.eyes.iris" min="50" max="125")

      .line

      p.h pupils

      BarInput(name="width" :color="color.eyes.left" :type="$root.eyes.pupils" min="10" max="100")

      .line

      p.h position

      BarInputPad(name="" :color="color.eyes.left"
        x="eyes.position.horiz" y="eyes.position.verti"
        xname="horiz" yname="vertic")

        #X.line(style="transform: translate(-50%,-100%)")
        #Y.line(style="transform: translate(-50%,-200%) rotate(90deg)")

      .line

      p.h left eyelids

      BarInput(name="up"   :color="color.eyes.left" :type="$root.eyes.eyelids.left" compare="down")
      BarInput(name="down" :color="color.eyes.left" :type="$root.eyes.eyelids.left" compare="up"  )

      .line

      p.h right eyelids

      BarInput(name="up"   :color="color.eyes.left" :type="$root.eyes.eyelids.right" compare="down")
      BarInput(name="down" :color="color.eyes.left" :type="$root.eyes.eyelids.right" compare="up"  )

      .line

      #checker
        p.h(style="width: 16vmax") eyebrows

        #checkbox
          input(v-model="$root.eyes.brows.show" type="checkbox" checked
            :style="enableChecker($root.eyes.brows.show, $root.eyes.color.left.basic)"
            )
          #checkmark

      .line

      div(style="position: relative" :style="enableByVal($root.eyes.brows.show)")
        p.h left eyebrow

        BarInput(name="width"  :color="color.eyes.left" :type="$root.eyes.brows.left" min="50" max="150")
        BarInput(name="height" :color="color.eyes.left" :type="$root.eyes.brows.left" min="-100")
        BarInput(name="evil"   :color="color.eyes.left" :type="$root.eyes.brows.left" compare="wide")
        BarInput(name="wide"   :color="color.eyes.left" :type="$root.eyes.brows.left" compare="evil")

      .line

      div(style="position: relative" :style="enableByVal($root.eyes.brows.show)")
        p.h right eyebrow

        BarInput(name="width"  :color="color.eyes.left" :type="$root.eyes.brows.right" min="50" max="150")
        BarInput(name="height" :color="color.eyes.left" :type="$root.eyes.brows.right" min="-100")
        BarInput(name="evil"   :color="color.eyes.left" :type="$root.eyes.brows.right" compare="wide")
        BarInput(name="wide"   :color="color.eyes.left" :type="$root.eyes.brows.right" compare="evil")

    BarModule(title="mane" icon="yes")
      SetColor(name="hair style" title="mane" color="mane.color.basic")

      p.name {{ $root.hair.name }}
      #menu_of_models(@click="$parent.openMenuOfModels") change

      .line

      p.h second & ends

      #checker
        p.h(style="width: 16vmax") enable

        #checkbox
          input(v-model="$root.mane.second.enable" type="checkbox")
          #checkmark

      div(style="position: relative" :style="enableByVal($root.mane.second.enable)")
        #checker
          p.h(style="width: 16vmax") ends

          #checkbox
            input(v-model="$root.mane.second.isEnds" type="checkbox")
            #checkmark

        SetColor(name="set color" title="second color" color="mane.color.second")

    BarModule(title="fur" icon="yes")
      SetColor(name="set color" title="fur" color="fur.color.basic")

      .line

      p.h stripes

      #checker
        p.h(style="width: 16vmax") enable

        #checkbox
          input(v-model="$root.stripes.enable" type="checkbox")
          #checkmark

      SetColor(name="set color" title="stripes" color="stripes.color.basic")

    BarModule(title="horn")
      #checker
        p.h(style="width: 16vmax") enable

        #checkbox
          input(v-model="$root.horn.enable" type="checkbox")
          #checkmark

      div(style="position: relative" :style="enableByVal($root.horn.enable)")
        #checker
          p.h(style="width: 16vmax") changeling

          #checkbox
            input(v-model="$root.horn.changeling" type="checkbox")
            #checkmark

        .line

        #checker(:style="enableByVal(!$root.horn.changeling)")
          p.h(style="width: 16vmax") second color

          #checkbox
            input(v-model="$root.horn.notLines" type="checkbox")
            #checkmark

        SetColor(name="set color" title="second color" color="fur.color.second")

    BarModule(title="mouth")
      SetColor(name="set color" title="mouth color"  color="jaw.color.basic")
      SetColor(name="tongue"    title="tongue color" color="tongue.color.basic")

    BarModule(title="emotion")
      #checker
        p.h(style="width: 16vmax") fangs

        #checkbox
          input#haveFangs(v-model="$root.fangs" type="checkbox" checked)
          #checkmark

      .line

      p.h jaw

      BarInput(name="open" :type="$root.jaw")
      BarInput(name="sad"  :type="$root.jaw")

      //p.sm surprised #[span#number(style="position: absolute; margin: 0 1vmin 0 0; right: 0") 0]
      //input#jawSurprised(type="range" min="0" max="100" value="0")

      .line

      p.h teeth

      BarInput(name="upper" :type="$root.teeth" value="100")
      BarInput(name="lower" :type="$root.teeth" value="100")

    BarModule(title="ears")
      #checker
        p.h(style="width: 16vmax") tassels

        #checkbox
          input#haveTassels(v-model="$root.tassels" type="checkbox" checked)
          #checkmark

    BarModule(title="piercing")
      SetColor(name="set color" title="piercings color" color="piercings.color.basic")

      .line

      p.sm left ear

      #checker
        p.h(style="width: 16vmax") enable

        #checkbox
          input#haveTassels(v-model="piercings.left.enable" type="checkbox"
            :style="enableChecker(piercings.left.enable, color.piercings)")
          #checkmark

      #piercingType(style="border-radius: 1vmin 0 0 1vmin"
        :style="[enableByVal(piercings.left.enable), { 'border-color': color.piercings }]"
      )
        input(type="radio" name="leftCount" value="one" v-model="piercings.left.count")
        #checkmark(
          style="border-radius: .5vmin 0 0 .5vmin"
          :style="opacityByVal(piercings.left.count === 'one')"
        ) one

      #piercingType(
        :style="[enableByVal(piercings.left.enable), { 'border-color': color.piercings }]"
      )
        input(type="radio" name="leftCount" value="two" v-model="piercings.left.count")
        #checkmark(
          :style="opacityByVal(piercings.left.count === 'two')"
        ) two

      #piercingType(style="border-radius: 0 1vmin 1vmin 0"
        :style="[enableByVal(piercings.left.enable), { 'border-color': color.piercings }]"
      )
        input(type="radio" name="leftCount" value="three" v-model="piercings.left.count")
        #checkmark(
          style="border-radius: 0 .5vmin .5vmin 0"
          :style="opacityByVal(piercings.left.count === 'three')"
        ) three

      .line

      p.sm right ear

      #checker
        p.h(style="width: 16vmax") enable

        #checkbox
          input#haveTassels(v-model="piercings.right.enable" type="checkbox" checked
            :style="enableChecker(piercings.right.enable, color.piercings)")
          #checkmark

      #piercingType(style="border-radius: 1vmin 0 0 1vmin"
        :style="[enableByVal(piercings.right.enable), { 'border-color': color.piercings }]"
      )
        input(type="radio" name="rightCount" value="one" v-model="piercings.right.count" checked)
        #checkmark(
          style="border-radius: .5vmin 0 0 .5vmin"
          :style="opacityByVal(piercings.right.count === 'one')"
        ) one

      #piercingType(
        :style="[enableByVal(piercings.right.enable), { 'border-color': color.piercings }]"
      )
        input(type="radio" name="rightCount" value="two" v-model="piercings.right.count")
        #checkmark(
          :style="opacityByVal(piercings.right.count === 'two')"
        ) two

      #piercingType(style="border-radius: 0 1vmin 1vmin 0"
        :style="[enableByVal(piercings.right.enable), { 'border-color': color.piercings }]"
      )
        input(type="radio" name="rightCount" value="three" v-model="piercings.right.count")
        #checkmark(
          style="border-radius: 0 .5vmin .5vmin 0"
          :style="opacityByVal(piercings.right.count === 'three')"
        ) three
</template>

<script lang="coffee">
  import BarModule from "./bar/Modules.vue"
  import BarInput from "./bar/Inputs.vue"
  import SetColor from './bar/SetColors.vue'
  import BarInputPad from './bar/InputPads.vue'
  import BlockPiercing from './bar/BlockPiercings.vue'

  export default
    name: "MenuBar"

    data: ->
      color:
        eyes:
          left: @$root.eyes.color.left.basic

        piercings: @$root.piercings.color.basic

      piercings:
        left:
          enable: off
          count: no

        right:
          enable: on
          count: "one"

    methods:
      enableByVal: (val) ->
        if not val
          filter: "blur(.1vmax) contrast(0)"
          opacity: 0.8
          "pointer-events": "none"

        else
          filter: ""
          opacity: ""
          "pointer-events": ""

      opacityByVal: (val) ->
        if val then background: @color.piercings

      enableChecker: (val, color) ->
        if val
          'background-color': color
          'border-color': color
        else
          'border-color': color

    watch:
      "$root.eyes.color.left.basic": (val) -> @color.eyes.left = val
      "$root.piercings.color.basic": (val) -> @color.piercings = val

      "piercings.left.enable": (val) ->
        if not val
          @piercings.left.count = off

      "piercings.right.enable": (val) ->
        if not val
          @piercings.right.count = off

      "piercings.left.count": (val) ->
        left = @$root.piercings.left

        if val is "one"
          left.upper  = off
          left.middle = off
          left.lower  = on

        else if val is "two"
          left.upper  = off
          left.middle = on
          left.lower  = on

        else if val is "three"
          left.upper  = on
          left.middle = on
          left.lower  = on

        else
          left.upper  = off
          left.middle = off
          left.lower  = off

      "piercings.right.count": (val) ->
        right = @$root.piercings.right

        if val is "one"
          right.upper  = off
          right.middle = off
          right.lower  = on

        else if val is "two"
          right.upper  = off
          right.middle = on
          right.lower  = on

        else if val is "three"
          right.upper  = on
          right.middle = on
          right.lower  = on

        else
          right.upper  = off
          right.middle = off
          right.lower  = off

    components: {
      BarModule
      BarInput
      SetColor
      BarInputPad
      BlockPiercing
    }
</script>

<style lang="sass">
  .menu-bar
    width: 95%
    background: #353535
    top: 0%
    border-radius: 2vmin
    display: block
    margin: .25vmax 1.4vmax
    overflow: hidden

    p
      color: #ccc
      margin: 0
      padding: 1.25vmin 1.25vmin 1.25vmin 3vmax
      font-size: 2.5vmin

    #color
      background: #fa3
      border-radius: 0 .5vmin .5vmin 0
      top: 0
      right: 1vmin
      padding: .6vmin
      width: 2.5vmin
      pointer-events: all
      cursor: pointer
      display: inline-block

    #color2
      background: #fa3
      border-radius: 0 .5vmin .5vmin 0
      padding: .6vmin
      width: 2.5vmin
      pointer-events: all
      right: 1vmin
      cursor: pointer

    #close2
      background: transparent
      padding: .5vmin
      width: 2.5vmin
      pointer-events: all
      right: 1vmin
      cursor: pointer

    #block
      position: relative

    #color path, #color2 path, #close2 path
      pointer-events: none

    #sliderBox
      margin: .5vmin 2vmin
      height: 15vmin
      width: 15vmin
      position: relative
      cursor: pointer

    #title
      height: 6vmin
      background: #444
      border-radius: 0
      box-shadow: 0 0 5vmin rgba(0, 0, 0, .2)

    input
      width: 90%
      height: 1vmin
      background: #fa3
      top: 66%
      left: 5%
      border-radius: .3vmax
      box-shadow: 0 0 2.5vmin rgba(0, 0, 0, .2)
      -webkit-appearance: none
      margin: 0
      cursor: e-resize

  .mark-arrow
    width: 4vmin
    height: 4vmin
    background: #555
    border-radius: 50% 0 50% 50%
    box-shadow: 0 0 2vmin rgba(0, 0, 0, .2)
    cursor: pointer

  .menu-bar:not(#title, #title *) *
    pointer-events: none

  .menu-bar:first-of-type, .menu-bar:last-of-type
    margin: 0 1.4vmax

  .loadings-enter
    opacity: 0
    transform: translateY(-100%)

  .loadings-leave-to
    opacity: 0
    transform: translate(-100%)

  #piercingType
    width: 29%
    height: 4.8vmin
    margin: 1vmin 1.33%
    display: inline-block
    border: .2vmin solid #fa0
    position: relative

    input
      width: 100%
      height: 100%
      background: transparent
      cursor: pointer
      margin: 0
      opacity: 0
      top: 0
      left: 0

    input:checked ~ #checkmark
      display: block
      background: #fa3
      color: #111

    #checkmark
      padding: 1vmin 0%
      top: .5%
      left: 0
      width: 100%
      height: 60%
      position: absolute
      pointer-events: none
      background: transparent
      font-family: Arial,Helvetica,sans-serif
      font-variant: small-caps
      font-weight: bold
      font-size: 2vmin
      text-align: center
      color: #eee
</style>