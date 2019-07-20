const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      path: path.resolve(__dirname, './build')
    })
  ],
  devServer: {
    open: true
  }
}
