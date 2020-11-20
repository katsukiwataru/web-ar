const path = require('path');
const webpack = require('webpack');
const ip = require('ip');
const { merge } = require('webpack-merge');
const base = require('./base.config');

const root = path.resolve(__dirname, '../');

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
  devtool: 'source-map',
  devServer: {
    open: true,
    openPage: '',
    contentBase: path.resolve(root, 'dist'),
    watchContentBase: true,
    host: ip.address(),
    port: 3000,
    historyApiFallback: true,
    // see https://stackoverflow.com/a/43647767/11628801
  },
  optimization: {
    minimize: true,
    minimizer: [],
  },
});