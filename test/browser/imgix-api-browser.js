let assert = chai.assert;

describe('ImgixAPI in a browser environment', () => {
    var ix;

    before(() => {
        ix = new ImgixAPI();
    });

    it('creates an instance of the class', () => {
        assert.exists(ix);
    });

    it('is created with a default version value', () => {
        assert.exists(ix.settings.version);
    });

    it('respects the version number passed into the constructor', () => {
        var ix = new ImgixAPI({version: 2});
        assert.equal(ix.settings.version, 2);
    });

    it('exposes a method request() on the object prototype', () => {
        assert.equal(typeof ix.request, 'function');
    });

    it('fetch exists in the global namespace as window.fetch', () => {
        assert.equal(fetch, window.fetch);
    });

    it('calling request() returns a Promise as a response', () => {
        const req1 = ix.request("https://api.imgix.com/api/v1/assets")
        .then(response => {
            assert.exists(response.headers);
        });

        assert.equal(typeof req1.then, 'function');
    });
});
