var path = require('path');
var webpack = require('webpack');

module.exports = {
  target: 'node',
  devtool: 'eval-source-map',
  context: __dirname + "/src",
  entry: {
    app: './index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules:[{
          test: /\.js$/,
          loader: "babel-loader",
          options: { presets: ["es2015", "stage-0"] },
          exclude: path.resolve(__dirname,'node_modules'),
          include: path.resolve(__dirname,'src')
    }]
  }
};