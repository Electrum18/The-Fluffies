<template lang="pug">
  #app
    h1.hide {{ $root.Headers.titles[$root.locale] }}

    v-app#inspire(:class="dark ? 'theme--dark' : ''")
      v-app-bar(fixed :dark="dark" app)
        v-btn(
          large
          depressed
          :href="'/' + search"
          :title="lang.back"
          :aria-label="lang.back"
        )
          v-icon(left) mdi-chevron-left
          | {{ lang.back }}

        v-spacer

        v-toolbar-title.uppercase {{ lang.about }}

        v-spacer

        v-btn(
          large
          depressed
          :href="'/support' + search"
          :title="lang.support"
          :aria-label="lang.support"
        ) {{ lang.support }}
          v-icon(right) mdi-chevron-right

      v-content
        v-item-group(:dark="dark")
          v-container(fluid)

            Socials(:dark="dark")

            v-row(justify="center")
              v-col(v-for="(card, i) in lang.content" :key="card + i" cols="12" md="5")
                v-card(class="align-center")
                  v-card-title.gradient
                    | {{ card.title }}

                  v-spacer
                  v-card-text
                    p.font-weight-medium(v-for="(text, j) in card.text" :key="text + j" v-html="format(text)")

              v-col(cols="12" md="10")
                v-card(class="align-center")
                  v-card-title.gradient
                    | {{ lang.contributors }}

                  v-item-group
                    v-container
                      v-row
                        v-col(v-for="(contributor, j) in contributors" :key="contributor + j" cols="12" sm="6" md="4")
                          v-card(outlined)
                            v-list-item(three-line)
                              v-list-item-avatar(
                                tile
                                size="56"
                                color="grey"
                              )
                                img(:src="contributor.avatar_url" :alt="contributor.login + ' avatar'")

                              v-list-item-content
                                v-list-item-title.headline {{ contributor.login }}
                                v-list-item-subtitle {{ lang.contributions }} {{ contributor.contributions }}

                        v-col(cols="12" sm="6" md="4")
                          v-card(outlined)
                            v-list-item(three-line)
                              v-list-item-content
                                v-list-item-title.headline {{ lang.join.title }}
                                v-list-item-subtitle {{ lang.join.subtitle }}


              v-col(cols="12" md="10")
                v-card(class="align-center")
                  v-card-title.gradient
                    | {{ lang.thanks.title }}

                  v-spacer
                  v-card-text
                    p.font-weight-medium(v-for="(text, j) in lang.thanks.list" :key="text + j" v-html="format(text)")

            Socials(:dark="dark")


      v-footer(fixed :dark="dark" app)
        v-btn(
          @click="dark = !dark"
          :dark="!dark"
          absolute
          fab
          top
          right
          aria-label="Dark mode"
        )
          v-icon(large) {{ dark ? "mdi-brightness-7" : "mdi-moon-waning-crescent" }}

        div &copy {{ new Date().getFullYear() }} - The Fluffies
</template>

<script lang="coffee">
  import en from "../../assets/json/locales/en/about.json"
  import ru from "../../assets/json/locales/ru/about.json"

  import Socials from "../../components/Socials.vue"

  export default
    data: ->
      dark: no
      hour: new Date().getHours()

      contributors: []

      locales: {
        en
        ru
      }

    computed:
      lang: -> return @locales[@$root.locale]
      search: -> return "?l=" + @$root.locale

    methods:
      format: (text) ->
        return text.replace(/\[/g, "<span class='font-weight-black'>").replace(/\]/g, "</span>")

    mounted: ->
      if @hour > 17 or @hour < 9 then @dark = on else @dark = off

      url = "https://api.github.com/repos/electrum18/the-fluffies/contributors?page=1&?access_token=fff"

      @$http
        .get url
        .then (res) ->
          @contributors = res.body

    components: {
      Socials
    }
</script>

<style lang="sass">
  .uppercase
    text-transform: uppercase

  .gradient
    background-image: linear-gradient(to right, #fa2, #f64)

  .hide
    opacity: 0!important
    height: 0!important
</style>