<template lang="pug">
  div
    v-app#editor-background
      nuxt

    .loading
      svg(xmlns='http://www.w3.org/2000/svg' viewbox='64 32 832 832').loading-pony
        lineargradient#a(x1='1' x2='0' y1='0.2' y2='0')
          stop(offset='0' stop-color='#fa2')
          stop(offset='1' stop-color='#f64')

        lineargradient#b(x1='1' x2='0' y1='0.8' y2='0')
          stop(offset='0' stop-color='#fa2')
          stop(offset='1' stop-color='#f64')

        lineargradient#d(x1='1' x2='0' y1='0' y2='1')
          stop(offset='0' stop-color='#fa2')
          stop(offset='1' stop-color='#f64')

        lineargradient#e(x1='1' x2='0' y1='0' y2='0.8')
          stop(offset='0' stop-color='#fa2')
          stop(offset='1' stop-color='#f64')

        lineargradient#f(x1='0' x2='0' y1='0' y2='1')
          stop(offset='0' stop-color='#fa2')
          stop(offset='1' stop-color='#f64')

        path(fill='url(#a)' d='M499 971a145 145 0 01-290 0c0-80 65-144 145-144s145 64 145 144z')
        path(fill='url(#b)' d='M494 773c18 125-1 243-1 243S354 878 239 883c11-24 75-105 60-232l195 122z')
        path(fill='url(#f)' d='M575 341c11-62 3-166-40-166-72 9-77 140-77 140')
        ellipse(cx='512' cy='512.5' fill='url(#d)' rx='252.5' ry='260')
        path(fill='url(#e)' d='M507 773s189 16 253-63l1-1c14-14 23-33 28-55 5-32-65-14-80-43-144-44-202 162-202 162z')
        path(fill='url(#f)' d='M260 501c-81-46-16-279 62-291 56 8 50 147 50 147')

      .loading-button.left-top
      .loading-button.right-top
      .loading-button.left-bottom
      .loading-button.right-bottom
</template>

<script>
import { onMounted } from '@vue/composition-api'
export default {
  setup() {
    onMounted(() => {
      const loading = document.getElementsByClassName('loading')[0]

      loading.style.opacity = 0

      setTimeout(() => {
        loading.remove()
      }, 500)
    })
  }
}
</script>

<style lang="sass">
#editor-background
  background: #666 url("~assets/img/background.png?webp") repeat

@keyframes loading
  0%
    opacity: 1
  50%
    opacity: 0.33
  100%
    opacity: 1

.loading
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  z-index: 10
  background: #fff
  transition: opacity 500ms

  .loading-pony
    width: 100vmin
    height: 100vmin
    left: 50%
    bottom: 0
    position: fixed
    transform: translate(-50%)
    animation: loading 1.5s ease-in-out infinite

  .loading-button
    width: 56px
    height: 56px
    background: #272727
    margin: 16px
    border-radius: 50%
    position: fixed

  .left-top
    left: 0
    top: 0

  .right-top
    right: 0
    top: 0

  .left-bottom
    left: 0
    bottom: 0

  .right-bottom
    right: 0
    bottom: 0
</style>
