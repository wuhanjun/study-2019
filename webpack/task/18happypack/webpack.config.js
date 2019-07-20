const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Happypack = require('happypack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js'
  },
  module: {
    noParse: /jquery|lodash|moment/, // noParse选项用于webpack打包时候，如果遇到该库，不去解析其是否有相关依赖，这样可以加快打包速度
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, './src')], // 加上这两项会减少大量打包时间
        exclude: [path.resolve(__dirname, './node_modules')],
        use: 'happypack/loader?id=js'
      },
      {
        test: /\.css/,
        use: 'happypack/loader?id=css'
      }
    ]
  },
  plugins: [
    new Happypack({
      // 用于开启多个线程来进行打包，默认三个。在项目大大时候可以看到加快打包速度，
      // 项目小大时候看不出来，而且打包速度还会增加，因为开启线程也需要时间
      id: 'js',
      loaders: [{
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react']
        }
      }]
    }),
    new Happypack({
      id: 'css',
      loaders: ['style-loader', 'css-loader']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'lala.html'
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, './build/manifast.json')
    })
    // new webpack.IgnorePlugin(/\.\/locale/, /moment/) // 但是目前看来，并没有将所有语言文件打包进bundle.js中
  ],
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    open: true
  }
}
