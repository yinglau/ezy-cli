const { checkNpm } = require('../utils/checkEnv')
const { initProjectBoilerplate } = require('./createProject')
const { exec } = require('child_process')
const fs = require('fs')
const chalk = require('chalk')
const invariant = require('invariant')
const ora = require('ora')
// const fs = require('fs')
// const error = require('../utils/errorHandle')

async function initProject (projType) {
  await initProjectBoilerplate(projType)
  await installDependencies()
}

async function installDependencies () {
  checkNpm()
  checkExistsPackage()

  let start
  let pay
  start = new Date().getTime()

  return new Promise((resolve, reject) => {
    const installSpinner = ora('installing the dependencies...').start()
    exec('npm install', (err, stdout, stderr) => {
      if (err) {
        installSpinner.fail()
        reject(err)
      } else {
        pay = new Date().getTime() - start
        installSpinner.text = `complete install dependencies [${chalk.green(pay + 'ms')}]`
        installSpinner.succeed()
        resolve()
      }
    })
  })
}

function checkExistsPackage () {
  invariant(
    fs.existsSync('./package.json'),
    chalk.white.bgRed('请检查是否存在package.json文件')
  )
}

module.exports = initProject
