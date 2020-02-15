var webpack = require('webpack'),

  VueLoaderPlugin = require('vue-loader/lib/plugin'),

  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
  SitemapWebpackPlugin = require('sitemap-webpack-plugin').default,
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  PrerenderSPAPlugin = require('prerender-spa-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyPlugin = require('copy-webpack-plugin'),

  path = require('path'),

codeComment =
`Content of the-fluffies.net

Author: Electrum18
License: CC BY-NC-ND 4.0 https://creativecommons.org/licenses/by-nc-nd/4.0/

2018 - ${new Date().getFullYear()}`;


module.exports = {
  entry: {
    index: './src/pages/index/main.ts',
    about: './src/pages/about/main.ts',
    support: './src/pages/support/main.ts',
    editor: './src/pages/editor/main.ts'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      }, {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      }, {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true,
                fiber: require('fibers')
              }
            }
          }
        ]
      }, {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      }, {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img'
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.js', '.json']
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/'
  },

  optimization: {
    splitChunks: {
      chunks: "all",

      cacheGroups: {
        vue: {
          name: "vue",
          test: /[\\/]node_modules[\\/](vue)[\\/]/
        },

        vuetify: {
          name: "vuetify",
          test: /[\\/]node_modules[\\/](vuetify)[\\/]/,
          enforce: true
        },

        ajax: {
          name: "ajax",
          test: /[\\/]node_modules[\\/](vue-resource)[\\/]/,
          enforce: true
        },

        /*commons: {
          name: "vendors",
          test: /[\\/]node_modules[\\/](?!vue)[a-z-]+[\\/]/,
          minChunks: 2
        }*/
      }
    }
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin(),


    // HTML plugin

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/template/pages/render/index.pug",
      chunks: ["index", "vue", "vuetify"]
    }),

    new HtmlWebpackPlugin({
      filename: "about/index.html",
      template: "./src/template/pages/render/about.pug",
      chunks: ["about", "vue", "vuetify", "ajax"]
    }),

    new HtmlWebpackPlugin({
      filename: "editor/index.html",
      template: "./src/template/pages/render/editor.pug",
      chunks: ["editor", "vue", "vuetify", "ajax"]
    }),

    new HtmlWebpackPlugin({
      filename: "support/index.html",
      template: "./src/template/pages/render/support.pug",
      chunks: ["support", "vue", "vuetify"]
    }),


    // Prerender

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/'],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/<style type="text\/css" [^>]+>[^<]+<\/style>/g, '')
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');

        return renderedRoute;
      }
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      indexPath: path.join(__dirname, 'dist', 'about', 'index.html'),
      outputDir: path.join(__dirname, 'dist', 'about'),
      routes: ['/'],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/<style type="text\/css" [^>]+>[^<]+<\/style>/g, '')
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');

        return renderedRoute;
      }
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      indexPath: path.join(__dirname, 'dist', 'editor', 'index.html'),
      outputDir: path.join(__dirname, 'dist', 'editor'),
      routes: ['/'],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/<style type="text\/css" [^>]+>[^<]+<\/style>/g, '')
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');

        return renderedRoute;
      }
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      indexPath: path.join(__dirname, 'dist', 'support', 'index.html'),
      outputDir: path.join(__dirname, 'dist', 'support'),
      routes: ['/'],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/<style type="text\/css" [^>]+>[^<]+<\/style>/g, '')
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');

        return renderedRoute;
      }
    }),


    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      }
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css'
    }),

    new webpack.BannerPlugin({
      banner: codeComment
    }),

    new CopyPlugin([
      { from: 'src/static'}
    ]),

    new SitemapWebpackPlugin('https://the-fluffies.net', [
      { path: '/', priority: '1' },
      { path: '/about/', priority: '0.8' },
      { path: '/support/', priority: '0.8' },
      { path: '/editor/', priority: '0.5' },
    ], {
      lastMod: true,
      changeFreq: 'monthly'
    })
  ],

  externals: {
    "socket.io-client": "io"
  }
}