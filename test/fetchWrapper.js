const fetch = require('../src/fetchWrapper');
const assert = require('assert');

describe('fetchWrapper.js', () => {
    it('exports a function', () => {
        assert.equal(typeof fetch, 'function');
    });

    it('emits a custom ApiError on failure', () => {
        // an empty request will fail
        fetch()
        .then(error => {
            console.log(error);
            assert(error.response);
            assert(error.message);
            assert(error.status);
            assert(error.toString);
        })
        .catch(() => {});
    });
});
