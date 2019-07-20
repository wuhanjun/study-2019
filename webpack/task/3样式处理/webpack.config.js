const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development', // js文件会被自动压缩
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
      hash: true // 给打包进html中的js加上hash query
    })
  ],
  module: { // 模块
    rules: [ // 规则
      // loader的特点：单一
      // 用法：可以用数组(多个loader)，字符串(单个loader)，对象(用于传参)
      // 默认从右向左执行
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insertAt: 'top'
          //   } // 如果有需要这里可以穿参数
          // },
          'css-loader'
        ]
      },
      {
        test: /\.png$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insertAt: 'top'
          //   } // 如果有需要这里可以穿参数
          // },
          'file-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insertAt: 'top'
            } // 如果有需要这里可以穿参数
          },
          'css-loader',
          'less-loader'
        ]
      }
    ]
  }
}
