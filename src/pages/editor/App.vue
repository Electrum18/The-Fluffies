<template lang="pug">
  #app
    v-app#inspire(:style="{ background: background }")
      v-navigation-drawer(
        v-model="opened.Avatar"
        dark
        fixed
        right
        temporary
        :permanent="opened.Avatar"
        hide-overlay
      )
        Menu

      v-navigation-drawer(
        v-model="opened.Hairs"
        dark
        fixed
        right
        temporary
        :permanent="opened.Hairs"
        hide-overlay
      )
        Hairs

      v-bottom-sheet(v-model="opened.Capture" inset=true)
        Screener


      v-content#content
        v-container(fluid)
          Avatar

          v-btn.d-none.d-sm-inline-flex(
            dark
            rounded
            :href="'/' + search"
            :title="lang.back"
            :aria-label="lang.back"
          )
            v-icon(left) mdi-chevron-left
            | {{ lang.back }}

          v-btn.d-inline-flex.d-sm-none(
            dark
            rounded
            fab
            small
            :href="'/' + search"
            :title="lang.back"
            :aria-label="lang.back"
          )
            v-icon mdi-chevron-left

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

        div.px-6.d-none.d-sm-inline-flex(style="user-select: none")
          v-chip {{ lang.version }}
            v-chip.v-avatar--right(
              style="background-image: linear-gradient(to right, #f46, #f2a); margin-right: -12px"
            ) dragon fruit

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
              @click.stop="opened[item.text['en']] = !opened[item.text['en']]; opened.List = false"
              :disabled="item.disabled"
            )
              v-list-item-icon(right): v-icon(v-text="item.icon")
              v-list-item-content
                v-list-item-title(v-text="item.text[$root.locale]")

</template>

<script lang="coffee">
  import Screener from "../../components/TheScreener.vue"
  import Avatar from "../../components/TheAvatar.vue"
  import Chat  from "../../components/TheChat.vue"
  import Menu  from "../../components/TheMenu.vue"
  import Hairs from "../../components/TheMenuHairs.vue"
  import Language from "../../components/Languages.vue"

  import en from "../../assets/json/locales/en/editor.json"
  import ru from "../../assets/json/locales/ru/editor.json"

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
        {
          text:
            en: "Avatar",
            ru: "Аватар"

          icon: "$vuetify.icons.values.pony"
        }, {
          text:
            en: "Animate"
            ru: "Анимация"

          icon: "mdi-movie-open"
          disabled: yes
        }, {
          text:
            en: "Capture"
            ru: "Запечатлеть"

          icon: "mdi-camera"
        }
      ]

      locales: {
        en
        ru
      }

    computed:
      lang: -> return @locales[@$root.locale]
      search: -> return "?l=" + @$root.locale

    watch:
      "$root.loadings": (val) -> @loadings = val
      "$root.color.background.basic": (val) -> @background = val

    mounted: ->
      @loadings   = @$root.loadings
      @background = @$root.color.background.basic

    components: {
      Screener
      Avatar
      Chat
      Menu
      Hairs
      Language
    }
</script>

<style lang="sass">
  html
    overflow-y: auto!important

  .grad .v-badge__badge, button.grad
    background-image: linear-gradient(to right, #fa2, #f64)

  .inputs .v-input__control
    height: 0
</style>
