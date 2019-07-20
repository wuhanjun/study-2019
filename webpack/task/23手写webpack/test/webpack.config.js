const path = require('path')
const TapParsePlugin = require('./plugins/tapParse')
const TapOtherPlugin = require('./plugins/tapOther')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  rules: [
    {
      test: /.less/,
      use: [
        path.resolve(__dirname, './loaders', 'style-loader'),
        path.resolve(__dirname, './loaders', 'less-loader')
      ]
    }
  ],
  plugins: [
    new TapParsePlugin(),
    new TapOtherPlugin()
  ]
}
