module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-order'],
  rules: {
    'order/properties-alphabetical-order': true, // Ensure CSS properties are ordered
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
        ], // Stylelint won't flag if it finds any of these strings
      },
    ],
    'declaration-block-trailing-semicolon': 'always', // Ensure there is a semi-colon at the end of a declaration block
  },
}
