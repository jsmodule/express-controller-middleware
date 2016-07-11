const fs = require('fs');
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

  return Middleware;
};

function loadControllers(controllerPath) {
  var controllers = {};
  var list = fs.readdirSync(controllerPath);
  list.forEach(function(file) {
    controllers[getFileName(file)] = require(controllerPath + '/' + file);
  });
  return controllers;
}

function getFileName(file) {
  var endPos = file.lastIndexOf('.');
  endPos = endPos == -1 ? file.length : endPos;
  return file.substring(0, endPos);
}
