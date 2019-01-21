const inquirer = require('inquirer')

const { createPath } = require('../tasks/createProject')
const downBoilerplateFromGit = require('../tasks/downBoilerplate')
const initProject = require('../tasks/initProject')

function createPrompt (name, options) {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'project_name',
      message: 'Your project name.',
      default: name,
      validate: (value) => {
        if (value === '' || value.length === 0) {
          return 'Please type the project name.'
        }
        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          return 'example: nameName8'
        }
        return true
      }
    }
  ]).then(answers => {
    const name = answers.project_name
    createPath(name)
    process.chdir(name)
    return initPrompt()
  })
}

function initPrompt () {
  return inquirer.prompt([
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
          type: 'expand',
          name: 'use_boilerplate',
          message: 'Whether use boilerplate or not?',
          default: 'n',
          choices: [
            {
              key: 'y',
              name: 'Yes, use boilerplate.',
              value: 'y'
            },
            {
              key: 'n',
              name: 'No, unuse boilerplate.',
              value: 'n'
            }
          ]
        }
      ]).then(subAns => {
        if (subAns.use_boilerplate === 'y') {
          downBoilerplateFromGit(answers.project_name)
        } else {
          initProject(answers.project_type)
        }
      })
    }
    initProject(answers.project_type)
  })
}

module.exports = {
  createPrompt,
  initPrompt
}
