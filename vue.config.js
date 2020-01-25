var path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src/static')
  },

  pages: {
    index: {
      entry: 'src/pages/index/main.ts',
      template: 'src/template/pages/vue-cli.pug'
    },

    about: {
      entry: 'src/pages/about/main.ts',
      template: 'src/template/pages/vue-cli.pug'
    },

    support: {
      entry: 'src/pages/support/main.ts',
      template: 'src/template/pages/vue-cli.pug'
    },

    editor: {
      entry: 'src/pages/editor/main.ts',
      template: 'src/template/pages/vue-cli-pony.pug'
    }
  },

  productionSourceMap: false
}