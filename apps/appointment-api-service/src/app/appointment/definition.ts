import * as yup from "yup";

import { createSchema } from "@monobox/appointment-contract";

export const appointmentCreateBodySchema = yup.object().shape({
  body: createSchema,
});
