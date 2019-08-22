<template lang="pug">
  div(style="position: relative")
    svg#color(@click="open" :style="setColor" viewBox="-21 -21 683 682")
      path(fill="#333"
        d="M640 315A318 318 0 0 0 320 0 318 318 0 0 0 0 320a318 318 0 0 0 319 320 92 92 0 0 0 91-108 107 107 0 0 1 30-92 106 106 0 0 1 92-30 92 92 0 0 0 108-95zM147 192a56 56 0 1 1 0 113 56 56 0 0 1 0-113zm0 256a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm101 102a56 56 0 1 1 0-113 56 56 0 0 1 0 113zm0-347a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm144 0a56 56 0 1 1 0-112 56 56 0 0 1 0 112zm101 102a56 56 0 1 1 0-113 56 56 0 0 1 0 113zm0 0")

    p.h {{ name }}
</template>

<script lang="coffee">
  export default
    props: ['name', 'title', 'color']

    methods:
      open: ->
        pallete = @$root.$children[0].pallete

        pallete.opened = yes
        pallete.name   = @title
        pallete.target = @color.split "."

    computed:
      setColor: ->
        c = @color.split "."
        color = @$root[c[0]][c[1]][c[2]]

        background: if color[c[3]] then color[c[3]] else color
</script>
