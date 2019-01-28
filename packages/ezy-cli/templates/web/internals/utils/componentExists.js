/**
 * check the component exist or not.
 */

const fs = require('fs');
const path = require('path');
const {properCase} = require('./helpers');

const pageContainers = fs.readdirSync(path.join(__dirname, '../../src/containers'));
const pageComponents = fs.readdirSync(path.join(__dirname, '../../src/components'));

const components = pageContainers.concat(pageComponents);

module.exports = componentExists = (name) => {
  return components.indexOf(properCase(name)) >= 0;
}
