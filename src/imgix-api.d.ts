// Type definitions for imgix-management-js
import { RequestInit } from "@types/node-fetch";

// JSON types via https://github.com/microsoft/TypeScript/issues/1897#issuecomment-338650717
type AnyJson = boolean | number | string | null | JsonArray | JsonMap;
interface JsonMap {  [key: string]: AnyJson; }
interface JsonArray extends Array<AnyJson> {}

interface ImgixResponse {
    data: JsonMap | JsonArray;
    included: JsonArray;
    jsonapi: JsonMap;
    meta: JsonMap;
}

declare class ImgixAPI {
    apiKey: string;
    version: number;

    constructor(opts: {
        apiKey: string;
        version?: number;
    });

    request(
        path: string,
        options?: RequestInit,
    ): Promise<ImgixResponse>
}

export = ImgixAPI;
