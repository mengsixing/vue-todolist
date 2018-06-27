
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
	VueLoaderPlugin
} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const VueClientPlugin = require('vue-server-renderer/client-plugin');

const baseConfig = require('./webpack.config.base.js');
const isDev = process.env.NODE_ENV === 'development';

console.log('是dev吗？',isDev);

// 客户端公用的plugin
const defaultPlugins = [
	new VueLoaderPlugin(),
	new HtmlWebpackPlugin({
    template:path.join(__dirname,'template.html')
  }),
  new VueClientPlugin()
];

let config;
if (isDev) {
	config = merge(baseConfig, {
		mode: 'development',
		entry: path.join(__dirname, '../client/index.js'),
		module: {
			rules: [{
				test: /\.less$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'postcss-loader',
					'less-loader'
				]
			}]
		},
		devServer: {
			port: 9001,
      hot: true,
      overlay: {
        errors: true
      },
      headers: { 'Access-Control-Allow-Origin': '*' },
      historyApiFallback: true,
		},
		plugins: defaultPlugins.concat([
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				isDev: true,
			}),
		])
	});
} else {
	config = merge(baseConfig, {
		mode: 'production',
		entry: path.join(__dirname, '../client/index.js'),
		output: {
			filename: '[name]-[hash:8].js'
		},
		module: {
			rules: [{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'less-loader'
				]
			}]
		},

		plugins: defaultPlugins.concat([
			new MiniCssExtractPlugin({
				filename: '[name]-[hash:8].css',
				chunkFilename: '[name]-[hash:8].css'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
      new webpack.NamedChunksPlugin()
    ]),

	});
}

module.exports = config;
