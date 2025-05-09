const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
  entry: {
    app: './js/app.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: './js/app.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][hash][ext]',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminGenerate,
        options: {
          plugins: [
            ['webp', {quality: 100}]
          ],
        },
      },
      generator: [
        {
          preset: 'webp',
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: ['imagemin-webp'],
          },
          filename: 'img/[name][hash][ext]',
          test: /\.(jpe?g|png)/i,
        },
      ],
    }),
  ],
};
