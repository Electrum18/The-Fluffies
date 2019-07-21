<template lang="pug">
  path(:id="name" d :fill="!notFill ? $root.fur.color.basic : false"
    :style="!notStroke ? stroke : false" :ref="name" :fill-opacity="notFill ? 0 : false")
</template>

<script lang="coffee">
  export default
    props: ['name', 'notFill', 'notStroke', 'alt']

    methods:
      stroke: ->
        stroke: if @alt then @$root.fur.color.basic else @$root.fur.color.shade

    mounted: ->
      @$root.$refs[@name] = @$refs[@name]
</script>