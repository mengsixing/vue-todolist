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
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
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
  ]
}

if (isDev) {
  // 开发环境
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

  // 打包css到js中
  config.module.rules.push({
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      'less-loader'
    ]
  });
  

} else {
  // 生产环境
  config.mode = 'production';
  config.output.filename = '[name]-[hash:8].js';
  config.optimization = {
    splitChunks: {
      chunks: 'all'
    }
  };
  // 单独打包css
  config.plugins.push(new MiniCssExtractPlugin({
    filename: "[name]-[hash:8].css",
    chunkFilename: "[id].css"
  }));
  config.module.rules.push({
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      "css-loader",
      'postcss-loader',
      'less-loader'
    ]
  });
}

module.exports = config;
