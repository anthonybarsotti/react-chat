
// Dependencies

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const generateConfig = require('./webpack.base');

module.exports = generateConfig({
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'client', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: false,
      },
    }),
    new UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
  devtool: 'source-map',
});
