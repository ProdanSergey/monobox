export const X_AUTH_TOKEN = "X-Auth-Token";
export const X_USER_TOKEN = "X-User-Token";

export type JSONSuccessResponse<Data> = {
  status: number;
  data: Data;
};

export type JSONFailedResponse = {
  status: number;
  message: string;
};

export type JSONResponse<Data> = JSONSuccessResponse<Data> | JSONFailedResponse;
