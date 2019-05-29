const path = require('path')
const { error } = require('../utils/errorHandle')
const { exec } = require('child_process')
const ora = require('ora')
const shell = require('shelljs')
const fs = require('fs')
const chalk = require('chalk')
const invariant = require('invariant')

const { checkGit, checkNpm } = require('../utils/checkEnv')
const BOILERPLATE = require('../constants/boilerplate')

async function downBoilerplateFromGit () {
  if (!arguments && !arguments[0]) return;

  checkGit()
  checkNpm()

  await cloneRepos(arguments[0])
  await installDependenices()

  try {
    shell.rm('-rf', '.git')
  } catch (e) {
    error(e)
    process.exit(1)
  }
}

function checkExistsPackage () {
  invariant(
    fs.existsSync('./package.json'),
    chalk.white.bgRed('请检查是否存在package.json文件')
  )
}

function cloneRepos () {
  const projType = arguments[0]
  const downBoilerplateSpiner = ora('clone boilerplate from git...').start()

  return new Promise((resolve, reject) => {
    exec(`git clone ${BOILERPLATE[projType].git}`, (err, stdout, stderr) => {
      if (err) {
        shell.rm('-rf', path.join(process.cwd(), `${BOILERPLATE[projType].name}`))
        downBoilerplateSpiner.fail()
        error(err)
        reject(err)
      } else {
        shell.mv(path.join(process.cwd(), `${BOILERPLATE[projType].name}`, '*'), './')
        shell.rm('-rf', path.join(process.cwd(), `${BOILERPLATE[projType].name}`))
        downBoilerplateSpiner.succeed()
        resolve()
      }
    })
  })
}

function installDependenices () {
  checkExistsPackage()
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
