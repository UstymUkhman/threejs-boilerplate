module.exports = {
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-typescript',
        '@babel/plugin-transform-modules-commonjs',
        '@babel/plugin-proposal-export-namespace-from'
      ]
    }
  }
};
