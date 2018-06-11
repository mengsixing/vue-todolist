const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
  VueLoaderPlugin
} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development';

const config = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename:'[name]-[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          'postcss-loader',
          'less-loader'
        ]
        // use: [
          
        //   'style-loader',
        //   'css-loader',
          
        //   'less-loader'
        // ]
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
          }
        }]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
}

if (isDev) {
  config.mode = 'development';
  config.devServer = {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9001,
    hot: true,
  };
  // 热启动配置
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.DefinePlugin({
    isDev: true,
  }));
} else {
  config.mode = 'production';
  config.optimization = {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  }
}


module.exports = config;