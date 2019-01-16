#!/usr/bin/env node

process.on('unhandledRejection', err => {
  throw err
})

const chalk = require('chalk')
var currentNodeVersion = process.versions.node
var semver = currentNodeVersion.split('.')
var major = semver[0]

if (major < 8) {
  console.error(
    chalk.red(
      'You are running Node ' +
        currentNodeVersion +
        '.\n' +
        'Create React App requires Node 8 or higher. \n' +
        'Please update your version of Node.'
    )
  )
  process.exit(1)
}

const cmd = require('commander')
const inquirer = require('inquirer')

const createProject = require('./tasks/createProject')
const downBoilerplateFromGit = require('./tasks/downBoilerplate')
const pkg = require('./package.json')

cmd.version(pkg.version)

cmd
  .command('create <name>')
  .description('Create a project path')
  .action((name, options) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'project_name',
        message: 'Your project path name.',
        default: name,
        validate: (value) => {
          if (value === '' || value.length === 0) {
            return 'Please type the project name.'
          }
          if (!value.match(/^[a-zA-z0-9]+$/)) {
            return 'example: nameName8'
          }
          return true
        }
      }
    ]).then(answers => {
      const name = answers.project_name
      createProject(name)
    })
  })

cmd
  .command('init')
  .description('Init the project and install dependencies!')
  .action(() => {
    inquirer.prompt([
      {
        type: 'list',
        name: 'project_type',
        message: 'Choice you project type.',
        choices: ['Web', 'Mobile-Native', 'Pc-Native']
      }
    ]).then(answers => {
      if (answers.project_type === 'Web') {
        return inquirer.prompt([
          {
            type: 'input',
            name: 'use_boilerplate',
            message: 'Whether use boilerplate or not?',
            default: 'yorN',
            validate: (value) => {
              const pass = value.match(/^[yN]$/)
              if (pass) {
                return true
              }
              return 'Just type y or N'
            }
          }
        ]).then(subAns => {
          if (subAns.use_boilerplate === 'y') {
            downBoilerplateFromGit(answers.project_name)
          }
        })
      }
    })
  })

cmd.parse(process.argv)
