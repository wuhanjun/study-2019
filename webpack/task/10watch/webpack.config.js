const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index.js'
  },
  // 为什么source-map文件在network中看不到？
  // devtool: 'source-map', // 生成一个 大而全的独立的source-map 文件.
  // devtool: 'eval-source-map', // 将source-map信息打包在同一个文件中，为DataUrl形式
  devtool: 'cheap-module-source-map', // 生成一个没有列信息的source-map文件，常用于错误上报
  // devtool: 'cheap-module-eval-source-map', // 生成一个没有列信息的source-map文件，常用于错误上报
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build')
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/templates/index.html'
  })],
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    // compress: true,
    // port: 9000
  }
}
