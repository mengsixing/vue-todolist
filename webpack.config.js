const path = require('path');
const {
  VueLoaderPlugin
} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development';

const config = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
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
  config.mode = 'development';
  config.devServer = {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9001,
    hot:true,
  };
  // 热启动配置
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.DefinePlugin({
    isDev: true,
  }));
  
}


module.exports = config;
