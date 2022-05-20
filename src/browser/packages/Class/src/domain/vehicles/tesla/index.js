import { Vehicle } from "../../vehicle";

export class Tesla extends Vehicle {
  drive(route) {
    this.autopilot.drive(route);
  }
}
