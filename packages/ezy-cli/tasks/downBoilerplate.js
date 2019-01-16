const path = require('path')
const chalk = require('chalk')
const invariant = require('invariant')
const { error } = require('../utils/errorHandle')
const { execSync, exec } = require('child_process')
const ora = require('ora')
const shell = require('shelljs')

const BOILERPLATE_REPOS = require('../constants/boilerplate')

async function downBoilerplateFromGit () {
  checkGit()
  checkNpm()

  await cloneRepos()
  await installDependenices()

  try {
    shell.rm('-rf', '.git')
  } catch (e) {
    error(e)
    process.exit(1)
  }
}

function cloneRepos () {
  const downBoilerplateSpiner = ora('clone source from git...').start()
  return new Promise((resolve, reject) => {
    exec(`git clone ${BOILERPLATE_REPOS}`, (err, stdout, stderr) => {
      if (err) {
        shell.rm('-rf', path.join(process.cwd(), 'react-stack'))
        downBoilerplateSpiner.fail()
        error(err)
        reject(err)
      } else {
        shell.mv(path.join(process.cwd(), 'react-stack', '*'), './')
        shell.rm('-rf', path.join(process.cwd(), 'react-stack'))
        downBoilerplateSpiner.succeed()
        resolve()
      }
    })
  })
}

function installDependenices () {
  const installDependenicesSpiner = ora('install the project dependencies...').start()
  return new Promise((resolve, reject) => {
    exec('npm install', err => {
      if (err) {
        shell.rm('-rf', path.join(process.cwd(), 'node_modules'))
        installDependenicesSpiner.fail()
        error(err)
        reject(err)
      } else {
        installDependenicesSpiner.succeed()
        resolve()
      }
    })
  })
}

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

module.exports = downBoilerplateFromGit
