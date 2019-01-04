const fs = require('fs')
// const path = require('path')
const chalk = require('chalk')
const invariant = require('invariant')

const createProjPath = function (name) {
  invariant(fs.existsSync(name), chalk.red(`the path call ${name} has already exists`))
}

module.exports = createProjPath
