<template lang="pug">
  v-row
    v-col.py-0.urls
      v-card.mx-4.my-2(dark)
        Language(:preURL="gender" dark=true)

      v-card.mx-4.my-2(dark)
        v-btn(
          icon
          large
          tile
          target="_blank"
          title="Github"
          href="https://github.com/Electrum18/The-Fluffies"
          rel="noopener"
          aria-label="Github"
        )
          v-icon mdi-github-circle

        v-btn(
          icon
          large
          tile
          target="_blank"
          title="Twitter"
          href="https://twitter.com/TFluffies"
          rel="noopener"
          aria-label="Twitter"
        )
          v-icon mdi-twitter

        v-btn(
          icon
          large
          tile
          target="_blank"
          title="Patreon"
          href="https://www.patreon.com/the_fluffies"
          rel="noopener"
          aria-label="Patreon"
        )
          v-icon mdi-patreon

      v-card.ma-2(dark)
        v-row
          p.my-0.overline.title {{ header[$root.locale] }}

          v-divider(vertical)

          v-col.px-0.py-0
            v-btn.white(
              icon
              tile
              target="_blank"
              title="VKontakte"
              :href="shareVKontakte"
              rel="noopener"
              aria-label="VKontakte"
            )
              v-icon(large color="indigo lighten-1") mdi-vk-box

            v-btn.white(
              icon
              tile
              target="_blank"
              title="Facebook"
              :href="shareFacebook"
              rel="noopener"
              aria-label="Facebook"
            )
              v-icon(large color="indigo") mdi-facebook-box

            v-btn.white(
              icon
              tile
              target="_blank"
              title="Twitter"
              :href="shareTwitter"
              rel="noopener"
              aria-label="Twitter"
            )
              v-icon(large color="light-blue") mdi-twitter-box
</template>

<script lang="coffee">
  import Language from "./Languages.vue"

  import Share from "../assets/json/locales/share.json"

  export default
    props: ["dark"]

    data: -> {
      url: "https://the-fluffies.net/"
      img: "https://raw.githubusercontent.com/Electrum18/The-Fluffies/master/src/assets/img/announcement.png"

      Share...
    }

    computed:
      gender: -> return if @$root.male then "g=m" else "g=f"

      shareVKontakte: ->
        url  = "http://vkontakte.ru/share.php?"
        url += "url="          + encodeURIComponent @url
        url += "&title="       + encodeURIComponent @title[@$root.locale]
        url += "&description=" + encodeURIComponent @text[@$root.locale]
        url += "&image="       + encodeURIComponent @img
        url += "&noparse=true"

        return url

      shareFacebook: ->
        url  = 'http://www.facebook.com/sharer.php?s=100'
        url += '&p[title]='     + encodeURIComponent @title[@$root.locale]
        url += '&p[summary]='   + encodeURIComponent @text[@$root.locale]
        url += '&p[url]='       + encodeURIComponent @url
        url += '&p[images][0]=' + encodeURIComponent @img

        return url

      shareTwitter: ->
        url  = "http://twitter.com/share?"
        url += "text=" + encodeURIComponent @text[@$root.locale]
        url += "&url=" + encodeURIComponent @url
        url += "&counturl=" + encodeURIComponent @url

        return url

    components: {
      Language
    }
</script>

<style lang="sass">
  .urls
    max-width: 100px!important
    bottom: 0
    position: absolute

  p.title
    writing-mode: tb-rl
    padding-left: 4px !important
    padding-right: 16px !important
    height: 108px
    text-align: center
    transform: scale(-1)

  a.white
    background: white
    margin: 6px
    width: 24px!important
    min-width: 24px!important
    height: 24px!important
    min-height: 24px!important
</style>