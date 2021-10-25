const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

const withPWA = require('next-pwa')

const nextConfig = {
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'en'
  },

  webpack(config, { webpack, isServer, dev }) {
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react'
      })
    )

    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader', 'glslify-loader']
    })

    if (isServer && dev) {
      require('./scripts/sitemap')
    }

    return config
  }
}

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          disable: process.env.NODE_ENV === 'development',
          publicExcludes: [
            '!img/**/*',
            '!icons/**/*',
            '!models/**/*',
            '!draco-gltf/**/*'
          ],
          buildExcludes: [/chunks\/.*.js$/]
        }
      }
    ],
    withBundleAnalyzer
  ],
  nextConfig
)
