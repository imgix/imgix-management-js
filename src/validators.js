function validateApiKey(value) {
  const invalidApiKeyError = new TypeError(
    'ImgixAPI.settings.apiKey must be passed a string',
  );

  if (typeof value !== 'string') {
    throw invalidApiKeyError;
  }
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
  if (!isValid) {
    throw invalidBodyError;
  }
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
    if (typeof body !== 'object' || Array.isArray(body) || body === null) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

module.exports = {
  validateApiKey: validateApiKey,
  validateOpts: validateOpts,
  validateBody: validateBody,
  isBuffer: isBuffer,
  isJSONString: isJSONString,
  isJSONObject: isJSONObject,
};
