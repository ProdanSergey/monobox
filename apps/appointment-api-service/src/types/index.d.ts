declare namespace Express {
  export interface Request {
    operator?: import("@monobox/appointment-contract").OperatorJwtTokenPayload;
    token?: string;
  }
}
