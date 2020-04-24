const ImgixAPI = require('../src/imgix-api');

//import testing dependencies
const assert = require('assert');

// import testing constants
const API_KEY = require('./constants').API_KEY;
const API_VERSION_OVERRIDE = require('./constants').API_VERSION_OVERRIDE;

describe('The ImgixAPI class', () => {
    let ix;

    before(() => {
        ix = new ImgixAPI({
            apiKey: API_KEY
        });
    });

    it('creates an instance of the class', () => {
        assert(ix);
    });

    it('is created with a default version value', () => {
        assert(ix.settings.version);
    });

    it('throws an error if instantiated without an API key', () => {
        assert.throws(() => {
            new ImgixAPI();
        }, Error);
    });

    it('respects the version number passed into the constructor', () => {
        let ix = new ImgixAPI({
            version: API_VERSION_OVERRIDE,
            apiKey: API_KEY
        });
        assert.equal(ix.settings.version, API_VERSION_OVERRIDE);
    });

    it('allows the API key to be set via the constructor', () => {
        let ix = new ImgixAPI({
            apiKey: API_KEY
        });
        assert.equal(ix.settings.apiKey, API_KEY);
    });

    it('fetch exists in the global namespace as window.fetch', () => {
        assert.throws(() => assert(window.fetch), Error);
    });
});

describe('ImgixAPI.prototype.request', () => {
    var ix;

    before(() => {
        ix = new ImgixAPI({
            apiKey: API_KEY
        });
    });

    it('exposes a method request() on the object prototype', () => {
        assert.equal(typeof ix.request, 'function');
    });

    it('calling request() returns a Promise as a response', () => {
        const req1 = ix.request("https://api.imgix.com/api/v1/assets")
        .then(response => {
            assert.exists(response.headers);
        })
        .catch(() => {});

        assert.equal(typeof req1.then, 'function');
    });
});
