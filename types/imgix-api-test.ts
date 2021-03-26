import ImgixAPI = require('index');

const API_KEY =
  'ak_abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789';
const SOURCE_ID = '012abc345def678abc901def';
const ASSETS_ENDPOINT = `assets/${SOURCE_ID}`;
const BODY_BUFFER = Buffer.alloc(1);
const BODY_JSON = { data: 'test' };

// $ExpectType ImgixAPI
const ix = new ImgixAPI({
  apiKey: API_KEY,
});

// $ExpectType Promise<RequestResponse | RequestError>
ix.request('sources');

// $ExpectType Promise<RequestResponse | RequestError>
ix.request(`${ASSETS_ENDPOINT}`);

// $ExpectType Promise<RequestResponse | RequestError>
ix.request(`sources/upload/${SOURCE_ID}/image.jpg`, {
  method: 'POST',
  body: BODY_BUFFER,
});

// $ExpectType Promise<RequestResponse | RequestError>
ix.request(`sources`, {
  method: 'POST',
  body: BODY_JSON,
});
