<template lang="pug">
  #app
    v-app#inspire(:class="dark ? 'theme--dark' : ''")
      v-app-bar(fixed :dark="dark" app)
        v-btn(large depressed href="/")
          v-icon(left) mdi-chevron-left
          | back

        v-spacer
        v-toolbar-title(style="text-transform: uppercase") support us
        v-spacer

        v-btn(large depressed href="/about") about
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

                    v-divider(v-if="card.href")
                    .py-2(v-if="card.href")

                    v-item-group
                      v-row.py-1(v-for="(href, j) in card.href" :key="href + j" )
                        v-badge(overlap color="transparent")
                          template(v-slot:badge): v-icon(small color="#46f") mdi-open-in-new

                          v-btn.body-2.font-weight-medium(
                            color="#46f"
                            text
                            target="_blank"
                            :title="href.text"
                            :href="href.url"
                          ) {{ href.text }}

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

      content: Content

    methods:
      format: (text) ->
        return text.replace(/\[/g, "<span class='font-weight-black'>").replace(/\]/g, "</span>")

    mounted: ->
      if @hour > 17 or @hour < 9 then @dark = on else @dark = off
</script>