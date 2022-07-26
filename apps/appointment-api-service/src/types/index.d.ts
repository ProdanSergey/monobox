declare namespace Express {
  export interface Request {
    operator?: import("../domain/appointment").AppointmentOperator;
    token?: string;
  }
}
