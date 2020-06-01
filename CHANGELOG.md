# CHANGELOG

## [0.1.0](https://github.com/imgix/imgix-management-js/compare/v0.1.0...master) (2020-05-29)

Exposes a client class `ImgixAPI` for making requests against the [imgix](https://www.imgix.com/) Management API.

## Configuration

The following options can be used when creating an instance of `ImgixAPI`:

- `apiKey`: String, required. The token used to authenticate API requests.
- `version`: Integer. The version of the API that will be requested against. Defaults to `1`.

## API

### `ImgixAPI.request(path, options)`

- `path`: String, required. A partial path representing the relative URL endpoint to request. This will typically require a `sourceId`.
- `options`: Object. Any custom HTTP(S) settings to be applied to a request.
  - `method`: String, required. The request [method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), defaults to 'GET'.
  - `headers`: Object. Additional [information](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) included with a request.
  - `body`: Object, String, or Buffer. A resource, such as binary data or a file, included with the request.

Makes a request against the specified imgix Management API endpoint.

**Returns**: `Promise<[Response]>`
