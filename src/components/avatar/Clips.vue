<template lang="pug">
  path(:id="name" :d="path[name]"
    :style="'stroke: ' + stroke + '; stroke-width: ' + width + '; stroke-linecap: round; ' + add")
</template>

<script lang="coffee">
  export default
    props: ['name', 'stroke', 'width', 'add']

    data: ->
      path: @$root.path
</script>
