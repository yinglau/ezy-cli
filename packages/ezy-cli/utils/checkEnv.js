const { execSync } = require('child_process')
const chalk = require('chalk')
const invariant = require('invariant')

function canUseGit () {
  try {
    execSync('git --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

function canUseNpm () {
  try {
    execSync('npm --version', { stdio: 'ignore' })
    return true
  } catch (e) {
    return false
  }
}

function checkGit () {
  invariant(
    canUseGit(),
    chalk.white.bgRed(`Sure you have already install Git.`)
  )
}

function checkNpm () {
  invariant(
    canUseNpm(),
    chalk.white.bgRed(`Sure you have already install Npm.`)
  )
}

module.exports = {
  checkGit,
  checkNpm
}
