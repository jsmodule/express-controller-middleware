# Express Controller Middleware

This is a middleware to load all controllers.

## Usage

Write a js file like this:

```js
const path = require('path');
const ControllerMiddleware = require('../../lib/middleware');

const controllerPath = path.join(__dirname, './controllers');
const middleware = new ControllerMiddleware(controllerPath);

middleware.use('/hello', 'HelloController'); //Must use the same name with file name.
middleware.use('/Test', 'TestController');

module.exports = middleware;
```

We can use this file into our server.js

```js
const controllerMiddleware = require('./js/controller-middleware');
app.use(controllerMiddleware);
```
