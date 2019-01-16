const ejs = require('ejs')
const os = require('os')
const fs = require('fs')
const chalk = require('chalk')
const path = require('path')
const invariant = require('invariant')
const { error } = require('../utils/errorHandle')

function createProject (name) {
  createPath(name)
  createPkg(name)
}

function createPath (name) {
  invariant(
    !fs.existsSync(path.join(process.cwd(), name)),
    chalk.white.bgRed(`the path named '${name}' has already exists`)
  )
  fs.mkdirSync(name)
}

function createPkg (name) {
  try {
    fs.accessSync(path.join(process.cwd(), name), fs.constants.R_OK | fs.constants.W_OK)
    ejs.renderFile(
      path.join(__dirname, '../templates/package.json.ejs'),
      { name },
      (err, str) => {
        if (err) {
          error(err)
          process.exit(1)
        }
        // fs.writeFileSync(path.join(process.cwd(), name, 'package.json'), str + os.EOL, 'utf8')
        fs.writeFile(
          path.join(process.cwd(), name, 'package.json'),
          str + os.EOL,
          'utf8',
          (err) => {
            if (err) {
              error(err)
              process.exit(1)
            }
          }
        )
      }
    )
  } catch (e) {
    error(e)
    process.exit(1)
  }
}

module.exports = createProject
