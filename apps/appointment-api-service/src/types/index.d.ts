declare namespace Express {
  export interface Request {
    user: import("../domain/appointment").AppointmentOperator | null;
  }
}
