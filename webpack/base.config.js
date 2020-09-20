const path = require('path');
// const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
// const styledComponentsTransformer = createStyledComponentsTransformer();
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const root = path.resolve(__dirname, '../');

// const copyRules = [
//   {
//     from: path.resolve(root, 'src/assets'),
//     to: path.resolve(root, 'dist/'),
//   },
// ];

module.exports = {
  entry: path.resolve(root, 'src/index.tsx'),
  output: {
    path: path.resolve(root, 'dist'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].[hash].bundle.js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(root, 'src/index.html'),
    }),
    // new CopyWebpackPlugin(copyRules),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
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
