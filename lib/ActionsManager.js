const path = require('path');
const Valid = require('./Valid');
const DefaultFileLoader = require('./DefaultFileLoader');
const DefaultActionLoader = require('./DefaultActionLoader');
const DefaultControllerLoader = require('./DefaultControllerLoader');

function ActionsManager(controllerPath) {
  this.controllerPath = controllerPath;
  this.fileLoader = new DefaultFileLoader();
  this.actionLoader = new DefaultActionLoader();
  this.controllerLoader = new DefaultControllerLoader();
}

ActionsManager.prototype.setPath = function(controllerPath) {
  this.controllerPath = controllerPath;
}

ActionsManager.prototype.setFileLoader = function(fileLoader) {
  this.fileLoader = fileLoader;
}

ActionsManager.prototype.setActionLoader = function(actionLoader) {
  this.actionLoader = actionLoader;
}

ActionsManager.prototype.setControllerLoader = function(controllerLoader) {
  this.controllerLoader = controllerLoader;
}

ActionsManager.prototype.getAction = function(handlerName) {
  if(Valid.isValidString(handlerName)) {
    var controllerName = getControllerName(handlerName);
    if(this.hasController(controllerName)) {
      return this.actionLoader.loadAction(this.getController(controllerName), getActionName(handlerName));
    }
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
  var that = this;
  this.controllers = {};
  this.fileLoader.loadControllerFiles(this.controllerPath).forEach(function(file) {
    var controller = that.controllerLoader.loadController(file);
    if (Valid.isValid(controller)) {
      that.controllers[getFileName(file)] = controller;
    }
  });
  return this.controllers;
}

function getFileName(file) {
  return path.basename(file, path.extname(file));
}

function getControllerName(handlerName) {
  return handlerName.split('#')[0];
}

function getActionName(handlerName) {
  return handlerName.split('#')[1];
}

module.exports = ActionsManager;
