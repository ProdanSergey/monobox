import {
  AppointmentCreateBody,
  AppointmentCreateResponseData,
  AppointmentGetParams,
  AppointmentGetResponseData,
  X_USER_TOKEN,
} from "@monobox/appointment-contract";
import { get, post } from "@monobox/appointment-library";

const RESOURCE = "appointment";

export const createAppointment = async ({ fullName, email }: AppointmentCreateBody) => {
  return post<AppointmentCreateResponseData>(RESOURCE, {
    baseUrl: process.env.API_SERVICE_URL,
    body: { fullName, email },
  });
};

export const getAppointment = async ({ id }: AppointmentGetParams, token: string) => {
  return get<AppointmentGetResponseData>(`${RESOURCE}/${encodeURIComponent(id)}`, {
    baseUrl: process.env.API_SERVICE_URL,
    headers: {
      [X_USER_TOKEN]: token,
    },
  });
};
