const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

console.log(MiniCssExtractPlugin.loader)

module.exports = {
  mode: 'production', // js文件会被自动压缩
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js', // 每次打包生成的js如果文件有变化，那么hash值就会变化。8代表hash值为8位
    path: path.resolve(__dirname, './build') // 为什么必须是绝对路径
  },
  devServer: {
    contentBase: './build',
    port: 3000,
    progress: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index2.html',
      minify: {
        collapseWhitespace: true, // 删除html中的空格
        removeAttributeQuotes: true // 删除html标签属性中可删除的引号
      },
      hash: true // 给打包进html中的静态资源加上hash query
    }),
    new MiniCssExtractPlugin()
  ],
  module: { // 模块
    rules: [ // 规则
      // loader的特点：单一
      // 用法：可以用数组(多个loader)，字符串(单个loader)，对象(用于传参)
      // 默认从右向左执行
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'// 这个loader用于加浏览器前缀。但是我们需要用到一个插件来帮我们加前缀，这个插件在postcss.config.js中引入
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  // 优化项
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ // 压缩插件压缩的必须压缩是es5的代码，如果是const之类的代码，就会报错。
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
      // 用了这个插件压缩css之后，根据production模式自动压缩的js会恢复成未压缩的状态，
      // 所以需要加一个插件来做js压缩
    ]
  }
}
