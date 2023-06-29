const fs = require('fs');
const ini = require('ini');
const path = require('path');

const configPath = path.resolve(__dirname, 'cfg.ini');
const configData = fs.readFileSync(configPath, 'utf-8');
const config = ini.parse(configData);

module.exports = config;
