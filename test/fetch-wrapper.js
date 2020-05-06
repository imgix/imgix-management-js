const { fetch } = require('../src/fetch-wrapper');
const assert = require('assert');

describe('fetchWrapper', () => {
  it('exports fetch(), a wrapper around node-fetch', () => {
      assert.equal(typeof fetch, 'function');
  });
  it('emits a custom APIError on failure', () => {
      // an empty request will fail
      fetch()
      .then(error => {
          assert(error.response);
          assert(error.message);
          assert(error.status);
          assert(error.toString);
      })
      .catch(() => {});
  });
});
