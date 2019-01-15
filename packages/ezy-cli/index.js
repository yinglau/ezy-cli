#!/usr/bin/env node

const cmd = require('commander')
const inquirer = require('inquirer')

const { initProject, downBoilerplateFromGit } = require('./tasks/init-project')

cmd
  .command('init <name>', '')
  .description('init a project and install dependencies!')
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
            return 'example: abDDE9989'
          }
          return true
        }
      },
      {
        type: 'list',
        name: 'project_type',
        message: 'Choice you project type.',
        choices: ['Web', 'Native']
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
            return
          }
          initProject(answers.project_name)
        })
      } else {
        initProject(answers.project_name)
      }
    })
  })

cmd.parse(process.argv)
