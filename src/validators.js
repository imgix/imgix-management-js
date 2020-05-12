
const assert = require('assert');


function validateApiKey(value) {
    const invalidApiKeyError = new TypeError('ImgixAPI.settings.apiKey must be passed a string');
    const legalKey = /[0-9a-f]{64}/;
    const legalKeyError = new TypeError(`${value} does not match a legal apiKey structure`);

    assert(typeof value === 'string', invalidApiKeyError);
    assert(legalKey.exec(value), legalKeyError);
};

function validateOpts(options) {
    validateApiKey(options.apiKey);
};

function validateBody(body) {
    const invalidBodyError = new TypeError('The request body must be of type JSON or Buffer');

    const isValid = body && (isJSON(body) || isBuffer(body));
    assert(isValid, invalidBodyError);
};

function isBuffer(body) {
    return Buffer.isBuffer(body);
};

function isJSON(body) {
    try {
        JSON.parse(body);
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = {
    validateApiKey: validateApiKey,
    validateOpts: validateOpts,
    validateBody: validateBody,
    isBuffer: isBuffer,
    isJSON: isJSON
}
