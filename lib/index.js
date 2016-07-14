const methods = require('methods');
const express = require('express');
const ActionsManager = require('./ActionsManager');

var middleware = module.exports = function(controllerPath) {
  function Handler(req, res, next) {
    Handler.handle(req, res, next);
  };

  Handler.__proto__ = middleware;
  Handler.router = express.Router();
  Handler.actionsManager = new ActionsManager(controllerPath);

  return Handler;
};

middleware.setControllerPath = function(controllerPath) {
  this.actionsManager.setPath(controllerPath);
}

middleware.use = function(routerPath, actionName) {
  var action = this.actionsManager.getAction(actionName);
  if(typeof action !== 'function') {
    throw new TypeError('Can not find \'' + actionName + '\' action.');
  }
  this.router.use(routerPath, action);
}

methods.forEach(function(method) {
  middleware[method] = function(routePath, actionName) {
    var action = this.actionsManager.getAction(actionName);
    if(typeof action !== 'function') {
      throw new TypeError('Can not find \'' + actionName + '\' action.');
    }
    this.router[method].call(this.router, routePath, action);
  }
});

middleware.handle = function(req, res, next) {
  this.router(req, res, next);
}
