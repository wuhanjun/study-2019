const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build') // 为什么必须是绝对路径
  },
  devServer: {
    contentBase: './build',
    port: 3000,
    progress: true,
    open: true
  }
}
