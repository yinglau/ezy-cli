const containerGenerate = require('./container/index');
const componentGenerate = require('./component/index');

module.exports = (plop) => {
  plop.setGenerator('container', containerGenerate);
  plop.setGenerator('component', componentGenerate);
}
