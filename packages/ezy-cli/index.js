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

const { createPrompt, initPrompt } = require('./constants/prompts')
const pkg = require('./package.json')

cmd.version(pkg.version)

cmd
  .command('new <name>')
  .description('Create a project')
  .action((name, options) => {
    createPrompt(name, options)
  })

// cmd
//   .command('init')
//   .description('Init the project and install dependencies!')
//   .action(() => {
//     initPrompt()
//   })

cmd.parse(process.argv)
