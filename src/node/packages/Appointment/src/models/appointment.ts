import * as dayjs from "dayjs";

export class Appointment {
  id: string;
  created_at: string;
  completed: boolean;

  constructor() {
    const now = dayjs();

    this.id = `AP-${now.format("HH/mm/ss/SSS")}`;
    this.created_at = now.format();
    this.completed = false;
  }
}
