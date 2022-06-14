import * as yup from "yup";

type AppointmentBaseParams = {
  id: string;
};

export type AppointmentCreateBody = { fullName: string; email: string };
export const appointmentCreateBodySchema = yup.object().shape({
  body: yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
  }),
});

export type AppointmentGetParams = AppointmentBaseParams;

export type AppointmentUpdateParams = AppointmentBaseParams;
export type AppointmentUpdateBody = { completed: boolean };
export const appointmentUpdateBodySchema = yup.object().shape({
  body: yup.object().shape({
    completed: yup.boolean().required(),
  }),
});

export type AppointmentDeleteParams = AppointmentBaseParams;

export type AppointmentListQuery = Partial<{ completed: boolean; limit: number }>;
