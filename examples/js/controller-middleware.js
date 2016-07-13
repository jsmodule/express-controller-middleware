const path = require('path');
const ControllerMiddleware = require('../../lib/middleware');

const controllerPath = path.join(__dirname, './controllers');
const middleware = new ControllerMiddleware(controllerPath);

middleware.use('/hello', 'HelloController');
middleware.get('/test/index', 'TestController#index');
middleware.get('/test/show', 'TestController#show');

module.exports = middleware;
