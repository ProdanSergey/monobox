import {
  NetworkClient,
  NetworkRequestMethod,
  NetworkRequestOptionsWithBody,
  NetworkClientError,
  NetworkClientQuery,
  NetworkClientHeaders,
  NetworkRequestOptions,
} from "@monobox/frontend";

export class TrelloNetworkClient extends NetworkClient {
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
    return await response.json();
  }

  async upload<TData = undefined>(
    resource: string,
    formData: FormData,
    options?: NetworkRequestOptions
  ): Promise<TData> {
    const { query, headers } = options ?? {};

    const url = new URL(resource, this.host);

    formData.append("key", import.meta.env.VITE_TRELLO_API_KEY);
    formData.append("token", import.meta.env.VITE_TRELLO_API_TOKEN);

    if (query) {
      this.withQuery(url, query);
    }

    const request = new Request(url, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (headers) {
      this.withHeaders(request, headers);
    }

    const response = await fetch(request);

    if (response.ok) {
      return this.serialize(response);
    }

    throw new NetworkClientError(response.statusText);
  }

  async request<TData = undefined>(
    method: NetworkRequestMethod,
    resource: string,
    options?: NetworkRequestOptionsWithBody
  ): Promise<TData> {
    const { query, headers, body } = options ?? {};

    const url = new URL(resource, this.host);

    url.searchParams.append("key", import.meta.env.VITE_TRELLO_API_KEY);
    url.searchParams.append("token", import.meta.env.VITE_TRELLO_API_TOKEN);

    if (query) {
      this.withQuery(url, query);
    }

    const request = new Request(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: {
        Accept: "application/json",
      },
    });

    if (headers) {
      this.withHeaders(request, headers);
    }

    const response = await fetch(request);

    if (response.ok) {
      return this.serialize(response);
    }

    throw new NetworkClientError(response.statusText);
  }
}
