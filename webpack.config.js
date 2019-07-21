var VueLoaderPlugin = require('vue-loader/lib/plugin'),

  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  PrerenderSPAPlugin = require('prerender-spa-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyPlugin = require('copy-webpack-plugin'),

  Renderer = PrerenderSPAPlugin.PuppeteerRenderer,

  path = require('path')

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
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    //new BundleAnalyzerPlugin(),


    new HtmlWebpackPlugin({
      template: 'src/template/pages/render/index.pug',
      filename: 'pages/main/index.html',
      inject: false
    }),

    new HtmlWebpackPlugin({
      template: 'src/template/pages/render/about.pug',
      filename: 'pages/about/index.html',
      inject: false
    }),

    new HtmlWebpackPlugin({
      template: 'src/template/pages/render/editor.pug',
      filename: 'pages/editor/pony/index.html',
      inject: false
    }),

    new HtmlWebpackPlugin({
      template: 'src/template/pages/render/support.pug',
      filename: 'pages/support/index.html',
      inject: false
    }),


    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      outputDir: path.join(__dirname, 'dist', 'pages'),
      indexPath: path.join(__dirname, 'dist', 'pages', 'main', 'index.html'),
      routes: ['/main']
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      outputDir: path.join(__dirname, 'dist', 'pages'),
      indexPath: path.join(__dirname, 'dist', 'pages', 'about', 'index.html'),
      routes: ['/about']
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      outputDir: path.join(__dirname, 'dist', 'pages'),
      indexPath: path.join(__dirname, 'dist', 'pages', 'editor', 'pony', 'index.html'),
      routes: ['/editor/pony']
    }),

    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      outputDir: path.join(__dirname, 'dist', 'pages'),
      indexPath: path.join(__dirname, 'dist', 'pages', 'support', 'index.html'),
      routes: ['/support']
    }),


    new OptimizeCssAssetsPlugin({ cssProcessorOptions: { discardComments: { removeAll: true } } }),

    new MiniCssExtractPlugin({
      filename: 'pages/[name]/style.css'
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