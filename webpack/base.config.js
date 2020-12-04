const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const webpack = require('webpack');
// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
// const styledComponentsTransformer = createStyledComponentsTransformer();
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ROOT_PATH = path.resolve(__dirname, '../');
const ASSET_PATH = process.env.ASSET_PATH || '/';

const copyRules = [
  { from: path.resolve(ROOT_PATH, 'data'), to: path.resolve(ROOT_PATH, 'dist/data') },
  { from: path.resolve(ROOT_PATH, 'fonts'), to: path.resolve(ROOT_PATH, 'dist/fonts') },
];

module.exports = {
  entry: path.resolve(ROOT_PATH, 'src/index.tsx'),
  output: {
    path: path.resolve(ROOT_PATH, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[hash].bundle.js',
    publicPath: ASSET_PATH,
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
      template: path.resolve(ROOT_PATH, 'src/index.html'),
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new CopyPlugin({ patterns: copyRules }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        ASSET_PATH: JSON.stringify(ASSET_PATH),
      },
    }),
    // new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
};
