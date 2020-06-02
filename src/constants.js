const PACKAGE_VERSION = require('../package.json').version;
const USER_AGENT = `imgix-management-js/${PACKAGE_VERSION}`;
const API_URL = 'https://api.imgix.com/api';

module.exports = {
  PACKAGE_VERSION: PACKAGE_VERSION,
  USER_AGENT: USER_AGENT,
  API_URL: API_URL,
};
