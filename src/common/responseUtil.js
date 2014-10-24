/**
 * Util for response
 * @author d3rwan
 */

// imports
var logger = require('winston'),
    HTTP_CODE = require('../common/constants').HTTP_CODE,
    MESSAGE = require('../common/constants').MESSAGE,
    RETURN_CODE = require('../common/constants').RETURN_CODE,
    SEVERITY = require('../common/constants').SEVERITY;

/**
 * Success response
 * @param res response HTTP
 * @param data data
 */
function onSuccess(res, data) {
    if (!data.returnCode) {
        data.returnCode = RETURN_CODE.SUCCESS;
    }
    if (!data.message) {
        data.message = MESSAGE.SUCCESS;
    }
    if (!data.severity) {
        data.severity = SEVERITY.SUCCESS;
    }
    if (!data.data) {
        data.data = null;
    }
    logger.debug('OK', res.originalUrl, JSON.stringify(data));
    res.status(HTTP_CODE.SUCCESS).json(data);
}

/**
 * Error response
 * @param res response HTTP
 * @param code HTTP code
 * @param error error
 */
function onError(res, code, error) {
    if (!error.returnCode) {
        error.returnCode = RETURN_CODE.TECH_ERROR;
    }
    if (!error.message) {
        error.message = MESSAGE.UNDEFINED_ERROR;
    }
    if (!error.severity) {
        error.severity = SEVERITY.ERROR;
    }
    if (error.severity === SEVERITY.WARN) {
        logger.warn('KO', res.originalUrl, JSON.stringify(error));
    } else {
        logger.error('KO', res.originalUrl, JSON.stringify(error));
    }
    res.status(code).json(error);
}

/**
 * Default response
 * @param res response HTTP
 * @return {Function}
 */
function defaultRes(res) {
    return function(err, data) {
        if (err) {
            onError(res, HTTP_CODE.INTERNAL_ERROR, {
                "returnCode" : RETURN_CODE.TECH_ERROR,
                "message" : err.message,
                "severity" : SEVERITY.ERROR
            });
        } else {
            onSuccess(res, data);
        }
    };
}

// exports public functions
exports.onSuccess = onSuccess;
exports.onError = onError;
exports.defaultRes = defaultRes;
