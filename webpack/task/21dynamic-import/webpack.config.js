const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Happypack = require('happypack')

module.exports = {
  mode: 'production',
  // 生产环境中会自动开启scope hosting 作用域提升(也就是减少了模块依赖，减少了函数声明)，
  // 不过必须使用import语法，因为require能动态引入模块，不确定性较大。
  // 同时也会自动启用tree-shaking，不打包未使用的代码。
  entry: {
    index: './src/index.js',
    other: './src/test.js'
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  optimization: {
    splitChunks: {
      // automaticNameDelimiter: '=',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          priority: 1, // 优先级，权重较高，目的是避免第三方模块被打包到common中
          minSize: 0,
          minChunks: 1,
          chunks: 'initial'
        },
        common: {
          minSize: 0,
          minChunks: 2,
          priority: -20,
          chunks: 'initial'
        }
      }
    }
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
          presets: ['@babel/preset-react'],
          plugins: ['@babel/plugin-syntax-dynamic-import']
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
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, './build/manifast.json')
    // })
    // new webpack.IgnorePlugin(/\.\/locale/, /moment/) // 但是目前看来，并没有将所有语言文件打包进bundle.js中
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'build'),
    open: true
  }
}
