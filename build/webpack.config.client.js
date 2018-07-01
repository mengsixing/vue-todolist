const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const VueClientPlugin = require('vue-server-renderer/client-plugin');

const baseConfig = require('./webpack.config.base.js');
const isDev = process.env.NODE_ENV === 'development';

// 客户端公用的plugin
const defaultPlugins = [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'template.html')
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
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
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
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      historyApiFallback: {
        index: '/public/index.html'
      },
    },
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
    ])
  });
} else {
  config = merge(baseConfig, {
    mode: 'production',
    entry: path.join(__dirname, '../client/index.js'),
    output: {
      filename: '[name]-[hash:8].js',
      publicPath:'public'
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
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true,
    },

    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: '[name]-[hash:8].css'
      }),
      new webpack.NamedChunksPlugin()
    ]),

  });
}

console.log(config);

module.exports = config;
