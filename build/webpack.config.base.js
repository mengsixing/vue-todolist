const path = require('path');

let config = {
  target:'web',
  entry: path.join(__dirname, 'client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist'),
    publicPath: 'http://127.0.0.1:9001/'
  },
  module: {
    rules: [{
        enforce: 'pre',
        loader: 'eslint-loader',
        test: /\.(jsx|js|vue)$/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'resource/[path][name]-[hash:8].[ext]'
          }
        }]
      }
    ]
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   },
  //   runtimeChunk:true,
  // },
};
module.exports = config;
