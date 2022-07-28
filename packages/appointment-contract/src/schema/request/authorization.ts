import yup from "yup";

export const signUpSchema = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
});

export const signInSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const signInVerifySchema = yup.object().shape({
  email: yup.string().email().required(),
  otp: yup.string().length(6).required(),
});
