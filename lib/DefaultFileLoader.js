const fs = require('fs');
const path = require('path');

function DefaultFileLoader() { }

DefaultFileLoader.prototype.loadControllerFiles = function(controllerPath) {
  return getFileList(controllerPath).map(function(fileName) {
    return path.format({dir: controllerPath, base: fileName});
  });
}

function getFileList(dir) {
  return fs.readdirSync(dir);
}

module.exports = DefaultFileLoader;
