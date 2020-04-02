<template lang="pug">
  v-app(:style="background")
    nuxt
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  setup(
    props,
    {
      root: {
        $store: { getters }
      }
    }
  ) {
    const background = computed(() => {
      const { background_basic: Background } = getters['avatar/getColor']

      const { h, s, l, a } = Background

      return a
        ? {
            background:
              'hsla(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%, ' + a + ')'
          }
        : { background: 'hsl(' + h + ', ' + s * 100 + '%, ' + l * 100 + '%)' }
    })

    return {
      background
    }
  }
}
</script>

<style lang="sass">
body
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC) repeat
  background-size: 16px
</style>
