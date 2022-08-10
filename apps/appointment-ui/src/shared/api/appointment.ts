import {
  AppointmentCreateBody,
  AppointmentCreateResponseData,
  AppointmentGetParams,
  AppointmentGetResponseData,
  X_USER_TOKEN,
} from "@monobox/appointment-contract";
import { AppointmentNetworkClient } from "@monobox/appointment-library";

const RESOURCE = "appointment";

const networkClient = new AppointmentNetworkClient(process.env.API_SERVICE_URL);

export const createAppointment = async ({ fullName, email }: AppointmentCreateBody) => {
  return networkClient.post<AppointmentCreateResponseData>(RESOURCE, {
    body: { fullName, email },
  });
};

export const getAppointment = async ({ id }: AppointmentGetParams, token: string) => {
  return networkClient.get<AppointmentGetResponseData>(`${RESOURCE}/${encodeURIComponent(id)}`, {
    headers: {
      [X_USER_TOKEN]: token,
    },
  });
};
