# Express Controller Middleware

This is a middleware to load all controllers.

## Installation

```
$ npm install express-controller-middleware
```

## Usage

### First step:

Create two controllers:

* HelloController.js

```js
module.exports = function(req, res, next) {
  res.send("Hello Controller");
};
```

* TestController.js

```js
exports.index = function(req, res) {
  res.send("Hello Index");
};
exports.show = function(req, res) {
  res.send("Hello Show");
}
```

### Second step:

Create a middleware.

* controller-middleware.js

```js
const path = require('path');
const ExpressControllerMiddleware = require('express-controller-middleware');

const controllerPath = path.join(__dirname, './controllers');
const middleware = new ExpressControllerMiddleware(controllerPath);

middleware.use('/hello', 'HelloController'); //Must use the same name with file name.
middleware.get('/test/index', 'TestController#index'); //Controller name and action name separated by '#'
middleware.get('/test/index', 'TestController#index'); //More method please refer to 'express'

module.exports = middleware;
```

### Third step:

Using middleware in server.js

```js
const express = require('express');
const controllerMiddleware = require('./js/controller-middleware');
const app = express();

app.use(controllerMiddleware);

app.listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
    return;
  }
});

```

## More Details

### Set controller path

There are two ways to set controller path.

* Pass the controller path as a parameter into constructor method.

```js
const controllerPath = path.join(__dirname, './controllers');
const middleware = new ExpressControllerMiddleware(controllerPath);
```

* Calling `setPath` method for ExpressControllerMiddleware class.

```js

const middleware = new ExpressControllerMiddleware();
middleware.setPath(path.join(__dirname, './controllers'));
```

### Set custom FileLoader.

* Create a custom FileLoader like this:

```js
function CustomFileLoader() {}

// Must have this method.
CustomFileLoader.prototype.loadControllers = function(controllerPath) {
  ...
}

module.exports = CustomFileLoader;
```

* Config CustomFileLoader into middleware config file.

```js
const ExpressControllerMiddleware = require('express-controller-middleware');
const CustomFileLoader = require('./CustomFileLoader');

const middleware = new ExpressControllerMiddleware();
middleware.setFileLoader(new CustomFileLoader());
```

### Set custom ActionLoader.

* Create a custom ActionLoader like this:

```js
function CustomActionLoader() {}

// Must have this method.
CustomActionLoader.prototype.loadAction = function(controller, actionName) {
  ...
}

module.exports = CustomActionLoader;
```

* Config CustomActionLoader into middleware.

```js
const ExpressControllerMiddleware = require('express-controller-middleware');
const CustomActionLoader = require('./CustomActionLoader');

const middleware = new ExpressControllerMiddleware();
middleware.setActionLoader(new CustomActionLoader());
```

### Config your routes.

This component support all methods which supported by `express`.

About the details of config route, please refer to here: [Express Router](http://www.expressjs.com.cn/guide/routing.html)
