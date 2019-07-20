const path = require('path')
const TsukuyomiPlugin = require('@dx/tsukuyomi/plugin/webpack')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new TsukuyomiPlugin()
  ]
}
