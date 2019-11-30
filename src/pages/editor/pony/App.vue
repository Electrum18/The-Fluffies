<template lang="pug">
  #app
    v-app#inspire(:style="{ background: background }")
      v-navigation-drawer(
        v-model="opened.Avatar"
        dark
        fixed
        right
        temporary
        hide-overlay
      )
        Menu

      v-navigation-drawer(
        v-model="opened.Hairs"
        dark
        fixed
        right
        temporary
        hide-overlay
      )
        Hairs

      v-bottom-sheet(v-model="opened.Capture" inset=true)
        Screener

      v-content#content
        v-container(fluid)
          Avatar

          v-col(cols="12" sm="6" md="4")
            v-scroll-x-transition(group)
              v-alert(
                dark
                v-for="(load, i) in loadings"
                :key="'loader' + i"
              )
                v-progress-circular(
                  indeterminate
                  color="#fa0"
                  style="margin-right: 16px"
                )
                | {{ load }}


        // Urls row

        v-col(cols="auto")
          v-spacer
          v-card.urls.ma-2(dark)
            v-btn(
              icon
              large
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
              target="_blank"
              title="Patreon"
              href="https://www.patreon.com/the_fluffies"
              rel="noopener"
              aria-label="Patreon"
            )
              v-icon mdi-patreon


      // Bottom interface

      v-app-bar(
        app
        bottom
        color="transparent"
        flat
        dark
        style="pointer-events: none"
      )
        Chat

        div.px-6(style="user-select: none")
          v-chip version
            v-chip.v-avatar--right(
              style="background-image: linear-gradient(to right, #fa2, #f64); margin-right: -12px"
            ) carrot after

        v-spacer

        // List popup menu

        v-menu(auto v-model="opened.List")
          template(v-slot:activator="{ on }")
            v-btn(
              fab
              style="pointer-events: auto"
              v-on="on"
              aria-label="Open list"
            )
              v-icon(large) mdi-menu

          v-list(dense)
            v-list-item(
              v-for="(item, i) in list"
              :key="i"
              @click.stop="opened[item.text] = !opened[item.text]; opened.List = false"
              :disabled="item.disabled"
            )
              v-list-item-icon(right): v-icon(v-text="item.icon")
              v-list-item-content
                v-list-item-title(v-text="item.text")

</template>

<script lang="coffee">
  import Screener from "../../../components/TheScreener.vue"
  import Avatar from "../../../components/TheAvatar.vue"
  import Chat  from "../../../components/TheChat.vue"
  import Menu  from "../../../components/TheMenu.vue"
  import Hairs from "../../../components/TheMenuHairs.vue"

  export default
    data: ->
      opened:
        Avatar: off
        Hairs: off
        Capture: off
        List: off

      loadings: []
      background: ""

      list: [
        { text: "Avatar",   icon: "$vuetify.icons.values.pony" },
        { text: "Animate",  icon: "mdi-movie-open", disabled: yes },
        { text: "Capture",  icon: "mdi-camera" }
      ]

    watch:
      "$root.loadings": (val) -> @loadings = val
      "$root.background.color.basic": (val) -> @background = val

    mounted: ->
      @loadings   = @$root.loadings
      @background = @$root.background.color.basic

    components: {
      Screener
      Avatar
      Chat
      Menu
      Hairs
    }
</script>

<style lang="sass">
  html
    overflow-y: auto

  .grad .v-badge__badge, button.grad
    background-image: linear-gradient(to right, #fa2, #f64)

  .urls
    max-width: 44px!important
    bottom: 0
    position: absolute!important

  .inputs .v-input__control
    height: 0
</style>
