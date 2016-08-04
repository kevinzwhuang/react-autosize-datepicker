var webpack = require('webpack')

module.exports = {
  entry: './src/datepicker',
  output: {
    libraryTarget: 'umd',
    library: 'AutosizeDatePicker',
    path: './dist/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}
