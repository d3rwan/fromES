/**
 * Routes
 * @author d3rwan
 */

/**
 * Routes export
 * @param app express
 */
module.exports = function routes(app) {
    require('./health.js')(app);
    require('./persons.js')(app);
};
