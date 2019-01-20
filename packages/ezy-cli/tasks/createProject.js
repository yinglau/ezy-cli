const ejs = require('ejs')
const os = require('os')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const invariant = require('invariant')
const ora = require('ora')
// const { error } = require('../utils/errorHandle')

function createPath (name) {
  invariant(
    !fs.existsSync(path.join(process.cwd(), name)),
    chalk.white.bgRed(`the path named '${name}' has already exists`)
  )
  fs.mkdirSync(name)
}

function createPkg (projectName = null) {
  const createPkgSpinner = ora('init the package.json...').start()
  return new Promise((resolve, reject) => {
    const name = projectName || 'projectName'
    ejs.renderFile(
      path.join(__dirname, '../templates/web/package.json.ejs'),
      { name },
      (err, str) => {
        if (err) {
          // error(err)
          // process.exit(1)
          createPkgSpinner.fail()
          reject(err)
        }
        fs.writeFile(
          path.join(process.cwd(), 'package.json'),
          str + os.EOL,
          'utf8',
          (err) => {
            if (err) {
              // error(err)
              // process.exit(1)
              createPkgSpinner.fail()
              reject(err)
            }
            createPkgSpinner.succeed()
            resolve()
          }
        )
      }
    )
  })
}

function initProjectBoilerplate () {
  const initBoilerplateSpinner = ora('init the boilerplate...').start()
  copyFile(path.join(__dirname, '../templates/web/boilerplate'), process.cwd(), initBoilerplateSpinner)
  initBoilerplateSpinner.succeed()
}

function copyFile (src, dist, spinner) {
  const files = fs.readdirSync(src)
  files.map(item => {
    const _src = path.join(src, item)
    const _dist = path.join(dist, item)
    fs.stat(_src, async (err, stats) => {
      if (err) {
        spinner.fail()
        throw new Error(err)
      }
      if (stats.isFile()) {
        const read = fs.createReadStream(_src)
        const write = fs.createWriteStream(_dist)
        read.pipe(write)
      } else {
        fs.mkdirSync(_dist)
        copyFile(_src, _dist, spinner)
      }
    })
  })
}

module.exports = {
  createPath,
  createPkg,
  initProjectBoilerplate
}
