const { fetch } = require('../src/fetch-wrapper');
const nodeFetch = require('node-fetch');

const assert = require('assert');

describe('fetchWrapper', () => {
  it('exports a function: fetch', () => {
    assert.strictEqual(typeof fetch, 'function');
  });

  it('fetch returns a reference to node-fetch in a node.js env', () => {
    assert.strictEqual(fetch, nodeFetch);
  });
});
