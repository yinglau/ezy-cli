const path = require('path');
const fs = require('fs');

const componentExists = require('../../utils/componentExists');
const getUser = require('../../utils/getUser');
const {properCase} = require('../../utils/helpers');

module.exports = {
  description: 'Add a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'what should it be called?',
        validate: (value) => {
          if (componentExists(value)) {
            return `the component calls ${properCase(value)} has existed`;
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'componentType',
        message: 'What component type do you want?',
        default: 'Function',
        choices: () => [
          'Functional',
          'Class',
        ]
      },
      {
        type: 'confirm',
        name: 'wantTestSuit',
        message: 'Do you want to create test suit?',
        default: false,
      }
    ],
    actions: data => {
      const userinfo = getUser();
      let actions = [];
      const componentType = data.componentType;

      switch(componentType) {
        case 'Functional':
          actions.push({
            type: 'add',
            path: `${path.join(__dirname, '../../../src/components/{{properCase name}}/index.js')}`,
            templateFile: `./component/default.js.hbs`,
            data: {
              author: {
                name: userinfo['user.name'],
                email: userinfo['user.email']
              }
            },
            abortOnFail: true
          });
          break;
        case 'Class':
          actions.push({
            type: 'add',
            path: `${path.join(__dirname, '../../../src/components/{{properCase name}}/index.js')}`,
            templateFile: `./component/class.js.hbs`,
            data: {
              author: {
                name: userinfo['user.name'],
                email: userinfo['user.email']
              }
            },
            abortOnFail: true
          });
          break;
        default:
          actions.push({
            type: 'add',
            path: `${path.join(__dirname, '../../../src/components/{{properCase name}}/index.js')}`,
            templateFile: `./component/default.js.hbs`,
            data: {
              author: {
                name: userinfo['user.name'],
                email: userinfo['user.email']
              }
            },
            abortOnFail: true
          });
          break;
      }

      if (data.wantTestSuit) {
        const suitActions = [
          {
            type: 'add',
            path: `${path.join(__dirname, '../../../src/components/{{properCase name}}/__test__/index.test.js')}`,
            templateFile: `./component/test/index.test.js.hbs`,
            data: {
              author: {
                name: userinfo['user.name'],
                email: userinfo['user.email']
              },
              isFunctional: componentType === 'Functional' ? true : false
            },
            abortOnFail: true
          }
        ]
        actions = [...suitActions, ...actions];
      }

      return actions;
    }
}
