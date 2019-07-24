var webpack = require('webpack'),

  VueLoaderPlugin = require('vue-loader/lib/plugin'),

  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  PrerenderSPAPlugin = require('prerender-spa-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin'),
  CopyPlugin = require('copy-webpack-plugin'),

  Renderer = PrerenderSPAPlugin.PuppeteerRenderer,

  path = require('path'),

codeComment =

`Content of the-fluffies.net

Author: Electrum18
License: CC BY-NC-ND 4.0 https://creativecommons.org/licenses/by-nc-nd/4.0/

2018 - ${new Date().getFullYear()}`;


module.exports = {
  entry: {
    main: './src/pages/index/main.coffee',
    about: './src/pages/about/main.coffee',
    support: './src/pages/support/main.coffee',
    "editor/pony": './src/pages/editor/pony/main.coffee'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /(node_modules|bower_components)/
      }, {
        test: /\.coffee$/,
        loader: 'coffee-loader',
        exclude: /(node_modules|bower_components)/
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
              outputPath: 'pages/img'
            }
          }
        ]
      }
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'pages/[name]/script.js',
    publicPath: '/'
  },

  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new VueLoaderPlugin(),
    //new BundleAnalyzerPlugin(),

    new HtmlWebpackPlugin({
      filename: "pages/main/index.html",
      template: "./src/template/pages/render/main.pug",
      inject: false
    }),

    new HtmlWebpackPlugin({
      filename: "pages/about/index.html",
      template: "./src/template/pages/render/about.pug",
      inject: false
    }),

    new HtmlWebpackPlugin({
      filename: "pages/editor/pony/index.html",
      template: "./src/template/pages/render/editor.pug",
      inject: false
    }),

    new HtmlWebpackPlugin({
      filename: "pages/support/index.html",
      template: "./src/template/pages/render/support.pug",
      inject: false
    }),


    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist', 'pages', 'main'),
      routes: ['/'],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');

        return renderedRoute;
      }
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist', 'pages', 'about'),
      routes: ['/'],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');

        return renderedRoute;
      }
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist', 'pages', 'editor', 'pony'),
      routes: ['/'],
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/<script (.*?)>/g, '<script $1 defer>')
          .replace('id="app"', 'id="app" data-server-rendered="true"');

        return renderedRoute;
      }
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist', 'pages', 'support'),
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
      filename: 'pages/[name]/style.css'
    }),

    new webpack.BannerPlugin({
      banner: codeComment
    }),

    new CopyPlugin([
      { from: 'src/static'}
    ])
  ],

  externals: {
    polymorph: 'polymorph',
    vue: 'Vue'
  }
}