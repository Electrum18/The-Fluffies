<template lang="pug">
  #block
    svg#close2(@click="remove" viewBox="-12 -12 64 64")
      path(fill="#f35"
        d="M28 21L40 9a5 5 0 1 0-7-8L21 14 9 1a5 5 0 0 0-8 8l13 12L1 33a5 5 0 1 0 8 7l12-12 12 12a5 5 0 0 0 7 0c2-2 2-5 0-7L28 21z")

    p.h {{ type }} {{ side }} ear - {{ idPlus1 }}

    SetColor(
      name="set color"
      :title="type + ' ' + side + ' ear ' + '#'+ idPlus1 "
      :color="path"
      :target='{ "target": "piercings", "side": side, "id": id }'
    )

    p.sm position
      span#number(:style="{ background: $root.piercings[side][id].color }") {{ position }}

    input#piercPos(type="range" min="0" max="100" value="0" v-model="position"
      :style="{ background: $root.piercings[side][id].color }")

    p.sm scale
      span#number(:style="{ background: $root.piercings[side][id].color }") {{ 1 + +(scale / 100).toFixed(1) }}

    input#piercScl(type="range" min="0" max="100" value="50" v-model="scale"
      :style="{ background: $root.piercings[side][id].color }")

    .line
</template>

<script lang="coffee">
  import SetColor from "./SetColors.vue"

  export default
    props: ["type", "side", "id"]

    data: ->
      position: 10
      scale: 50

      x: 0
      y: 0

      ang: 0

      point: ""
      ring:  ""

      idPlus1: @id + 1

    watch:
      position: -> @set()
      x:     -> @apply()
      y:     -> @apply()
      scale: -> @apply()

      "$root.ang": ->
        @set()
        @apply()

      "$root.path":
        handler: -> @set()
        deep: yes

    methods:
      remove: ->
        @$root.piercings[@side].splice(@id, 1)

      set: ->
        side = @side.charAt(0).toUpperCase() + @side.slice 1
        ear  = @$root.$refs["ear" + side]

        len  = ear.getTotalLength()

        if not len
          ear  = @$root.$refs["ear" + side + "Front"]
          len  = ear.getTotalLength()

        pos  = ear.getPointAtLength len * (@position / 100)
        BBox = ear.getBBox()

        center =
          x: BBox.x + (BBox.width  / 1.5)
          y: BBox.y + (BBox.height / 2  )

        @x = pos.x
        @y = pos.y

        @ang = -Math.atan2(center.x - pos.x, center.y - pos.y) * 180 / Math.PI + 90

      apply: ->
        @$root.piercings[@side][@id].style =
          "transform: translate(#{@x}px, #{@y}px) scale(#{1 + +(@scale / 100).toFixed 1}) rotate(#{@ang}deg)"

    computed:
      path: ->
        "piercings.#{@side}.#{@id}.color"

    mounted: ->
      @set()

      @$set @$root.piercings[@side][@id], "style",
        "transform: translate(#{@x}px, #{@y}px) scale(#{1 + +(@scale / 100).toFixed 1}) rotate(#{@ang}deg)"

    components: {
      SetColor
    }
</script>
