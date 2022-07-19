import { v4 as uuid } from "uuid";
import { Appointment } from "../domain/appointment";

export class AppointmentBuilder {
  record: Appointment;

  constructor() {
    this.record = {
      id: uuid(),
      ticket: "AP/222/22/22/22",
      assignee: {
        fullName: "John Doe",
        email: "example@app.io",
      },
      completed: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  withAssignee(assignee?: Appointment["assignee"]): this {
    this.record.assignee = {
      fullName: "John Doe",
      email: "example@app.io",
      ...assignee,
    };
    return this;
  }

  withOperator(operator?: Appointment["operator"]): this {
    this.record.operator = {
      fullName: "Super Admin",
      email: "admin@app.io",
      ...operator,
    };
    return this;
  }

  withCompleted(completed: boolean): this {
    this.record.completed = completed;
    return this;
  }

  build(): Appointment {
    return this.record;
  }
}
