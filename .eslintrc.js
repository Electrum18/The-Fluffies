module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'react-app',
    'prettier',
    'plugin:tailwind/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/jsx-indent-props': [2, 'first'],
    'no-multi-assign': 'off',
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'react/self-closing-comp': 'error',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    "import/resolver": {
      "alias" : {
        map : [
          ["@","./"]
        ],
        extensions: [".js", ".jsx"]
      }
    }
  }
}
