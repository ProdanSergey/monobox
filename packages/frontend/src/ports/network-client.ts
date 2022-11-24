export class NetworkClientError extends Error {
  name = "NetworkClientError";

  constructor(message?: string) {
    super(message);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, NetworkClientError.prototype);
  }
}

export type NetworkRequestMethod = "get" | "post" | "put" | "patch" | "delete";

export type NetworkClientBody = Record<PropertyKey, unknown>;
export type NetworkClientHeaders = Record<PropertyKey, string>;
export type NetworkClientQuery = Record<PropertyKey, string>;

export type NetworkRequestOptions = {
  headers?: NetworkClientHeaders;
  query?: NetworkClientQuery;
};

export type NetworkRequestOptionsWithBody = {
  body?: NetworkClientBody;
} & NetworkRequestOptions;

export abstract class NetworkClient {
  constructor(public host: string) {}

  get<TData = undefined>(resource: string, options?: NetworkRequestOptions): Promise<TData> {
    return this.request("get", resource, options);
  }

  post<TData = undefined>(resource: string, options?: NetworkRequestOptionsWithBody): Promise<TData> {
    return this.request("post", resource, options);
  }

  put<TData = undefined>(resource: string, options?: NetworkRequestOptionsWithBody): Promise<TData> {
    return this.request("put", resource, options);
  }

  patch<TData = undefined>(resource: string, options?: NetworkRequestOptionsWithBody): Promise<TData> {
    return this.request("patch", resource, options);
  }

  delete<TData = undefined>(resource: string, options?: NetworkRequestOptions): Promise<TData> {
    return this.request("delete", resource, options);
  }

  abstract request<TData = undefined>(
    method: NetworkRequestMethod,
    resource: string,
    options?: NetworkRequestOptionsWithBody
  ): Promise<TData>;
}
