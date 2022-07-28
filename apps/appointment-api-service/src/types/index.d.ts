declare namespace Express {
  export interface Request {
    operator?: import("@monobox/appointment-contract").OperatorTokenPayload;
    token?: string;
  }
}
