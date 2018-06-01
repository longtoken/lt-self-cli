'use strict';

let path = require('path');

let webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let baseConfig = require('./base');
let defaultSettings = require('./default');

let devConfig = {
  //mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    path.join(__dirname, '../src/index.jsx'),
  ],
  output: {
    path: path.join(__dirname, 'dev'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html')
    }),

    new webpack.HotModuleReplacementPlugin(),

    new MiniCssExtractPlugin({
      filename: `${defaultSettings.publicPath}css/[name].[contenthash].css`,
      chunkFilename: `${defaultSettings.publicPath}css/[id].[contenthash].css`
    }),

    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
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
  devServer: {
    /*proxy: {
     '/': {
     target: 'http://localhost:7777',
     secure: false
     }
     },*/
    host: '127.0.0.1',
    port: defaultSettings.port,
    disableHostCheck: true, // 为了手机可以访问
    contentBase: '../dev', // 本地服务器所加载的页面所在的目录
    historyApiFallback: true, // 为了SPA应用服务
    inline: true, //实时刷新
    hot: true  // 使用热加载插件 HotModuleReplacementPlugin
  }
};


module.exports = merge(baseConfig, devConfig);
