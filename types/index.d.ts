/// <reference types="typescript" />
import { RequestInit, BodyInit } from 'node-fetch';

// JSON types via https://github.com/microsoft/TypeScript/issues/1897#issuecomment-338650717
type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {
  [key: string]: AnyJson;
}
interface JsonArray extends Array<AnyJson> {}

interface RequestResponse {
  data: JsonMap | JsonArray;
  included: JsonArray;
  jsonapi: JsonMap;
  meta: JsonMap;
}

interface RequestError {
  response: JsonMap;
  message: string;
  status: number;
  toString(): string;
}

interface JsonBody {
  body?: BodyInit | JsonMap;
}

type RequestOptions = RequestInit | JsonBody;

declare class ImgixAPI {
  apiKey: string;
  version: number;

  constructor(opts: { apiKey: string; version?: number });

  request(
    path: string,
    options?: RequestOptions,
  ): Promise<RequestResponse | RequestError>;
}

export = ImgixAPI;
