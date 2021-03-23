// Type definitions for imgix-management-js
import { RequestInfo, RequestInit } from "@types/node-fetch";

interface ImgixResponse {
    data : {}
    included: {}
    jsonapi: {}
    meta: {}
}

declare class ImgixAPI {
    apiKey: string;
    version: number;

    constructor(opts: {
        apiKey: string;
        version?: number;
    });

    request(
        path: RequestInfo,
        options?: RequestInit,
    ): Promise<ImgixResponse>
}

export = ImgixAPI;
