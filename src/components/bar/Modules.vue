<template lang="pug">
  .menu-bar(:style="expand")
    #title
      p {{ capitalize(title) }}

      .mark-arrow(@click="expanded = !expanded")
        #favColor(:style="{ background: color }" v-if="icon === 'yes'")
          #favColorMini(v-if="iconEye === 'yes'")

        svg#arrowDown(viewBox="-110 -150 675 675" :style="expanded ? close : open")
          path(fill="#aaa"
            d="M434 114l-21-21c-8-7-16-11-26-11s-19 4-26 11L222 232 84 93a37 37 0 0 0-52 0l-21 21c-7 7-11 16-11 26s4 19 11 26l186 186a35 35 0 0 0 52 0l185-186a37 37 0 0 0 0-52z")

        svg#close(viewBox="-17 -18 76 76" :style="expanded ? open : close")
          path(fill="#aaa"
            d="M28 21L40 9a5 5 0 1 0-7-8L21 14 9 1a5 5 0 0 0-8 8l13 12L1 33a5 5 0 1 0 8 7l12-12 12 12a5 5 0 0 0 7 0c2-2 2-5 0-7L28 21z")

    slot

</template>

<script lang="coffee">
  export default
    props: ["title", "icon", "iconEye"]

    data: ->
      expanded: no

      close:
        transform: "translate(-50%, -50%) scale(0)"

      color: {}

      version: navigator.userAgent
        .match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []

    methods:
      capitalize: (value) ->
        if not value then return ""

        value = value.toString()

        value.charAt(0).toUpperCase() + value.slice 1

    computed:
      expand: ->
        height: if @expanded then "auto" else "6vmin"

      open: ->
        size = if @version[1] is "Firefox" then 2 else 1

        transform: "translate(-50%, -50%) scale(" + size + ")"

    mounted: ->
      if @$root[@title]
        @color = @$root[@title].color.basic # Import

        @$watch (-> [@$root[@title].color.basic].join()),
          (val) -> @color = val

      else return
</script>