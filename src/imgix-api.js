import APIError from './api-error';
import { API_URL, USER_AGENT } from './constants';
import { validateOpts, validateBody, isBuffer } from './validators';
// import { fetchWrapper } from './fetch-wrapper';
import fetchWrapper from './fetch-wrapper';

// default ImgixAPI settings passed in during instantiation
const DEFAULTS = {
  version: 1,
  apiKey: null,
};

function ImgixAPI(opts = {}) {
  validateOpts(opts);
  this.settings = Object.assign({}, DEFAULTS, opts);
}

ImgixAPI.prototype.request = function (path, userOptions = {}) {
  const defaultOptions = {
    method: 'get',
  };

  const defaultHeaders = {
    'Content-Type': 'application/vnd.api+json',
    Authorization: `Bearer ${this.settings.apiKey}`,
    'User-Agent': USER_AGENT,
  };

  // change the Content-Type if the request body is passed a valid uploadable file type
  let body = userOptions.body;
  if (body) {
    validateBody(body);

    if (isBuffer(body)) {
      defaultHeaders['Content-Type'] = 'application/octet-stream';
    } else if (typeof body == 'object') {
      userOptions.body = JSON.stringify(body);
    }
  }

  const options = {
    ...defaultOptions,
    ...userOptions,
    headers: {
      ...userOptions.headers,
      ...defaultHeaders,
    },
  };
  const url = constructUrl(path, this.settings.version);

  return fetchWrapper
    .fetch(url, options)
    .then((response) => {
      if (response.status < 200 || response.status >= 300) {
        return Promise.reject(response);
      } else {
        return response.json();
      }
    })
    .catch((error) => {
      if (error && error.status) {
        let response;

        if (typeof error.json == 'function') {
          response = error.json();
        } else if (typeof error.text == 'function') {
          response = error.text();
        }

        // console.log('Error output: \n',error);
        return response.then((data) => {
          const status = error.status;
          throw new APIError(
            `Request failed with status ${status}.`,
            data,
            status,
          );
        });
      } else {
        throw new APIError(error.toString(), null, 'REQUEST_FAILED');
      }
    });
};

const constructUrl = (path, version) => `${API_URL}/v${version}/${path}`;

export default ImgixAPI;
