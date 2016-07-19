const DefaultFileLoader = require('./DefaultFileLoader');
const DefaultActionLoader = require('./DefaultActionLoader');

function ActionsManager(controllerPath) {
  this.actions = {};
  this.controllerPath = controllerPath;
  this.fileLoader = new DefaultFileLoader();
  this.actionLoader = new DefaultActionLoader();
}

ActionsManager.prototype.setPath = function(controllerPath) {
  this.controllerPath = controllerPath;
}

ActionsManager.prototype.getAction = function(handlerName) {
  if(isValid(handlerName)) {
    var controllerName = getControllerName(handlerName);
    if(this.hasController(controllerName)) {
      return this.loadAction(this.getController(controllerName), getActionName(handlerName));
    }
  }
}

ActionsManager.prototype.loadAction = function(controller, actionName) {
  if(isValid(actionName)) {
    return this.actionLoader.loadAction(controller, actionName);
  }else {
    return controller;
  }
}

ActionsManager.prototype.hasController = function(controllerName) {
  return this.getControllers().hasOwnProperty(controllerName);
}

ActionsManager.prototype.getController = function(controllerName) {
  return this.getControllers()[controllerName];
}

ActionsManager.prototype.getControllers = function() {
  return this.controllers || this.loadControllers();
}

ActionsManager.prototype.loadControllers = function() {
  return this.controllers = this.fileLoader.loadControllers(this.controllerPath);
}

function isValid(handlerName) {
  return handlerName !== undefined && handlerName !== null && handlerName.length > 0;
}

function getControllerName(handlerName) {
  return handlerName.split('#')[0];
}

function getActionName(handlerName) {
  return handlerName.split('#')[1];
}

module.exports = ActionsManager;
