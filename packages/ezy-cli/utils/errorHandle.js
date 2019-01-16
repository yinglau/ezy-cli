const chalk = require('chalk')

function error (msg) {
  console.log(
    chalk.white.bgRed(msg)
  )
}

module.exports = {
  error
}
