var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    path = require('path');

/*module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};*/

module.exports = [
  {
    name: 'JS_Editor',
    mode: 'production',
    entry: [
      './src/editor/editor.ts',
      './src/editor/interface.ts'
    ],
    output: {
      path: path.resolve(__dirname, 'web/js/'),
      filename: 'editor.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
      rules: [ 
        { test: /\.(ts|tsx)$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/ },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    optimization: {
      minimizer: [new UglifyJsPlugin({ cache: true })]
    },
    externals: {
      jquery: 'jQuery',
      polymorph: 'polymorph',
      anime: 'anime'
    }
  },

  {
    name: 'JS_Pages',
    mode: 'production',
    entry: {
        intro: './src/intro/code.ts',
        about: './src/about/code.ts',
      support: './src/support/code.ts'
    },
    output: {
      path: path.resolve(__dirname, 'web/js/'),
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    },
    module: {
      rules: [ 
        { test: /\.(ts|tsx)$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/ },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    },
    optimization: {
      minimizer: [new UglifyJsPlugin({ cache: true })]
    },
    externals: {
      jquery: 'jQuery'
    }
  },

  {
    name: 'CSS',
    mode: 'production',
    entry: {
       editor: './src/editor/visual.sass',
        intro:  './src/intro/visual.sass',
        about:  './src/about/visual.sass',
      support: './src/support/visual.sass'
    },
    output: {
      path: path.resolve(__dirname, 'web/css/'),
      filename: '[name].css'
    },
    plugins: [
      new ExtractTextPlugin('[name].css'),
      new OptimizeCssAssetsPlugin({ cssProcessorOptions: { discardComments: { removeAll: true } } })
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