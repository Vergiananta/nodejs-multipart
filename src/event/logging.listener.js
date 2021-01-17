const recordLog = require('../../logger');
const logEvent = require('./myEmitter');
const logType = require('../constant/log-type.constant');
const errorType = require('../constant/error-event.constant');

const loggingListener = () => {
    logEvent.on(errorType.ERROR, function(ev) {
        recordLog({logType: logType.ERROR, logTitle: ev.logTitle, logMessage: ev.logMessage})
    });
    logEvent.on(errorType.FATAL, function(ev) {
        recordLog({logType: logType.FATAL, logTitle: ev.logTitle, logMessage: ev.logMessage})
    });
    logEvent.on(errorType.INFO, function(ev) {
        recordLog({logType: logType.INFO, logTitle: ev.logTitle, logMessage: ev.logMessage})
    });
};
module.exports = loggingListener;