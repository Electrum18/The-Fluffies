export default {
  target: 'static',
  /*
   ** See headers of the page
   */
  head: {
    titleTemplate: '%s',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'author', content: 'Electrum18' },
      { name: 'yandex-verification', content: '18a53c7543c3229e' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'dns-prefetch',
        href: 'https://cdn.jsdelivr.net',
        crossorigin: ''
      },
      {
        rel: 'dns-prefetch',
        href: 'https://fonts.googleapis.com',
        crossorigin: ''
      },
      {
        rel: 'dns-prefetch',
        href: 'https://fonts.gstatic.com',
        crossorigin: ''
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fa0' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/composition-api'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    'nuxt-i18n',
    '@nuxtjs/sitemap'
  ],
  /*
   ** Webfontloader module configuration
   ** See https://github.com/Developmint/nuxt-webfontloader
   */
  webfontloader: {
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap']
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** PWA module configuration
   ** See https://github.com/nuxt-community/pwa-module
   */
  manifest: {
    name: 'The Fluffies',
    short_name: 'Fluffies',
    theme_color: '#ffaa00',
    background_color: '#1f1f1f'
  },
  /*
   ** vuetify module configuration
   ** See https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    optionsPath: './vuetify.options.js',
    defaultAssets: false
  },
  /*
   ** i18n module configuration
   ** See https://github.com/nuxt-community/nuxt-i18n
   */
  i18n: {
    locales: [
      { code: 'en', iso: 'en', file: 'en.js' },
      { code: 'ru', iso: 'ru', file: 'ru.js' }
    ],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en'
    },
    seo: false,
    lazy: true,
    langDir: 'lang/'
  },
  /*
   ** Optimized images module configuration
   ** See https://github.com/juliomrqz/nuxt-optimized-images
   */
  optimizedImages: {
    inlineImageLimit: -1
  },
  /*
   ** sitemap module configuration
   ** See https://github.com/nuxt-community/sitemap-module
   */
  sitemap: {
    hostname: 'https://the-fluffies.net',

    defaults: {
      changefreq: 'monthly',
      lastmod: new Date(),
      lastmodrealtime: true
    },

    routes: [
      { url: '/', priority: 1 },
      { url: '/ru', priority: 1 },

      { url: '/about', priority: 0.8 },
      { url: '/ru/about', priority: 0.8 },

      { url: '/support', priority: 0.8 },
      { url: '/ru/support', priority: 0.8 },

      { url: '/editor', priority: 0.5 },
      { url: '/ru/editor', priority: 0.5 },

      { url: '/termsofservice', priority: 0.2 },
      { url: '/ru/termsofservice', priority: 0.2 },

      { url: '/privacypolicy', priority: 0.2 },
      { url: '/ru/privacypolicy', priority: 0.2 }
    ]
  },
  /*
   ** Google Analytics module configuration
   ** See https://github.com/nuxt-community/analytics-module
   */
  googleAnalytics: {
    id: 'UA-128687531-3'
  },
  /*
   ** Build configuration
   */
  build: {
    extractCSS: true,

    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '.',
        maxSize: 256000
      }
    }
  }
}
