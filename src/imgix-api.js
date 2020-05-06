(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define('ImgixAPI', ['exports', './fetch-wrapper', './validators', './constants', './api-error'], factory);
    } else if (typeof exports !== 'undefined') {
        // CommonJS
        module.exports = factory(exports, require('./fetch-wrapper'), require('./validators'), require('./constants'), require('./api-error'));
    } else {
        // Browser globals
        var mod = {
            exports: {
                window
            }
        };
        global.ImgixAPI = factory(mod.exports, global.fetchWrapper, global.validators);
    }
})(this, function (exports, fetchWrapper, validators, constants, APIError) {
    'use strict';
    const API_URL = constants.API_URL;
    const USER_AGENT = `imgix-management-js/${constants.PACKAGE_VERSION}`;
    const { validateOpts } = validators;

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
            'Authorization': `apikey ${this.settings.apiKey}`,
            'User-Agent': USER_AGENT
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
        let response = null;

        return fetchWrapper.fetch(url, options)
        .then(response => {
            // HTTP unauthorized
            if (response.status === 401) {
                // Handle unauthorized requests
            }

            // Check for error HTTP error codes
            if (response.status < 200 || response.status >= 300) {
                return response.text();
            } else {
                return response.json();
            }
        })
        .catch(error => {
            if (response) {
                throw new APIError(`Request failed with status ${ response.status }.`, error, response.status);
            } else {
                throw new APIError(error.toString(), null, 'REQUEST_FAILED');
            }
        });
    };

    const constructUrl = (path, version) => `${ API_URL }/v${ version }/${ path }`;

    return ImgixAPI;

});
