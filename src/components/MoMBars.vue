<template lang="pug">
  .MM-bar(
    :style="style"
    @click="$root.hair.name = elem.name; $root.hair.id = id"
    @mousewheel="$parent.scroll"
  )
    div(v-if="id === 0")
      p#header Mane list
      p#sub scroll for navigation

    p#name {{ elem.name }}
    p @{{ elem.author }}
    p#id(:style="selected") {{ id }}

    svg#mirror(v-if="elem.mirroring" viewBox="0 0 512 512")
      path(fill="#333" d="M256 0c-8 0-15 7-15 15v70a15 15 0 0 0 30 0V15c0-8-7-15-15-15zM256 137c-8 0-15 7-15 15v70a15 15 0 0 0 30 0v-70c0-8-7-15-15-15zM256 275c-8 0-15 7-15 15v70a15 15 0 0 0 30 0v-70c0-8-7-15-15-15zM256 412c-8 0-15 7-15 15v70a15 15 0 0 0 30 0v-70c0-8-7-15-15-15zM179 104L59 67a15 15 0 0 0-19 14v350a15 15 0 0 0 19 14l120-37c7-1 11-7 11-14V118c0-7-4-13-11-14zM466 69c-4-3-9-4-13-2l-120 37c-7 1-11 7-11 14v276c0 7 4 13 11 14l120 37a15 15 0 0 0 19-14V81c0-5-2-9-6-12z")

</template>

<script lang="coffee">
  export default
    props: ["id", "elem"]

    computed:
      style: ->
        size =
          width: 34 + 'vmax'
          scale: 1
          X: 0

        if @$parent.menuOfModels.angle is @id * 1.5
          size =
            width: 30 + 'vmax'
            scale: 1.2
            X: -105

        {
          transform: "translate(#{size.X}%, -50%) rotate(" +
            (-@$parent.menuOfModels.angle + @id * 1.5) +
          "deg) scale(#{size.scale})",
          width: size.width,
          ...@$parent.menuOfModels.style.bar
        }

      selected: ->
        if @$root.hair.name is @elem.name
             background: "#fa0"
        else background: "#0000"
</script>

<style lang="sass">
  .MM-bar
    width: 34vmax
    height: 4vmax
    background: #eee
    border-radius: 1vmin
    top: 50%
    transform-origin: -500% 50%
    pointer-events: all
    cursor: pointer

    div
      width: 100%
      pointer-events: none

    p
      font-size: 1vmax
      color: #888
      position: absolute
      bottom: .5vmin
      left: 1vmin
      margin: 0

    #name
      bottom: 0
      font-size: 1.5vmax
      color: #333
      left: 1vmin
      top: .5vmin

    #id
      font-size: 2vmax
      color: #eee
      left: 102%
      width: 3.5vmin
      text-align: center
      pointer-events: none
      border-radius: .5vmin

    #header
      color: #ddd
      font-size: 3vmin
      bottom: 1vmin

    #sub
      width: 97.5%
      text-align: right
      position: absolute
      bottom: 1vmin

    svg
      width: 2vmax
      margin: 1vmax
      right: 0
</style>
