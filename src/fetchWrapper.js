const nodeFetch = require("node-fetch");

// Custom API error to throw
function APIError(message, data, status) {
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

// A wrapper around nodeFetch()
function fetch(url = '', options = {}) {
    let response = null;

    return nodeFetch(url, options)
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
                throw new APIError(`Request failed with status ${ response.status }.`, error, response.status);
            } else {
                throw new APIError(error.toString(), null, 'REQUEST_FAILED');
            }
        });
};

module.exports = {
    fetch: fetch
}
