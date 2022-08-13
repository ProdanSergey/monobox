import {
  AppointmentGetParams,
  AppointmentGetResponseData,
  AppointmentPickParams,
  AppointmentCompleteParams,
  AppointmentListQuery,
  AppointmentListResponseData,
} from "@monobox/appointment-contract";
import { isUndefined } from "@monobox/toolkit";

import { apiNetworkClient } from "./client";

const RESOURCE = "appointment";

export const getAppointment = async ({ id }: AppointmentGetParams) => {
  return apiNetworkClient.get<AppointmentGetResponseData>(`${RESOURCE}/${encodeURIComponent(id)}`);
};

export const pickAppointment = async ({ id }: AppointmentPickParams) => {
  return apiNetworkClient.post<undefined>(`${RESOURCE}/${encodeURIComponent(id)}/pick`);
};

export const completeAppointment = async ({ id }: AppointmentCompleteParams) => {
  return apiNetworkClient.post<undefined>(`${RESOURCE}/${encodeURIComponent(id)}/complete`);
};

export const getAppointments = async ({ completed }: AppointmentListQuery) => {
  return apiNetworkClient.get<AppointmentListResponseData>(RESOURCE, {
    query: isUndefined(completed) ? {} : { completed: String(completed) },
  });
};
