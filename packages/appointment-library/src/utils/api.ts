import { JSONResponse } from "@monobox/appointment-contract";

export class ApiError extends Error {
  name = "ApiError";

  constructor(message?: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

const BASE_HEADERS = (() => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return headers;
})();

export type ApiRequestOptions = {
  baseUrl: string;
  body?: Record<PropertyKey, unknown>;
  headers?: Record<string, string>;
};

const apiRequest = (method: Request["method"]) => {
  return async <Data = undefined>(resource: string, options: ApiRequestOptions): Promise<Data> => {
    const { baseUrl, body, headers } = options;

    const headersInit = new Headers({ ...BASE_HEADERS, ...headers });

    const response = await fetch(`${baseUrl}/${resource}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: headersInit,
    });

    if (response.ok) {
      const jsonResponse: JSONResponse<Data> = await response.json();

      if ("message" in jsonResponse) {
        throw new ApiError(jsonResponse.message);
      }

      return jsonResponse.data;
    }

    throw new ApiError(response.statusText);
  };
};

export const get = apiRequest("GET");
export const post = apiRequest("POST");
export const put = apiRequest("PUT");
export const remove = apiRequest("DELETE");
