const path = require('path');
const express = require('express');
const fs = require('fs');
const invariant = require('invariant');
const logger = require('./logger');
const chalk = require('chalk');

const app = express();
const ip_address = require('../utils/ip')

invariant(
  fs.existsSync(path.resolve('build')),
  // logger.error('打包文件不存在，请打包后再启动服务。')
  chalk.bgRed.white('未检测到打包文件，请打包后在启动服务。')
);

app.use(express.static('build'));

app.get('*', (req, res) => {
  fs.readFile(path.join('build', 'index.html'), (err, file) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(file.toString());
    }
  });
});

const host = 'localhost';
const port = '8000';

// Start app.
app.listen(port, host, async err => {
  if (err) {
    return logger.error(err.message);
  }
  logger.success(
`
========================================================
      Application has already start
      open you broswer and input http://${host}:${port}
      your network ip address http://${ip_address}:${port}
========================================================
`
  );
});
