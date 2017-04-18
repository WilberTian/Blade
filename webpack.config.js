var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules:[{
          test:/\.js$/,
          loader:"babel-loader",
          options:{presets: ["stage-0"]},
          exclude:path.resolve(__dirname,'node_modules'),
          include:path.resolve(__dirname,'src')
    }]
  }
};