<template lang="pug">
  v-row(justify="center")
    .py-2

    v-card.ma-2
      Language(:dark="dark")

    v-card.ma-2(:dark="dark")
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

    v-card.mx-2(:dark="dark")
      p.my-1.overline.text-center {{ header[$root.locale] }}

      v-divider

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
  a.white
    background: white
    margin: 6px
    width: 24px!important
    min-width: 24px!important
    height: 24px!important
    min-height: 24px!important
</style>