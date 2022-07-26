export default {
  head: {
    titleTemplate: "%s",
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Electrum18" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "dns-prefetch",
        href: "https://cdn.jsdelivr.net",
        crossorigin: "",
      },
    ],
  },

  loading: { color: "#fa0" },

  css: [],

  plugins: ["~/plugins/composition-api"],
  buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify"],
  modules: ["@nuxtjs/i18n"],

  manifest: {
    name: "The Fluffies",
    short_name: "Fluffies",
    theme_color: "#ffaa00",
    background_color: "#1f1f1f",
  },

  vuetify: {
    optionsPath: "./vuetify.options.js",
  },

  i18n: {
    locales: [
      { code: "en", iso: "en", file: "en.js" },
      { code: "ru", iso: "ru", file: "ru.js" },
    ],
    defaultLocale: "en",
    vueI18n: {
      fallbackLocale: "en",
    },
    lazy: true,
    langDir: "lang/",
  },
};
