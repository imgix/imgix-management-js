(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('ImgixAPI', ['exports', './fetchWrapper', './validators'], factory);
    } else if (typeof exports !== 'undefined') {
        // CommonJS
        module.exports = factory(exports, require('./fetchWrapper'), require('./validators'));
    } else {
        // Browser globals
        var mod = {
            exports: {
                window
            }
        };
        global.ImgixAPI = factory(mod.exports, global.fetchWrapper, global.validators);
    }
})(this, function (exports, fetchWrapper, validators) {
    'use strict';
    const API_URL = 'https://api.imgix.com/api';

    const { validateOpts } = validators;

    // Depending on loading environment, either use
    // window.fetch or node-fetch to complete requests
    let fetch;
    if (exports.window !== undefined) {
        fetch = window.fetch;
    } else {
        fetch = fetchWrapper;
    }

    // default ImgixAPI settings passed in during instantiation
    const DEFAULTS = {
        version: 1,
        apiKey: null
    };

    const ImgixAPI = (() => {
        function ImgixAPI(opts = {}) {
            validateOpts(opts);
            this.settings = Object.assign({}, DEFAULTS, opts);
        };

        return ImgixAPI;
    })();

    ImgixAPI.prototype.request = function(path, userOptions = {}) {
        const defaultOptions = {
            method: 'get'
        };

        const defaultHeaders = {
            'Content-Type': 'application/vnd.api+json',
            'Authorization': `apikey ${this.settings.apiKey}`
        };

        const options = {
            ...defaultOptions,
            ...userOptions,
            headers: {
                ...userOptions.headers,
                ...defaultHeaders,
            },
        };
        const url = constructUrl(path, this.settings.version);

        return fetch(url, options);
    };

    const constructUrl = (path, version) => `${ API_URL }/v${ version }/${ path }`;

    return ImgixAPI;

});
