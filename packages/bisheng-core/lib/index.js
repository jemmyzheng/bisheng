const fs = require('fs');
const path = require('path');
const dora = require('dora');
const getConfig = require('./utils/get-config');

exports.start = function start(program) {
  const bishengLib = `${__dirname}${path.sep}`;
  const indexPath = `${process.cwd()}${path.sep}index.html`;
  if (!fs.existsSync(indexPath)) {
    fs.createReadStream(`${bishengLib}template.html`)
      .pipe(fs.createWriteStream(indexPath));
  }

  const configFile = program.config || `${process.cwd()}/bisheng.config.js`;
  const config = getConfig(configFile);
  dora({
    port: config.port,
    plugins: [
      'webpack?disableNpmInstall',
      `${bishengLib}dora-plugin-bisheng?config=${configFile}`,
      'browser-history',
    ],
  });
};
