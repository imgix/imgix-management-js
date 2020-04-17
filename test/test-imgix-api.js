var ImgixAPI = require('../src/imgix-api');
var assert = require('assert');

describe('The imgix API class', function describeSuite() {
    it('creates an instance of the class', function testSpec() {
        var ix = new ImgixAPI();
        assert(ix);
    });

    it('is created with a default version value', function testSpec() {
        var ix = new ImgixAPI();
        assert(ix.settings.version);
    });

    it('allows the version value to be set', function testSpec() {
        var ix = new ImgixAPI({version: 2});
        assert(ix.settings.version == 2);
    });
});

describe('ImgixAPI.prototype.request', function describeSuite() {
    var ix;

    beforeEach(function setupClient() {
        ix = new ImgixAPI();
    });

    it('exposes a method request() on the object prototype', function testSpec() {
        assert(typeof ix.request === 'function');
    });

    it('emits a custom ApiError on failed request', function testSpec() {
        // an empty request will fail
        ix.request()
        .catch(error => {
            assert(error.response);
            assert(error.message);
            assert(error.status);
            assert(error.toString);
        });
    });
});