<template lang="pug">
  v-sheet(class="text-center" dark)
    v-container
      v-row
        v-col(cols="12" sm="6" md="2")
          v-text-field(
            v-model="width"
            :label="lang.screener.width"
            hide-details
            outlined
            suffix="px"
            :rules="[() => !!width || 'argh!']"
          )

        v-col(cols="12" sm="6" md="2")
          v-text-field(
            v-model="height"
            :label="lang.screener.height"
            hide-details
            outlined
            suffix="px"
            :rules="[() => !!height || 'argh!']"
          )

        v-col(cols="12" md="4")
          BarColor(
            :text="lang.screener.background"
            val="BackgroundColorBasic"
          )

        v-col(cols="12" sm="2" md="2")
          v-btn-toggle.my-1(
            v-model="mode"
            mandatory
            color="#fa0"
          )
            v-btn(
              outlined
              aria-label="PNG format"
            ) png
            v-btn(
              outlined
              aria-label="JPEG format"
            ) jpeg

        v-col(cols="12" sm="8" md="1")

        v-col(cols="12" sm="2" md="1")
          v-btn(
            fab
            @click="takeImage"
            aria-label="Take image"
          )
            v-icon mdi-camera-image
</template>

<script lang="coffee">
  import BarColor from "./BarColors.vue"

  import en from "../assets/json/locales/en/editor.json"
  import ru from "../assets/json/locales/ru/editor.json"

  export default
    data: ->
      mode: 0

      width: 1920
      height: 1080

      locales: {
        en
        ru
      }

    computed:
      lang: -> return @locales[@$root.locale]

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
        e.download      = "TFs-" + @$root.name + "." + ["png", "jpeg"][@mode]
        e.href          = canvas.toDataURL "image/png"

        document.body.appendChild e

        e.click()

        document.body.removeChild e


    components: {
      BarColor
    }
</script>