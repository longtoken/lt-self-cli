'use strict';
let path = require('path');
let defaultSettings = require('./default');

let config = {
  context: defaultSettings.srcPath,//path.resolve(__dirname, '../src'),

  target: 'web',

  resolve: {
    modules: [
      'node_modules',
      defaultSettings.srcPath
    ],

    extensions: ['.web.js', '.js', '.json', '.jsx', '.scss'], // 能够使用户在引入模块时不带扩展

    alias: {
      components: path.join(__dirname, '../src/components/'),
      containers: path.join(__dirname, '../src/containers/'),
      static: path.join(__dirname, `../src/${defaultSettings.publicPath}`),
    }
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        enforce: 'pre',
        use: [{
          loader: 'eslint-loader',
          options: { fix: true }
        }],
        include: path.resolve(__dirname, '../src/**/*.js'),
        exclude: /node_modules/
      }, {
        test: /\.js[x]?$/,
        use: [{
          loader: 'babel-loader',
        }],
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif|bmp)/i,
        use: [
          `url-loader?limit=5000&name=${defaultSettings.publicPath}images/[hash:8].[name].[ext]`
        ],
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      /*{
       test: /\.(jpg|jpeg|png|svg|gif|bmp)/i,
       use: [
       'url-loader?limit=5000&name=img/[name].[sha512:hash:base64:8].[ext]',
       'image-webpack-loader?{pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
       ],
       include: path.resolve(__dirname, '../src/styles')
       },
       {
       test: /\.(woff|woff2|ttf|eot)($|\?)/i,
       use: [
       'url-loader?limit=5000&name=fonts/[name].[sha512:hash:base64:8].[ext]'
       ]
       },*/
    ]
  },
};

module.exports = config;