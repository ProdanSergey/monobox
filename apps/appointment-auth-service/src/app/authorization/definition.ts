import * as yup from "yup";

import { signUpSchema, signInSchema, signInVerifySchema } from "@monobox/appointment-contract";

export const postSignUpBodySchema = yup.object().shape({
  body: signUpSchema,
});

export const postSignInBodySchema = yup.object().shape({
  body: signInSchema,
});

export const postSignInVerifyBodySchema = yup.object().shape({
  body: signInVerifySchema,
});
