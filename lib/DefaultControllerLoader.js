const Valid = require('./Valid');

function DefaultControllerLoader() { }

DefaultControllerLoader.prototype.loadController = function(controllerFile) {
  var controller = require(controllerFile);
  if (Valid.isValid(controller)) {
    return controller;
  }
};

module.exports = DefaultControllerLoader;
