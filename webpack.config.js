var webpack = require('webpack'),

  VueLoaderPlugin = require('vue-loader/lib/plugin'),

  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
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
    index: './src/pages/index/main.coffee',
    about: './src/pages/about/main.coffee',
    support: './src/pages/support/main.coffee',
    "editor/pony": './src/pages/editor/pony/main.coffee'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/
      }, {
        test: /\.coffee$/,
        loader: 'coffee-loader',
        exclude: /node_modules/
      }, {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
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

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new VueLoaderPlugin(),
    //new BundleAnalyzerPlugin(),

    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/template/pages/render/index.pug",
      inject: false
    }),

    new HtmlWebpackPlugin({
      filename: "about/index.html",
      template: "./src/template/pages/render/about.pug",
      inject: false
    }),

    new HtmlWebpackPlugin({
      filename: "editor/pony/index.html",
      template: "./src/template/pages/render/editor.pug",
      inject: false
    }),

    new HtmlWebpackPlugin({
      filename: "support/index.html",
      template: "./src/template/pages/render/support.pug",
      inject: false
    }),


    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/'],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace('id="app"', 'id="app" data-server-rendered="true"');

        return renderedRoute;
      }
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist', 'about'),
      routes: ['/'],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');

        return renderedRoute;
      }
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist', 'editor', 'pony'),
      routes: ['/'],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');

        return renderedRoute;
      }
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist', 'support'),
      routes: ['/'],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');

        return renderedRoute;
      }
    }),


    new OptimizeCssAssetsPlugin({ cssProcessorOptions: { discardComments: { removeAll: true } } }),

    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),

    new webpack.BannerPlugin({
      banner: codeComment
    }),

    new CopyPlugin([
      { from: 'src/static'}
    ])
  ],

  externals: {
    'vue-resource': 'VueResource',
    vue: 'Vue',
    "socket.io-client": "socketIOClient"
  }
}