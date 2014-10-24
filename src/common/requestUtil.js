/**
 * Util for request
 * @author d3rwan
 */

// imports
var moment = require('moment'),
    response = require('../common/responseUtil'),
    HTTP_CODE = require('../common/constants').HTTP_CODE,
    RETURN_CODE = require('../common/constants').RETURN_CODE,
    SEVERITY = require('../common/constants').SEVERITY;

/**
 * Test param is valid date
 * @param param param
 * @return {Function}
 */
function isDateParameter(param) {
    return function (req, res, next) {
        var date = moment(req.query[param], ["YYYY-MM-DD", "DD/MM/YYYY"], true);
        if (date.isValid()) {
            req.query[param] = date.format();
            next();
        } else {
            response.onError(res, HTTP_CODE.MISSING_PARAMETER, {
                "returnCode" : RETURN_CODE.TECH_ERROR,
                "message" : "Parameter '" + param + "' have not expected format (YYYY-MM-DD or DD/MM/YYYY)",
                "severity" : SEVERITY.WARN
            });
        }
    };
}

/**
 * Vérifier qu'un paramètre obligatoire est présent
 * @param param le paramètre
 * @return {Function}
 */
function requiredParameter(param) {
    return function (req, res, next) {
        if (req.query && req.query[param]) {
            next();
        } else {
            response.onError(res, HTTP_CODE.MISSING_PARAMETER, {
                "returnCode" : RETURN_CODE.ERR_TEC_MISSING_PARAM_QUERY,
                "message" : "Parameter '" + param + "' is required",
                "severity" : SEVERITY.WARN
            });
        }
    };
}

// exports public functions
exports.isDateParameter = isDateParameter;
exports.requiredParameter = requiredParameter;
