const path = require('path');
const config = require('./package.json');
const build = require('yargs').argv.env === 'build';

module.exports = {
  mode: build ? 'production' : 'development',
  entry: __dirname + '/src/index.js',
  devtool: 'inline-source-map',

  module: {
    rules: [{
      test: /(\.glsl|\.frag|\.vert)$/,
      exclude: /node_modules/,
      loader: 'raw-loader'
    }, {
      test: /(\.glsl|\.frag|\.vert)$/,
      exclude: /node_modules/,
      loader: 'glslify'
    }, {
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      test: /(\.jsx|\.js)$/
    }, {
      test: /(\.jsx|\.js)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }]
  },

  resolve: {
    modules: [
      path.resolve('./node_modules'),
      path.resolve('./src')
    ],

    extensions: ['.js', '.json'],

    alias: {
      '@three': path.resolve('./node_modules/three/src'),
      '@': path.resolve('./src')
    }
  },

  optimization: { minimize: build },

  output: {
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    filename: `${config.name}${build ? '.min' : ''}.js`,
    publicPath: `${build ? '../build/' : '/'}`,
    path: `${__dirname}/build`,
    umdNamedDefine: true,

    libraryExport: 'default',
    library: config.name,
    libraryTarget: 'umd'
  }
};
