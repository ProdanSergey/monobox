import * as yup from "yup";

import { createSchema, pickSchema } from "@monobox/appointment-contract";

export const appointmentCreateBodySchema = yup.object().shape({
  body: createSchema,
});

export const appointmentPickBodySchema = yup.object().shape({
  body: pickSchema,
});
