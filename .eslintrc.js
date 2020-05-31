module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,

  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended'
  ],

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },

  plugins: ['@typescript-eslint'],

  rules: {
    'generator-star-spacing': 0,
    'no-debugger': 0,
    'no-console': 0
  },

  globals: {
    navigator: false,
    document: false,
    unescape: false,
    describe: true,
    escape: false,
    window: false,
    before: true,
    expect: true,
    THREE: false,
    sinon: true,
    it: true
  },

  env: {
    browser: true,
    node: true
  }
}
