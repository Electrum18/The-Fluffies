<template lang="pug">
  #app
    v-app#inspire(:class="dark ? 'theme--dark' : ''")
      v-app-bar(fixed :dark="dark" app)
        v-btn(large depressed href="/")
          v-icon(left) mdi-chevron-left
          | back

        v-spacer
        v-toolbar-title(style="text-transform: uppercase") about
        v-spacer

        v-btn(large depressed href="/support") support
          v-icon(right) mdi-chevron-right

      v-content
        v-item-group(:dark="dark")
          v-container(fluid)
            v-row(justify="center")
              v-col(v-for="(card, i) in content" :key="card + i" cols="12" md="5")
                v-card(class="align-center")
                  v-card-title(style="background-image: linear-gradient(to right, #fa2, #f64)")
                    | {{ card.title }}

                  v-spacer
                  v-card-text
                    p.font-weight-medium(v-for="(text, j) in card.text" :key="text + j" v-html="format(text)")

              v-col(cols="12" md="10")
                v-card(class="align-center")
                  v-card-title(style="background-image: linear-gradient(to right, #fa2, #f64)")
                    | Contributors

                  v-item-group
                    v-container
                      v-row
                        v-col(v-for="(contributor, j) in contributors" :key="contributor + j" cols="12" md="4")
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
                                v-list-item-subtitle Contributions: {{ contributor.contributions }}

                        v-col(cols="12" md="4")
                          v-card(outlined)
                            v-list-item(three-line)
                              v-list-item-content
                                v-list-item-title.headline Join development
                                v-list-item-subtitle Become a part of the project


              v-col(cols="12" md="10")
                v-card(class="align-center")
                  v-card-title(style="background-image: linear-gradient(to right, #fa2, #f64)")
                    | Special thanks to

                  v-spacer
                  v-card-text
                    p.font-weight-medium(v-for="(text, j) in specialThanks" :key="text + j" v-html="format(text)")

            v-row(justify="center")
              v-card(:dark="dark")
                v-btn(
                  icon
                  large
                  target="_blank"
                  title="Github"
                  href="https://github.com/Electrum18/The-Fluffies"
                )
                  v-icon mdi-github-circle

                v-btn(
                  icon
                  large
                  target="_blank"
                  title="Twitter"
                  href="https://twitter.com/TFluffies"
                )
                  v-icon mdi-twitter

                v-btn(
                  icon
                  large
                  target="_blank"
                  title="Patreon"
                  href="https://www.patreon.com/the_fluffies"
                )
                  v-icon mdi-patreon


      v-footer(fixed :dark="dark" app)
        v-btn(
          @click="dark = !dark"
          :dark="!dark"
          absolute
          fab
          top
          right
        )
          v-icon(large) {{ dark ? "mdi-brightness-7" : "mdi-moon-waning-crescent" }}

        div &copy {{ new Date().getFullYear() }} - The Fluffies
</template>

<script lang="coffee">
  import Content from './content.json'

  export default
    data: ->
      dark: no
      hour: new Date().getHours()

      contributors: []

      specialThanks: [
        "[LightningZap] for hosting and motivation",
        "[Jankie] for creating colored mane ends",
        "[FreddyDan12] for donations to Patreon",
      ]

      content: Content

    methods:
      format: (text) ->
        return text.replace(/\[/g, "<span class='font-weight-black'>").replace(/\]/g, "</span>")

    mounted: ->
      if @hour > 17 or @hour < 9 then @dark = on else @dark = off

      url = "https://api.github.com/repos/electrum18/the-fluffies/contributors?page=1&?access_token=fff"

      @$http.get(url).then (res) ->
        @contributors = res.body
</script>