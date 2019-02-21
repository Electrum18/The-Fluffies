var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    path = require('path');

module.exports = [
  {
    name: 'JS',
    mode: 'production',
    entry: {
      'code.js': [
        path.resolve(__dirname, 'build/editor.ts'),
        path.resolve(__dirname, 'build/interface.ts')
      ]
    },
    output: {
      path: path.resolve(__dirname, 'web/editor'),
      filename: '[name]'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    devtool: 'source-map',
    module: {
      rules: [ {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader'
      } ]
    },
    externals: {
      jquery: 'jQuery',
      polymorph: 'polymorph',
      anime: 'anime'
    }
  },

  {
    name: 'CSS',
    mode: 'production',
    entry: './build/visual.sass',
    output: {
      path: path.resolve(__dirname, 'web/editor'),
      filename: 'style.css'
    },
    plugins: [
      new ExtractTextPlugin('style.css')
      /* new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } }
      }) */
    ],
    module: {
      rules: [ {
          test: /\.sass$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              { loader: 'sass-loader', options: { minimize: true } }
            ]
          })
      } ]
    }
  }
];