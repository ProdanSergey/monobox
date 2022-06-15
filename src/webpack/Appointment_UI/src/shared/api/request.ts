const BASE_URL = "http://localhost:3030";

const BASE_HEADERS = (() => {
  const headers = new Headers();
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  return headers;
})();

type JSONSuccessResponse<Data> = {
  status: number;
  data: Data;
};

type JSONFailedResponse = {
  status: number;
  message: string;
};

type JSONResponse<Data> = JSONSuccessResponse<Data> | JSONFailedResponse;

const request = (method: Request["method"]) => {
  return async <Data = undefined>(resource: string, body?: Record<string, unknown>): Promise<Data> => {
    const response = await fetch(`${BASE_URL}/${resource}`, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: BASE_HEADERS,
    });

    if (response.ok) {
      const jsonResponse: JSONResponse<Data> = await response.json();

      if ("message" in jsonResponse) {
        throw new Error(jsonResponse.message);
      }

      return jsonResponse.data;
    }

    throw new Error(response.statusText);
  };
};

export const get = request("GET");
export const post = request("POST");
export const put = request("PUT");
export const remove = request("DELETE");
