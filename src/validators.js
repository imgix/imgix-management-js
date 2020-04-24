
const assert = require('assert');

function validateApiKey(value) {
    const error = new TypeError('ImgixAPI.settings.apiKey must be a string');
    assert(typeof value === 'string', error);
};

function validateOpts(options) {
    validateApiKey(options.apiKey);
};

module.exports = {
    validateApiKey: validateApiKey,
    validateOpts: validateOpts
}
