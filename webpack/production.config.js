const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const base = require('./base.config');

module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: 'all',
        terserOptions: {
          compress: { drop_console: true },
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        MODE: JSON.stringify('production'),
      },
    }),
  ],
});
