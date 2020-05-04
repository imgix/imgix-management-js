const ImgixAPI = require('../src/imgix-api');
const fetchWrapper = require('../src/fetchWrapper');

//import testing dependencies
const assert = require('assert');
const sinon = require('sinon');

// import testing constants
const API_KEY = require('./constants').API_KEY;
const INVALID_API_KEY = require('./constants').INVALID_API_KEY;
const API_VERSION_OVERRIDE = require('./constants').API_VERSION_OVERRIDE;
const ASSETS_ENDPOINT = require('./constants').ASSETS_ENDPOINT;
const ASSETS_URL = require('./constants').ASSETS_URL;
const PACKAGE_VERSION = require('./constants').PACKAGE_VERSION;

describe('The ImgixAPI class', () => {
    let ix, version;

    before(() => {
        ix = new ImgixAPI({
            apiKey: API_KEY
        });
        version = ix.settings.version;
    });

    it('creates an instance of the class', () => {
        assert(ix);
    });

    it('is created with a default version value', () => {
        assert(version);
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

    it('throws an error if instantiated without an API key', () => {
        assert.throws(() => {
            new ImgixAPI();
        }, Error);
    });

    it('throws an error if an API key does not adhere to the expected structure', () => {
        assert.throws(() => {
            new ImgixAPI({
                apiKey: INVALID_API_KEY
            });
        }, Error);
    });

    it('fetch exists in the global namespace as window.fetch', () => {
        assert.throws(() => assert(window.fetch), Error);
    });
});

describe('ImgixAPI.prototype.request', () => {
    let ix, version;

    before(() => {
        ix = new ImgixAPI({
            apiKey: API_KEY
        });
        version = ix.settings.version;
    });

    it('exposes a method request() on the object prototype', () => {
        assert.equal(typeof ix.request, 'function');
    });

    it('calling request() returns a Promise as a response', () => {
        const promise = ix.request(ASSETS_ENDPOINT);
        assert.equal(typeof promise.then, 'function');
    });

    it('constructs the full API URL prior to completing request', () => {
        const stubFetch = sinon.stub(fetchWrapper, 'fetch');
        ix.request(ASSETS_ENDPOINT);

        const url = stubFetch.getCalls(0)[0].firstArg;
        assert(stubFetch.callCount == 1);
        assert.equal(url, ASSETS_URL(version));
        stubFetch.restore();
    });

    it('passes all default headers', () => {
        const stubFetch = sinon.stub(fetchWrapper, 'fetch');
        ix.request(ASSETS_ENDPOINT);

        const options = stubFetch.getCalls(0)[0].lastArg;
        assert(stubFetch.callCount == 1);
        assert.equal(typeof options, 'object');
        assert(options.headers);

        const headers = options.headers;
        assert.equal(headers['Content-Type'], 'application/vnd.api+json');
        assert.equal(headers['Authorization'], `apikey ${API_KEY}`);
        assert.equal(headers['User-Agent'], `imgix-management-js/${PACKAGE_VERSION}`);
        stubFetch.restore();
    });

    it('respects an overriding request method', () => {
        const stubFetch = sinon.stub(fetchWrapper, 'fetch');
        const POST = 'post';
        const customOptions = {
            method: POST
        }
        ix.request(ASSETS_ENDPOINT, customOptions);

        const options = stubFetch.getCalls(0)[0].lastArg;
        assert.equal(options.method, POST);
        stubFetch.restore();
    });
});
