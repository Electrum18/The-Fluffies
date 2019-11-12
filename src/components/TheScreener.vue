<template lang="pug">
  #menu-screener(:style="style")
    svg#takePhoto(viewBox="0 0 440 440" preserveAspectRatio="xMidYMin meet" @click="takeImage" ref="takePhoto")
      path(fill="#8f4" d="M414 24a79 79 0 0 0-58-24H82C60 0 40 8 24 24A79 79 0 0 0 0 82v274c0 23 8 42 24 58s36 25 58 25h274c23 0 42-9 58-25s25-35 25-58V82c0-22-9-42-25-58zm-43 135L196 334c-4 4-8 6-13 6s-10-2-13-6L68 232c-4-4-6-8-6-13s2-9 6-13l29-29c3-3 8-5 13-5s9 2 12 5l61 61 133-134c4-3 8-5 13-5s9 2 13 5l29 29c3 4 5 8 5 13s-2 9-5 13z")

    #imageType(style="border-radius: 0 1vmin 1vmin 0")
      input(type="radio" name="radios" value="png" v-model="mode" checked)
      #checkmark(style="border-radius: 0 1vmin 1vmin 0") png

    #imageType(style="border-radius: 1vmin 0 0 1vmin")
      input(type="radio" name="radios" value="jpeg" v-model="mode")
      #checkmark(style="border-radius: 1vmin 0 0 1vmin; padding: 7% 11%; width: 82%") jpeg

    SetColor#set-color(name="set background" title="background" color="background.color.basic")

    p.header resolution #[span px]
    input.scr(type="number" min="1" style="margin: 3.5vmin 0 0 2vmin" v-model="width")

    p.middle x
    input.scr(type="number" min="1" style="margin: 3.5vmin 2vmin 0 0" v-model="height")
</template>

<script lang="coffee">
  import SetColor from './bar/SetColors.vue'

  export default
    data: ->
      mode: "png"

      width: 1920
      height: 1080

      style: bottom: "-8vmin"

    watch:
      "$parent.screener.opened": (val) ->
        @style = if val then bottom: "0vmin" else bottom: "-8vmin"

    methods:
      takeImage: ->
        width  = @width
        height = @height

        avatar = @$root.$refs.avatar

        canvas = document.createElement "canvas"
        ctx    = canvas.getContext "2d"
        e      = document.createElement "a"

        canvas.width  = width
        canvas.height = height

        ctx.fillStyle = @$root.background.color.basic

        ratio  = avatar.width / avatar.height
        width  = canvas.width
        height = width / ratio

        if height > canvas.height
          height = canvas.height
          width  = canvas.height * ratio

        xOffset = if width < canvas.width then (canvas.width - (width * 1.25)) / 2 else 0
        yOffset = canvas.height - (height * 1.125)

        ctx.fillRect 0, 0, canvas.width, canvas.height
        ctx.drawImage avatar, xOffset, yOffset, width * 1.25, height * 1.25

        e.style.display = "none"
        e.download      = "TFs-" + @$parent.name + "." + @mode
        e.href          = canvas.toDataURL "image/png"

        document.body.appendChild e

        e.click()

        document.body.removeChild e

    components: {
      SetColor
    }
</script>

<style lang="sass">
  #menu-screener
    width: 60vmax
    height: 8vmin
    bottom: -8vmin
    left: 50%
    transform: translate(-50%)
    border-radius: 2vmin 2vmin 0 0
    background: #333
    pointer-events: all

    input.scr
      width: 6vmin
      height: 3vmin
      font-size: 2.25vmin
      background: #222
      color: #eee
      border: .2vmin solid #aaa
      border-radius: .75vmin
      padding: .2vmin 0 0 1.1vmin

    p.middle
      position: relative
      display: inline-block
      color: #aaa
      background: transparent
      font-family: Arial,Helvetica,sans-serif
      font-variant: small-caps
      font-weight: lighter
      font-size: 2.5vmin
      padding: .75vmin
      margin: 0

    p.header
      position: absolute
      color: #ccc
      background: #222
      margin: .5vmin 2vmin
      font-size: 1.5vmin
      padding: .25vmin 0 .25vmin 1vmin
      border-radius: .5vmin
      font-family: Arial,Helvetica,sans-serif
      font-variant: small-caps
      font-weight: bold

      span
        background: #fa0
        color: #222
        padding: .2vmin .5vmin
        margin: 0 0 0 5.25vmin
        border-radius: 0 .5vmin .5vmin 0

    #set-color
      width: 30%
      position: relative
      float: right
      left: -10%
      top: 1.5vmin

    #color
      background: #fa3
      border-radius: 0 .5vmin .5vmin 0
      top: 1vmin
      right: 1vmin
      padding: .6vmin
      width: 2.5vmin
      pointer-events: all
      cursor: pointer
      display: inline-block

  #imageType
    width: 8vmin
    height: 4.8vmin
    right: 8vmin
    margin: 1.65vmin .33vmin
    display: inline-block
    float: right
    border: .2vmin solid #fa0
    position: relative

    input
      width: 100%
      height: 100%
      background: transparent
      cursor: pointer
      margin: 0
      opacity: 0
      position: absolute

    input:checked ~ #checkmark
      display: block
      background: #fa3
      color: #111

    #checkmark
      padding: 7% 20%
      top: -3%
      left: -3%
      width: 65%
      height: 80%
      position: absolute
      pointer-events: none
      background: transparent
      font-family: Arial,Helvetica,sans-serif
      font-variant: small-caps
      font-weight: bold
      font-size: 3vmin
      color: #eee
</style>
