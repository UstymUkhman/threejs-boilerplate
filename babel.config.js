module.exports = {
  presets: [[
    '@babel/preset-env', {
      forceAllTransforms: true,
      shippedProposals: true,
      modules: false,

      targets: {
        node: 'current'
      }
    }
  ]],

  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime'
  ],

  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node'
      ]
    }
  }
};
