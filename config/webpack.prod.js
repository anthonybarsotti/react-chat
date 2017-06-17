
const webpack = require('webpack');
const generateConfig = require('./webpack.base');

module.exports = generateConfig({
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
  devtool: 'source-map',
});
