import { v4 as uniqid } from "uuid";
import { RANDOM } from "./random";

const request = (implementation) => {
  const requestId = uniqid();

  const promise = new Promise((resolve, reject) => {
    console.log(`[Request: ${requestId}]: Started;`);
    setTimeout(() => {
      implementation({ resolve, reject });
    }, RANDOM.integer(1500, 3000));
  });

  const commit = (message) => () => {
    console.log(`[Request: ${requestId}]: ${message}`);
  };

  promise.then(commit("Successfully Finished;"), commit("Failed;"));

  return promise;
};

export const FakeRequest = {
  resolved: ({ body, statusCode = 200 }) => {
    return request(({ resolve }) =>
      resolve({
        statusCode,
        body,
      })
    );
  },
  rejected: ({ statusCode = 400, message = "Bad Request" }) => {
    return request(({ reject }) =>
      reject({
        statusCode,
        message,
      })
    );
  },
};
