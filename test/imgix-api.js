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
        assert(ix.settings.version == 2);
    });
});

describe('ImgixAPI.prototype.request', () => {
    var ix;

    beforeEach(function setupClient() {
        ix = new ImgixAPI();
    });

    it('exposes a method request() on the object prototype', () => {
        assert(typeof ix.request === 'function');
    });
});
