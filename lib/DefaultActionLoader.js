function DefaultActionLoader() {
}

DefaultActionLoader.prototype.loadAction = function(controller, actionName) {
  if(isValid(controller, actionName)){
    return controller[actionName];
  }
};

function isValid(controller, actionName) {
  return controller !== undefined && controller !== null && controller.hasOwnProperty(actionName);
}

module.exports = DefaultActionLoader;
