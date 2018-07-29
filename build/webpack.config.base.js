const path = require('path');
const {
  VueLoaderPlugin
} = require('vue-loader');

let config = {
  target:'web',
  entry: path.join(__dirname, 'client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../public'),
    publicPath: 'http://127.0.0.1:9001/public/'
  },
  module: {
    rules: [{
        enforce: 'pre',
        loader: 'eslint-loader',
        test: /\.(jsx|js|vue)$/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // enable CSS extraction
          extractCSS: true
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
  },
  plugins:[
    new VueLoaderPlugin()
  ]
};
module.exports = config;
