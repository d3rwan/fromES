/**
 * Health
 * @author d3rwan
 */

// imports
var service = require('../services/health'),
    logger = require('winston'),
    response = require('../common/responseUtil');

/**
 * Health
 * @param app express
 */
module.exports = function routesHealth(app) {
    app.get('/health', function(req, res) {
        logger.debug('ping cluster');
        service.health(response.defaultRes(res));
    });
};
