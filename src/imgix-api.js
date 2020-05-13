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
    const { API_URL, USER_AGENT } = constants;
    const { validateOpts, validateBody, isBuffer } = validators;

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

        // change the Content-Type if the request body is passed a valid uploadable file type
        let body = userOptions.body;
        if (body) {
            validateBody(body);

            if (isBuffer(body)) {
                defaultHeaders['Content-Type'] = 'application/octet-stream';
            } else if (typeof body == 'object') {
                userOptions.body = JSON.stringify(body);
            }
        }

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
        .then(responseObject => {
            response = responseObject;

            if (response.status < 200 || response.status >= 300) {
                return response.text();
            } else {
                return response.json();
            }
        })
        .then(parsedResponse => {
            if (response.status < 200 || response.status >= 300) {
                throw parsedResponse;
            }

            return parsedResponse;
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
