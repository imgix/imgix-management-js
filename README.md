<!-- ix-docs-ignore -->

![imgix logo](https://assets.imgix.net/sdk-imgix-logo.svg)

`imgix-management-js` is a JavaScript client library for making requests against the [imgix](https://www.imgix.com/) management API.

[![Build Status](https://travis-ci.org/imgix/imgix-management-js.svg?branch=master)](https://travis-ci.org/imgix/imgix-management-js)

---

<!-- /ix-docs-ignore -->

## Installation

`npm install imgix-management-js`

`imgix-management-js` exposes a class `ImgixAPI`, which can be loaded in the following way:

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
- `options`: A combination of User and [HTTP(S)](#Options) options.

Makes a request against the specified imgix management API endpoint.

**Returns**: <code>Promise<[Response](#class-response)></code>

The supplied `path` should be a relative URL, such as `assets/{sourceId}`. Using this path, the full API URL will be constructed at the time that the request is made, saving users the need to provide the full URL themselves each time.

`ImgixAPI` will intelligently populate any necessary headers prior to completing the request. This includes fields such as `Content-Type` and `Authorization`. Outside of that, the `options` argument can be used to override certain defaults, such as the HTTP request method, or provide a file for uploading.

## Usage

### Search: retrieve a list of images

```js
ix.request(`assets/${sourceId}`)
.then(res => console.log(res));
```

## Retrieve all details for a single image

```js
ix.request(`assets/${sourceId}/${originPath}`)
.then(res => console.log(res));
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

ix.request('assets/${sourceId}/uploads/pecanpie.jpg',{
    method: 'PATCH',
    body: JSON.stringify(metadata)
})
.then(res => console.log(res));
```

### Uploading an image

```js
const data = fs.readFileSync('./src/monstera.jpg');

ix.request('sources/upload/5d703ed13f876f000190b31d/monstera.jpg', {
    method: 'POST',
    body: data
})

```
