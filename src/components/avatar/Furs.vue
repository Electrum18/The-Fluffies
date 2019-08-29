<template lang="pug">
  path(:id="name" d :ref="name" :fill="fill"
    :style="!notStroke ? style : false"
    :fill-opacity="notFill ? 0 : false"
  )
</template>

<script lang="coffee">
  export default
    props: ["name", "hide", "notFill", "notStroke", "alt", "second"]

    computed:
      style: ->
        opacity: if @hide then 0 else 1
        stroke:
          if @alt then @$root.fur.color.basic else @$root.fur.color.shade

      fill: ->
        if @second then @$root.fur.color.second else @$root.fur.color.basic

    mounted: ->
      @$root.$refs[@name] = @$refs[@name]
</script>