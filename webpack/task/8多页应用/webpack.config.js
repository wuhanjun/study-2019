const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    // 多入口就需要对象来配置
    home: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].[hash:4].js',
    path: path.resolve(__dirname, './build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'home2.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      filename: 'other2.html',
      chunks: ['other']
    })
  ]
}
