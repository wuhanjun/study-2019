const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
console.log(require('./config/manifest.json'))
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template.html'
    }),
    // webpack在打包业务代码的时候，会通过这个插件参考是否有已经打包在vendor中的模块。
    // 如果存在就不会将代码打包进去而是通过一个统一的name(这个name在这里就是下面的name)来引入模块。
    // "dll-reference vendor":
    // no static exports found */
    // (function(module, exports) { // name: vendor
    // eval("module.exports = vendor;\n\n//# sourceURL=webpack:///external_%22vendor%22?");
    // })
    // 例如在index.js
    new webpack.DllReferencePlugin({
      manifest: require('./config/manifest.json'),
      name: 'vendor'
    })
  ]
}
