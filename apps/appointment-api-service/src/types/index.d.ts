declare namespace Express {
  export interface Request {
    operator?: import("../infra/express/middlewares/authenticate").JwtTokenPayload;
    token?: string;
  }
}
