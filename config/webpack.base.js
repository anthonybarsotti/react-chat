
// Dependencies

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function({
  plugins,
  devtool,
}) {
  return {
    entry: path.join(process.cwd(), 'client', 'scripts', 'app.js'),
    output: {
      path: path.join(process.cwd(), 'build'),
      filename: 'app.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                },
              },
              'postcss-loader',
            ],
          }),
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          loader: 'file-loader',
          query: {
            name: 'images/[name].[ext]',
          },
        },
      ],
    },
    resolve: {
      modules: [
        'node_modules',
      ],
    },
    target: 'web',
    plugins: plugins.concat([
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
      new ExtractTextPlugin('[name].css'),
    ]),
    devtool,
  };
};
