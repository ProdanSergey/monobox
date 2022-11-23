import {
  AppointmentCreateBody,
  AppointmentCreateResponseData,
  AppointmentGetParams,
  AppointmentGetResponseData,
  X_USER_TOKEN,
} from "@monobox/appointment-contract";
import { networkService } from "../services/network.service";

const RESOURCE = "appointment";

export const createAppointment = async ({ fullName, email }: AppointmentCreateBody) => {
  return networkService.post<AppointmentCreateResponseData>(RESOURCE, {
    body: { fullName, email },
  });
};

export const getAppointment = async ({ id }: AppointmentGetParams, token: string) => {
  return networkService.get<AppointmentGetResponseData>(`${RESOURCE}/${encodeURIComponent(id)}`, {
    headers: {
      [X_USER_TOKEN]: token,
    },
  });
};
