// const { API_URL } = require('../src/constants');
const { API_URL } = require('../dist/constants.cjs');

const API_KEY =
  'ak_abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789';
const AUTHORIZATION_HEADER = `Bearer ${API_KEY}`;
const INVALID_API_KEY = 'TEST-KEY';
const API_VERSION_OVERRIDE = 2;
const SOURCE_ID = '012abc345def678abc901def';
const ASSETS_ENDPOINT = `assets/${SOURCE_ID}`;
const ASSETS_URL = (apiVersion) =>
  `${API_URL}/v${apiVersion}/${ASSETS_ENDPOINT}`;
const BODY_BUFFER = new Buffer.alloc(1);
const BODY_JSON = { data: 'test' };
const BODY_JSON_STRING = JSON.stringify({ data: 'test' });
const INVALID_BODY = '{';
const POST = 'post';
const CONTENT_TYPE_JSON = 'application/vnd.api+json';
const CONTENT_TYPE_OCTET = 'application/octet-stream';

module.exports = {
  API_KEY: API_KEY,
  AUTHORIZATION_HEADER: AUTHORIZATION_HEADER,
  INVALID_API_KEY: INVALID_API_KEY,
  API_VERSION_OVERRIDE: API_VERSION_OVERRIDE,
  SOURCE_ID: SOURCE_ID,
  ASSETS_ENDPOINT: ASSETS_ENDPOINT,
  ASSETS_URL: ASSETS_URL,
  BODY_BUFFER: BODY_BUFFER,
  BODY_JSON: BODY_JSON,
  BODY_JSON_STRING: BODY_JSON_STRING,
  INVALID_BODY: INVALID_BODY,
  POST: POST,
  CONTENT_TYPE_JSON: CONTENT_TYPE_JSON,
  CONTENT_TYPE_OCTET: CONTENT_TYPE_OCTET,
};
