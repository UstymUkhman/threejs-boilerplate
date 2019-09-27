const path = require('path');
const webpack = require('webpack');
const config = require('./package.json');
const build = require('yargs').argv.env === 'build';

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const webpackConfig = {
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

  optimization: {
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    removeEmptyChunks: true,
    runtimeChunk: 'single',
    namedModules: true,
    namedChunks: true,
    minimize: build,

    splitChunks: {
      maxInitialRequests: Infinity,
      chunks: 'all',
      minSize: 0,

      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          // name: 'vendor',
          enforce: true,

          name (module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return `npm.${packageName.replace('@', '')}`;
          }
        }
      }
    }
  },

  output: {
    globalObject: 'typeof self !== \'undefined\' ? self : this',
    filename: config.name + (build ? '.min' : '') + '.js',
    publicPath: build ? '../build/' : '/',
    path: __dirname + '/build',
    umdNamedDefine: true,

    libraryExport: 'default',
    library: config.name,
    libraryTarget: 'umd'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),

    /* eslint-disable camelcase */

    // new UglifyJsPlugin({
    //   sourceMap: true,
    //   parallel: true,

    //   uglifyOptions: {
    //     sourceMap: true,
    //     parallel: true,
    //     ecma: 2019,

    //     compress: {
    //       drop_console: true,
    //       conditionals: true,
    //       comparisons: true,
    //       dead_code: true,
    //       if_return: true,
    //       join_vars: true,
    //       // warnings: false,
    //       unused: true
    //     },

    //     output: {
    //       comments: false
    //     }
    //   }
    // }),

    /* eslint-enable camelcase */

    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
};

if (build) {
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      test: new RegExp('\\.(js)$'),
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

module.exports = webpackConfig;
