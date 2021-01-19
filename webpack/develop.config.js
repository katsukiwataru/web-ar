const webpack = require('webpack');
const path = require('path');
const ip = require('ip');
const { merge } = require('webpack-merge');
const base = require('./base.config');

const root = path.resolve(__dirname, '../');

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    open: true,
    openPage: '',
    contentBase: path.resolve(root, 'dist'),
    watchContentBase: true,
    host: ip.address(),
    port: 3000,
    historyApiFallback: true,
  },
  optimization: {
    minimize: true,
    minimizer: [],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MODE: JSON.stringify('development'),
      },
    }),
  ],
});
