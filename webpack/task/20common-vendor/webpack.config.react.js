const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    react: ['react', 'react-dom']
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, './build'),
    // library: 'aaa', // 如果只设置library，意思就是立即执行函数返回的入口文件导出值赋值为一个叫aaa的变量
    library: '_dll_[name]',
    // libraryTarget: 'commonjs' // 如果不设置，那就是var aaa = (() =>{})()；
    // libraryTarget: 'commonjs'// 设置了commonjs，就是exports.aaa = (() => {})()
    // libraryTarget: 'umd' // 如果是umd，就会在外面再套一层立即执行函数，分别在module.exports、window、exports、define上都赋值上入口js导出值
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]', // name === library
      path: path.resolve(__dirname, 'build', 'manifast.json')
    })
  ]
}
