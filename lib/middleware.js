const fs = require('fs');
const path = require('path');
const methods = require('methods');
const express = require('express');

module.exports = function(controllerPath) {
  var router = express.Router();
  var controllers = loadControllers(controllerPath);

  function Middleware(req, res, next) {
    router(req, res, next);
  }

  Middleware.use = function(routerPath, controllerName) {
    router.use(routerPath, controllers[controllerName]);
  }

  methods.forEach(function(method) {
    Middleware[method] = function(routePath, controllerName) {
      router[method].call(router, routePath, controllers[controllerName]);
    }
  });

  return Middleware;
};

function loadControllers(controllerPath) {
  var controllers = {};
  var list = fs.readdirSync(controllerPath);
  list.forEach(function(file) {
    var controller = require(controllerPath + '/' + file);
    var name = getFileName(file);
    if(hasAnyProperties(controller)) {
      for(var property in controller) {
        var propertyValue = controller[property];
        if(typeof propertyValue === 'function') {
          controllers[name + '#' + property] = propertyValue;
        }
      }
    }else {
      controllers[name] = controller;
    }
  });
  return controllers;
}

function hasAnyProperties(obj) {
  return Object.keys(obj).length > 0
}

function getFileName(file) {
  return path.basename(file, path.extname(file));
}
