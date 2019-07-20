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
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
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
  resolve: {
    // 这个选项用于如何解析文件
    modules: ['./node_modules'], // 在这里配置node_modules，说明只去当前路径下的node_modules中去找，避免一层一层网上找
    alias: { // 别名，缩写代码中引入的模块名。
      bootstrap: 'bootstrap/dist/css/bootstrap.css'
    },
    extensions: ['.js', '.jsx', '.json', '.css', '.less'] // 用于解析文件路径时候自动带上拓展名。不过感觉会增加webpack负担，还是写明确比较好。
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: /node_modules/
  },
  devServer: {
    contentBase: path.join(__dirname, './build'),
    proxy: { // 同源策略只存在于客户端，跨域原理就是由node层转发请求。
      // '/api': 'http://localhost:3000' // 可以直接写路径
      // '/api': {
      //   target: 'http://localhost:3000',
      //   // 这个功能作用于当后端接口没有统一的接口格式时，在请求中统一加上某一前缀，
      //   // 然后由webpack的node层拦截，真实请求中会去掉这个前缀。
      //   pathRewrite: {'^/api': ''}
      // },
    },
    // 前端mock接口
    before: (app, server) => {
      console.log('')
      app.get('/user', (req, res) => {
        console.log(2312323)
        res.json({
          a: '前端mock接口'
        })
      })
    }
    // 还有一种跨域解决办法是webpack-dev-middleware，这个不是很清楚。
    // compress: true,
    // port: 9000
  }
}
