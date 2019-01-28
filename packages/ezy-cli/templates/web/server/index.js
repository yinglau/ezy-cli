const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
// const getPort = require('get-port');

const logger = require('./logger');
const webpackCfg = require('../internals/webpack/webpack.dev.config');
const app = express();
const compiler = webpack(webpackCfg);
const ip_address = require('../utils/ip')

const devMiddleware = webpackDevMiddleware(compiler, {
  logLevel: 'warn',
  publicPath: webpackCfg.output.publicPath,
  silent: true,
  stats: 'errors-only',
});

app.use(devMiddleware);
app.use(webpackHotMiddleware(compiler));

const fs = devMiddleware.fileSystem;

app.get('*', (req, res) => {
  fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
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
