export const XHR = (() => {
  const DEFAULT_HEADERS = {
    "Content-type": "application/json; charset=UTF-8",
  };

  const DEFAULT_RESPONSE_TYPE = "json";

  const request =
    (method = "GET", headers = DEFAULT_HEADERS, responseType = DEFAULT_RESPONSE_TYPE) =>
    (url, body, options = {}) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open(method, url);

        responseType = options.responseType || responseType;

        xhr.responseType = responseType;

        const handlers = {
          load({ target }) {
            if (target.status < 400) {
              resolve(target);
            } else {
              reject(new Error(target.statusText || "Bad Request"));
            }
          },
          error({ target }) {
            reject(new Error(target.statusText || "Internal Error"));
          },
          timeout({ target }) {
            reject(new Error(target.statusText || "Timeout"));
          },
        };

        for (const optionKey of Object.getOwnPropertyNames(options)) {
          xhr[optionKey] = options[optionKey];
        }

        headers = { ...headers, ...options.headers };

        for (const headerKey of Object.getOwnPropertyNames(headers)) {
          xhr.setRequestHeader(headerKey, headers[headerKey]);
        }

        for (const type of Object.getOwnPropertyNames(handlers)) {
          xhr.addEventListener(type, handlers[type]);
        }

        body = body && JSON.stringify(body);

        xhr.send(body);
      });
    };

  const get = request("GET");
  const post = request("POST");
  const put = request("PUT");
  const remove = request("DELETE", null, "");

  return {
    get,
    post,
    put,
    remove,
  };
})();
