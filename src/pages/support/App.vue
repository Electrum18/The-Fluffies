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

        v-toolbar-title.uppercase {{ lang.support }}

        v-spacer

        v-btn(
          large
          depressed
          :href="'/about' + search"
          :title="lang.about"
          :aria-label="lang.about"
        ) {{ lang.about }}
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

                    v-divider(v-if="card.href")
                    .py-2(v-if="card.href")

                    v-item-group
                      v-row.py-1(v-for="(href, j) in card.href" :key="href + j" )
                        v-badge(overlap color="transparent")
                          template(v-slot:badge)
                            v-icon(small :color="url()") mdi-open-in-new

                          v-btn.body-2.font-weight-medium(
                            :color="url()"
                            text
                            target="_blank"
                            :title="href.text"
                            :href="href.url"
                            rel="noopener"
                            :aria-label="href.text"
                          ) {{ href.text }}

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
  import en from "../../assets/json/locales/en/support.json"
  import ru from "../../assets/json/locales/ru/support.json"

  import Socials from "../../components/Socials.vue"

  export default
    data: ->
      dark: no
      hour: new Date().getHours()

      locales: {
        en
        ru
      }

    methods:
      format: (text) ->
        return text.replace(/\[/g, "<span class='font-weight-black'>").replace(/\]/g, "</span>")

      url: ->
        return if @dark then "#8bf" else "#359"

    computed:
      lang: -> return @locales[@$root.locale]
      search: -> return "?l=" + @$root.locale

    mounted: ->
      if @hour > 17 or @hour < 9 then @dark = on else @dark = off

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