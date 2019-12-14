<template lang="pug">
  v-menu
    template(v-slot:activator="{ on }")
      v-btn(
        icon
        large
        tile
        v-on="on"
        :title="language[$root.locale].title"
        :aria-label="language[$root.locale].label"
      )
        v-icon {{ icons[$root.locale] }}

    v-card(:dark="dark")
      div
        v-btn.px-3(
          icon
          large
          tile
          @click="$root.locale = 'en'"
        )
          v-icon {{ icons.en }}

      v-divider

      div
        v-btn.px-3(
          icon
          large
          tile
          @click="$root.locale = 'ru'"
        )
          v-icon {{ icons.ru }}
</template>

<script lang="coffee">
  export default
    props:
      dark:
        type: Boolean
        default: no

      preURL:
        type: String
        default: ""

    data: ->
      icons:
        en: "$vuetify.icons.values.english"
        ru: "$vuetify.icons.values.russian"

      language:
        en:
          label: "language"
          title: "Choose language"

        ru:
          label: "язык"
          title: "Выбрать язык"

    watch:
      preURL: -> @setLocaleURL @$root.locale

      "$root.locale": (locale) ->
        @setLocaleURL locale

    methods:
      setLocaleURL: (locale) ->
        url = window.location.pathname

        preURL = if @preURL then @preURL + "&" else @preURL

        window.history.replaceState {}, "", url + "?" + preURL + "l=" + locale

      setLocaleRoot: (url = no) ->
        if url
          locale = url[0] + url[1]
        else
          locale = @$root.locale

        if locale isnt "ru"
          locale = "en"

        @$root.locale = locale

    mounted: ->
      locale = window.location.search
      length = locale.length

      if locale and locale[length - 4] is "l"
        @setLocaleRoot locale[length - 2] + locale[length - 1]
      else
        @setLocaleRoot navigator.language or navigator.userLanguage
</script>