
// Dependencies

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const generateConfig = require('./webpack.base');

module.exports = generateConfig({
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(process.cwd(), 'client', 'index.html'),
    }),
  ],
  devtool: 'eval-source-map',
});
