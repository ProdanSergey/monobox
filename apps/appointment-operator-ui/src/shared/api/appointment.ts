import { Appointment } from "../domain/appointment";
import { get, post } from "./request";

const CREATE_APPOINTMENT_PREFIX = "appointment";

export type GetAppointmentParams = {
  id: string;
};

export const getAppointment = async ({ id }: GetAppointmentParams) => {
  return get<Appointment>(`${CREATE_APPOINTMENT_PREFIX}/${encodeURIComponent(id)}`);
};

export type PickAppointmentParams = {
  id: string;
};

export type PickAppointmentBody = {
  fullName: string;
  email: string;
};

export const pickAppointment = async ({ id }: PickAppointmentParams, { fullName, email }: PickAppointmentBody) => {
  return post<undefined>(`${CREATE_APPOINTMENT_PREFIX}/${encodeURIComponent(id)}/pick`, { fullName, email });
};

export type CompleteAppointmentParams = {
  id: string;
};

export const completeAppointment = async ({ id }: CompleteAppointmentParams) => {
  return post<undefined>(`${CREATE_APPOINTMENT_PREFIX}/${encodeURIComponent(id)}/complete`);
};

export type GetAppointmentsQuery = {
  completed: boolean;
};

export const getAppointments = async ({ completed }: GetAppointmentsQuery) => {
  return get<Appointment[]>(`${CREATE_APPOINTMENT_PREFIX}?completed=${completed}`);
};
