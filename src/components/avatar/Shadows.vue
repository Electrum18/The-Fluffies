<template lang="pug">
  path(:id="name + 'Shadow'"
    fill="#0000"
    stroke="#fff"
    stroke-width=7
    stroke-linecap="round"
    stroke-linejoin="round"
    :filter="$root.Shading" :ref="name + 'Shadow'"
    :style="style")
</template>

<script lang="coffee">
  export default
    props: ["name", "hide"]

    computed:
      style: ->
        opacity: if @hide then 0 else 1

    mounted: ->
      @$root.$refs[@name + "Shadow"] = @$refs[@name + "Shadow"]
</script>
