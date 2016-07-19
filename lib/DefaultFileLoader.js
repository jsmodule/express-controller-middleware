const fs = require('fs');
const path = require('path');

function DefaultFileLoader() {
}

DefaultFileLoader.prototype.loadControllers = function(controllerPath) {
  var controllers = {};
  getFileList(controllerPath).forEach(function(file) {
    var controller = require(controllerPath + '/' + file);
    if (isValid(controller)) {
      controllers[getFileName(file)] = require(controllerPath + '/' + file);
    }
  });
  return controllers;
}

function getFileList(dir) {
  return fs.readdirSync(dir);
}

function getFileName(file) {
  return path.basename(file, path.extname(file));
}

function isValid(controller) {
  return controller !== undefined && controller !== null
}

module.exports = DefaultFileLoader;
