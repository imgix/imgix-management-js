import { expectType } from 'tsd';
import ImgixAPI, { RequestResponse, APIError, JsonArray, JsonMap } from '.';

const API_KEY =
  'ak_abcdef0123456789abcdef0123456789abcdef0123456789abcdef0123456789';
const SOURCE_ID = '012abc345def678abc901def';
const BAD_REQUEST = '404_endpoint';
const ASSETS_ENDPOINT = `assets/${SOURCE_ID}`;
const BODY_BUFFER = Buffer.alloc(1);
const BODY_JSON = { data: 'test' };

const ix = new ImgixAPI({
  apiKey: API_KEY,
  version: 1,
  pluginOrigin: 'management',
});
expectType<ImgixAPI>(ix);

expectType<APIError>(ImgixAPI.APIError);

expectType<Promise<RequestResponse>>(ix.request('sources'));

expectType<Promise<RequestResponse>>(ix.request(`${ASSETS_ENDPOINT}`));

expectType<Promise<RequestResponse>>(
  ix.request(`sources/upload/${SOURCE_ID}/image.jpg`, {
    method: 'POST',
    body: BODY_BUFFER,
  }),
);

expectType<Promise<RequestResponse>>(
  ix.request('sources', {
    method: 'POST',
    body: BODY_JSON,
  }),
);

ix.request('sources').then((response) => {
  expectType<JsonMap | JsonArray>(response.data);
  expectType<JsonArray>(response.included);
  expectType<JsonMap>(response.jsonapi);
  expectType<JsonMap>(response.meta);
});

expectType<Promise<void | RequestResponse>>(
  ix.request(`${BAD_REQUEST}`).catch((error: APIError) => {
    expectType<JsonMap>(error.response);
    expectType<string>(error.message);
    expectType<number>(error.status);
    expectType<() => string>(error.toString);
  }),
);

async function processRequest(request: Promise<RequestResponse>) {
  const response = await request;
  expectType<RequestResponse>(response);
}

processRequest(ix.request('sources'));

try {
  () => {};
} catch (error) {
  if (error instanceof APIError) {
    expectType<JsonMap>(error.response);
    expectType<string>(error.message);
    expectType<number>(error.status);
    expectType<string>(error.toString());
  }
}
