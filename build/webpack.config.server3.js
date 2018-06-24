const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin');

const baseConfig = require('./webpack.config.base.js');


const config = merge(baseConfig, {
  target: 'node',
  mode: 'development',
  entry: path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [{
      test: /\.less$/,
      use: ExtractPlugin.extract({
        fallback: 'vue-style-loader',
        use: ['css-loader',
          'postcss-loader',
          'less-loader'
        ],
      })
    }]
  },
  plugins: [
    // new MiniCssExtractPlugin({
    //   filename: '[name]-[hash:8].css',
    //   chunkFilename: '[name]-[hash:8].css'
    // }),
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      isDev: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
});

module.exports = config;
