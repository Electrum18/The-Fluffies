<template lang="pug">
  div
    svg#toNight(viewBox="-40 24 384 384" @click="toggle" :style="light")
      path(d="M224 448c86 1 164-48 200-126-23 10-47 15-72 14A176 176 0 0 1 271 3c-16-2-31-3-47-3a224 224 0 1 0 0 448zm0 0")

    svg#toLight(viewBox="0 0 512 512"  @click="toggle" :style="night")
      path(d="M256 166a90 90 0 1 0 0 180 90 90 0 0 0 0-180zm0 0")
      path(d="M505 243l-84-55 20-99c2-11-7-20-18-18l-99 20-55-84c-6-9-20-9-26 0l-55 84-99-20c-11-2-20 7-18 18l20 99-84 55c-9 6-9 20 0 26l84 55-20 99c-2 11 7 20 18 18l99-20 55 84c6 9 20 9 26 0l55-84 99 20c11 2 20-7 18-18l-20-99 84-55c9-6 9-20 0-26zM256 376a120 120 0 1 1 0-240 120 120 0 0 1 0 240zm0 0")
</template>

<script lang="coffee">
  export default
    data: ->
      hour: new Date().getHours()
      changed: no

    computed:
      light: ->
        if @$root.dark then transform: 'scale(0)' else transform: 'scale(1)'

      night: ->
        if @$root.dark then transform: 'scale(1)' else transform: 'scale(0)'

    methods:
      toggle: ->
        @$root.dark = !@$root.dark
        @changed = !@changed

    mounted: ->
      if !@changed and (@hour > 17 or @hour < 9) then @$root.dark = on else @$root.dark = off
</script>

<style lang="sass">
  #toNight
    position: fixed
    font-size: 5vmin
    padding: 1vmin 2.25vmin 1vmin 0.75vmin
    margin: 1vmin
    background: #eee
    bottom: 1vmin
    right: 1vmin
    box-shadow: 0 0 3vmin rgba(0, 0, 0, .4)
    border-radius: 100vmin
    width: 3.5vmax
    height: 4.5vmax
    transition: background 0.25s ease-out, transform 0.25s ease-out
    cursor: pointer

    path
      fill: #333

  #toLight
    position: fixed
    font-size: 5vmin
    padding: 1vmin
    margin: 1vmin
    background: #333
    bottom: 1vmin
    right: 1vmin
    box-shadow: 0 0 3vmin rgba(0, 0, 0, .67)
    border-radius: 100vmin
    width: 4.5vmax
    height: 4.5vmax
    transition: background 0.25s ease-out, transform 0.25s ease-out
    transform: scale(0)
    cursor: pointer

    path
      fill: #eee

  #toLight:hover, #toNight:hover
    background: #fa0
</style>
