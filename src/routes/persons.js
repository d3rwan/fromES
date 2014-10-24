/**
 * Persons
 * @author d3rwan
 */

// imports
var service = require('../services/persons'),
    logger = require('winston'),
    request = require('../common/requestUtil'),
    response = require('../common/responseUtil');

/**
 * Routes for persons
 * @param app express
 */
module.exports = function routesKissAbo(app) {
    // search person
    app.get('/persons', request.requiredParameter('query'), function(req, res) {
        logger.debug('search person', req.originalUrl);
        service.searchPerson({
            query : req.query.query,
            size: req.query.size,
            from: req.query.from,
            autocomplete : false
        }, response.defaultRes(res));
    });
    // autocomplete person
    app.get('/persons/autocomplete', request.requiredParameter('query'), function(req, res) {
        logger.debug('autocomplete person', req.originalUrl);
        service.searchPerson({
            query : req.query.query,
            size: req.query.size,
            from: req.query.from,
            autocomplete : true
        }, response.defaultRes(res));
    });
};
