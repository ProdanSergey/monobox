import {
  AppointmentGetParams,
  AppointmentGetResponseData,
  AppointmentPickParams,
  AppointmentCompleteParams,
  AppointmentListQuery,
  AppointmentListResponseData,
  X_AUTH_TOKEN,
} from "@monobox/appointment-contract";
import { ApiError, get, post } from "@monobox/appointment-library";

const RESOURCE = "appointment";

const getAuthToken = (): string => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw new ApiError("Missing access token");
  }

  return token;
};

export const getAppointment = async ({ id }: AppointmentGetParams) => {
  return get<AppointmentGetResponseData>(`${RESOURCE}/${encodeURIComponent(id)}`, {
    baseUrl: process.env.API_SERVICE_URL,
    headers: {
      [X_AUTH_TOKEN]: getAuthToken(),
    },
  });
};

export const pickAppointment = async ({ id }: AppointmentPickParams) => {
  return post<undefined>(`${RESOURCE}/${encodeURIComponent(id)}/pick`, {
    baseUrl: process.env.API_SERVICE_URL,
    headers: {
      [X_AUTH_TOKEN]: getAuthToken(),
    },
  });
};

export const completeAppointment = async ({ id }: AppointmentCompleteParams) => {
  return post<undefined>(`${RESOURCE}/${encodeURIComponent(id)}/complete`, {
    baseUrl: process.env.API_SERVICE_URL,
    headers: {
      [X_AUTH_TOKEN]: getAuthToken(),
    },
  });
};

export const getAppointments = async ({ completed }: AppointmentListQuery) => {
  return get<AppointmentListResponseData>(`${RESOURCE}?completed=${completed}`, {
    baseUrl: process.env.API_SERVICE_URL,
    headers: {
      [X_AUTH_TOKEN]: getAuthToken(),
    },
  });
};
