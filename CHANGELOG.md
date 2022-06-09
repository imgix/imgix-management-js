## [1.3.1](https://github.com/imgix/imgix-management-js/compare/v1.3.0...v1.3.1) (2022-06-09)


### Bug Fixes

* remove instances of Node assert ([7c81a03](https://github.com/imgix/imgix-management-js/commit/7c81a03fc88e6454bdc6e6220746419e9bf736be))

# CHANGELOG

## [1.3.0](https://github.com/imgix/imgix-management-js/compare/v1.2.2...v1.3.0) (2022-03-25)

* feat: add class variable to set plugin header ([#95](https://github.com/imgix/imgix-management-js/pull/95))

## [1.3.0-rc.1](https://github.com/imgix/imgix-management-js/compare/v1.2.2...v1.3.0-rc.1) (2022-03-23)

* feat: add (experimental) class variable to set plugin header ([#95](https://github.com/imgix/imgix-management-js/pull/95))

## [1.2.2](https://github.com/imgix/imgix-management-js/compare/v1.2.1...v1.2.2) (2021-12-10)

* chore: replace dtslint dev-dependency with tsd ([#90](https://github.com/imgix/imgix-management-js/pull/90))
* chore: bump other dependencies

## [1.2.1](https://github.com/imgix/imgix-management-js/compare/v1.2.0...v1.2.1) (2021-04-23)

* docs: update mention of imgix-core-js to @imgix/js-core ([#87](https://github.com/imgix/imgix-management-js/pull/87))
* docs: fixes routes and id ([#86](https://github.com/imgix/imgix-management-js/pull/86))
* fix: rename RequestError to APIError to match class name ([#84](https://github.com/imgix/imgix-management-js/pull/84))
* fix: specify APIError as a static class property ([#82](https://github.com/imgix/imgix-management-js/pull/82))
* feat: export APIError on ImgixAPI class ([#80](https://github.com/imgix/imgix-management-js/pull/80))
* refactor: remove optional chain operator for compatibility ([#78](https://github.com/imgix/imgix-management-js/pull/78))
* fix: remove ResponseError from request() return type ([#78](https://github.com/imgix/imgix-management-js/pull/78))
* fix: always stringify error data ([#75](https://github.com/imgix/imgix-management-js/pull/75))
* refactor: use standard function syntax for class method ([#76](https://github.com/imgix/imgix-management-js/pull/76))

## [1.2.1-beta.4](https://github.com/imgix/imgix-management-js/compare/v1.2.1-beta.3...v1.2.1-beta.4) (2021-04-20)

* fix: rename RequestError to APIError to match class name ([#84](https://github.com/imgix/imgix-management-js/pull/84))

## [1.2.1-beta.3](https://github.com/imgix/imgix-management-js/compare/v1.2.1-beta.2...v1.2.1-beta.3) (2021-04-13)

* fix: specify APIError as a static class property ([#82](https://github.com/imgix/imgix-management-js/pull/82))

## [1.2.1-beta.2](https://github.com/imgix/imgix-management-js/compare/v1.2.1-beta.1...v1.2.1-beta.2) (2021-04-13)

* feat: export APIError on ImgixAPI class ([#80](https://github.com/imgix/imgix-management-js/pull/80))

## [1.2.1-beta.1](https://github.com/imgix/imgix-management-js/compare/v1.2.1-rc.1...v1.2.1-beta.1) (2021-04-09)

* refactor: remove optional chain operator for compatibility ([#78](https://github.com/imgix/imgix-management-js/pull/78))
* fix: remove ResponseError from request() return type ([#78](https://github.com/imgix/imgix-management-js/pull/78))

## [1.2.1-rc.1](https://github.com/imgix/imgix-management-js/compare/v1.2.0...v1.2.1-rc.1) (2021-04-07)

* fix: always stringify error data ([#75](https://github.com/imgix/imgix-management-js/pull/75))
* refactor: use standard function syntax for class method ([#76](https://github.com/imgix/imgix-management-js/pull/76))

## [1.2.0](https://github.com/imgix/imgix-management-js/compare/v1.1.0...v1.2.0) (2021-03-26)

* feat: add type definitions for ImgixAPI class and methods ([#67](https://github.com/imgix/imgix-management-js/pull/67))
* refactor: class APIError should extend Error interface ([#70](https://github.com/imgix/imgix-management-js/pull/70))

## [1.1.0](https://github.com/imgix/imgix-management-js/compare/v1.1.0-alpha.2...v1.1.0) (2020-09-24)

* refactor: only require node-fetch in node env ([#48](https://github.com/imgix/imgix-management-js/pull/48))

## [1.1.0-alpha.2](https://github.com/imgix/imgix-management-js/compare/v1.1.0-alpha.1...v1.1.0-alpha.2) (2020-09-24)

* fix: bind to `window.fetch` ([#47](https://github.com/imgix/imgix-management-js/pull/47))

## [1.1.0-alpha.1](https://github.com/imgix/imgix-management-js/compare/v1.0.0...v1.1.0-alpha.1) (2020-09-23)

* fix: incorrect reference to `Window` obj ([#45](https://github.com/imgix/imgix-management-js/pull/45))

## [1.0.0](https://github.com/imgix/imgix-management-js/compare/v0.2.0...v1.0.0) (2020-08-05)

* feat: use `Authorization: Bearer` in request header ([#33](https://github.com/imgix/imgix-management-js/pull/33))

## [0.2.0](https://github.com/imgix/imgix-management-js/compare/v0.1.2...v0.2.0) (2020-08-05)

* chore: emit `apiKey` deprecation warning ([#31](https://github.com/imgix/imgix-management-js/pull/31))

**Warning**: Your current `apiKey` will no longer work after upgrading to `imgix-management-js@1.0.0`. After upgrading, please regenerate your API Key at https://dashboard.imgix.com/api-keys

## [0.1.2](https://github.com/imgix/imgix-management-js/compare/v0.1.1...v0.1.2) (2020-06-02)

* fix: incorrectly extracted package version from package-lock file ([#21](https://github.com/imgix/imgix-management-js/pull/21))

## [0.1.1](https://github.com/imgix/imgix-management-js/compare/v0.1.0...v0.1.1) (2020-06-01)

* fix: designate valid 'main' entry file ([e7df07f](https://github.com/imgix/imgix-management-js/commit/e7df07ffbc98590cbb63067887b87fd4cc1cb346))

## [0.1.0](https://github.com/imgix/imgix-management-js/compare/main...v0.1.0) (2020-05-29)

Exposes a client class `ImgixAPI` for making requests against the [imgix](https://www.imgix.com/) Management API.

## Configuration

The following options can be used when creating an instance of `ImgixAPI`:

* `apiKey`: String, required. The token used to authenticate API requests.
* `version`: Integer. The version of the API that will be requested against. Defaults to `1`.

## API

### `ImgixAPI.request(path, options)`

* `path`: String, required. A partial path representing the relative URL endpoint to request. This will typically require a `sourceId`.
* `options`: Object. Any custom HTTP(S) settings to be applied to a request.
  * `method`: String, required. The request [method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), defaults to 'GET'.
  * `headers`: Object. Additional [information](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) included with a request.
  * `body`: Object, String, or Buffer. A resource, such as binary data or a file, included with the request.

Makes a request against the specified imgix Management API endpoint.

**Returns**: `Promise<[Response]>`
