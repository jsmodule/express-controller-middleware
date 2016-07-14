const fs = require('fs');
const path = require('path');

function ActionsManager(controllerPath) {
  this.actions = {};
  this.controllerPath = controllerPath;
}

ActionsManager.prototype.setPath = function(controllerPath) {
  this.controllerPath = controllerPath;
}

ActionsManager.prototype.getAction = function(actionName) {
  return this.getActions()[actionName];
}

ActionsManager.prototype.getActions = function() {
  if(isEmpty(this.actions)) {
    this.loadActions();
  }
  return this.actions;
}

ActionsManager.prototype.loadActions = function() {
  var that = this;
  getFileList(this.controllerPath).forEach(function(file) {
    that.addControllerFile(file);
  });
}

ActionsManager.prototype.addControllerFile = function(file) {
  var controller = require(this.controllerPath + '/' + file);
  var name = getFileName(file);
  if(isEmpty(controller)) {
    this.actions[name] = controller;
  }else {
    for(var property in controller) {
      var propertyValue = controller[property];
      if(typeof propertyValue === 'function') {
        this.actions[name + '#' + property] = propertyValue;
      }
    }
  }
}

function getFileList(dir) {
  return fs.readdirSync(dir);
}

function isEmpty(obj) {
  return obj === undefined || obj === null || Object.keys(obj).length < 1;
}

function getFileName(file) {
  return path.basename(file, path.extname(file));
}

module.exports = ActionsManager;
