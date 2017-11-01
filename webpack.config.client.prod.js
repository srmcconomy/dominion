const babelConfigClientProd = require('./babel.config').clientProd;
const config = require('./config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.config.client.common');

module.exports = merge(common, {
  entry: {
    app: [
      './src/client/client.jsx',
    ],
  },
  output: {
    chunkFilename: '[name].chunk.js',
    filename: '[name].js',
    path: config.clientOutputPath,
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { modules: true } },
            { loader: 'sass-loader' },
          ],
        }),
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfigClientProd,
        },
      }, {
        test: /(\.svg$|\.otf$|\.ttf$|\.png$)/,
        use: {
          loader: 'file-loader',
        }
      }
    ],
  },
});
