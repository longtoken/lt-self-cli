'use strict';

let path = require('path');
let webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let baseConfig = require('./base');
let defaultSettings = require('./default');

let buildConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  entry: path.join(__dirname, '../src/index.jsx'),
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: `${defaultSettings.publicPath}js/[name].[chunkhash:8].js`
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      }
    }
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(['dist'], {root: path.join(__dirname, '..')}),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      title: '开发模式',
      filename: 'index.html',
      favicon: 'favicon.ico',
      template: 'index.html',
      inject: 'body',
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
    }),

    new MiniCssExtractPlugin({
      filename: `${defaultSettings.publicPath}css/[name].[contenthash].css`,
      chunkFilename: `${defaultSettings.publicPath}css/[id].[contenthash].css`
    }),

    /*new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify("production")
      }
    }),*/
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src/static/styles'),
        use: [
          ...([MiniCssExtractPlugin.loader]),
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              minimize: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: true}
          },
          {
            loader: "sass-loader",
            options: {sourceMap: true}
          }
        ]
      },

      {
        test: /\.scss$/,
        include: path.resolve(__dirname, '../src/components'),
        use: [
          ...([MiniCssExtractPlugin.loader]),
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              minimize: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: true}
          },
          {
            loader: "sass-loader",
            options: {sourceMap: true}
          }
        ]
      }
    ]
  },
};

module.exports = merge(baseConfig, buildConfig);
