⚠️ **This library is currently marked as experimental. We plan to eventually integrate it as its own module in [`imgix-core-js`](https://github.com/imgix/imgix-core-js).**

<!-- ix-docs-ignore -->

![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)

`imgix-management-js` is a JavaScript client library for making requests against the [imgix](https://www.imgix.com/) Management API.

[![Build Status](https://travis-ci.org/imgix/imgix-management-js.svg?branch=master)](https://travis-ci.org/imgix/imgix-management-js)

---

<!-- /ix-docs-ignore -->

## Installation

`npm install imgix-management-js`

`imgix-management-js` exposes a class `ImgixAPI`:

### CommonJS

```js
const ImgixAPI = require("imgix-management-js");

const imgix = new ImgixAPI({
    apiKey: `${yourApiKey}`
});
```

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

**Returns**: <code>Promise<[Response](#class-response)></code>

The supplied `path` should be a relative URL, such as `assets/{sourceId}`. Using this path, the full API URL will be constructed at the time that the request is made, saving users the need to provide the full URL themselves each time.

`ImgixAPI` will intelligently populate any necessary headers prior to completing the request. This includes fields such as `Content-Type` and `Authorization`. Outside of that, the `options` argument can be used to override certain defaults, such as the HTTP request method, or provide a file for uploading.

## Usage Examples

### Retrieve a list of images

```js
imgix.request(`assets/${sourceId}`)
.then(response => console.log(JSON.stringify(response, null, 2)));
```

## Retrieve all details for a single image

```js
imgix.request(`assets/${sourceId}/${originPath}`)
.then(response => console.log(JSON.stringify(response, null, 2)));
```

### Patch asset metadata

```js
var metadata = {
    "data": {
        "attributes": {
            "categories": [
                "Dessert"
            ],
            "labels_user_defined": {
                "Pecan pie": 0
            },
            "metadata": {
                "my_custom_key": "my_custom_value"
            }
        },
        "id": `${sourceId}/uploads/pecanpie.jpg`,
        "type": "assets"
    }
};

imgix.request('assets/${sourceId}/uploads/pecanpie.jpg',{
    method: 'PATCH',
    body: metadata
})
.then(response => console.log(JSON.stringify(response, null, 2)));
```

### Uploading an image

```js
const data = fs.readFileSync('./src/monstera.jpg');

imgix.request('sources/upload/5d703ed13f876f000190b31d/monstera.jpg', {
    method: 'POST',
    body: data
})
.then(response => console.log(JSON.stringify(response, null, 2)));
```
