<template lang="pug">
  #MenuBars(style="position: absolute; width: 100%")
    BarModule(title="eyes" icon="yes" icon-eye="yes")
      SetColor(name="iris" title="eyes" color="eyes.color.left.basic")

      #checker
        p.h(style="width: 16vmax") custom right color

        #checkbox
          input(v-model="$root.eyes.color.right.enable" type="checkbox"
            :style="[$root.eyesCheckedRightDivide, { 'border-color': $root.eyes.color.right.basic }]")
          #checkmark

      SetColor(name="right iris" title="right eye" color="eyes.color.right.basic"
         :style="enableByVal($root.eyes.color.right.enable)")

      .line

      #checker
        p.h(style="width: 16vmax") changeling

        #checkbox
          input(v-model="$root.eyes.changeling" type="checkbox"
            :style="[$root.furCheckedChangeling, { 'border-color': $root.eyes.color.left.basic }]")
          #checkmark

      .line

      BarInput(name="scale" :color="color.eyes.left" :type="$root.eyes.iris" min="50" max="125")

      .line

      p.h pupils

      BarInputPad(name="scale" :color="$root.eyesSet" :color-stroke="$root.eyesStroke" :type="2"
        x="eyes.pupils.width" y="eyes.pupils.height"
        xname="width" yname="height"
        :style="enableByVal(!$root.eyes.changeling)")

        #X2.line
        #X.line
        #Y2.line
        #Y.line
        #Parall.line

      .line

      p.h position

      BarInputPad(name="" :color="$root.eyesSet" :color-stroke="$root.eyesStroke"
        x="eyes.position.horiz" y="eyes.position.verti"
        xname="horiz" yname="vertic")

        #X.line(style="transform: translate(-45%,-100%)")
        #Y.line(style="transform: translate(-45%,-200%) rotate(90deg)")

      #outerRadio
        #radio(style="border-radius: 1vmin 0 0 1vmin" :style="{ 'border-color': $root.eyes.color.left.basic }")
          input#isRelative(type="radio" name="radio"
            value="relative" v-model="$root.eyes.position.mode")
          #checkmark(style="border-radius: 1vmin 0 0 1vmin" :style="$root.ifIsRelative") relative

        #radio(style="border-radius: 0 1vmin 1vmin 0" :style="{ 'border-color': $root.eyes.color.left.basic }")
          input#isAbsolute(type="radio" name="radio"
            value="absolute" checked v-model="$root.eyes.position.mode")
          #checkmark(style="border-radius: 0 1vmin 1vmin 0" :style="$root.ifIsAbsolute") absolute

      .line

      BarInput(name="focus" :color="color.eyes.left" :type="$root.eyes.position")
      BarInput(name="derp"  :color="color.eyes.left" :type="$root.eyes.position" min="-100")

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
            :style="[$root.furCheckedEyebrows, { 'border-color': $root.eyes.color.left.basic }]")
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

      p.h second & lines

      #checker
        p.h(style="width: 16vmax") enable

        #checkbox
          input(v-model="$root.mane.second.enable" type="checkbox")
          #checkmark

      div(style="position: relative" :style="enableByVal($root.mane.second.enable)")
        #checker
          p.h(style="width: 16vmax") second color

          #checkbox
            input(v-model="$root.mane.second.notLines" type="checkbox")
            #checkmark

        #checker(:style="enableByVal($root.mane.second.notLines)")
          p.h(style="width: 16vmax") ends

          #checkbox
            input(v-model="$root.mane.second.isEnds" type="checkbox")
            #checkmark

        SetColor(name="set color" title="second color" color="mane.color.second"
          :style="enableByVal($root.mane.second.notLines)")

    BarModule(title="fur" icon="yes")
      SetColor(name="set color" title="fur" color="fur.color.basic")

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

        #checker
          p.h(style="width: 16vmax") second color

          #checkbox
            input(v-model="$root.horn.notLines" type="checkbox")
            #checkmark

        SetColor(name="set color" title="second color" color="fur.color.second"
          :style="enableByVal($root.horn.notLines)")

    BarModule(title="mouth")
      #checker
        p.h(style="width: 16vmax") catlike

        #checkbox
          input(v-model="$root.catlike" type="checkbox")
          #checkmark

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
      transition-group(name="piercings")
        BlockPiercing(v-for="(obj, i) in $root.piercings.right" :type="obj.type" side="right" :id="i"
          :key="'piercingRight' + i")

        BlockPiercing(v-for="(obj, i) in $root.piercings.left" :type="obj.type" side="left" :id="i"
          :key="'piercingLeft' + i")

      p.h(style="pointer-events: none; height: 1%") add

      p.sm left ear

      p.elem(@click="$root.createLeftRing") ring
      p.elem(@click="$root.createLeftPoint") point

      p.sm right ear

      p.elem(@click="$root.createRightRing") ring
      p.elem(@click="$root.createRightPoint") point
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

    watch:
      "$root.eyes.color.left.basic": (val) -> @color.eyes.left = val

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

  .piercings-enter, .piercings-leave-to
    opacity: 0
    transform: translate(100%)

  .loadings-enter
    opacity: 0
    transform: translateY(-100%)

  .loadings-leave-to
    opacity: 0
    transform: translate(-100%)
</style>