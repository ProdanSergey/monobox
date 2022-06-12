import { AppointmentId } from "../../domain/appointment";

export type GetQuery = {
  id: AppointmentId;
};

export type DeleteQuery = {
  id: AppointmentId;
};

export type UpdateQuery = {
  id: AppointmentId;
  completed: boolean;
};

export type ListQuery = {
  completed?: boolean;
  limit?: number;
};
