const ImgixAPI = require('../src/imgix-api');
const fetchWrapper = require('../src/fetch-wrapper');

//import testing dependencies
const assert = require('assert');
const sinon = require('sinon');

// import testing constants
const { API_KEY, AUTHORIZATION_HEADER, INVALID_API_KEY, API_VERSION_OVERRIDE, ASSETS_ENDPOINT, ASSETS_URL, BODY_BUFFER, BODY_JSON, BODY_JSON_STRING, INVALID_BODY, POST, CONTENT_TYPE_JSON, CONTENT_TYPE_OCTET } = require('./constants');
const {  USER_AGENT } = require('../src/constants');

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
        const stubFetch = sinon.stub(fetchWrapper, 'fetch').returns(Promise.resolve());
        ix.request(ASSETS_ENDPOINT)
        .catch(resp => resp);

        const url = stubFetch.getCalls(0)[0].firstArg;
        assert(stubFetch.callCount == 1);
        assert.equal(url, ASSETS_URL(version));
        stubFetch.restore();
    });

    it('passes all default headers', () => {
        const stubFetch = sinon.stub(fetchWrapper, 'fetch').returns(Promise.resolve());
        ix.request(ASSETS_ENDPOINT)
        .catch(resp => resp);

        const options = stubFetch.getCalls(0)[0].lastArg;
        assert(stubFetch.callCount == 1);
        assert.equal(typeof options, 'object');
        const headers = options.headers;
        assert(headers);

        assert.equal(headers['Content-Type'], CONTENT_TYPE_JSON);
        assert.equal(headers['Authorization'], AUTHORIZATION_HEADER);
        assert.equal(headers['User-Agent'], USER_AGENT);
        stubFetch.restore();
    });

    it('respects an overriding request method', () => {
        const stubFetch = sinon.stub(fetchWrapper, 'fetch').returns(Promise.resolve());
        const customOptions = {
            method: POST
        };

        ix.request(ASSETS_ENDPOINT, customOptions)
        .catch(resp => resp);

        const options = stubFetch.getCalls(0)[0].lastArg;
        assert.equal(options.method, POST);
        stubFetch.restore();
    });

    it('changes the Content-Type when a Buffer is passed to body', () => {
        const stubFetch = sinon.stub(fetchWrapper, 'fetch').returns(Promise.resolve());
        const customOptions = {
            method: POST,
            body: BODY_BUFFER
        };

        ix.request(ASSETS_ENDPOINT, customOptions)
        .catch(resp => resp);

        const options = stubFetch.getCalls(0)[0].lastArg;
        assert(stubFetch.callCount == 1);
        assert.equal(typeof options, 'object');
        const headers = options.headers;
        assert(headers);

        assert.equal(headers['Content-Type'], CONTENT_TYPE_OCTET);
        stubFetch.restore();
    });

    it('does not modify a JSON string passed into body', () => {
        const stubFetch = sinon.stub(fetchWrapper, 'fetch').returns(Promise.resolve());
        const customOptions = {
            method: POST,
            body: BODY_JSON_STRING
        };

        ix.request(ASSETS_ENDPOINT, customOptions)
        .catch(resp => resp);

        const options = stubFetch.getCalls(0)[0].lastArg;
        assert(stubFetch.callCount == 1);
        assert(options);
        assert.equal(typeof options, 'object');

        const body = options.body;
        assert.equal(typeof body, 'string');
        assert.equal(body, BODY_JSON_STRING);
        stubFetch.restore();
    });

    it('stringifies a JSON object passed into body', () => {
        const stubFetch = sinon.stub(fetchWrapper, 'fetch').returns(Promise.resolve());
        const customOptions = {
            method: POST,
            body: BODY_JSON
        };

        ix.request(ASSETS_ENDPOINT, customOptions)
        .catch(resp => resp);

        const options = stubFetch.getCalls(0)[0].lastArg;
        assert(stubFetch.callCount == 1);
        assert(options);
        assert.equal(typeof options, 'object');

        const body = options.body;
        assert.equal(typeof body, 'string');
        assert.equal(body, BODY_JSON_STRING);
        stubFetch.restore();
    });

    it('does not change the Content-Type when a JSON object is passed to body', () => {
        const stubFetch = sinon.stub(fetchWrapper, 'fetch').returns(Promise.resolve());
        const customOptions = {
            method: POST,
            body: BODY_JSON
        };

        ix.request(ASSETS_ENDPOINT, customOptions)
        .catch(resp => resp);

        const options = stubFetch.getCalls(0)[0].lastArg;
        assert(stubFetch.callCount == 1);
        assert.equal(typeof options, 'object');
        
        const headers = options.headers;
        assert(headers);
        assert.equal(headers['Content-Type'], CONTENT_TYPE_JSON);
        stubFetch.restore();
    });

    it('throws an error when body is not a valid type', () => {
        const stubFetch = sinon.stub(fetchWrapper, 'fetch').returns(Promise.resolve());
        const customOptions = {
            method: POST,
            body: INVALID_BODY
        };

        assert.throws(() => ix.request(ASSETS_ENDPOINT, customOptions), Error);
        assert(stubFetch.callCount == 0);
        stubFetch.restore();
    });
});
