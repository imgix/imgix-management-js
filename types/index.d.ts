/// <reference types="typescript" />
import { RequestInit, BodyInit } from 'node-fetch';

// JSON types via https://github.com/microsoft/TypeScript/issues/1897#issuecomment-338650717
type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap extends Record<string, AnyJson> {}
interface JsonArray extends Array<AnyJson> {}

export interface RequestResponse {
  data: JsonMap | JsonArray;
  included: JsonArray;
  jsonapi: JsonMap;
  meta: JsonMap;
}

export interface RequestError extends Error {
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
  APIError: RequestError;

  constructor(opts: { apiKey: string; version?: number });

  /**
   * Note: on failure, this will return a type Promise\<RequestError>
   * @see RequestError
   */
  request(path: string, options?: RequestOptions): Promise<RequestResponse>;
}

export default ImgixAPI;
