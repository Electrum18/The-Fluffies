<template lang="pug">
  #rotate
    .MM-bar(:style="$parent.menuOfModels.style.bar" style="transform: translate(0%, -50%)")
      .MM-block(style="border-radius: 20% 5% 5% 20%" @click="$root.hair = 'Float'")
        span Float
        span @Electrum18

      .MM-block(style="border-radius: 5%" @click="$root.hair = 'Curly ends'")
        span Curly ends
        span @Electrum18

      .MM-block(style="border-radius: 5% 20% 20% 5%" @click="$root.hair = 'Spiky to side'")
        span Spiky to side
        span @Electrum18
        svg#mirror(viewBox="0 0 512 512")
          path(fill="#333" d="M256 0c-8 0-15 7-15 15v70a15 15 0 0 0 30 0V15c0-8-7-15-15-15zM256 137c-8 0-15 7-15 15v70a15 15 0 0 0 30 0v-70c0-8-7-15-15-15zM256 275c-8 0-15 7-15 15v70a15 15 0 0 0 30 0v-70c0-8-7-15-15-15zM256 412c-8 0-15 7-15 15v70a15 15 0 0 0 30 0v-70c0-8-7-15-15-15zM179 104L59 67a15 15 0 0 0-19 14v350a15 15 0 0 0 19 14l120-37c7-1 11-7 11-14V118c0-7-4-13-11-14zM466 69c-4-3-9-4-13-2l-120 37c-7 1-11 7-11 14v276c0 7 4 13 11 14l120 37a15 15 0 0 0 19-14V81c0-5-2-9-6-12z")

    .MM-bar(:style="$parent.menuOfModels.style.bar" style="transform: translate(0%, -50%) rotate(4deg)")
      .MM-block(style="border-radius: 20% 5% 5% 20%" @click="$root.hair = 'Big Bang'")
        span Big Bang
        span @Electrum18
        svg#mirror(viewBox="0 0 512 512")
          path(fill="#333" d="M256 0c-8 0-15 7-15 15v70a15 15 0 0 0 30 0V15c0-8-7-15-15-15zM256 137c-8 0-15 7-15 15v70a15 15 0 0 0 30 0v-70c0-8-7-15-15-15zM256 275c-8 0-15 7-15 15v70a15 15 0 0 0 30 0v-70c0-8-7-15-15-15zM256 412c-8 0-15 7-15 15v70a15 15 0 0 0 30 0v-70c0-8-7-15-15-15zM179 104L59 67a15 15 0 0 0-19 14v350a15 15 0 0 0 19 14l120-37c7-1 11-7 11-14V118c0-7-4-13-11-14zM466 69c-4-3-9-4-13-2l-120 37c-7 1-11 7-11 14v276c0 7 4 13 11 14l120 37a15 15 0 0 0 19-14V81c0-5-2-9-6-12z")

      .MM-block(style="border-radius: 5%")
      .MM-block(style="border-radius: 5% 20% 20% 5%")

    .MM-bar(:style="$parent.menuOfModels.style.bar" style="transform: translate(0%, -50%) rotate(8deg)")
      .MM-block(style="border-radius: 20% 5% 5% 20%")
      .MM-block(style="border-radius: 5%")
      .MM-block(style="border-radius: 5% 20% 20% 5%")

    .MM-bar(:style="$parent.menuOfModels.style.bar" style="transform: translate(0%, -50%) rotate(12deg)")
      .MM-block(style="border-radius: 20% 5% 5% 20%")
      .MM-block(style="border-radius: 5%")
      .MM-block(style="border-radius: 5% 20% 20% 5%")

    .MM-bar(:style="$parent.menuOfModels.style.bar" style="transform: translate(0%, -50%) rotate(16deg)")
      .MM-block(style="border-radius: 20% 5% 5% 20%")
      .MM-block(style="border-radius: 5%")
      .MM-block(style="border-radius: 5% 20% 20% 5%")

    .MM-bar(:style="$parent.menuOfModels.style.bar" style="transform: translate(0%, -50%) rotate(20deg)")
      .MM-block(style="border-radius: 20% 5% 5% 20%")
      .MM-block(style="border-radius: 5%")
      .MM-block(style="border-radius: 5% 20% 20% 5%")

    .MM-bar(:style="$parent.menuOfModels.style.bar" style="transform: translate(0%, -50%) rotate(24deg)")
      .MM-block(style="border-radius: 20% 5% 5% 20%")
      .MM-block(style="border-radius: 5%")
      .MM-block(style="border-radius: 5% 20% 20% 5%")
</template>

<style lang="sass">
  .MM-bar 
    width: 36vmax
    height: 8vmax
    background: transparent
    top: 50%
    transform-origin: -500% 50%
    pointer-events: none

  .MM-block 
    width: 11.2vmax
    height: 11.2vmax
    right: 0%
    top: 45%
    background: #eee
    margin: 1%
    transform: translateY(-50%) rotate(0deg)
    float: left
    box-shadow: 0 0 5vmin rgba(0, 0, 0, .5)
    pointer-events: all
    cursor: pointer

    span:first-of-type
      width: 100%
      bottom: 0
      font-size: 1vmax
      color: #333
      text-align: center
      text-shadow: 0 0 1vmin rgba(0, 0, 0, .25)
      pointer-events: none

    span:last-of-type
      width: 90%
      top: 1vmin
      font-size: .8vmax
      color: #888
      text-align: right
      text-shadow: 0 0 1vmin rgba(0, 0, 0, .25)
      pointer-events: none

    svg
      width: 2vmax
      margin: .75vmax 1vmax
</style>
