<template lang="pug">
  path(d :id="name" :ref="name"
    :fill="$root.mane.color.basic" :style="{ stroke: $root.mane.color.shade }")
</template>

<script lang="coffee">
  export default
    props: ['name']

    mounted: ->
      @$root.$refs[@name] = @$refs[@name]
</script>