import {
  AppointmentGetParams,
  AppointmentGetResponseData,
  AppointmentPickParams,
  AppointmentCompleteParams,
  AppointmentListQuery,
  AppointmentListResponseData,
  X_AUTH_TOKEN,
} from "@monobox/appointment-contract";
import { get, post, ApiError, LocalStorage } from "@monobox/appointment-library";

import { AuthorizationStore, LocalStore } from "../../types/local-store";

const RESOURCE = "appointment";

const ls = new LocalStorage<AuthorizationStore>(LocalStore.AUTHORIZATION);

const getAuthToken = (): string => {
  const { accessToken } = ls.get();

  if (!accessToken) {
    throw new ApiError("Missing access token");
  }

  return accessToken;
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
