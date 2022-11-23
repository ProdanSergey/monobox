import { X_AUTH_TOKEN } from "@monobox/appointment-contract";
import { AppointmentNetworkClient, AppointmentNetworkClientError } from "@monobox/appointment-library";
import { LocalStorage } from "@monobox/toolkit";
import { AuthorizationStore, LocalStore } from "../../types/local-store";

export const authNetworkService = new AppointmentNetworkClient(import.meta.env.VITE_AUTH_SERVICE_URL);

const getAuthToken = (() => {
  const authStore = new LocalStorage<AuthorizationStore>(LocalStore.AUTHORIZATION);

  return (): string => {
    const store = authStore.get();

    if (!store?.accessToken) {
      throw new AppointmentNetworkClientError("Missing access token");
    }

    return store.accessToken;
  };
})();

export const networkService = new AppointmentNetworkClient(import.meta.env.VITE_API_SERVICE_URL);
networkService.interceptors.request.add((request) => {
  request.headers.append(X_AUTH_TOKEN, getAuthToken());
  return request;
});
