const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.css/,
        use: [path.resolve(__dirname, 'loaders', 'style-loader'), path.resolve(__dirname, 'loaders', 'css-loader')]
      }
    ]
  }
}
