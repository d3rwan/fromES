/**
 * Elasticsearch
 * @author d3rwan
 */

// imports
var elasticsearch = require('elasticsearch'),
    logger = require('winston'),
    configES = require('../config/config').elasticsearch;

// client ES
var client = elasticsearch.Client({
    host : configES.host,
    sniffOnStart : configES.sniffOnStart,
    maxRetries : configES.maxRetries
});

/**
 * Search
 * @param index index
 * @param type type
 * @param query query
 * @param success success function (callback)
 * @param error error function (callback)
 */
function search(index, type, query, success, error) {
    logger.debug('Search ES : [%s, %s, %s]', index, type, JSON.stringify(query));
    client.search({
        index : index,
        type : type,
        body : query
    }).then(success, error);
}

/**
 * Get 
 * @param index index
 * @param type type
 * @param id id
 * @param success success function (callback)
 * @param error error function (callback)
 */
function get(index, type, id, success, error) {
    logger.debug('Get ES : [%s, %s, %s]', index, type, id);
    client.get({
        index : index,
        type : type,
        id : id
    }).then(success, error);
}

/**
 * Ping cluster
 * @param success success function (callback)
 * @param error error function (callback)
 */
function ping(success, error) {
    client.ping({
        requestTimeout : 1000,
        hello : "elasticsearch!"
    }, function(err) {
        if (err) {
            logger.error('Elasticsearch cluster unreachable !' + err);
            error(err);
        } else {
            success({ "message" : "pong"});
        }
    });
}

// exports public functions
exports.search = search;
exports.get = get;
exports.ping = ping;
