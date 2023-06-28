const fs = require('fs');
const ini = require('ini');
const path = require('path');

const configPath = path.resolve(__dirname, 'cfg.ini');

function getConfig() {
  const configData = fs.readFileSync(configPath, 'utf-8');
  const config = ini.parse(configData);
  return config.Server;
}

module.exports = { getConfig };
