import { JSONResponse } from "@monobox/appointment-contract";

import {
  NetworkClient as AbstractNetworkClient,
  NetworkRequestMethod,
  NetworkRequestOptionsWithBody,
} from "@monobox/infra";

const BASE_HEADERS = (() => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return headers;
})();

export class NetworkClientError extends Error {
  name = "NetworkClientError";

  constructor(message?: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NetworkClientError.prototype);
  }
}

export class NetworkClient extends AbstractNetworkClient {
  async request<TData = undefined>(
    method: NetworkRequestMethod,
    resource: string,
    options?: NetworkRequestOptionsWithBody | undefined
  ): Promise<TData> {
    const { query, headers, body } = options ?? {};

    const url = new URL(this.host, resource);

    if (query) {
      for (const param of Object.keys(query)) {
        url.searchParams.append(param, query[param]);
      }
    }

    const headersInit = new Headers({ ...BASE_HEADERS, ...headers });

    const response = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: headersInit,
    });

    if (response.ok) {
      const jsonResponse: JSONResponse<TData> = await response.json();

      if ("message" in jsonResponse) {
        throw new NetworkClientError(jsonResponse.message);
      }

      return jsonResponse.data;
    }

    throw new NetworkClientError(response.statusText);
  }
}
