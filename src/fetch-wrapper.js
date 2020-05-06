const nodeFetch = require('node-fetch');

// Depending on loading environment, either use
// window.fetch or node-fetch to complete requests
let fetchWrapper;

if (exports.window && typeof exports.window.fetch === 'function') {
    fetchWrapper = exports.window.fetch;
} else {
    fetchWrapper = nodeFetch;
}

module.exports = {
    fetch: fetchWrapper,
};
