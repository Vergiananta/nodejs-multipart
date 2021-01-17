const http = require('http');
const express = require('express');
const appMiddleware = require('./src/middlewaves/app-middlewares');
const appRoutes = require('./src/routes/index');
const logEvent = require('./src/event/myEmitter');
const loggingListener = require('./src/event/logging.listener')

loggingListener();
const app = express();
app.use(appMiddleware);
app.use('/uploads',express.static('uploads'))
app.use(appRoutes);
const server = http.createServer(app);
server.on('error', function(e){
    logEvent.emit('APP-ERROR', { 
        logTitle: 'APP FAILED',
        logMessage: e
    });    
});
module.exports = server;