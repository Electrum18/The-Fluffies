<template lang="pug">
  #app
    #background(:style="background")

    h1#title(:style="title") support us
    #back
      a(href="/")
        button(:style="button" @hover="title") back

    #next
      a(href="/about")
        button(:style="button" @hover="title") about

    #text
      h2 how to draw
      p(:style="text") Frames use vector format (SVG), you need to take the coordinates of the shape from the file they are located at (digital sequence of text)
      p(:style="text") All parts of the "avatar" are divided into frames, on average they are 3, 5, 7 horizontal frames (there are no vertical ones)
      p(:style="text") In order for animation to work properly, it is necessary for points to be in right order, with the same quantity in frames, it is easy to observe if copied from the previous frame, afterwards providing changes for new one

      a(href="https://css-tricks.com/svg-shape-morphing-works/") How SVG Shape Morphing Works
        svg(viewBox="0 0 448 448")
          path(fill="#46f" d="M414 24a79 79 0 0 0-58-24H82C60 0 40 8 24 24A79 79 0 0 0 0 82v274c0 23 8 42 24 58s36 25 58 25h274c23 0 42-9 58-25s25-35 25-58V82c0-22-9-42-25-58zm-49 204c0 8-3 14-11 17l-7 2c-5 0-9-2-13-6l-41-41-152 153c-4 3-8 5-13 5s-9-2-13-5l-29-30c-4-3-5-7-5-12s1-10 5-13l152-153-41-41c-6-5-7-12-4-20 4-7 9-11 17-11h137c5 0 9 2 13 6 4 3 5 7 5 12v137z")

      a(href="https://codeburst.io/svg-morphing-the-easy-way-and-the-hard-way-c117a620b65f") SVG Morphing (the easy way and the hard way)
        svg(viewBox="0 0 448 448")
          path(fill="#46f" d="M414 24a79 79 0 0 0-58-24H82C60 0 40 8 24 24A79 79 0 0 0 0 82v274c0 23 8 42 24 58s36 25 58 25h274c23 0 42-9 58-25s25-35 25-58V82c0-22-9-42-25-58zm-49 204c0 8-3 14-11 17l-7 2c-5 0-9-2-13-6l-41-41-152 153c-4 3-8 5-13 5s-9-2-13-5l-29-30c-4-3-5-7-5-12s1-10 5-13l152-153-41-41c-6-5-7-12-4-20 4-7 9-11 17-11h137c5 0 9 2 13 6 4 3 5 7 5 12v137z")

    #text
      h2 how to help improve the code
      p(:style="text") The project code is publicly available on the #[span(:style="span") GitHub] site with a #[span(:style="span") CC BY-NC-ND v4.0], it can be improved by anyone

      a(href="https://github.com/Electrum18/The-Fluffies") The Fluffies on GitHub
        svg(viewBox="0 0 448 448")
          path(fill="#46f" d="M414 24a79 79 0 0 0-58-24H82C60 0 40 8 24 24A79 79 0 0 0 0 82v274c0 23 8 42 24 58s36 25 58 25h274c23 0 42-9 58-25s25-35 25-58V82c0-22-9-42-25-58zm-49 204c0 8-3 14-11 17l-7 2c-5 0-9-2-13-6l-41-41-152 153c-4 3-8 5-13 5s-9-2-13-5l-29-30c-4-3-5-7-5-12s1-10 5-13l152-153-41-41c-6-5-7-12-4-20 4-7 9-11 17-11h137c5 0 9 2 13 6 4 3 5 7 5 12v137z")

    #text
      h2 issues
      p(:style="text") Not all head positions look good
      p(:style="text") The eye view in Firefox is incorrect
      p(:style="text") In Edge and Internet Explorer browsers may not display properly
      p(:style="text") We advise you to upgrade your browser to the latest version

    #text(style="margin: 1.5vmin 0 10vmin")
      h2 adding to the project
      p(:style="text" style="width: 90%") If you have ideas or want to add hairstyles or something else to the project, let us know and your proposal will be considered
      p(:style="text" style="width: 90%") Use that email to send: #[span(:style="span" style="width: 90%") thefluffiessite@gmail.com]

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

    components:
      NightMode: NightMode
</script>

<style lang="sass">
  @import ../../assets/styles/basic.sass
  @import ../../assets/styles/pages.sass

  #text a
    width: 42%!important
    padding: 0.5vmin 1.5vmin
    border-top: 0.2vmin solid hsla(0, 0%, 46.7%, .4)
    text-decoration: underline
    color: #46f!important
    pointer-events: all

  #text a svg
    margin: 0.5vmin
    height: 1.75vmin

  #text a:visited
    color: #a6f!important

  #text a:visited path
    fill: #a6f
</style>
