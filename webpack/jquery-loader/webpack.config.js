const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  // externals: {
  //   jquery: 'window.$'
  // },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        // test: /\.js$/,
        // use: [
        //   {
        //     loader: 'babel-loader',
        //     options: {
        //       presets: [['@babel/preset-env', {
        //         // useBuiltIns: 'usage', // 会污染全局环境。
        //         // corejs: 3
        //       }]],
        //       plugins: [
        //         [
        //           '@babel/plugin-transform-runtime',
        //           {
        //             'absoluteRuntime': false,
        //             'corejs': 3, // 支持includes，并且不污染全局环境
        //             'helpers': true,
        //             'regenerator': true,
        //             'useESModules': false
        //           }
        //         ]
        //       ]
        //     }
        //   }
        // ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}
