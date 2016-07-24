const Valid = require('./Valid');

function DefaultActionLoader() { }

DefaultActionLoader.prototype.loadAction = function(controller, actionName) {
  if (Valid.isValidString(actionName)) {
    if (isValidAction(controller, actionName)) {
      return controller[actionName];
    }
  }else {
    return controller;
  }
};

function isValidAction(controller, actionName) {
  return Valid.isValid(controller) && controller.hasOwnProperty(actionName);
}

module.exports = DefaultActionLoader;
