import ImgixAPI, { RequestResponse, APIError } from 'index';

const API_KEY =
  'ak_abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789';
const SOURCE_ID = '012abc345def678abc901def';
const BAD_REQUEST = '404_endpoint';
const ASSETS_ENDPOINT = `assets/${SOURCE_ID}`;
const BODY_BUFFER = Buffer.alloc(1);
const BODY_JSON = { data: 'test' };

// $ExpectType ImgixAPI
const ix = new ImgixAPI({
  apiKey: API_KEY,
});

// $ExpectType APIError
ImgixAPI.APIError;

// $ExpectType Promise<RequestResponse>
ix.request('sources');

// $ExpectType Promise<RequestResponse>
ix.request(`${ASSETS_ENDPOINT}`);

// $ExpectType Promise<RequestResponse>
ix.request(`sources/upload/${SOURCE_ID}/image.jpg`, {
  method: 'POST',
  body: BODY_BUFFER,
});

// $ExpectType Promise<RequestResponse>
ix.request('sources', {
  method: 'POST',
  body: BODY_JSON,
});

ix.request('sources').then((response) => {
  response.data; // $ExpectType JsonMap | JsonArray
  response.included; // $ExpectType JsonArray
  response.jsonapi; // $ExpectType JsonMap
  response.meta; // $ExpectType JsonMap
});

// $ExpectType Promise<void | RequestResponse>
ix.request(`${BAD_REQUEST}`).catch((error: APIError) => {
  error.response; // $ExpectType JsonMap
  error.message; // $ExpectType string
  error.status; // $ExpectType number
  error.toString; // $ExpectType () => string
});

async function processRequest(request: Promise<RequestResponse>) {
  // $ExpectType RequestResponse
  const response = await request;
}

processRequest(ix.request('sources'));
