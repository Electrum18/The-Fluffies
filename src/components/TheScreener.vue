<template lang="pug">
  #menu-screener(:style="style")
    svg#takePhoto(viewBox="0 0 440 440" preserveAspectRatio="xMidYMin meet" @click="takeImage")
      path(fill="#8f4" d="M414 24a79 79 0 0 0-58-24H82C60 0 40 8 24 24A79 79 0 0 0 0 82v274c0 23 8 42 24 58s36 25 58 25h274c23 0 42-9 58-25s25-35 25-58V82c0-22-9-42-25-58zm-43 135L196 334c-4 4-8 6-13 6s-10-2-13-6L68 232c-4-4-6-8-6-13s2-9 6-13l29-29c3-3 8-5 13-5s9 2 12 5l61 61 133-134c4-3 8-5 13-5s9 2 13 5l29 29c3 4 5 8 5 13s-2 9-5 13z")

    #imageType(style="border-radius: 0 1vmin 1vmin 0")
      input(type="radio" name="radios" value="svg" v-model="mode" checked)
      #checkmark(style="border-radius: 0 1vmin 1vmin 0") svg

    #imageType
      input(type="radio" name="radios" value="png" v-model="mode")
      #checkmark png

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
      mode: "svg"

      width: 1920
      height: 1080

      style: bottom: "-8vmin"

    watch:
      "$parent.screener.opened": (val) ->
        @style = if val then bottom: "0vmin" else bottom: "-8vmin"

    methods:
      takeImage: ->
        elem = document.querySelector("#avatar svg").innerHTML
          .replace /><\/path>/g,    " />"
          .replace /><\/rect>/g,    " />"
          .replace /><\/ellipse>/g, " />"

          .match /<.+?>/g

        header = """
  <?xml version='1.0' encoding='utf-8'?>

  <!-- Generated with love by the-fluffies.net at #{new Date().getFullYear()} -->

  <svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'
    viewBox='0 -112 1024 1024' style='enable-background:new 0 -112 1024 1024;' xml:space='preserve'>
  """

        styles = """\n
  \t<style type='text/css'>
  \t\t.Hair, .Hair2,.HairBack, .HairBack2, .HairBack3, .Head, .Neck { stroke: #888; stroke-width: 10;
  \t\t\tstroke-linecap: round; stroke-linejoin: round; transform-origin: 50% 50%; }
  \t\t.inside { transform-origin: center; mask: url('#mask_Eyes') }
  \t\t.eyes.mask { mask: url('#mask_Head') }
  \t\t#nose, .eyes { stroke-opacity: 0; }
  \t\t.inner { stroke: #ccc; stroke-width: 9; stroke-linejoin: bevel; }
  \t\t.inner2 { stroke: #ccc; stroke-width: 10.5; stroke-linejoin: bevel; }
  \t\t.inner3 { stroke: #ccc; stroke-width: 20; stroke-linejoin: bevel; }
  \t\t.inner4 { stroke: #ccc; stroke-width: 7; stroke-linejoin: bevel; }
  \t\t.outer { stroke: #888; stroke-width: 7; stroke-linejoin: bevel; }
  """
        offset     = 1
        prevOffset = offset
        nameReg    = /<((?!(>| )).)+/g  # RegExp for the object name
        types      = ["g", "defs", "mask", "linearGradient", "stop"]  # Types of elements for check

        stylesArr = []

        elem[0] = """\n\t""" + elem[0]

        i = 1

        while i < elem.length
          if /style=".+?"/g.test elem[i]
            stylesArr.push """\t\t.style#{stylesArr.length} """ + elem[i].match(/style=".+?"/g)[0]

          for type in types
            if elem[i - 1].includes("<" + type) or elem[i].includes "</" + type + ">"
              if elem[i - 1].includes "<" + type    then offset++ else
              if elem[i].includes "</" + type + ">" then offset--

          j = 0

          while j < offset then elem[i] = "\t" + elem[i]; j++

          if prevOffset is offset and elem[i - 1].match(nameReg)[0] isnt elem[i].match(nameReg)[0]
            elem[i - 1] = elem[i - 1] + "\n"

          prevOffset = offset

          i++

        stylesArr = stylesArr.filter (item, index, InputArray) ->
          InputArray.indexOf item == index

        stylesArr = stylesArr.join("""\n""").replace(/style="/g,"{ ").replace /"/g, " }"

        if @mode is "svg"
          @downloadSVG "theFluffiesPony.svg",
            """#{header.trim() + styles + stylesArr}\n\t</style>\n#{elem.join("\n")}\n</svg>"""

        else
          @download "theFluffiesPony", @mode,
            """#{header.trim() + styles + stylesArr}\n\t</style>\n#{elem.join("\n")}\n</svg>"""

      downloadSVG: (filename, text) ->
        e = document.createElement "a"

        e.setAttribute "href", "data:text/plain;charset=utf-8," + encodeURIComponent text
        e.setAttribute "download", filename

        e.style.display = "none"

        document.body.appendChild e

        e.click()

        document.body.removeChild e

      download: (name, type, xml) ->
        root   = @$root
        image  = new Image()
        width  = @width
        height = @height

        image.src = "data:image/svg+xml;base64," + window.btoa unescape encodeURIComponent xml

        image.onload = ->
          canvas = document.createElement "canvas"
          ctx    = canvas.getContext "2d"
          e      = document.createElement "a"

          canvas.width  = width
          canvas.height = height

          ctx.fillStyle = root.background.color.basic

          ratio  = image.width / image.height
          width  = canvas.width
          height = width / ratio

          if height > canvas.height
            height = canvas.height
            width  = canvas.height * ratio

          xOffset = if width  < canvas.width  then (canvas.width  - width)  / 2 else 0
          yOffset = canvas.height - height

          ctx.fillRect 0, 0, canvas.width, canvas.height
          ctx.drawImage image, xOffset, yOffset, width, height

          e.style.display = "none"
          e.download      = name + "." + type
          e.href          = canvas.toDataURL "image/" + type

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
