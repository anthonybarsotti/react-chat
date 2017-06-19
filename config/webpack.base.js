
// Dependencies

const path = require('path');
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
      extensions: [
        '.js',
        '.jsx',
        '.css',
      ],
    },
    target: 'web',
    plugins: plugins.concat([
      new ExtractTextPlugin('[name].css'),
    ]),
    devtool,
  };
};
