const logEvent = require('../event/myEmitter')

const noRoute = (req, res) => {
    logEvent.emit('APP-ERROR', {
        logTitle: `ROUTE-FAILED`,
        logMessage: `${req.originalUrl} wrong requested`
    });
    res.status(404)
    res.json({message: 'Page not found'})
};

module.exports = noRoute;