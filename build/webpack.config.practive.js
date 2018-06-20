
const path = require('path');
const {
	VueLoaderPlugin
} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.config.base.js');

// 客户端公用的plugin
const defaultPlugins = [
	new VueLoaderPlugin(),
	new HtmlWebpackPlugin({
    template:path.join(__dirname,'template.html')
  }),
];

const config = merge(baseConfig, {
  mode: 'development',
  entry: path.join(__dirname, '../practice/index.js'),
  module: {
    rules: [{
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader',
        'less-loader'
      ]
    }]
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9001,
    hot: true,
  },
  resolve: {
    alias: {
      vue: path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js'),
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      isDev: true,
    }),
  ])
});

module.exports = config;
