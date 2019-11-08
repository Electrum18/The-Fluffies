<template lang="pug">
  div(style="position: relative")
    p.sm {{ name }}
      span#number(:style="{ background: color ? color : '#fa0' }"
        style="float: right; margin: 0 1vmin 0 0") {{ percent }}

    input(type="range" :min="min" :max="max" value="type"
      :style="{ background: color ? color : '#fa0' }" v-model="percent")
</template>

<script lang="coffee">
  export default
    props: ['name', 'color', 'type', 'min', 'max', 'compare']

    data: ->
      percent: @type[@name]

    watch:
      percent: ->
        @type[@name] = @percent

        if 100 - @type[@compare] <= @percent
          @type[@compare] = 100 - @percent

    mounted: ->
      @$watch (() -> @type[@name]), (val) ->
          @percent = val
</script>
