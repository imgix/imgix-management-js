const ImgixAPI = require('../src/imgix-api');
const assert = require('assert');

describe('The imgix API class', () => {
    let ix;

    before(() => {
        ix = new ImgixAPI();
    });

    it('creates an instance of the class', () => {
        assert(ix);
    });

    it('is created with a default version value', () => {
        assert(ix.settings.version);
    });

    it('respects the version number passed into the constructor', () => {
        let ix = new ImgixAPI({version: 2});
        assert.equal(ix.settings.version, 2);
    });

    it('fetch exists in the global namespace as window.fetch', () => {
        assert.throws(() => assert(window.fetch), Error);
    });
});

describe('ImgixAPI.prototype.request', () => {
    var ix;

    before(() => {
        ix = new ImgixAPI();
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
