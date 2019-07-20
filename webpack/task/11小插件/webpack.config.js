const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

// the path(s) that should be cleaned
let pathsToClean = [
  'dist',
  'build'
]

// the clean options to use
let cleanOptions = {
  exclude: ['shared.js'],
  verbose: true
}

module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index'
  },
  // 为什么source-map文件在network中看不到？
  // devtool: 'source-map', // 生成一个 大而全的独立的source-map 文件.
  // devtool: 'eval-source-map', // 将source-map信息打包在同一个文件中，为DataUrl形式
  devtool: 'cheap-module-source-map', // 生成一个没有列信息的source-map文件，滴滴用于生产环境
  // devtool: 'cheap-module-eval-source-map', // 生成一个没有列信息的source-map文件，滴滴用于开发环境
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/templates/index.html'
    }),
    new webpack.BannerPlugin({
      banner: '在这里可以插入版本信息，打包时间，作者信息等，hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
    }),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new CopyWebpackPlugin([
      { from: 'doc', to: 'doc' }
    ])
  ],
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  devServer: {
    contentBase: path.join(__dirname, './build')
    // compress: true,
    // port: 9000
  }
}
