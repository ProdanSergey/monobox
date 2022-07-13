import * as yup from "yup";

import { sessionSchema } from "@monobox/appointment-contract";

export const postSessionBodySchema = yup.object().shape({
  body: sessionSchema,
});
