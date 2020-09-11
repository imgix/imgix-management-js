// const assert = require('assert');
import { assert } from 'assert';
function validateApiKey(value) {
  const invalidApiKeyError = new TypeError(
    'ImgixAPI.settings.apiKey must be passed a string',
  );

  assert(typeof value === 'string', invalidApiKeyError);
}

function validateOpts(options) {
  validateApiKey(options.apiKey);
}

function validateBody(body) {
  const invalidBodyError = new TypeError(
    'The request body must a valid JSON object or a Buffer',
  );

  const isValid =
    body && (isJSONString(body) || isJSONObject(body) || isBuffer(body));
  assert(isValid, invalidBodyError);
}

function isBuffer(body) {
  return Buffer.isBuffer(body);
}

function isJSONString(body) {
  try {
    JSON.parse(body);
  } catch (e) {
    return false;
  }
  return true;
}

function isJSONObject(body) {
  try {
    assert.equal(typeof body, 'object');
  } catch (e) {
    return false;
  }
  return true;
}

export default {
  validateApiKey: validateApiKey,
  validateOpts: validateOpts,
  validateBody: validateBody,
  isBuffer: isBuffer,
  isJSONString: isJSONString,
  isJSONObject: isJSONObject,
};
