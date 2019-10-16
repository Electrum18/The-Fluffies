<template lang="pug">
  #app
    #background(:style="background")

    h1#title(:style="title") about

    #back
      a(href="/")
        button(
          :style="back"
          @mouseover="hovered.back = true"
          @mouseleave="hovered.back = false"
        ) back

    #next
      a(href="/support")
        button(
          :style="next"
          @mouseover="hovered.next = true"
          @mouseleave="hovered.next = false"
        ) support us

    #text
      h2 open source web project in the development of which everyone can take part
      p(:style="text") Created in the summer of 2018 with the idea of ​​using vector animation right on the site and making it accessible to all by the editor
      p(:style="text") If you are interested in drawing, developing, go to the #[span(:style="span") "support"] section, at the moment there is #[span(:style="span") not enough time and effort to develop one]
      p(:style="text") The site uses #[span(:style="span") Coffeescript] for writing interactive on the editor page
      p(:style="text") #[span(:style="span") Vue.js] framework is used to manipulate elements, #[span(:style="span") Polymorph] will be used for animation calculations
      p(:style="text") For compilation used #[span(:style="span") Webpack] bandler

    #text
      h2 in future plans
      p(:style="text") Add more #[span(:style="span") hairstyles]
      p(:style="text") Using the #[span(:style="span") webcamera] to capture movements to control the "avatar"
      p(:style="text") The ability to #[span(:style="span") create widgets] for embedding in websites and forums (iframe)
      p(:style="text") Adding more #[span(:style="span") accessories]
      p(:style="text") Adding #[span(:style="span") premium] features via donation
      p(:style="text") Adding #[span(:style="span") animation] and avatar manipulation tools

    #text(style="margin: 1.5vmin 0 10vmin")
      h2 contributors

      .author(v-for="contributor in contributors")
        .avatar
          img(:src="contributor.avatar_url" :alt="contributor.login + ' avatar'")

        div#content
          h2 {{ contributor.login }}
          p(:style="[text, { margin: '1vmin 1vw 2vmin', width: 'auto' }]") Contributions: {{ contributor.contributions }}

        p(:style="creator") Creator

      .author
        .avatar
          img(src="../../assets/img/avatars/UnknownAvatar.png" alt="Your avatar")

        div#content
          h2 Join development
          p(:style="[text, { margin: '1vmin 1vw 2vmin', width: 'auto' }]") Become a part of the project

    NightMode

    #copyright
      h1 The Fluffies
      p © 2019

    #vignette
</template>

<script lang="coffee">
  import NightMode from '../../components/TheNightMode.vue'

  export default
    data: ->
      contributors: []

      background: '#fff'
      text: '#666'
      span: '#444'

      hovered:
        back: no
        next: no

      title:
        color: '#eee'
        background: '#222'

      button:
        color: '#eee'
        border: '.5vmin solid #eee'
        background: 'transparent'

      hover:
        color: '#222'
        border: '.5vmin solid #fff'
        background: '#fff'

      creator:
        width: "100%"
        background: "yellow"
        color: "black"
        margin: "1vmin 0 0 0"
        "text-align": "center"
        "border-radius": "2vmin"
        padding: ".5vmin 0"

    watch:
      '$root.dark': (val) ->
        if val
          @background = { background: '#333' }
          @text = { color: '#bbb' }
          @span = { color: '#eee' }

          @title =
            color: '#222'
            background: '#eee'

          @button =
            color: '#222'
            border: '.5vmin solid #222'
            background: 'transparent'

          @hover =
            color: '#eee'
            border: '.5vmin solid #111'
            background: '#111'

        else
          @background = { background: '#fff' }
          @text = { color: '#666' }
          @span = { color: '#444' }

          @title =
            color: '#eee'
            background: '#222'

          @button =
            color: '#eee'
            border: '.5vmin solid #eee'
            background: 'transparent'

          @hover =
            color: '#222'
            border: '.5vmin solid #fff'
            background: '#fff'

    computed:
      back: ->
        if @hovered.back then @hover else @button

      next: ->
        if @hovered.next then @hover else @button

    mounted: ->
      url = "https://api.github.com/repos/electrum18/the-fluffies/contributors?page=1&?access_token=fff"

      @$http.get(url).then (res) ->
        @contributors = res.body

    components:
      NightMode: NightMode
</script>

<style lang="sass">
  @import ../../assets/styles/basic.sass
  @import ../../assets/styles/pages.sass

  .author
    width: 30%
    background: #222
    margin: 2vmin 1.66%
    border-radius: 2vmin

  .author #content
    padding: 0 0 0 7vmax
    position: relative

  .author, .author .avatar
    position: relative
    float: left

  .author .avatar
    height: 7vmax

  .author .avatar img
    width: 7vmax
    border-radius: 2vmin

  .author h2
    width: auto
    font-size: 1.5vmax
    font-family: Arial Black, Gadget, sans-serif
    color: #eee!important
    box-shadow: none
    background: transparent

  .author h2, .author p
    border: none
    text-align: left
    margin: 2% 0 0 5%

  .author p
    width: auto
</style>

