const path = require('path');
const webpack = require('webpack');
const config = require('./package.json');
const build = require('yargs').argv.env === 'build';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);
process.env.NODE_ENV = build ? 'production' : 'development';

const productionPlugins = [
  new UglifyJsPlugin({
    sourceMap: true,
    parallel: true,

    uglifyOptions: {
      sourceMap: true,
      parallel: true,

      compress: {
        drop_console: true,
        conditionals: true,
        comparisons: true,
        dead_code: true,
        if_return: true,
        join_vars: true,
        warnings: false,
        unused: true
      },

      output: {
        comments: false
      }
    }
  }),

  new webpack.optimize.ModuleConcatenationPlugin()
];

module.exports = {
  devtool: build ? '#source-map' : 'cheap-module-eval-source-map',
  mode: build ? 'production' : 'development',
  entry: path.resolve('./src/index.js'),

  module: {
    rules: [{
      enforce: 'pre',
      test: /(\.js)$/,
      loader: 'eslint-loader',
      include: [path.resolve('./src')],

      options: {
        emitWarning: !build,
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.(js|jsx)$/,
      loader: 'babel-loader',
      include: [
        path.resolve('./src'),
        path.resolve('./node_modules/webpack-dev-server/client'),
        path.resolve('./node_modules/three/src')
      ]
    }, {
      test: /\.(glsl|vert|frag)$/i,
      loader: 'threejs-glsl-loader'
    }, {
      test: /\.(gltf)$/i,
      loader: 'gltf-loader-2'
    }, {
      test: /assets.*\.(bin|png|jpe?g|gif|glb)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: path.posix.join('assets', 'assets-3d/[name].[hash:7].[ext]')
          }
        }
      ]
    }, {
      test: /\.(cube)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: path.posix.join('assets', 'assets-3d/[name].[hash:7].png')
        }
      }, {
        loader: 'lut-loader'
      }]
    }]
  },

  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.js', '.json'],

    alias: {
      '@three': path.resolve('./node_modules/three/src'),
      '@': path.resolve('./src')
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      BROWSER_SUPPORTS_HTML5: true,
      PRODUCTION: JSON.stringify(build),
      VERSION: JSON.stringify(config.version),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    ...(build ? productionPlugins : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]),

    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, './src/assets'),
      ignore: ['.*'],
      to: 'assets'
    }])
  ],

  output: {
    globalObject: build ? 'typeof self !== \'undefined\' ? self : this' : 'window',
    filename: (build ? `${config.name}.min` : 'main') + '.js',
    libraryTarget: build ? 'umd' : 'var',
    library: build ? config.name : '',

    path: path.resolve('./build'),
    libraryExport: 'default',
    umdNamedDefine: true,
    publicPath: '/'
  },

  optimization: {
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    removeEmptyChunks: true,
    namedModules: true,
    namedChunks: true,
    minimize: build
  },

  devServer: {
    contentBase: path.join(__dirname, './build'),
    clientLogLevel: 'warning',
    host: HOST || 'localhost',
    watchContentBase: true,
    port: PORT || 8080,
    publicPath: '/',

    compress: true,
    overlay: true,
    quiet: false,
    open: false,
    hot: true,

    watchOptions: {
      poll: false,
    }
  },

  node: {
    child_process: 'empty',
    setImmediate: false,
    dgram: 'empty',
    net: 'empty',
    tls: 'empty',
    fs: 'empty'
  }
};
