const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode:'development',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist')
  },
  module:{
    rules:[
      {
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
        test:/\.(png|svg|jpg|jpeg)$/,
        use:[
          {
            loader:'url-loader',
            options:{
              limit:1024,
            }
          }
        ]
      }
    ],
  },
  plugins: [new VueLoaderPlugin()]
}
