import { Appointment } from "../domain/appointment";
import { get, post } from "./request";

const CREATE_APPOINTMENT_PREFIX = "appointment";

export type CreateAppointmentBody = {
  fullName: string;
  email: string;
};

export const createAppointment = async (body: CreateAppointmentBody): Promise<Appointment> => {
  return post<Appointment>(CREATE_APPOINTMENT_PREFIX, body);
};

export type GetAppointmentParams = {
  id: string;
};

export const getAppointment = async ({ id }: GetAppointmentParams) => {
  return get<Appointment>(`${CREATE_APPOINTMENT_PREFIX}/${id}`);
};
