
const webpack = require('webpack');
const generateConfig = require('./webpack.base');

module.exports = generateConfig({
  plugins: [],
  devtool: 'eval-source-map',
});
