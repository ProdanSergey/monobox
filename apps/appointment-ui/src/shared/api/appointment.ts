import {
  AppointmentCreateBody,
  AppointmentCreateResponseData,
  AppointmentGetParams,
  AppointmentGetResponseData,
  X_USER_TOKEN,
} from "@monobox/appointment-contract";
import { apiNetworkClient } from "./client";

const RESOURCE = "appointment";

export const createAppointment = async ({ fullName, email }: AppointmentCreateBody) => {
  return apiNetworkClient.post<AppointmentCreateResponseData>(RESOURCE, {
    body: { fullName, email },
  });
};

export const getAppointment = async ({ id }: AppointmentGetParams, token: string) => {
  return apiNetworkClient.get<AppointmentGetResponseData>(`${RESOURCE}/${encodeURIComponent(id)}`, {
    headers: {
      [X_USER_TOKEN]: token,
    },
  });
};
