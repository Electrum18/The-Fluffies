var path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src/static')
  },

  pages: {
    index: {
      entry: 'src/pages/index/main.coffee',
      template: 'src/template/pages/vue-cli.pug'
    },

    about: {
      entry: 'src/pages/about/main.coffee',
      template: 'src/template/pages/vue-cli.pug'
    },

    support: {
      entry: 'src/pages/support/main.coffee',
      template: 'src/template/pages/vue-cli.pug'
    },

    'editor/pony': {
      entry: 'src/pages/editor/pony/main.coffee',
      template: 'src/template/pages/vue-cli.pug'
    }
  },

  productionSourceMap: false
}