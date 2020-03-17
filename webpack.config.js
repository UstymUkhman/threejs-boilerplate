const path = require('path');
const webpack = require('webpack');
const config = require('./package.json');

const build = require('yargs').argv.env === 'build';
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = build ? 'production' : 'development';
const PORT = process.env.PORT && Number(process.env.PORT);
const HOST = process.env.HOST;

module.exports = {
  devtool: build ? '#source-map' : 'cheap-module-eval-source-map',
  mode: build ? 'production' : 'development',
  entry: path.resolve('./src/main.ts'),

  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: 'ts-loader',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [
        build ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader'
      ]
    }, {
      test: /\.(mp4|webm)(\?.*)?$/i,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('assets/videos', '[name].[ext]')
      }
    }, {
      test: /\.(ogg|mp3|wav|flac|aac)(\?.*)?$/i,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('assets/sounds', '[name].[ext]')
      }
    }, {
      test: /\.(glsl|vert|frag)$/i,
      loader: 'threejs-glsl-loader'
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: path.posix.join('assets/fonts', '[name].[ext]')
      }
    }, {
      test: /\.(gltf)$/i,
      loader: 'gltf-loader-2'
    }, {
      test: /\.(bin|gif|glb)(\?.*)?$/i,
      loader: 'file-loader',
      options: {
        name: path.posix.join('assets/models', '[name].[ext]')
      }
    }, {
      test: /\.(png|jpe?g|cube)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          name: path.posix.join('assets/images', '[name].png')
        }
      }, {
        loader: 'lut-loader'
      }]
    }]
  },

  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.ts', '.tsx', '.js', '.json'],
    mainFields: ['browser', 'module', 'main'],

    alias: {
      '@postprocessing': path.resolve('./node_modules/three/examples/jsm/postprocessing'),
      '@controls': path.resolve('./node_modules/three/examples/jsm/controls'),
      '@shaders': path.resolve('./node_modules/three/examples/jsm/shaders'),
      '@loaders': path.resolve('./node_modules/three/examples/jsm/loaders'),
      '@utils': path.resolve('./node_modules/three/examples/jsm/utils'),
      '@three': path.resolve('./node_modules/three/src'),
      '@': path.resolve('./src')
    }
  },

  plugins: [
    new MiniCssExtractPlugin({
			filename: 'main.css'
		}),

    new webpack.DefinePlugin({
      BROWSER_SUPPORTS_HTML5: true,
      PRODUCTION: JSON.stringify(build),
      VERSION: JSON.stringify(config.version),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    ...(build ? [
      new webpack.optimize.ModuleConcatenationPlugin()
    ] : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ])
  ],

  output: {
    globalObject: build ? 'typeof self !== \'undefined\' ? self : this' : 'window',
    libraryTarget: build ? 'umd' : 'var',
    library: build ? config.name : '',
    publicPath: build ? './' : '/',

    path: path.resolve('./build'),
    libraryExport: 'default',
    umdNamedDefine: true,
    filename: 'main.js'
  },

  optimization: {
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    removeEmptyChunks: true,
    namedModules: true,
    namedChunks: true,
    minimize: build,

    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        parallel: true,

        terserOptions: {
          toplevel: true,

          parse: {
            html5_comments: false
          },

          compress: {
            keep_infinity: true,
            drop_console: true
          },

          output: {
            comments: false
          }
        }
      })
    ]
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
