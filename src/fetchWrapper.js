const fetch = require("node-fetch");
const API_URL = 'https://api.imgix.com/api';

// Custom API error to throw
function ApiError(message, data, status) {
    let response = null;
    let isObject = false;

    try {
        response = JSON.parse(data);
        isObject = true;
    } catch (e) {
        response = data;
    }

    this.response = response;
    this.message = message;
    this.status = status;

    this.toString = () => `${ this.message }\nResponse:\n${ isObject ? JSON.stringify(this.response, null, 2) : this.response }`;
}

// A wrapper around fetch()
const fetchWrapper = (path = '', userOptions = {}) => {
    const defaultOptions = {
        method: 'get'
    };

    const defaultHeaders = {
        'Content-Type': 'application/vnd.api+json'
    };

    const options = {
        ...defaultOptions,
        ...userOptions,
        headers: {
        ...defaultHeaders,
        ...userOptions.headers,
        },
    };

    const apiVersion = userOptions.version;
    const url = `${ API_URL }/v${ apiVersion }/${ path }`;

    /* TODO
    /* Test with uploading API
        // Detect if we are uploading a file
        const isFile = null //options.body instanceof File;

        // Stringify JSON data if body is not a file
        if (options.body && typeof options.body === 'object' && !isFile) {
            options.body = JSON.stringify(options.body);
        }
    */

    let response = null;

    return fetch(url, options)
        .then(responseObject => {
            response = responseObject;

            // HTTP unauthorized
            if (response.status === 401) {
                // Handle unauthorized requests
            }

            // Check for error HTTP error codes
            if (response.status < 200 || response.status >= 300) {
                return response.text();
            }

            return response.json();
        })
        .catch(error => {
            if (response) {
                throw new ApiError(`Request failed with status ${ response.status }.`, error, response.status);
            } else {
                throw new ApiError(error.toString(), null, 'REQUEST_FAILED');
            }
        });
};

module.exports = fetchWrapper;
