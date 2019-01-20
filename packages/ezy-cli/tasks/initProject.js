const { checkNpm } = require('../utils/checkEnv')
const { createPkg } = require('./createProject')
const { exec } = require('child_process')
const ora = require('ora')
// const fs = require('fs')
const getDependencies = require('../constants/npmDependencies')
// const error = require('../utils/errorHandle')

async function initProject (projType) {
  await createPkg()
  await installDependencies(projType)
}

async function installDependencies (projType) {
  checkNpm()
  const types = ['Web', 'Mobile-Native']
  let deps
  switch (projType) {
    case types[0]:
      deps = getDependencies(types[0])
      break
    case types[1]:
      deps = getDependencies(types[1])
      break
    default:
      break
  }
  // return Promise.all([installDeps(deps.dependencies), installDevDeps(deps.devDependencies)])
  return new Promise((resolve, reject) => {
    const installSpinner = ora('installing the dependencies...').start()
    Promise.all([installDeps(deps.dependencies), installDevDeps(deps.devDependencies)])
      .then((res) => {
        if (res[0] === 'done' && res[1] === 'done') {
          installSpinner.succeed()
        }
      })
      .catch(e => {
        installSpinner.fail()
      })
  })
}

function installDeps (pkgs) {
  return new Promise((resolve, reject) => {
    exec(`npm i --save ${pkgs.join(' ')}`, (err, stdout) => {
      if (err) {
        reject(err)
      } else {
        resolve('done')
      }
    })
  })
}

function installDevDeps (pkgs) {
  return new Promise((resolve, reject) => {
    exec(`npm i --save-dev ${pkgs.join(' ')}`, (err, stdout) => {
      if (err) {
        reject(err)
      } else {
        resolve('done')
      }
    })
  })
}

module.exports = initProject
