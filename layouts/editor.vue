<template lang="pug">
  div
    v-app#edutor-background
      nuxt

    .loading
      PonyAvatarLogo.loading-pony

      .loading-button.left-top
      .loading-button.right-top
      .loading-button.left-bottom
      .loading-button.right-bottom
</template>

<script>
import { onMounted } from '@vue/composition-api'

import PonyAvatarLogo from '~/assets/svg/PonyLoadingLogo.svg'

export default {
  setup() {
    onMounted(() => {
      const loading = document.getElementsByClassName('loading')[0]

      loading.style.opacity = 0

      setTimeout(() => {
        loading.remove()
      }, 500)
    })
  },

  components: {
    PonyAvatarLogo
  }
}
</script>

<style lang="sass">
#edutor-background
  background: #666

@keyframes loading
  0%
    opacity: 1
  50%
    opacity: 0.7
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
    animation: loading 2s ease-in-out infinite

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
