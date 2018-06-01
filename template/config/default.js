'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '../src');
const port = 8010;
console.log(`srcPath--${srcPath}`);
module.exports = {
  srcPath: srcPath,
  publicPath: 'static/',
  port: port,
};
