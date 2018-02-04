
// Dependencies
const path = require('path');

module.exports = function generateConfig({
  devtool,
  plugins,
}) {
  return {
    entry: [path.join(process.cwd(), 'client', 'scripts', 'app.js')],
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
    devtool,
    plugins,
  };
};
