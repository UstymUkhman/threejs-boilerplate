/* global __dirname, require, module */

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'Experiment';

let plugins = [
    new webpack.ProvidePlugin({
      'THREE': 'THREE'
    })
    // ,new webpack.ExternalsPlugin({
    //   type: 'commonjs',
    // })
  ], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  // externals: {
  //   gsap: 'gsap'
  // },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /(\.glsl|\.frag|\.vert)$/,
        loader: 'raw-loader'
        // exclude: /node_modules/
      },
      {
        test: /(\.glsl|\.frag|\.vert)$/,
        loader: 'glslify'
        // exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src'), path.resolve('./node_modules')],
    extensions: ['.json', '.js'],
    alias: {
      'THREE': path.resolve('./node_modules/three/src/Three.js')
    }
  },
  plugins: plugins
};

module.exports = config;
