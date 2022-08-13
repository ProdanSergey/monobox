import * as yup from "yup";

export const createSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
});
