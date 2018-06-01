'use strict';

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

const allowedEnvs = ['dev', 'build'];

let env;
if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}
console.log(env);

function buildConfig(wantedEnv) {
  let isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  let validEnv = isValid ? wantedEnv : 'dev';
  let config = require(path.join(__dirname, `config/${validEnv}`));
  return config;
}

module.exports = buildConfig(env);