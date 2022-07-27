export type AuthorizationSignUpBody = { fullName: string; email: string };

export type AuthorizationSignInBody = { email: string };

export type AuthorizationSignInVerifyBody = { email: string; otp: string };
