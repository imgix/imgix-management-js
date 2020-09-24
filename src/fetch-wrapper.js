// const nodeFetch = require('node-fetch');
import nodeFetch from 'node-fetch';

// Depending on loading environment, either use
// window.fetch or node-fetch to complete requests
let fetchWrapper = {};

if (typeof window !== 'undefined' && typeof window.fetch === 'function') {
  fetchWrapper.fetch = window.fetch;
} else {
  fetchWrapper.fetch = nodeFetch;
}

export default fetchWrapper;
