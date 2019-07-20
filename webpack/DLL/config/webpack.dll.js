const webpack = require('webpack')
const path = require('path')

// 打包完第三方依赖后，我就要去打包我的业务代码，这个时候就需要让业务代码知道不要再去打包哪些第三方模块了
// 直接从打包好的vendor.js里面去取就可以了。
// 所以，我需要在这里打包第三方依赖的时候，生成一份说明文件manifest.json，来让webpack在打包业务代码的时候
// 知道打包哪些模块需要从vendor里面取而不是重新打包，否则的话，打出来的包还是会很大，会包含那些第三方模块。
module.exports = {
  mode: 'development',
  entry: {
    vendor: ['sum']
  },
  output: {
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd' // 将入口文件的返回值以什么类型的方式导出，umd比较全，包括amd、cmd、window
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, './manifest.json')
    })
  ]
}
