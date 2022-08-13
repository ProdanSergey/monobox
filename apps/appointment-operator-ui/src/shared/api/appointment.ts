import {
  AppointmentGetParams,
  AppointmentGetResponseData,
  AppointmentPickParams,
  AppointmentCompleteParams,
  AppointmentListQuery,
  AppointmentListResponseData,
  X_AUTH_TOKEN,
} from "@monobox/appointment-contract";
import { AppointmentNetworkClientError, AppointmentNetworkClient } from "@monobox/appointment-library";
import { LocalStorage, isUndefined } from "@monobox/toolkit";

import { AuthorizationStore, LocalStore } from "../../types/local-store";

const RESOURCE = "appointment";

const networkClient = new AppointmentNetworkClient(process.env.API_SERVICE_URL);
const authStore = new LocalStorage<AuthorizationStore>(LocalStore.AUTHORIZATION);

const getAuthToken = (): string => {
  const store = authStore.get();

  if (!store?.accessToken) {
    throw new AppointmentNetworkClientError("Missing access token");
  }

  return store.accessToken;
};

export const getAppointment = async ({ id }: AppointmentGetParams) => {
  return networkClient.get<AppointmentGetResponseData>(`${RESOURCE}/${encodeURIComponent(id)}`, {
    headers: {
      [X_AUTH_TOKEN]: getAuthToken(),
    },
  });
};

export const pickAppointment = async ({ id }: AppointmentPickParams) => {
  return networkClient.post<undefined>(`${RESOURCE}/${encodeURIComponent(id)}/pick`, {
    headers: {
      [X_AUTH_TOKEN]: getAuthToken(),
    },
  });
};

export const completeAppointment = async ({ id }: AppointmentCompleteParams) => {
  return networkClient.post<undefined>(`${RESOURCE}/${encodeURIComponent(id)}/complete`, {
    headers: {
      [X_AUTH_TOKEN]: getAuthToken(),
    },
  });
};

export const getAppointments = async ({ completed }: AppointmentListQuery) => {
  return networkClient.get<AppointmentListResponseData>(RESOURCE, {
    headers: {
      [X_AUTH_TOKEN]: getAuthToken(),
    },
    query: isUndefined(completed) ? {} : { completed: String(completed) },
  });
};
