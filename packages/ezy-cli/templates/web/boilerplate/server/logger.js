const chalk = require('chalk');

const error = (msg) => console.error(chalk.white.bgred(msg));
const info = (msg) => console.log(chalk.blue(msg));
const success = (msg) => console.log(chalk.green(msg));

module.exports = logger = {
  error,
  info,
  success,
};
