// Depending on loading environment, either use
// window.fetch or node-fetch to complete requests
let fetchWrapper;

if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
  fetchWrapper = window.fetch.bind(window);
} else {
  fetchWrapper = require('node-fetch');
}

module.exports = {
  fetch: fetchWrapper,
};
