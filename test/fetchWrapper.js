var fetch = require('../src/fetchWrapper');
var assert = require('assert');

describe('fetchWrapper.js', function describeSuite() {
    it('exports a function', function testSpec() {
        assert(typeof fetch === 'function');
    });

    it('emits a custom ApiError on failure', function testSpec() {
        // an empty request will fail
        fetch()
        .catch(error => {
            assert(error.response);
            assert(error.message);
            assert(error.status);
            assert(error.toString);
        });
    });
});
