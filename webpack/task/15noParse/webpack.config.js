const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    noParse: /jquery|lodash/, // noParse选项用于webpack打包时候，如果遇到该库，不去解析其是否有相关依赖，这样可以加快打包速度
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, './src')], // 加上这两项会减少大量打包时间
        exclude: [path.resolve(__dirname, './node_modules')],
        use: ['babel-loader']
      }
    ]
  },
  plugins: []
}
