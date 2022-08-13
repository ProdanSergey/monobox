import { JSONResponse } from "@monobox/appointment-contract";

import {
  NetworkClient,
  NetworkRequestMethod,
  NetworkRequestOptionsWithBody,
  NetworkClientError,
} from "@monobox/toolkit";

const BASE_HEADERS = (() => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  return headers;
})();

export class AppointmentNetworkClientError extends Error {
  name = "AppointmentNetworkClientError";

  constructor(message?: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppointmentNetworkClientError.prototype);
  }
}

type NetworkRequestInterceptor = (req: Request) => Promise<void> | void;
type NetworkResponseInterceptor = (res: Response) => Promise<void> | void;

export class AppointmentNetworkClient extends NetworkClient {
  interceptors = {
    request: new Set<NetworkRequestInterceptor>(),
    response: new Set<NetworkResponseInterceptor>(),
  };

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

    const request = new Request(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: new Headers({ ...BASE_HEADERS, ...headers }),
    });

    for (const interceptor of this.interceptors.request) {
      await interceptor(request);
    }

    const response = await fetch(request);

    for (const interceptor of this.interceptors.response) {
      await interceptor(response);
    }

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
