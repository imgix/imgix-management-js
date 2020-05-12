const validators = require('../src/validators');
const assert = require('assert');

const { API_KEY, API_VERSION_OVERRIDE } = require('./constants');
describe('Validators', () => {
    context('validateApiKey', () => {
        let invalidApiKey;
        it('throws an error if ImgixAPI.settings.apiKey is not a string', () => {
            invalidApiKey = 123;
            assert.throws(() => validators.validateApiKey(invalidApiKey), Error);
        });

        it('throws an error if ImgixAPI.settings.apiKey does not adhere to the expected structure', () => {
            invalidApiKey = 'abcdef';
            assert.throws(() => validators.validateApiKey(invalidApiKey), Error);
        });
    });

    context('validateOpts', () => {
        it('throws an error if provided constructor options are invalid', () => {
            const options = {
                apiKey: API_KEY,
                version: API_VERSION_OVERRIDE
            };
            validators.validateOpts(options);
        });
    });

    context('validateBody', () => {
        let body;

        it('throws an error if the request body is neither type JSON nor Buffer', () => {
            body = '123';
            assert.throws(() => validators.validateBody(body), Error);
        });
    });
})