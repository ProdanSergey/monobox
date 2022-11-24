import { JSONResponse } from "@monobox/appointment-contract";

import {
  NetworkClient,
  NetworkRequestMethod,
  NetworkRequestOptionsWithBody,
  NetworkClientError,
  NetworkClientQuery,
  NetworkClientHeaders,
} from "@monobox/frontend";

export class AppointmentNetworkClientError extends Error {
  name = "AppointmentNetworkClientError";

  constructor(message?: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AppointmentNetworkClientError.prototype);
  }
}

export type NetworkRequestInterceptor = (req: Request) => Promise<Request> | Request;
export type NetworkResponseInterceptor = (res: Response) => Promise<Response> | Response;

export class AppointmentNetworkClient extends NetworkClient {
  interceptors = {
    request: new Set<NetworkRequestInterceptor>(),
    response: new Set<NetworkResponseInterceptor>(),
  };

  private withQuery(url: URL, query: NetworkClientQuery): void {
    for (const param of Object.keys(query)) {
      url.searchParams.append(param, query[param]);
    }
  }

  private withHeaders(request: Request, headers: NetworkClientHeaders): void {
    for (const header of Object.keys(headers)) {
      request.headers.set(header, headers[header]);
    }
  }

  private async serialize<TData = undefined>(response: Response): Promise<TData> {
    const jsonResponse: JSONResponse<TData> = await response.json();

    if ("message" in jsonResponse) {
      throw new NetworkClientError(jsonResponse.message);
    }

    return jsonResponse.data;
  }

  async request<TData = undefined>(
    method: NetworkRequestMethod,
    resource: string,
    options?: NetworkRequestOptionsWithBody | undefined
  ): Promise<TData> {
    const { query, headers, body } = options ?? {};

    const url = new URL(this.host, resource);

    if (query) {
      this.withQuery(url, query);
    }

    let request = new Request(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (headers) {
      this.withHeaders(request, headers);
    }

    for (const interceptor of this.interceptors.request) {
      request = await interceptor(request);
    }

    console.log(fetch);

    let response = await fetch(request);

    for (const interceptor of this.interceptors.response) {
      response = await interceptor(response);
    }

    if (response.ok) {
      return this.serialize(response);
    }

    throw new NetworkClientError(response.statusText);
  }
}
