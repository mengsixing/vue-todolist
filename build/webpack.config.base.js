const path = require('path');

let config = {
  entry: path.join(__dirname, 'client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [{
        enforce: 'pre',
        loader: 'eslint-loader',
        test: /\.(jsx|js|vue)$/
      },asd
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
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
  }
};
module.exports = config;
