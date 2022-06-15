const BASE_URL = "http://localhost:3030";

const BASE_HEADERS = (() => {
  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  return headers;
})();

type JSONResponse<Data> = {
  status: number;
  message?: string;
  data?: Data;
};

const request = (method: Request["method"]) => {
  return async <Data>(resource: string, body?: Record<string, unknown>): Promise<Data> => {
    const response = await fetch(`${BASE_URL}/${resource}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: BASE_HEADERS,
    });

    if (response.ok) {
      const jsonResponse: JSONResponse<Data> = await response.json();

      const { data, message } = jsonResponse;

      if (!data || message) {
        throw new Error(message);
      }

      return data;
    }

    throw new Error(response.statusText);
  };
};

export const get = request("GET");
export const post = request("POST");
export const put = request("PUT");
export const remove = request("DELETE");
