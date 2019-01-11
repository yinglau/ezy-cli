const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const invariant = require('invariant')
const ejs = require('ejs')
const os = require('os')
// const spawn = require('cross-spawn')
const { execSync, exec } = require('child_process')
const ora = require('ora')

const BOILERPLATE_REPOS = require('../constants/boilerplate')

const initProject = function (name) {
  createPath(name)
  createPkg(name)
}

async function downBoilerplateFromGit (name) {
  invariant(
    canUseGit(),
    chalk.white.bgRed(`Sure you have already install Git.`)
  )
  createPath(name)

  const projPath = path.join(process.cwd(), name)
  await cloneRepos(projPath)

  try {
    fs.accessSync(`${projPath}/package.json`, fs.constants.R_OK | fs.constants.W_OK)
    const oldPkgCtn = fs.readFileSync(`${projPath}/package.json`, { encoding: 'utf8' })
    const newPkgCtn = oldPkgCtn.replace(/("name":\s+)(.+)/, `$1 "${name}",`)
    fs.writeFileSync(`${projPath}/package_new.json`, newPkgCtn)
  } catch (e) {
    chalk.white.bgRed(e)
  }
}

function cloneRepos (projPath) {
  const downBoilerplateSpiner = ora('clone source from git...').start()
  return new Promise((resolve, reject) => {
    exec(`git clone ${BOILERPLATE_REPOS} ${projPath}`, (err, stdout, stderr) => {
      if (err) {
        fs.rmdirSync(projPath)
        downBoilerplateSpiner.fail()
        console.log(chalk.white.bgRed(err))
        reject(err)
      } else {
        downBoilerplateSpiner.succeed()
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
          console.log(chalk.white.bgRed(err))
          process.exit(1)
        }
        // fs.writeFileSync(path.join(process.cwd(), name, 'package.json'), str + os.EOL, 'utf8')
        fs.writeFile(
          path.join(process.cwd(), name, 'package.json'),
          str + os.EOL,
          'utf8',
          (err) => {
            if (err) {
              console.log(chalk.white.bgRed(err))
              process.exit(1)
            }
          }
        )
      }
    )
  } catch (e) {
    console.log(chalk.white.bgRed(e))
    process.exit(1)
  }
}

module.exports = {
  initProject,
  downBoilerplateFromGit
}
