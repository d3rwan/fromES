/**
 * Expose data from Elasticsearch
 * @author d3rwan
 */

// imports
var express = require('express'),
    logger = require('./config/log'),
    config = require('./config/config');

// create server
var app = express();

// server config
// global catch
app.use(function(err, req, res, next){
    logger.error(err.stack);
    res.send(500, {
        message : "Unknown error occured.",
        detail : err.stack
    });
});
// response time
app.use(function(req, res, next) {
    var start = Date.now();
    res.originalUrl = req.originalUrl;
    res.on('finish', function() {
        var duration = Date.now() - start;
        logger.info('[res] %sms %s', duration, req.originalUrl);
    });
    next();
});

// add routes
require('./routes/routes')(app);

// start server
var port = process.env.PORT || config.port;
app.listen(port, function() {
   logger.info('Server started on port %d', port);
});