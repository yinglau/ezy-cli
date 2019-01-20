const path = require('path')
const { error } = require('../utils/errorHandle')
const { exec } = require('child_process')
const ora = require('ora')
const shell = require('shelljs')

const { checkGit, checkNpm } = require('../utils/checkEnv')
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

module.exports = downBoilerplateFromGit
