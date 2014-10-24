/**
 * Logger
 * @author d3rwan
 */

// imports
var logger = require('winston'),
    configLogs = require('./config').logs;

// logger config
logger.remove(logger.transports.Console);
if (configLogs.console) {
    logger.add(logger.transports.Console, {
        level : configLogs.level,
        colorize : true
    });
}
if (configLogs.file) {
    logger.add(logger.transports.DailyRotateFile, {
        name : 'file',
        level : configLogs.level,
        datePattern : '.yyyy-MM-dd',
        filename : configLogs.directory + '/' + configLogs.filename,
        maxsize : 50000000,
        maxFiles : 30,
        json:false
    });
}

// export logger
module.exports = logger;
