/**
 * Health
 * @author d3rwan
 */

// imports
var search = require('../daos/elasticsearch');

/**
 * Health
 * @param callback callback function
 */
function health(callback) {
    search.ping(function(data) {
        callback(null, data);
    }, function(error) {
        callback(error, null);
    });
}

// exports public functions
exports.health = health;
