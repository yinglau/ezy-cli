const cmd = require('commander')
const createProj = require('./tasks/create-proj-file')

cmd
  .command('init <name>', '')
  .description('init a project and install dependencies!')
  .action((name, options) => {
    createProj(name)
  })

cmd.parse(process.argv)
