import {
  AppointmentGetParams,
  AppointmentGetResponseData,
  AppointmentPickParams,
  AppointmentCompleteParams,
  AppointmentListQuery,
  AppointmentListResponseData,
} from "@monobox/appointment-contract";
import { isUndefined } from "@monobox/utils";

import { networkService } from "../services/network.service";

const RESOURCE = "appointment";

export const getAppointment = async ({ id }: AppointmentGetParams) => {
  return networkService.get<AppointmentGetResponseData>(`${RESOURCE}/${encodeURIComponent(id)}`);
};

export const pickAppointment = async ({ id }: AppointmentPickParams) => {
  return networkService.post<undefined>(`${RESOURCE}/${encodeURIComponent(id)}/pick`);
};

export const completeAppointment = async ({ id }: AppointmentCompleteParams) => {
  return networkService.post<undefined>(`${RESOURCE}/${encodeURIComponent(id)}/complete`);
};

export const getAppointments = async ({ completed }: AppointmentListQuery) => {
  return networkService.get<AppointmentListResponseData>(RESOURCE, {
    query: isUndefined(completed) ? {} : { completed: String(completed) },
  });
};
