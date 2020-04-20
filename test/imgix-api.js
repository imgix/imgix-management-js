const ImgixAPI = require('../src/imgix-api');
const assert = require('assert');

describe('The imgix API class', () => {
    it('creates an instance of the class', () => {
        var ix = new ImgixAPI();
        assert(ix);
    });

    it('is created with a default version value', () => {
        var ix = new ImgixAPI();
        assert(ix.settings.version);
    });

    it('allows the version value to be set', () => {
        var ix = new ImgixAPI({version: 2});
        assert.equal(ix.settings.version, 2);
    });

    it('fetch exists in the global namespace as window.fetch', function testSpec() {
        assert.throws(() => assert(window.fetch), Error);
    });
});

describe('ImgixAPI.prototype.request', () => {
    var ix;

    before(function setupClient() {
        ix = new ImgixAPI();
    });

    it('exposes a method request() on the object prototype', () => {
        assert.equal(typeof ix.request, 'function');
    });

    it('calling request() returns a response as a Promise', () => {
        const req1 = ix.request("https://api.imgix.com/api/v1/assets")
        .then(response => {
            assert.exists(response.headers);
        })
        .catch(() => {});

        assert.equal(typeof req1.then, 'function');
    });
});
