/**
 * Person service
 * @author d3rwan
 */

// imports
var search = require('../daos/elasticsearch'),
    logger = require('winston'),
    _ = require('underscore'),
    configIndex = require('../config/config').indexs.persons;

/**
 * Search person from user query
 * @param parameters search parameters
 * @param callback callback function
 */
function searchPerson(parameters, callback) {
    var index = configIndex.index;
    var type = configIndex.type;
    // add weight on lastname (^2)
    var defaultFields = [
        "firstName",
        "lastName^2"
    ];
    var autocompletionFields = [
        "autocomplete"
    ];

    var query = {
        "from" : (parameters.from ? parameters.from : 0),
        "size" : (parameters.size ? parameters.size : 10),
        "query" : {
            "query_string" : {
                "query" : parameters.query,
                "fields" : (parameters.autocomplete ? autocompletionFields : defaultFields)
            }
        }
    };

    search.search(index, type, query, function(data) {
        var result = {
            "data" : []
        };
        if (data && data.hits && data.hits.hits) {
            // mapping data
            _.each(data.hits.hits, function (item) {
                result.data.push(item._source);
            });
        }
        logger.debug('Results (ES)', JSON.stringify(data));
        logger.debug('Results (Final)', JSON.stringify(result));
        callback(null, result);
    }, function(error) {
        callback(error, null);
    });
}

// exports public functions
exports.searchPerson = searchPerson;
