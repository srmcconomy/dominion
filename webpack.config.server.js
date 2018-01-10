const path = require('path');
const babelConfigNode = require('./babel.config').node;
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: {
    app: [
      './src/server/server.js',
    ],
    'tests.test': [
      './src/tests/server/tests.js',
    ]
  },
  externals: [nodeExternals()],
  target: 'node',
  devtool: 'source-map',
  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfigNode,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src/server'), path.resolve(__dirname, 'src/shared'), 'node_modules'],
  },
};
