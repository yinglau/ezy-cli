const containerGenerate = require('./container/index');

module.exports = (plop) => {
  plop.setGenerator('container', containerGenerate);

  plop.setGenerator('component', {
    description: 'generator a component',
    prompts: {
      type: 'list',
      name: 'type',
      message: 'select a list',
      default: 'default',
      choices: () => [
        'default',
        'other',
        'funny'
      ]
    },
    actions: data => {
      console.log(data);
      return [];
      // return [
      //   {
      //     type: 'add',
      //     path: '../../app/component/{{properCase type}}.js'
      //   }
      // ]
    }
  })
}
