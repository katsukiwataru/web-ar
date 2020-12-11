const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
// const styledComponentsTransformer = createStyledComponentsTransformer();

const ROOT_PATH = path.resolve(__dirname, '../');
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

const copyRules = [
  { from: path.resolve(ROOT_PATH, 'data'), to: path.resolve(ROOT_PATH, 'dist/data') },
  { from: path.resolve(ROOT_PATH, 'fonts'), to: path.resolve(ROOT_PATH, 'dist/fonts') },
];

module.exports = {
  entry: path.resolve(ROOT_PATH, 'src', 'index.tsx'),
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[hash].bundle.js',
    publicPath: PUBLIC_PATH,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all', // initial
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_PATH, 'src', 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new CopyPlugin({ patterns: copyRules }),
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            // options: {
            //   getCustomTransformers: () => ({ before: [styledComponentsTransformer] }),
            // },
          },
        ],
      },
    ],
  },
};
