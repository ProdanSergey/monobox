import * as yup from "yup";

export const sessionSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
});

export const authSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
});
