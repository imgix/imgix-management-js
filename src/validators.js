
const assert = require('assert');

function validateApiKey(value) {
    const typeError = new TypeError('ImgixAPI.settings.apiKey must be passed a string');
    const legalKey = /[0-9a-f]{64}/;
    const legalKeyError = new TypeError(`${value} does not match a legal apiKey structure`);

    assert(typeof value === 'string', typeError);
    assert(legalKey.exec(value), legalKeyError);
};

function validateOpts(options) {
    validateApiKey(options.apiKey);
};

module.exports = {
    validateApiKey: validateApiKey,
    validateOpts: validateOpts
}
