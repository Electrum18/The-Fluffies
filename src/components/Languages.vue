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

<script>
import Vue from "vue"

export default Vue.extend({
  props: {
    dark: {
      type: Boolean,
      default: false
    },

    preURL: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      icons: {
        en: "$vuetify.icons.values.english",
        ru: "$vuetify.icons.values.russian"
      },

      language: {
        en: {
          label: "language",
          title: "Choose language"
        },

        ru: {
          label: "язык",
          title: "Выбрать язык"
        }
      }
    }
  },

  watch: {
    preURL() {
      this.setLocaleURL(this.$root.locale);
    },

    "$root.locale"(locale) {
      this.setLocaleURL(locale);
    }
  },

  methods: {
    setLocaleURL(locale) {
      var
        url    = window.location.pathname,
        preURL = this.preURL ? this.preURL + "&" : this.preURL;

      window.history.replaceState({}, "", url + "?" + preURL + "l=" + locale);
    },

    setLocaleRoot(url = no) {
      var locale = this.$root.locale;

      if (url) locale = url[0] + url[1];
      if (locale != "ru") locale = "en";

      this.$root.locale = locale;
    }
  },

  mounted() {
    var
      locale = window.location.search,
      length = locale.length;

    if (locale && locale[length - 4] == "l") {
      this.setLocaleRoot(locale[length - 2] + locale[length - 1])
    } else {
      this.setLocaleRoot(navigator.language || navigator.userLanguage)
    }
  }
})
</script>