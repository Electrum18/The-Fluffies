<template lang="pug">
  path(d :id="name" :ref="name" :fill="fill" :style="stroke")
</template>

<script lang="coffee">
  export default
    props: ["name", "hide", "isNotStroke"]

    mounted: ->
      @$root.$refs[@name] = @$refs[@name]

    computed:
      fill: ->
        if not @hide
          if @isNotStroke
               @$root.mane.color.second
          else @$root.mane.color.basic

        else "#0000"  # Transparent

      stroke: ->
        if not @hide
          if @isNotStroke
               { stroke: "#0000" }  # Transparent
          else { stroke: @$root.mane.color.shade }

        else { stroke: "#0000" }  # Transparent
</script>