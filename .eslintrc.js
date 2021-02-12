module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    curly: 0,
    'space-before-function-paren': ['error', 'never'],
    'arrow-parens': 0,
    'no-magic-numbers': ['error', { ignoreArrayIndexes: true, ignore: [1, 1.5, 2, 3, 0, -1] }]
  }
}
