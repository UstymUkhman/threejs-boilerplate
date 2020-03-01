module.exports = {
  root: true,
  'extends': 'stylelint-config-standard',

  rules: {
    'block-closing-brace-newline-after': null,
    'declaration-empty-line-before': null,
    'selector-no-qualifying-type': null,
    'comment-empty-line-before': null,
    'at-rule-empty-line-before': null,
    'number-no-trailing-zeros': null,
    'rule-empty-line-before': null,
    'length-zero-no-unit': null,
    'function-name-case': null,
    'color-hex-length': null,
    'max-nesting-depth': 3,

    'at-rule-no-unknown': [true, {
      'ignoreAtRules': [
        'include', 'function', 'mixin', 'content', 'at-root',
        'for', 'if', 'else', 'each', 'return'
      ]
    }],

    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['global'],
    }],

    'selector-pseudo-class-no-unknown': [true, {
      ignorePseudoClasses: ['global']
    }]
  }
}
