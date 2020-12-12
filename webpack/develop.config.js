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
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000', // local api server
    //   },
    // },
    // see https://stackoverflow.com/a/43647767/11628801
  },
  optimization: {
    minimize: true,
    minimizer: [],
  },
});
