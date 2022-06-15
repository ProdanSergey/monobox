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

export type AppointmentDeleteParams = AppointmentBaseParams;

export type AppointmentListQuery = Partial<{ completed: boolean; limit: number }>;

export type AppointmentPickParams = AppointmentBaseParams;
export type AppointmentPickBody = { fullName: string; email: string };
export const appointmentPickBodySchema = yup.object().shape({
  body: yup.object().shape({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
  }),
});

export type AppointmentCompleteParams = AppointmentBaseParams;
